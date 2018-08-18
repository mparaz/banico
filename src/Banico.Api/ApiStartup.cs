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
      //services.AddSingleton<IDocumentWriter, DocumentWriter>();
      services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
      
      services.AddSingleton<BanicoQuery>();
      services.AddSingleton<BanicoMutation>();
      services.AddSingleton<SectionType>();
      services.AddSingleton<SectionInputType>();
      services.AddSingleton<SectionItemType>();
      services.AddSingleton<SectionItemInputType>();

      var sp = services.BuildServiceProvider();
      services.AddSingleton<ISchema>(new BanicoSchema(new FuncDependencyResolver(type => sp.GetService(type))));
    }
  }
}