import gql from 'graphql-tag';

export const AddSectionMutation = gql`
    mutation ($section: SectionInput!) {
        addSection(section: $section) {
            id
        }
    }
`;

export const AddSectionItemMutation = gql`
    mutation ($sectionitem: SectionItemInput!) {
        addSectionItem(sectionItem: $sectionItem){
            id
        }
    }
`;