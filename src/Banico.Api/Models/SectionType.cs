using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class SectionType : ObjectGraphType<Section>
    {
        public SectionType(ISectionRepository sectionRepository)
        {
            Field(x => x.Modules);
            //Field<StringGraphType>("modules", resolve: context => context.Source.Modules);
        }
    }
}