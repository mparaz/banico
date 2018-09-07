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

            Field<IntGraphType>("parentId");
            Field<StringGraphType>("module");
        }
    }
}