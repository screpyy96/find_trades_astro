function hasDiacritics(text: string | undefined): boolean {
  if (!text) return false;
  // Matches common Romanian diacritics
  return /[ăâîșşțţĂÂÎȘŞȚŢ]/.test(text);
}

export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fieldsets: [
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: false } },
    { name: 'meta', title: 'Meta & Stats', options: { collapsible: true, collapsed: true } }
  ],
  fields: [
    {
      name: 'title',
      title: 'Titlu',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(10).max(100).warning()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Extras',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().min(50).max(300)
    },
    {
      name: 'content',
      title: 'Conținut',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule: any) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true
                  }
                ]
              }
            ]
          },
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ]
        },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule: any) => Rule.required().warning()
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            withFilename: true
          }
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
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
          type: 'string',
          validation: (Rule: any) => Rule.required().warning()
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{type: 'blogAuthor'}],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'reference',
      to: [{type: 'blogCategory'}],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tag-uri',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      validation: (Rule: any) => Rule.max(10)
    },
    {
      name: 'publishedAt',
      title: 'Data Publicării',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'updatedAt',
      title: 'Data Actualizării',
      type: 'datetime'
    },
    {
      name: 'readingTime',
      title: 'Timp de Citire (minute)',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(60)
    },
    {
      name: 'views',
      title: 'Vizualizări',
      type: 'number',
      initialValue: 0,
      validation: (Rule: any) => Rule.min(0)
    },
    {
      name: 'isFeatured',
      title: 'Articol Recomandat',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description: 'Titlu pentru SEO (dacă nu e specificat, se folosește titlul principal)',
      fieldset: 'seo',
      validation: (Rule: any) => Rule.max(60)
        .warning('Maxim 60 caractere')
        .custom((val: string) => {
          if (!val) return true;
          return hasDiacritics(val) ? 'Folosește doar caractere ASCII (fără diacritice) în meta title' : true;
        })
    },
    {
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      description: 'Descriere pentru SEO (dacă nu e specificată, se folosește extrasul)',
      fieldset: 'seo',
      validation: (Rule: any) => Rule.max(160)
        .warning('Maxim 160 caractere')
        .custom((val: string) => {
          if (!val) return true;
          return hasDiacritics(val) ? 'Folosește doar caractere ASCII (fără diacritice) în meta description' : true;
        })
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage'
    },
    prepare(selection: any) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
} 