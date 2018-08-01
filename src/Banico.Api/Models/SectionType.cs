using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class SectionType : ObjectGraphType<Section>
    {
        public SectionType(ISectionRepository sectionRepository)
        {
            Field(x => x.Id);

            Field(x => x.CreatedBy);
            Field(x => x.CreatedDate);
            Field(x => x.LastUpdate);

            Field(x => x.Tenant);
            Field(x => x.Name);
            
            Field(x => x.Modules);

            //Field<StringGraphType>("modules", resolve: context => context.Source.Modules);
        }
    }
}