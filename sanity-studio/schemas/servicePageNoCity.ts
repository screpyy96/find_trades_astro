import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicePageNoCity',
  title: 'Pagini Servicii (fără oraș)',
  type: 'document',
  icon: () => '🛠️',
  fields: [
    defineField({
      name: 'title',
      title: 'Titlu pagină',
      type: 'string',
      description: 'Ex: Zugrav Profesional - Meseriași Verificați',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'tradeSlug',
      title: 'Meserie (Slug)',
      type: 'string',
      description: 'Slug-ul meseriei',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '🔧 Instalator (urgente)', value: 'instalator-urgente' },
          { title: '⚡ Electrician urgente', value: 'electrician-urgente' },
          { title: '🎨 Zugrav', value: 'zugraveli-vopsitorii' },
          { title: '🏠 Constructii case', value: 'constructii-case' },
          { title: '💧 Instalatii sanitare', value: 'instalatii-sanitare' },
          { title: '⚡ Instalatii electrice', value: 'instalatii-electrice' },
          { title: '🔥 Instalatii termice', value: 'instalatii-termice' },
          { title: '🪟 Montaj termopan', value: 'montaj-termopan' },
          { title: '🪵 Montaj parchet', value: 'montaj-reconditionare-parchet' },
          { title: '🧱 Montaj gresie/faianta', value: 'montaj-gresie-faianta-piatra' },
          { title: '🏗️ Montaj rigips', value: 'montaj-rigips-compartimentari' },
          { title: '❄️ Montaj aer conditionat', value: 'montaj-ac-ventilatie' },
          { title: '🔨 Zidarie si tencuiala', value: 'zidarie-tencuiala' },
          { title: '🪜 Montaj acoperisuri', value: 'montaj-acoperisuri-pluviale' },
          { title: '🚪 Montaj usi interior', value: 'montaj-usi-interior' },
          { title: '🪑 Montaj mobilier', value: 'montaj-mobilier' },
          { title: '🧹 Curatenie generala', value: 'curatenie-generala' },
          { title: '🔐 Lacatus deblocari', value: 'lacatus-deblocari-usi' },
          { title: '🌳 Amenajare gradina', value: 'amenajari-gradina' },
          { title: '📹 Camere supraveghere', value: 'instalare-camere-supraveghere' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'categorySlug',
      title: 'Categorie (Slug)',
      type: 'string',
      description: 'Categoria din care face parte serviciul',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '🏗️ Construcții și Structuri', value: 'constructii-structuri' },
          { title: '💧 Instalații Utilitare', value: 'instalatii-utilitare' },
          { title: '🎨 Finisaje și Decorațiuni', value: 'finisaje-decoratiuni' },
          { title: '⚡ Instalații Electrice', value: 'instalatii-electrice' },
          { title: '🏠 Amenajări Interioare', value: 'amenajari-interioare' },
          { title: '🌳 Amenajări Exterioare', value: 'amenajari-exterioare-gradina' },
          { title: '🧹 Curățenie', value: 'curatenie-mentenanta' },
          { title: '🚚 Transport', value: 'transport-mutari' },
          { title: '🔧 Reparații', value: 'reparatii-service' },
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
        source: 'tradeSlug',
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
      tradeSlug: 'tradeSlug',
      categorySlug: 'categorySlug',
    },
    prepare({ title, tradeSlug, categorySlug }) {
      return {
        title: title || tradeSlug,
        subtitle: `${categorySlug} / ${tradeSlug}`,
        media: () => '🛠️',
      }
    },
  },
})
