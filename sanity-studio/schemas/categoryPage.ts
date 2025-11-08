import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'categoryPage',
  title: 'Pagini Categorii Servicii',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'title',
      title: 'Titlu pagină',
      type: 'string',
      description: 'Ex: Amenajări Interioare - Servicii Profesionale',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'categorySlug',
      title: 'Categorie (Slug)',
      type: 'string',
      description: 'Slug-ul categoriei',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '🏗️ Construcții și Structuri', value: 'constructii-structuri' },
          { title: '💧 Instalații Utilitare', value: 'instalatii-utilitare' },
          { title: '🎨 Finisaje și Decorațiuni', value: 'finisaje-decoratiuni' },
          { title: '⚡ Instalații Electrice', value: 'instalatii-electrice' },
          { title: '🏠 Amenajări Interioare', value: 'amenajari-interioare' },
          { title: '🌳 Amenajări Exterioare și Grădină', value: 'amenajari-exterioare-gradina' },
          { title: '🧹 Curățenie și Mentenanță', value: 'curatenie-mentenanta' },
          { title: '🚚 Transport și Mutări', value: 'transport-mutari' },
          { title: '🔧 Reparații și Service', value: 'reparatii-service' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug (generat automat)',
      type: 'slug',
      description: 'URL-ul paginii',
      options: {
        source: 'categorySlug',
        maxLength: 200,
      },
    }),
    defineField({
      name: 'isPublished',
      title: 'Publicat',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publicării',
      type: 'datetime',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero - Titlu',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero - Descriere',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'content',
      title: 'Conținut',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [
            { title: 'Lista', value: 'bullet' },
            { title: 'Numerotată', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({
                      allowRelative: true,
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  }
                ]
              }
            ]
          },
        },
      ],
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Întrebare', type: 'string' },
            { name: 'answer', title: 'Răspuns', type: 'text', rows: 2 },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      categorySlug: 'categorySlug',
    },
    prepare({ title, categorySlug }) {
      return {
        title: title || categorySlug,
        subtitle: `Categorie: ${categorySlug}`,
        media: () => '📁',
      }
    },
  },
})
