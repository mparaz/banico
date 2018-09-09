using GraphQL.Types;

namespace Banico.Api.Models
{
    public class ContentItemInputType : InputObjectGraphType
    {
        public ContentItemInputType()
        {
            Name = "ContentItemInput";

            Field<IntGraphType>("id");

            Field<StringGraphType>("createdBy");
            Field<DateGraphType>("createdDate");
            Field<DateGraphType>("lastUpdate");
            
            Field<StringGraphType>("tenant");
            Field<StringGraphType>("name");

            Field<StringGraphType>("alias");
            Field<StringGraphType>("module");
            Field<IntGraphType>("parentId");
            Field<StringGraphType>("sectionItems");
            Field<StringGraphType>("content");
            Field<StringGraphType>("attribute01");
            Field<StringGraphType>("attribute02");
            Field<StringGraphType>("attribute03");
            Field<StringGraphType>("attribute04");
            Field<StringGraphType>("attribute05");
            Field<StringGraphType>("attribute06");
            Field<StringGraphType>("attribute07");
            Field<StringGraphType>("attribute08");
            Field<StringGraphType>("attribute09");
            Field<StringGraphType>("attribute10");
            Field<StringGraphType>("attribute11");
            Field<StringGraphType>("attribute12");
            Field<StringGraphType>("attribute13");
            Field<StringGraphType>("attribute14");
            Field<StringGraphType>("attribute15");
            Field<StringGraphType>("attribute16");
            Field<StringGraphType>("attribute17");
            Field<StringGraphType>("attribute18");
            Field<StringGraphType>("attribute19");
            Field<StringGraphType>("attribute20");
        }
    }
}