using GraphQL.Types;
using Banico.Core.Repositories;

namespace Banico.Api.Models
{
    public class BanicoQuery : ObjectGraphType
    {
        public BanicoQuery(
            ISectionRepository sectionRepository,
            ISectionItemRepository sectionItemRepository)
        {
            Field<ListGraphType<SectionType>>(
                "sections",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> { 
                        Name = "id" 
                    },
                    new QueryArgument<StringGraphType> { 
                        Name = "module" 
                    },
                    new QueryArgument<StringGraphType> { 
                        Name = "name" 
                    }
                    ),
                resolve: context =>  sectionRepository.Get(
                    context.GetArgument<int>("id"),
                    context.GetArgument<string>("module"),
                    context.GetArgument<string>("name")
                    ));

            Field<ListGraphType<SectionItemType>>(
                "sectionItems",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> { 
                        Name = "id" 
                    },
                    new QueryArgument<StringGraphType> { 
                        Name = "section" 
                    },
                    new QueryArgument<StringGraphType> { 
                        Name = "path" 
                    },
                    new QueryArgument<StringGraphType> { 
                        Name = "alias" 
                    },
                    new QueryArgument<StringGraphType> { 
                        Name = "name" 
                    },
                    new QueryArgument<IntGraphType> { 
                        Name = "parentId" 
                    },
                    new QueryArgument<BooleanGraphType> { 
                        Name = "isRoot" 
                    }
                    ),
                resolve: context =>  sectionItemRepository.Get(
                    context.GetArgument<int>("id"),
                    context.GetArgument<string>("section"),
                    context.GetArgument<string>("path"),
                    context.GetArgument<string>("alias"),
                    context.GetArgument<string>("name"),
                    context.GetArgument<int>("parentId"),
                    context.GetArgument<bool>("isRoot")
                    )
                );
        }
    }
}
