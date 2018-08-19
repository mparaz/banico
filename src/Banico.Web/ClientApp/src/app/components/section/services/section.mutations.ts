import gql from 'graphql-tag';

export const AddSectionMutation = gql`
    mutation (
        $name: String!,
        $modules: String!
    ) {
        addSection(
            section: {
                name: $name,
                modules: $modules
            }
        ) {
            id
        }
    }
`;

export const AddSectionItemMutation = gql`
    mutation (
        $section: String!,
        $parentId: Int!,
        $path: String!,
        $breadcrumb: String!,
        $name: String!
        $alias: String!
    ) {
        addSectionItem(
            sectionItem: {
                section: $section,
                parentId: $parentId,
                path: $path,
                breadcrumb: $breadcrumb,
                name: $name,
                alias: $alias
            }
        ){
            id
        }
    }
`;