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
        $parentId: String!,
        $pathUrl: String!,
        $pathName: String!,
        $name: String!
        $alias: String!
    ) {
        addSectionItem(
            sectionItem: {
                section: $section,
                parentId: $parentId,
                pathUrl: $pathUrl,
                pathName: $pathName,
                name: $name,
                alias: $alias
            }
        ){
            id
        }
    }
`;