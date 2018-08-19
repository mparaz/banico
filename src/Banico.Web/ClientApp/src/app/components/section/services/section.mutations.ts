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
    mutation ($sectionitem: SectionItemInputType!) {
        addSectionItem(sectionItem: $sectionItem){
            id
        }
    }
`;