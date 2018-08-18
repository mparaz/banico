using Microsoft.Extensions.DependencyInjection;
using Banico.Core.Repositories;
using Banico.Data.Repositories;

namespace Banico.Data
{
  public class DataStartup
  {
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddScoped<IInviteRepository, InviteRepository>();
      services.AddScoped<ISectionRepository, SectionRepository>();
      services.AddScoped<ISectionItemRepository, SectionItemRepository>();
      services.AddScoped<IContentItemRepository, ContentItemRepository>();
    }
  }
}