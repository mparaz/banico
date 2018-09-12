using GraphQL.Types;

namespace Banico.Api.Models
{
    public class SectionInputType : InputObjectGraphType
    {
        public SectionInputType()
        {
            Name = "SectionInput";

            Field<StringGraphType>("tenant");
            Field<StringGraphType>("id");
            Field<StringGraphType>("name");
            Field<StringGraphType>("createdBy");
            Field<DateGraphType>("createdDate");
            Field<DateGraphType>("lastUpdate");
            
            Field<StringGraphType>("modules");
        }
    }
}