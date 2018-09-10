import gql from 'graphql-tag';

export const AddContentItemMutation = gql`
    mutation (
        $name: String,
        $alias: String,
        $module: String,
        $parentId: Int,
        $sectionItems: String,
        $content: String,
        $attribute01: String,
        $attribute02: String,
        $attribute03: String,
        $attribute04: String,
        $attribute05: String,
        $attribute06: String,
        $attribute07: String,
        $attribute08: String,
        $attribute09: String,
        $attribute10: String,
        $attribute11: String,
        $attribute12: String,
        $attribute13: String,
        $attribute14: String,
        $attribute15: String,
        $attribute16: String,
        $attribute17: String,
        $attribute18: String,
        $attribute19: String,
        $attribute20: String
    ) {
        addContentItem(
            contentItem: {
                name: $name,
                alias: $alias,
                module: $module,
                parentId: $parentId,
                sectionItems: $sectionItems,
                content: $content,
                attribute01: $attribute01,
                attribute02: $attribute02,
                attribute03: $attribute03,
                attribute04: $attribute04,
                attribute05: $attribute05,
                attribute06: $attribute06,
                attribute07: $attribute07,
                attribute08: $attribute08,
                attribute09: $attribute09,
                attribute10: $attribute10,
                attribute11: $attribute11,
                attribute12: $attribute12,
                attribute13: $attribute13,
                attribute14: $attribute14,
                attribute15: $attribute15,
                attribute16: $attribute16,
                attribute17: $attribute17,
                attribute18: $attribute18,
                attribute19: $attribute19,
                attribute20: $attribute20
                }
        ){
            id
        }
    }
`;