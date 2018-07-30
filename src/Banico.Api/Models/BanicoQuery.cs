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
                arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }),
                resolve: context =>  sectionRepository.Get(context.GetArgument<int>("id")));

            Field<ListGraphType<SectionType>>(
                "sections",
                resolve: context => sectionRepository.GetAll(string.Empty));
        }
    }
}
