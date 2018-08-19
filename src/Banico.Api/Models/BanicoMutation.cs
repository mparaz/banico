using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class BanicoMutation : ObjectGraphType
    {
        public BanicoMutation(ISectionRepository sectionRepository)
        {
            Name = "AddSectionMutation";

            Field<SectionType>(
                "addSection",
                arguments: new QueryArguments(
                    // <SectionInputType>
                    new QueryArgument<NonNullGraphType<SectionInputType>> { Name = "section" }
                ),
                resolve: context =>
                {
                    var section = context.GetArgument<Section>("section");
                    return sectionRepository.Add(section);
                });
        }
    }
}