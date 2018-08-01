using Microsoft.Extensions.DependencyInjection;
using GraphQL;
using GraphQL.Types;
using Banico.Core.Repositories;
using Banico.Data.Repositories;
using Banico.Api.Models;

namespace Banico.Api
{
  public class ApiStartup
  {
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<IInviteRepository, InviteRepository>();
        services.AddScoped<ISectionRepository, SectionRepository>();
        services.AddScoped<ISectionItemRepository, SectionItemRepository>();
        services.AddScoped<IContentItemRepository, ContentItemRepository>();

        var sp = services.BuildServiceProvider();
        services.AddSingleton<ISchema>(new BanicoSchema(new FuncDependencyResolver(type => sp.GetService(type))));
    }
  }
}