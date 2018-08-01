using GraphQL.Types;

namespace Banico.Api.Models
{
    public class SectionItemInputType : InputObjectGraphType
    {
        public SectionItemInputType()
        {
            Name = "SectionItemInput";

            Field<StringGraphType>("id");

            Field<StringGraphType>("createdBy");
            Field<DateGraphType>("createdDate");
            Field<DateGraphType>("lastUpdate");

            Field<StringGraphType>("tenant");
            Field<StringGraphType>("name");
            
            Field<StringGraphType>("parentId");
            Field<StringGraphType>("section");
            Field<StringGraphType>("path");
            Field<StringGraphType>("breadcrumb");
            Field<StringGraphType>("alias");
            Field<StringGraphType>("description");
        }
    }
}