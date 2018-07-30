using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class BanicoMutation : ObjectGraphType
    {
        public BanicoMutation(ISectionRepository sectionRepository)
        {
            Name = "CreateSectionMutation";

            Field<SectionType>(
                "createSection",
                arguments: new QueryArguments(
                    // <SectionInputType>
                    new QueryArgument<NonNullGraphType<SectionType>> { Name = "section" }
                ),
                resolve: context =>
                {
                    var section = context.GetArgument<Section>("section");
                    return sectionRepository.Add(section);
                });
        }
    }
}