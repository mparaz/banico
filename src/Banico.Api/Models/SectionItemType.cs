using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class SectionItemType : ObjectGraphType<SectionItem>
    {
        public SectionItemType(ISectionItemRepository sectionItemRepository)
        {
            Field(x => x.Id);

            Field(x => x.CreatedBy);
            Field(x => x.CreatedDate);
            Field(x => x.LastUpdate);

            Field(x => x.Tenant);
            Field(x => x.Name);

            Field(x => x.ParentId);
            Field(x => x.Section);
            Field(x => x.Path);
            Field(x => x.Breadcrumb);
            Field(x => x.Alias);
            Field(x => x.Description);
            //Field<StringGraphType>("modules", resolve: context => context.Source.Modules);
        }
    }
}