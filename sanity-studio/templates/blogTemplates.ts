// Simple helpers to build Portable Text blocks
const h1 = (text: string) => ({ _type: 'block', style: 'h1', children: [{ _type: 'span', text, marks: [] }], markDefs: [] })
const h2 = (text: string) => ({ _type: 'block', style: 'h2', children: [{ _type: 'span', text, marks: [] }], markDefs: [] })
const h3 = (text: string) => ({ _type: 'block', style: 'h3', children: [{ _type: 'span', text, marks: [] }], markDefs: [] })
const p = (text: string) => ({ _type: 'block', style: 'normal', children: [{ _type: 'span', text, marks: [] }], markDefs: [] })

function linkBlock(segments: Array<{ text: string; href?: string }>) {
  const markDefs: any[] = []
  const children: any[] = []
  let i = 0
  segments.forEach(seg => {
    if (seg.href) {
      const key = `l${i++}`
      markDefs.push({ _key: key, _type: 'link', href: seg.href })
      children.push({ _type: 'span', text: seg.text, marks: [key] })
    } else {
      children.push({ _type: 'span', text: seg.text, marks: [] })
    }
  })
  return { _type: 'block', style: 'normal', children, markDefs }
}

export function seoGuideTemplateValue() {
  const title = 'Titlu articol (înlocuiește)'
  const content = [
    h1(title),
    linkBlock([
      { text: 'Introducere scurtă. Leagă către ' },
      { text: 'electricieni', href: 'https://www.meseriaslocal.ro/servicii/instalatii-utilitati/instalatii-electrice' },
      { text: ', ' },
      { text: 'instalatori', href: 'https://www.meseriaslocal.ro/servicii/instalatii-utilitati/instalatii-sanitare' },
      { text: ' și ' },
      { text: 'zugravi', href: 'https://www.meseriaslocal.ro/servicii/amenajari-interioare/zugraveli-vopsitorii' },
      { text: '.' }
    ]),
    h2('Piața și tendințe (H2)'),
    p('Context pe scurt.'),
    h2('Prețuri și factori (H2)'),
    p('Prețuri orientative + factori.'),
    h2('Electricieni (H2)'),
    p('Cerințe, verificări, tarife, linkuri interne.'),
    h2('Instalatori (H2)'),
    p('Autorizări, tipuri, tarife, linkuri interne.'),
    h2('Zugravi (H2)'),
    p('Servicii, pachete, tarife, linkuri interne.'),
    h2('Diferențe regionale (H2)'),
    p('București vs. alte orașe.'),
    h2('Cum alegi corect (H2)'),
    p('Checklist în 5 pași.'),
    h2('FAQ (H2)'),
    h3('Întrebare 1'), p('Răspuns scurt.'),
    h3('Întrebare 2'), p('Răspuns scurt.'),
    h2('Concluzie (H2)'),
    p('CTA + linkuri interne relevante.')
  ]

  return {
    title,
    excerpt: 'Rezumat scurt (50–300 caractere).',
    content,
    tags: ['ghid', 'meseriasi', 'preturi', 'sfaturi'],
    readingTime: 12,
    isFeatured: false,
    // ASCII-only meta placeholders (editorii le ajustează)
    metaTitle: 'Ghid meseriasi Romania 2025 | Meserias Local',
    metaDescription: 'Ghid complet pentru găsirea meseriasilor potriviți in Romania. Preturi, verificari, sfaturi si linkuri utile.'
  }
}


