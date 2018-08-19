using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class SectionType : ObjectGraphType<Section>
    {
        public SectionType(ISectionRepository sectionRepository)
        {
            Field(x => x.Id, nullable:true);

            Field(x => x.CreatedBy, nullable:true);
            Field(x => x.CreatedDate, nullable:true);
            Field(x => x.LastUpdate, nullable:true);

            Field(x => x.Tenant, nullable:true);
            Field(x => x.Name, nullable:true);
            
            Field(x => x.Modules, nullable:true);

            //Field<StringGraphType>("modules", resolve: context => context.Source.Modules);
        }
    }
}