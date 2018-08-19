using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class SectionItemType : ObjectGraphType<SectionItem>
    {
        public SectionItemType(ISectionItemRepository sectionItemRepository)
        {
            Field(x => x.Id, nullable:true);

            Field(x => x.CreatedBy, nullable:true);
            Field(x => x.CreatedDate, nullable:true);
            Field(x => x.LastUpdate, nullable:true);

            Field(x => x.Tenant, nullable:true);
            Field(x => x.Name, nullable:true);

            Field(x => x.ParentId, nullable:true);
            Field(x => x.Section, nullable:true);
            Field(x => x.Path, nullable:true);
            Field(x => x.Breadcrumb, nullable:true);
            Field(x => x.Alias, nullable:true);
            Field(x => x.Description, nullable:true);
            //Field<StringGraphType>("modules", resolve: context => context.Source.Modules);
        }
    }
}