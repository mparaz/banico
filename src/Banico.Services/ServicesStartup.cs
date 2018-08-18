using Microsoft.Extensions.DependencyInjection;
using Banico.Services.Interfaces;

namespace Banico.Services
{
  public class ServicesStartup
  {
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddTransient<IEmailSender, AuthMessageSender>();
        services.AddTransient<ISmsSender, AuthMessageSender>();
        services.AddScoped<IInviteService, InviteService>();
        services.AddScoped<ISuperAdminService, SuperAdminService>();
        services.AddScoped<IItemSecurityService, ItemSecurityService>();
    }
  }
}