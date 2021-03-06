using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text.Encodings.Web;
using Banico.Core.Entities;
using Banico.Core.Repositories;
using Banico.Identity.Auth;
using Banico.Identity.Models;
using Banico.Services;
using Banico.Services.Interfaces;
using Banico.Identity.Helpers;
using Banico.Identity.ViewModels.Account;

namespace Banico.Identity.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccountController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;
        private readonly IInviteService _inviteService;
        private readonly ISuperAdminService _superAdminService;
        private readonly string _externalCookieScheme;
        private readonly IConfiguration _configuration;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly ClaimsPrincipal _caller;
        private readonly IUserClaimsPrincipalFactory<AppUser> _userClaimsPrincipalFactory;
        private readonly IAntiforgery _antiforgery;

        private bool _InviteOnly = false;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            ILoggerFactory loggerFactory,
            IInviteService inviteService,
            ISuperAdminService superAdminService,
            IConfiguration configuration, 
            IJwtFactory jwtFactory, 
            IOptions<JwtIssuerOptions> jwtOptions,
            IHttpContextAccessor httpContextAccessor,
            IUserClaimsPrincipalFactory<AppUser> userClaimsPrincipalFactory,
            IAntiforgery antiforgery)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _logger = loggerFactory.CreateLogger<AccountController>();
            _inviteService = inviteService;
            _superAdminService = superAdminService;
            _configuration = configuration;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _caller = httpContextAccessor.HttpContext.User;
            _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
            _antiforgery = antiforgery;

            if (_configuration["InviteOnly"] == "true")
            {
                _InviteOnly = true;
            }
        }

        private string GetCurrentUserId()
        {
            if (_caller.Claims != null) {
                var userIdClaim = _caller.Claims.Single(c => c.Type == "id");
                if (userIdClaim != null) {
                    return userIdClaim.Value;
                }
            }

            return string.Empty;
        }

        [AllowAnonymous]
        public async Task<JsonResult> IsLoggedIn()
        {
            return new JsonResult(!string.IsNullOrEmpty(this.GetCurrentUserId()));
        }

        [AllowAnonymous]
        public async Task<JsonResult> LoggedInAs()
        {
            return new JsonResult(_userManager.FindByIdAsync(this.GetCurrentUserId()));
        }

        //
        // POST: /api/Account/Login
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                // Require the user to have a confirmed email before they can log on.
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    if (!await _userManager.IsEmailConfirmedAsync(user))
                    {
                        ModelState.AddModelError(string.Empty, 
                                    "You must have a confirmed email to log in.");
                        return BadRequest(Errors.AddErrorToModelState("Email", "You must have a confirmed email to log in.", ModelState));
                    }
                }

                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    HttpContext.User = await _userClaimsPrincipalFactory.CreateAsync(user);
                    var tokens = _antiforgery.GetAndStoreTokens(HttpContext);

                    var identity = _jwtFactory.GenerateClaimsIdentity(model.Email, user.Id);
                    _logger.LogInformation(1, "User logged in.");
                    var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, model.Email, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
                    return new OkObjectResult(jwt);
                }

                if (result.RequiresTwoFactor)
                {
                    return RedirectToAction(nameof(SendCode), new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                }

                if (result.IsLockedOut)
                {
                    string message = "User account locked out.";
                    _logger.LogWarning(2, message);
                    return BadRequest(Errors.AddErrorToModelState("Email", message, ModelState));
                }

                if (result.IsNotAllowed)
                {
                    string message = "User account is not allowed to sign in.";
                    _logger.LogWarning(2, message);
                    return BadRequest(Errors.AddErrorToModelState("Email", message, ModelState));
                }

                return BadRequest(Errors.AddErrorToModelState("", "Sign in failed.", ModelState));
            }

            // If we got this far, something failed, redisplay form
            return BadRequest(Errors.AddErrorToModelState("", "", ModelState));
        }

        private async Task SendConfirmationEmail(AppUser user)
        {
            // For more information on how to enable account confirmation and password reset please visit https://go.microsoft.com/fwlink/?LinkID=532713
            // Send an email with this link
            var originalCode = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var code = WebUtility.UrlEncode(originalCode);
            var urlBuilder =
                new System.UriBuilder(Request.GetRawUrl())
                    {
                        Path = Url.Content("~/account/confirm-email"),
                        Query = "userId=" + user.Id + "&code=" + code
                    };
            var callbackUrl = urlBuilder.ToString();
            callbackUrl = HtmlEncoder.Default.Encode(callbackUrl);
            
            string confirmText = @"Hi,<br /><br />" +
            "Thank you for registering an account on our site.<br /><br />" +
            "You are one step away from being able to link your website to your chosen word.<br /><br />" +
            "Please confirm your email address by clicking here:<br /><br />" +
            "<a href='" + callbackUrl + "'>Confirm Email</a><br /><br />" +
            "If you didn't register for this account, just ignore and delete this message.<br /><br />" +
            "Thank you.<br /><br />" +
            "Site Admin";

            await _emailSender.SendEmailAsync(user.Email, "Confirm your account",
                confirmText);
        }

        private async Task SendForgotPasswordEmail(AppUser user)
        {
            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var urlBuilder =
                new System.UriBuilder(Request.GetRawUrl())
                    {
                        Path = Url.Content("~/account/reset-password"),
                        Query = "email=" + user.Email + "&code=" + code
                    };
            var callbackUrl = urlBuilder.ToString();

            string resetPasswordText = @"Hi,<br /><br />" +
                "Someone recently requested a password change for your account.<br /><br />" +
                "If it was you, you can reset your password by clicking here:<br /><br />" +
                "<a href='" + callbackUrl + "'>Reset Password</a><br /><br />" +
                "If you don't want to change your password or didn't request this, just ignore and delete this message.<br /><br />" +
                "Thank you.<br /><br />" +
                "Admin";

            var response = await _emailSender.SendEmailAsync(user.Email, "Reset Your Password",
                resetPasswordText);
        }
    
        //
        // POST: /api/Account/Register
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            string inviter = string.Empty;
            if ((_InviteOnly) && (!_superAdminService.IsSuperAdminEmail(model.Email)))
            {
                if (string.IsNullOrEmpty(model.Code))
                {
                    //ModelState.AddModelError("Code", "Please provide an Invite Code.");
                    return BadRequest(Errors.AddErrorToModelState("", "", ModelState));
                }

                inviter = await _inviteService.IsInvited(model.Email, model.Code);
                if (string.IsNullOrEmpty(inviter))
                {
                    //ModelState.AddModelError("Code", "Invalid Invite Code.");
                    return BadRequest(Errors.AddErrorToModelState("", "", ModelState));
                }
            }
            
            if (ModelState.IsValid)
            {
                var user = new AppUser { UserName = model.Email, Email = model.Email, Inviter = inviter };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await this.SendConfirmationEmail(user);
                    // await _signInManager.SignInAsync(user, isPersistent: false);
                    _logger.LogInformation(3, "User created a new account with password.");
                    //return RedirectToLocal(returnUrl);
                    return new OkObjectResult("");
                }
                return BadRequest(Errors.AddErrorToModelState("", "", ModelState));
            }

            // If we got this far, something failed, redisplay form
            return BadRequest(Errors.AddErrorToModelState("", "", ModelState));
        }

        //
        // POST: /api/Account/Logout
        [HttpPost]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation(4, "User logged out.");
            //return RedirectToAction(nameof(HomeController.Index), "Home");
            return new OkObjectResult("");
        }

        //
        // POST: /api/Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { ReturnUrl = returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return Challenge(properties, provider);
        }

        //
        // GET: /api/Account/ExternalLoginCallback
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                ModelState.AddModelError(string.Empty, $"Error from external provider: {remoteError}");
                return View(nameof(Login));
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction(nameof(Login));
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
            if (result.Succeeded)
            {
                _logger.LogInformation(5, "User logged in with {Name} provider.", info.LoginProvider);
                return RedirectToLocal(returnUrl);
            }
            
            if (result.RequiresTwoFactor)
            {
                return RedirectToAction(nameof(SendCode), new { ReturnUrl = returnUrl });
            }
            if (result.IsLockedOut)
            {
                return View("Lockout");
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                ViewData["ReturnUrl"] = returnUrl;
                ViewData["LoginProvider"] = info.LoginProvider;
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = email });
            }
        }

        public string GetClaimValue(ClaimsPrincipal claims, string key)
        {
            var foundClaim = claims.FindAll(key);
            if (foundClaim.Count() > 0)
            {
                return foundClaim.ToList()[0].Value;
            }

            return string.Empty;
        }

        public async Task<bool> RegisterUserAsync(AppUser user, ExternalLoginInfo info, string name)
        {
            // create in Account DB
            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded)
            {
                return result.Succeeded;
            }

            result = await _userManager.AddLoginAsync(user, info);

            return result.Succeeded;
        }

        //
        // POST: /api/Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> ExternalLoginConfirmation([FromBody]ExternalLoginConfirmationViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await _signInManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    //return View("ExternalLoginFailure");
                    return BadRequest(Errors.AddErrorToModelState("", "", ModelState));
                }
                var user = new AppUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await _userManager.AddLoginAsync(user, info);
                    if (result.Succeeded)
                    {
                        // For more information on how to enable account confirmation and password reset please visit https://go.microsoft.com/fwlink/?LinkID=532713
                        // Send an email with this link
                        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        var urlBuilder =
                            new System.UriBuilder(Request.GetRawUrl())
                                {
                                    Path = Url.Content("~/account/confirm-email"),
                                    Query = "userId=" + user.Id + "&code=" + code
                                };
                        var callbackUrl = urlBuilder.ToString();

                        await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
                        $"Please confirm your account by clicking this link: <a href='{callbackUrl}'>link</a>");
                        // await _signInManager.SignInAsync(user, isPersistent: false);
                        _logger.LogInformation(3, "User created a new account with password.");
                        return RedirectToLocal(returnUrl);
                    }
                    // if (result.Succeeded)
                    // {
                    //     await _signInManager.SignInAsync(user, isPersistent: false);
                    //     _logger.LogInformation(6, "User created an account using {Name} provider.", info.LoginProvider);
                    //     return RedirectToLocal(returnUrl);
                    // }
                }
                AddErrors(result);
            }

            ViewData["ReturnUrl"] = returnUrl;
            return View(model);
        }

        // GET: /api/Account/ConfirmEmail
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail([FromBody]ConfirmEmailViewModel model)
        {
            if (model.UserId == null || model.Code == null)
            {
                return BadRequest(Errors.AddErrorToModelState("NoUserIdOrCode", "NoUserIdOrCode", ModelState));
            }
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return BadRequest(Errors.AddErrorToModelState("UserNotFound", "UserNotFound", ModelState));
            }
            var decodedCode = model.Code.Replace(" ", "+");
            var result = await _userManager.ConfirmEmailAsync(user, decodedCode);
            try {
                if (result.Succeeded) {
                    return new OkObjectResult("");
                } else {
                    return BadRequest(result.Errors);
                }
            }
            catch (Exception ex) {
                return Content(ex.Message);
            }
        }

        //
        // POST: /api/Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return new OkObjectResult("");
                }

                await this.SendForgotPasswordEmail(user);
                return new OkObjectResult("");
            }

            // If we got this far, something failed, redisplay form
            return BadRequest(Errors.AddErrorToModelState("", "", ModelState));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> ResendConfirmation([FromBody]ResendConfirmationViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if ((user != null) && (!await(_userManager.IsEmailConfirmedAsync(user))))
            {
                await this.SendConfirmationEmail(user);
                return new OkObjectResult("");
            }

            //return RedirectToAction(nameof(ConfirmationSent));
            return BadRequest(Errors.AddErrorToModelState("", "Unknown error", ModelState));
        }

        //
        // POST: /api/Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(Errors.AddErrorToModelState("", "Invalid model state", ModelState));
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                //return RedirectToAction(nameof(AccountController.ResetPasswordConfirmation), "Account");
                //return BadRequest(Errors.AddErrorToModelState("", "User not found", ModelState));
                return new OkObjectResult("");
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                //return RedirectToAction(nameof(AccountController.ResetPasswordConfirmation), "Account");
                return new OkObjectResult("");
            }
            AddErrors(result);
            return BadRequest(Errors.AddErrorToModelState("", "Unknown error", ModelState));
        }

        //
        // GET: /api/Account/SendCode
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl = null, bool rememberMe = false)
        {
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return View("Error");
            }
            var userFactors = await _userManager.GetValidTwoFactorProvidersAsync(user);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /api/Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> SendCode([FromBody]SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return View("Error");
            }

            // Generate the token and send it
            var code = await _userManager.GenerateTwoFactorTokenAsync(user, model.SelectedProvider);
            if (string.IsNullOrWhiteSpace(code))
            {
                return View("Error");
            }

            var message = "Your security code is: " + code;
            if (model.SelectedProvider == "Email")
            {
                await _emailSender.SendEmailAsync(await _userManager.GetEmailAsync(user), "Security Code", message);
            }
            else if (model.SelectedProvider == "Phone")
            {
                await _smsSender.SendSmsAsync(await _userManager.GetPhoneNumberAsync(user), message);
            }

            return RedirectToAction(nameof(VerifyCode), new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /api/Account/VerifyCode
        // [HttpGet]
        // [AllowAnonymous]
        // public async Task<IActionResult> VerifyCode(string provider, bool rememberMe, string returnUrl = null)
        // {
        //     // Require that the user has already logged in via username/password or external login
        //     var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
        //     if (user == null)
        //     {
        //         return View("Error");
        //     }
        //     return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        // }

        //
        // POST: /api/Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> VerifyCode([FromBody]VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes.
            // If a user enters incorrect codes for a specified amount of time then the user account
            // will be locked out for a specified amount of time.
            var result = await _signInManager.TwoFactorSignInAsync(model.Provider, model.Code, model.RememberMe, model.RememberBrowser);
            if (result.Succeeded)
            {
                return RedirectToLocal(model.ReturnUrl);
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning(7, "User account locked out.");
                return View("Lockout");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid code.");
                return View(model);
            }
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            // if (Url.IsLocalUrl(returnUrl))
            // {
                return Redirect(returnUrl);
            // }
            // else
            // {
            //     return RedirectToAction(nameof(HomeController.Index), "Home");
            // }
        }

        public async Task<ProfileViewModel> GetProfile()
        {
            ProfileViewModel profileViewModel = new ProfileViewModel();
            AppUser user = await Utilities.GetUser(this, _userManager);
            profileViewModel.FirstName = user.FirstName;
            profileViewModel.LastName = user.LastName;
            profileViewModel.Alias = user.Alias;
            return profileViewModel;
        }

        public async Task<AppUser> SetProfile(string firstName, string lastName, string alias)
        {
            AppUser user = await Utilities.GetUser(this, _userManager);
            user.FirstName = firstName;
            user.LastName = lastName;
            user.Alias = alias;

            var result = await _userManager.UpdateAsync(user);
            return user;
        }

        #endregion
    }
}

