export default {
    name: 'galleryItem',
    title: 'Gallery Item',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'height',
            title: 'Layout Height',
            type: 'number',
            description: 'Enter a height for the masonry layout (e.g., 300, 400, 500 or 600)',
            initialValue: 400
        },
        {
            name: 'alt',
            title: 'Alternative Text (SEO)',
            type: 'string',
            description: 'Important for SEO and accessiblity. Summarize what is in the image.',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                layout: 'tags'
            },
            description: 'Tags for SEO and categorization. e.g. "Robin Francis", "Awards", "Speaking"'
        }
    ],
}
