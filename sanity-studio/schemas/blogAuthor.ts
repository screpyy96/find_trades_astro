export default {
  name: 'blogAuthor',
  title: 'Blog Author',
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
      name: 'bio',
      title: 'Biografie',
      type: 'text',
      rows: 3
    },
    {
      name: 'avatar',
      title: 'Avatar',
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
      name: 'socialLinks',
      title: 'Link-uri Sociale',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'website',
          title: 'Website Personal',
          type: 'url'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar'
    }
  }
} 