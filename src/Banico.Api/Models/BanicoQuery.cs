using GraphQL.Types;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class BanicoQuery : ObjectGraphType
    {
        public BanicoQuery(ISectionRepository sectionRepository)
        {
            Field<SectionType>(
                "section",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> { 
                        Name = "id" 
                    },
                    new QueryArgument<StringGraphType> { 
                        Name = "module" 
                    },
                    new QueryArgument<StringGraphType> { 
                        Name = "name" 
                    }
                    ),
                resolve: context =>  sectionRepository.Get(
                    context.GetArgument<int>("id"),
                    context.GetArgument<string>("module"),
                    context.GetArgument<string>("name")
                    ));
        }
    }
}
