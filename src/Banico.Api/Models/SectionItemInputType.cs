using GraphQL.Types;

namespace Banico.Api.Models
{
    public class SectionItemInputType : InputObjectGraphType
    {
        public SectionItemInputType()
        {
            Name = "SectionItemInput";

            Field<StringGraphType>("tenant");
            Field<StringGraphType>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("createdBy");
            Field<DateGraphType>("createdDate");
            Field<DateGraphType>("lastUpdate");
            Field<StringGraphType>("parentId");

            Field<StringGraphType>("section");
            Field<StringGraphType>("pathUrl");
            Field<StringGraphType>("pathName");
            Field<StringGraphType>("alias");
            Field<StringGraphType>("description");
        }
    }
}