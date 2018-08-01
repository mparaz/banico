using GraphQL.Types;

namespace Banico.Api.Models
{
    public class SectionInputType : InputObjectGraphType
    {
        public SectionInputType()
        {
            Name = "SectionInput";

            Field<StringGraphType>("id");

            Field<StringGraphType>("createdBy");
            Field<DateGraphType>("createdDate");
            Field<DateGraphType>("lastUpdate");
            
            Field<StringGraphType>("tenant");
            Field<StringGraphType>("name");

            Field<StringGraphType>("modules");
        }
    }
}