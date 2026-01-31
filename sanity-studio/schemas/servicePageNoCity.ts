import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicePageNoCity',
  title: 'Pagini Servicii (Subcategorii)',
  type: 'document',
  icon: () => '🛠️',
  description: 'Pagini pentru servicii fără oraș specific (ex: /servicii/amenajari-interioare/zugraveli-vopsitorii/)',
  fields: [
    // IDENTIFICARE
    defineField({
      name: 'title',
      title: 'Titlu intern',
      type: 'string',
      description: 'Titlu pentru identificare în Sanity (nu apare pe site)',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'tradeSlug',
      title: 'Serviciu (Slug)',
      type: 'string',
      description: 'Slug-ul serviciului - trebuie să corespundă cu URL-ul',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          // Amenajări Interioare
          { title: 'Zugrăveli și Vopsitorii', value: 'zugraveli-vopsitorii' },
          { title: 'Montaj Parchet', value: 'montaj-reconditionare-parchet' },
          { title: 'Montaj Gresie/Faianță', value: 'montaj-gresie-faianta-piatra' },
          { title: 'Montaj Rigips', value: 'montaj-rigips-compartimentari' },
          { title: 'Montaj Uși Interior', value: 'montaj-usi-interior' },
          { title: 'Montaj Mobilier', value: 'montaj-mobilier' },
          { title: 'Design Interior', value: 'design-interior-decor' },
          { title: 'Gletuire Pereți', value: 'gletuire-finisare-pereti' },
          // Instalații
          { title: 'Instalații Sanitare', value: 'instalatii-sanitare' },
          { title: 'Instalații Electrice', value: 'instalatii-electrice' },
          { title: 'Instalații Termice', value: 'instalatii-termice' },
          { title: 'Instalații Gaz', value: 'instalatii-gaz' },
          { title: 'Montaj AC/Ventilație', value: 'montaj-ac-ventilatie' },
          { title: 'Panouri Solare', value: 'instalare-panouri-solare-fotovoltaice' },
          { title: 'Camere Supraveghere', value: 'instalare-camere-supraveghere' },
          // Construcții
          { title: 'Construcții Case', value: 'constructii-case' },
          { title: 'Zidărie și Tencuială', value: 'zidarie-tencuiala' },
          { title: 'Montaj Acoperișuri', value: 'montaj-acoperisuri-pluviale' },
          { title: 'Montaj Termopan', value: 'montaj-termopan' },
          { title: 'Realizare Fundații', value: 'realizare-fundatii' },
          { title: 'Construcții Anexe', value: 'constructii-anexe-garaje' },
          // Exterior
          { title: 'Amenajări Grădină', value: 'amenajari-gradina' },
          { title: 'Construcție Piscine', value: 'constructie-piscine' },
          { title: 'Porți Automate', value: 'porti-automate' },
          // Curățenie & Service
          { title: 'Curățenie Generală', value: 'curatenie-generala' },
          { title: 'Lăcătuș/Deblocări', value: 'lacatus-deblocari-usi' },
          { title: 'Reparații Centrale', value: 'reparatii-centrale-termice' },
          // Urgențe
          { title: 'Instalator Urgențe', value: 'instalator-urgente' },
          { title: 'Electrician Urgențe', value: 'electrician-urgente' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'categorySlug',
      title: 'Categorie (Slug)',
      type: 'string',
      description: 'Categoria părinte din URL',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Amenajări Interioare', value: 'amenajari-interioare' },
          { title: 'Construcții și Structuri', value: 'constructii-structuri' },
          { title: 'Instalații Utilitare', value: 'instalatii-utilitare' },
          { title: 'Finisaje și Decorațiuni', value: 'finisaje-decoratiuni' },
          { title: 'Instalații Electrice', value: 'instalatii-electrice' },
          { title: 'Amenajări Exterioare', value: 'amenajari-exterioare-gradina' },
          { title: 'Curățenie și Mentenanță', value: 'curatenie-mentenanta' },
          { title: 'Transport și Mutări', value: 'transport-mutari' },
          { title: 'Reparații și Service', value: 'reparatii-service' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug (generat automat)',
      type: 'slug',
      options: {
        source: 'tradeSlug',
        maxLength: 200,
      },
    }),
    
    // PUBLICARE
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
      name: 'updatedAt',
      title: 'Ultima actualizare',
      type: 'datetime',
    }),

    // SEO - FOARTE IMPORTANT
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (pentru Google)',
      type: 'string',
      description: 'Titlul din rezultatele Google. 50-60 caractere. Ex: "Zugravi Profesioniști – Prețuri 2026 | Meserias Local"',
      validation: (Rule) => Rule.required().min(30).max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (pentru Google)',
      type: 'text',
      rows: 2,
      description: 'Descrierea din rezultatele Google. 150-160 caractere.',
      validation: (Rule) => Rule.required().min(100).max(160),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Cuvinte cheie pentru SEO (ex: zugrav, zugraveli, pret zugrav)',
      options: { layout: 'tags' },
    }),

    // H1 - FOARTE IMPORTANT (diferit de SEO Title)
    defineField({
      name: 'h1',
      title: 'H1 (Titlu Principal pe Pagină)',
      type: 'string',
      description: 'Titlul H1 vizibil pe pagină. Diferit de SEO Title! Ex: "Zugravi Verificați în România – Oferte Gratuite în 24h"',
      validation: (Rule) => Rule.required().min(20).max(100),
    }),

    // HERO SECTION
    defineField({
      name: 'heroDescription',
      title: 'Hero - Descriere',
      type: 'text',
      rows: 3,
      description: 'Descriere scurtă sub H1 (2-3 propoziții)',
      validation: (Rule) => Rule.max(300),
    }),

    // PREȚURI - FOARTE IMPORTANT PENTRU SEO
    defineField({
      name: 'priceRanges',
      title: 'Prețuri Orientative',
      type: 'array',
      description: 'Adaugă prețuri pentru schema.org și afișare pe pagină',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'service', 
              title: 'Serviciu', 
              type: 'string',
              description: 'Ex: Zugrăvit cameră standard',
            },
            { 
              name: 'minPrice', 
              title: 'Preț minim (RON)', 
              type: 'number',
              description: 'Ex: 150',
            },
            { 
              name: 'maxPrice', 
              title: 'Preț maxim (RON)', 
              type: 'number',
              description: 'Ex: 300',
            },
            { 
              name: 'unit', 
              title: 'Unitate', 
              type: 'string',
              description: 'Ex: mp, cameră, proiect',
              initialValue: 'mp',
            },
          ],
          preview: {
            select: { title: 'service', minPrice: 'minPrice', maxPrice: 'maxPrice', unit: 'unit' },
            prepare({ title, minPrice, maxPrice, unit }) {
              return {
                title: title,
                subtitle: `${minPrice} - ${maxPrice} RON/${unit || 'mp'}`,
              };
            },
          },
        },
      ],
    }),

    // CONȚINUT PRINCIPAL
    defineField({
      name: 'content',
      title: 'Conținut SEO Principal',
      type: 'array',
      description: 'Conținut unic și util. Folosește H2 și H3 pentru structură.',
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
                    validation: (Rule: any) => Rule.uri({
                      allowRelative: true,
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Deschide în tab nou',
                    initialValue: false
                  }
                ]
              }
            ]
          },
        },
      ],
    }),

    // FAQ - FOARTE IMPORTANT PENTRU SEO
    defineField({
      name: 'faqSection',
      title: 'FAQ (Întrebări Frecvente)',
      type: 'array',
      description: 'Întrebări unice pentru acest serviciu. Apar în schema FAQPage.',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'question', 
              title: 'Întrebare', 
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { 
              name: 'answer', 
              title: 'Răspuns', 
              type: 'text', 
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),

    // SERVICII CONEXE (pentru internal linking)
    defineField({
      name: 'relatedServices',
      title: 'Servicii Conexe',
      type: 'array',
      description: 'Link-uri către servicii similare (pentru SEO juice)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'serviceName', type: 'string', title: 'Nume serviciu' },
            { name: 'serviceUrl', type: 'string', title: 'URL (ex: /servicii/amenajari-interioare/montaj-parchet/)' },
          ],
          preview: {
            select: { title: 'serviceName', url: 'serviceUrl' },
            prepare({ title, url }) {
              return { title, subtitle: url };
            },
          },
        },
      ],
    }),

    // PREȚ DISPLAY (pentru hero)
    defineField({
      name: 'priceRangeDisplay',
      title: 'Preț Afișat în Hero',
      type: 'string',
      description: 'Ex: "150-300 RON/mp" - apare în hero badge',
    }),

    // AGGREGATE RATING (pentru schema.org)
    defineField({
      name: 'aggregateRating',
      title: 'Rating pentru Schema.org',
      type: 'object',
      description: 'Afișează stele în Google SERP. ATENȚIE: folosește doar dacă ai reviews reale!',
      fields: [
        { 
          name: 'ratingValue', 
          type: 'number', 
          title: 'Rating (1-5)', 
          description: 'Ex: 4.8',
          validation: (Rule) => Rule.min(1).max(5),
        },
        { 
          name: 'ratingCount', 
          type: 'number', 
          title: 'Număr reviews', 
          description: 'Ex: 320',
          validation: (Rule) => Rule.min(1),
        },
      ],
    }),

    // CANONICAL CUSTOM
    defineField({
      name: 'customCanonical',
      title: 'Canonical URL (opțional)',
      type: 'url',
      description: 'Lasă gol pentru canonical automat. Completează doar pentru duplicate content.',
    }),

    // IMAGINE OG
    defineField({
      name: 'ogImage',
      title: 'Imagine OG (pentru social media)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Text alternativ',
        },
      ],
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      h1: 'h1',
      tradeSlug: 'tradeSlug',
      categorySlug: 'categorySlug',
      isPublished: 'isPublished',
    },
    prepare({ title, h1, tradeSlug, categorySlug, isPublished }) {
      return {
        title: h1 || title || tradeSlug,
        subtitle: `${isPublished ? '✅' : '⏸️'} /servicii/${categorySlug}/${tradeSlug}/`,
        media: () => '🛠️',
      }
    },
  },
  
  // Ordonare în studio
  orderings: [
    {
      title: 'Categorie',
      name: 'categoryAsc',
      by: [
        { field: 'categorySlug', direction: 'asc' },
        { field: 'tradeSlug', direction: 'asc' },
      ],
    },
    {
      title: 'Data publicării',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
