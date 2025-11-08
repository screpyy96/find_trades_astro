export default {
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nume',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Descriere',
      type: 'text',
      rows: 3
    },
    {
      name: 'featuredImage',
      title: 'Imagine Principală',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string'
    },
    {
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'featuredImage'
    }
  }
} 