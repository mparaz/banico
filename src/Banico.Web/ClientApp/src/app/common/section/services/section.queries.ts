import gql from 'graphql-tag';

export const SectionsQuery = gql`
    query sectionsQuery(
        $id: String!,
        $module: String!,
        $name: String!
    ) {
        sections(
            id: $id,
            module: $module,
            name: $name
        ) {
            id,
            createdBy,
            createdDate,
            lastUpdate,
            name
        }
    }
`;

export const SectionItemsQuery = gql`
    query sectionItemsQuery(
        $id: String!,
        $section: String!,
        $pathUrl: String!,
        $alias: String!,
        $name: String!,
        $parentId: String!,
        $isRoot: Boolean!
    ) {
        sectionItems(
            id: $id,
            section: $section,
            pathUrl: $pathUrl,
            alias: $alias,
            name: $name,
            parentId: $parentId,
            isRoot: $isRoot
        ) {
            id,
            createdBy,
            createdDate,
            lastUpdate,
            name,
            parentId,
            section,
            pathUrl,
            pathName,
            alias,
            description
        }
    }
`;