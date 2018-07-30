using GraphQL;
using GraphQL.Types;

namespace Banico.Api.Models
{
    public class BanicoSchema : Schema
    {
        public BanicoSchema(IDependencyResolver resolver): base(resolver)
        {
            Query = resolver.Resolve<BanicoQuery>();
            Mutation = resolver.Resolve<BanicoMutation>();
        }
    }
}