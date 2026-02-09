import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicePage',
  title: 'Pagini Servicii (SEO)',
  type: 'document',
  icon: () => '🔧',
  fields: [
    // DOAR 3 CÂMPURI ESENȚIALE
    defineField({
      name: 'title',
      title: 'Titlu pagină',
      type: 'string',
      description: 'Ex: Electrician București - Ghid complet 2026',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'tradeSlug',
      title: 'Meserie (Slug)',
      type: 'string',
      description: 'Selectează slug-ul meseriei din listă',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          // TOP 30 Cele mai populare meserii în România (cu slug-uri)
          { title: '🔧 Instalator (urgente)', value: 'instalator-urgente' },
          { title: '⚡ Electrician urgente', value: 'electrician-urgente' },
          { title: '🎨 Zugrav', value: 'zugraveli-vopsitorii' },
          { title: '🏠 Constructii case la rosu/la cheie', value: 'constructii-case' },
          { title: '💧 Instalatii sanitare', value: 'instalatii-sanitare' },
          { title: '⚡ Instalatii electrice', value: 'instalatii-electrice' },
          { title: '🔥 Instalatii termice si de incalzire', value: 'instalatii-termice' },
          { title: '🪟 Montaj ferestre si usi termopan', value: 'montaj-termopan' },
          { title: '🪵 Montaj si reconditionare parchet', value: 'montaj-reconditionare-parchet' },
          { title: '🧱 Montaj gresie, faianta, piatra naturala', value: 'montaj-gresie-faianta-piatra' },
          { title: '🏗️ Montaj gips-carton (rigips)', value: 'montaj-rigips-compartimentari' },
          { title: '❄️ Montaj aer conditionat', value: 'montaj-ac-ventilatie' },
          { title: '🔨 Zidarie si tencuiala', value: 'zidarie-tencuiala' },
          { title: '🪜 Montaj acoperisuri', value: 'montaj-acoperisuri-pluviale' },
          { title: '🚪 Montaj usi de interior', value: 'montaj-usi-interior' },
          { title: '🪑 Montaj si asamblare mobilier', value: 'montaj-mobilier' },
          { title: '🧹 Curatenie generala', value: 'curatenie-generala' },
          { title: '🔐 Lacatus / deblocari usi', value: 'lacatus-deblocari-usi' },
          { title: '🌳 Amenajare peisagistica', value: 'amenajari-gradina' },
          { title: '📹 Instalare camere supraveghere', value: 'instalare-camere-supraveghere' },
          { title: '🔥 Instalatii de gaz', value: 'instalatii-gaz' },
          { title: '🏗️ Constructii anexe si garaje', value: 'constructii-anexe-garaje' },
          { title: '🚿 Reparatii centrale termice', value: 'reparatii-centrale-termice' },
          { title: '🎨 Design interior si decor', value: 'design-interior-decor' },
          { title: '🪟 Tamplarie PVC/aluminiu', value: 'tamplarie-pvc-aluminiu-lemn' },
          { title: '🌞 Panouri solare/fotovoltaice', value: 'instalare-panouri-solare-fotovoltaice' },
          { title: '🏊 Constructie piscine', value: 'constructie-piscine' },
          { title: '🚪 Porti automate', value: 'porti-automate' },
          { title: '🧱 Gletuire si finisare pereti', value: 'gletuire-finisare-pereti' },
          { title: '🏗️ Realizare fundatii', value: 'realizare-fundatii' },
          { title: '✅ Verificari si revizii tehnice (VTP)', value: 'verificari-revizii-tehnice' },
          { title: '🪵 Montaj parchet laminat si vinil', value: 'montaj-parchet-laminat' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'citySlug',
      title: 'Oraș (Slug) - OPȚIONAL pentru pagini generale',
      type: 'string',
      description: 'Lasă gol pentru pagini generale de serviciu (fără oraș specific). Completează pentru pagini specifice unui oraș.',
      options: {
        list: [
          { title: 'București', value: 'bucuresti' },
          { title: 'Cluj-Napoca', value: 'cluj-napoca' },
          { title: 'Timișoara', value: 'timisoara' },
          { title: 'Iași', value: 'iasi' },
          { title: 'Constanța', value: 'constanta' },
          { title: 'Craiova', value: 'craiova' },
          { title: 'Brașov', value: 'brasov' },
          { title: 'Galați', value: 'galati' },
          { title: 'Ploiești', value: 'ploiesti' },
          { title: 'Oradea', value: 'oradea' },
          { title: 'Arad', value: 'arad' },
          { title: 'Pitești', value: 'pitesti' },
          { title: 'Sibiu', value: 'sibiu' },
          { title: 'Bacău', value: 'bacau' },
          { title: 'Târgu Mureș', value: 'targu-mures' },
          { title: 'Baia Mare', value: 'baia-mare' },
          { title: 'Buzău', value: 'buzau' },
          { title: 'Botoșani', value: 'botosani' },
          { title: 'Satu Mare', value: 'satu-mare' },
          { title: 'Râmnicu Vâlcea', value: 'ramnicu-valcea' },
          { title: 'Suceava', value: 'suceava' },
          { title: 'Piatra Neamț', value: 'piatra-neamt' },
        ],
        layout: 'dropdown',
      },
    }),
    // SLUGS - pentru compatibilitate și routing
    defineField({
      name: 'slug',
      title: 'Slug (generat automat)',
      type: 'slug',
      description: 'URL-ul paginii (se generează automat)',
      options: {
        source: (doc: any) => `${doc.tradeName || ''} ${doc.cityName || ''}`,
        maxLength: 200,
      },
    }),
    defineField({
      name: 'categoryName',
      title: 'Categorie',
      type: 'string',
      description: 'Numele categoriei (ex: Instalații sanitare)',
      hidden: true,
    }),
    defineField({
      name: 'categorySlug',
      title: 'Category Slug',
      type: 'string',
      description: 'Slug-ul categoriei',
      hidden: true,
    }),
    // PUBLISHING
    defineField({
      name: 'isPublished',
      title: 'Publicat',
      type: 'boolean',
      description: 'Pagina este vizibilă pe site',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publicării',
      type: 'datetime',
      description: 'Când a fost publicată pagina',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Ultima actualizare',
      type: 'datetime',
      description: 'Când a fost actualizată ultima dată',
    }),
    defineField({
      name: 'priority',
      title: 'Prioritate SEO',
      type: 'number',
      description: 'Prioritate pentru sitemap (0.0 - 1.0)',
      validation: (Rule) => Rule.min(0).max(1),
      initialValue: 0.8,
    }),
    // HERO SECTION - Câmpuri pentru hero dinamic
    defineField({
      name: 'heroTitle',
      title: 'H1 — Titlu Principal (Hero)',
      type: 'string',
      description: 'Acesta este H1-ul paginii. Un singur H1 per pagină! Include meseria + orașul + diferențiator. Ex: "Electrician autorizat ANRE în București — Servicii electrice complete"',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero - Subtitlu',
      type: 'string',
      description: 'Subtitlu sub H1. Include variație de keyword. Ex: "Conectăm Clienții cu Profesioniști Autorizați ANRE"',
      validation: (Rule: any) => Rule.max(100),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero - Descriere',
      type: 'text',
      rows: 3,
      description: 'Descriere scurtă (2-3 propoziții) cu intenție de căutare. Include: ce oferim, cât durează, zonă acoperită.',
      validation: (Rule: any) => Rule.max(300),
    }),
    // SEO FIELDS
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (pentru Google)',
      type: 'string',
      description: 'Titlul din tab-ul browserului și rezultatele Google. Max 60 chars vizibili. Ex: "Instalații electrice București – Electricieni autorizați ANRE | Meserias Local"',
      validation: (Rule: any) => Rule.required().max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (pentru Google)',
      type: 'text',
      rows: 3,
      description: 'Descrierea din rezultatele Google. 155-160 chars. Include: ce oferim, beneficiu principal, CTA. Ex: "Ai nevoie de un electrician autorizat ANRE în București? Primești în 2–4 ore oferte gratuite de la electricieni verificați în sectoarele 1–6."',
      validation: (Rule: any) => Rule.required().min(120).max(165),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (legacy)',
      type: 'text',
      rows: 2,
      description: 'Descriere pentru motoarele de căutare (150-160 caractere)',
      validation: (Rule: any) => Rule.max(160),
      hidden: true,
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Cuvinte cheie pentru SEO (ex: electrician bucuresti, pret electrician)',
      options: {
        layout: 'tags',
      },
    }),
    // OPȚIONAL: Imagine
    defineField({
      name: 'featuredImage',
      title: 'Imagine (opțional)',
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
    // CONȚINUT PRINCIPAL
    // Structură recomandată:
    //   H2: Servicii [meserie] în [oraș] — Ce oferim
    //   H3: Tipuri de lucrări acoperite (+ listă)
    //   H2: [Meserie] în toate zonele/sectoarele [orașului]
    //   H3: Sector/Zonă 1, H3: Sector/Zonă 2, etc.
    //   H2: De ce să alegi un [meseriaș] prin Meserias Local? (+ listă beneficii)
    //   H2: Cum funcționează — 3 pași simpli
    //   H2: [Topic specific: smart home / urgențe / etc.]
    // Keywords naturale: [meserie] [oraș], autorizat, urgențe, prețuri, sectoare/zone
    defineField({
      name: 'content',
      title: 'Conținut SEO',
      type: 'array',
      description: 'Conținut structurat cu H2/H3. NU pune H1 aici (vine din heroTitle). Folosește H2 pentru secțiuni principale, H3 pentru subsecțiuni. Include cuvinte cheie natural.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2 — Secțiune principală', value: 'h2' },
            { title: 'H3 — Subsecțiune', value: 'h3' },
            { title: 'H4 — Detaliu', value: 'h4' },
          ],
          lists: [
            { title: 'Lista (bullet)', value: 'bullet' },
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
                    description: 'Folosește linkuri relative pentru pagini interne (ex: /servicii/instalatii-utilitati/instalatii-sanitare/bucuresti/)',
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
    // FAQ — generează FAQPage schema markup automat
    defineField({
      name: 'faqSection',
      title: 'FAQ — Întrebări frecvente',
      type: 'array',
      description: 'Minim 5 întrebări. Generează automat FAQPage schema (JSON-LD) pentru Google rich results. Include keywords în întrebări: "Cât costă [meserie] în [oraș]?", "Ce înseamnă [certificare]?", etc.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Întrebare', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'answer', title: 'Răspuns', type: 'text', rows: 3, validation: (Rule: any) => Rule.required().min(50) },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
    // PREȚURI — afișate pe pagină + bune pentru SEO
    defineField({
      name: 'priceRanges',
      title: 'Prețuri orientative',
      type: 'array',
      description: 'Prețuri orientative pentru servicii. Ajută la conversie și la SEO (Google afișează prețuri în snippets). Minim 4-5 servicii.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'service', title: 'Serviciu', type: 'string', description: 'Ex: Montaj tablou electric', validation: (Rule: any) => Rule.required() },
            { name: 'minPrice', title: 'De la (RON)', type: 'number', validation: (Rule: any) => Rule.required().min(0) },
            { name: 'maxPrice', title: 'Până la (RON)', type: 'number', validation: (Rule: any) => Rule.required().min(0) },
            { name: 'unit', title: 'Unitate (opțional)', type: 'string', description: 'Ex: per punct, per mp, per cameră', options: { list: ['per bucată', 'per mp', 'per ml', 'per cameră', 'per punct', 'per proiect', 'per oră'] } },
          ],
          preview: {
            select: { title: 'service', minPrice: 'minPrice', maxPrice: 'maxPrice', unit: 'unit' },
            prepare({ title, minPrice, maxPrice, unit }: any) {
              return {
                title: title,
                subtitle: `${minPrice}–${maxPrice} RON${unit ? ` ${unit}` : ''}`,
              };
            },
          },
        },
      ],
    }),
    // PREȚURI AVANSATE (pentru compatibilitate cu schema veche)
    defineField({
      name: 'priceGuide',
      title: 'Ghid Prețuri (vechi)',
      type: 'object',
      hidden: true,
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Activat' },
        {
          name: 'priceRanges',
          type: 'array',
          title: 'Prețuri',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'service', type: 'string', title: 'Serviciu' },
                { name: 'minPrice', type: 'number', title: 'Preț minim' },
                { name: 'maxPrice', type: 'number', title: 'Preț maxim' },
                { name: 'unit', type: 'string', title: 'Unitate' },
              ],
            },
          ],
        },
      ],
    }),
    // SFATURI LOCALE — conținut unic per oraș
    defineField({
      name: 'localTips',
      title: 'Sfaturi locale',
      type: 'array',
      description: 'Informații specifice orașului: autorizații necesare, sectoare/zone acoperite, urgențe, reglementări locale. Conținut unic = SEO mai bun.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Titlu', description: 'Ex: Autorizații necesare în București', validation: (Rule: any) => Rule.required() },
            { name: 'description', type: 'text', title: 'Descriere', rows: 4, description: 'Detalii utile. Include zone/cartiere specifice.', validation: (Rule: any) => Rule.required().min(50) },
          ],
          preview: {
            select: { title: 'title', description: 'description' },
            prepare({ title, description }) {
              return {
                title: title,
                subtitle: description?.substring(0, 60) + '...',
              };
            },
          },
        },
      ],
    }),
    // SERVICII CONEXE — linking intern
    defineField({
      name: 'relatedServices',
      title: 'Servicii conexe (linking intern)',
      type: 'array',
      description: 'Linkuri către alte servicii în același oraș. Important pentru SEO (internal linking). Ex: Instalații sanitare, Instalații termice, Montaj AC.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'serviceName', type: 'string', title: 'Nume serviciu afișat', description: 'Ex: Instalații sanitare București', validation: (Rule: any) => Rule.required() },
            { name: 'serviceSlug', type: 'string', title: 'Slug complet (categorie/serviciu)', description: 'Ex: instalatii-utilitati/instalatii-sanitare — orașul se adaugă automat', validation: (Rule: any) => Rule.required() },
          ],
          preview: {
            select: { title: 'serviceName', slug: 'serviceSlug' },
            prepare({ title, slug }) {
              return {
                title: title,
                subtitle: `/servicii/${slug}/[oras]/`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tradeSlug: 'tradeSlug',
      citySlug: 'citySlug',
    },
    prepare({ title, tradeSlug, citySlug }) {
      return {
        title: title || `${tradeSlug} ${citySlug}`,
        subtitle: `${tradeSlug} • ${citySlug}`,
        media: () => '🔧',
      }
    },
  },
})
