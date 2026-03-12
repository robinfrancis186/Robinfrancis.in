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
        }
    ],
}
