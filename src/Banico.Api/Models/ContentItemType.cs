using GraphQL.Types;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class ContentItemType : ObjectGraphType<ContentItem>
    {
        public ContentItemType(IContentItemRepository contentItemRepository)
        {
            Field(x => x.Tenant, nullable:true);
            Field(x => x.Id, nullable:true);
            Field(x => x.Name, nullable:true);
            Field(x => x.CreatedBy, nullable:true);
            Field(x => x.CreatedDate, nullable:true);
            Field(x => x.LastUpdate, nullable:true);
            Field(x => x.ParentId, nullable:true);

            Field(x => x.Alias, nullable:true);
            Field(x => x.Module, nullable:true);
            Field(x => x.SectionItems, nullable:true);
            Field(x => x.Content, nullable:true);
            Field(x => x.HtmlContent, nullable:true);
            Field(x => x.Snippet, nullable:true);
            Field(x => x.Attribute01, nullable:true);
            Field(x => x.Attribute02, nullable:true);
            Field(x => x.Attribute03, nullable:true);
            Field(x => x.Attribute04, nullable:true);
            Field(x => x.Attribute05, nullable:true);
            Field(x => x.Attribute06, nullable:true);
            Field(x => x.Attribute07, nullable:true);
            Field(x => x.Attribute08, nullable:true);
            Field(x => x.Attribute09, nullable:true);
            Field(x => x.Attribute10, nullable:true);
            Field(x => x.Attribute11, nullable:true);
            Field(x => x.Attribute12, nullable:true);
            Field(x => x.Attribute13, nullable:true);
            Field(x => x.Attribute14, nullable:true);
            Field(x => x.Attribute15, nullable:true);
            Field(x => x.Attribute16, nullable:true);
            Field(x => x.Attribute17, nullable:true);
            Field(x => x.Attribute18, nullable:true);
            Field(x => x.Attribute19, nullable:true);
            Field(x => x.Attribute20, nullable:true);
        }
    }
}