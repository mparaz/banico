using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using Banico.Services.Interfaces;

namespace Banico.Services
{
    public class AuthMessageSender : IEmailSender, ISmsSender
    {
        public IConfiguration Configuration { get; set; }
        public SendGridMessage Message { get; set; }

        public AuthMessageSender(IConfiguration configuration,
        IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            this.Configuration = configuration;
            Options = optionsAccessor.Value;
        }

        public AuthMessageSenderOptions Options { get; } //set only via Secret Manager
        public async Task<Response> SendEmailAsync(string email, string subject, string message)
        {
            // Plug in your email service here to send an email.
            return await Execute(Options.SendGridKey, subject, message, email, email);
        }

        public async Task<Response> SendEmailAsync(string name, string email, string subject, string message)
        {
            // Plug in your email service here to send an email.
            return await Execute(Options.SendGridKey, subject, message, name, email);
        }

        public async Task<Response> Execute(string apiKey, string subject, string message, string name, string email)
        {
            var client = new SendGridClient(apiKey);
            string senderEmail = this.Configuration["Email:Address"];
            string senderName = this.Configuration["Email:Name"];

            var msg = new SendGridMessage()
            {
                From = new EmailAddress(senderEmail, senderName),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email, name));
            this.Message = msg;

            var response = await client.SendEmailAsync(msg);

            return response;
        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }
}