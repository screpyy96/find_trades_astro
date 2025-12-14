import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import crypto from 'node:crypto'

import {createClient} from '@sanity/client'

const projectId = '7094dn36'
const dataset = 'production'
const apiVersion = '2025-01-01'

function requiredEnv(name) {
  const v = process.env[name]
  if (!v) {
    throw new Error(`Missing env var ${name}. Create a Sanity API token and set ${name}.`)
  }
  return v
}

function key12() {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
}

function parseInlineMarkdownToChildren(text) {
  const markDefs = []
  const children = []

  const pushText = (t, marks = []) => {
    if (!t) return
    children.push({_type: 'span', _key: key12(), text: t, marks})
  }

  // Very small inline parser: handles links, inline code, strong, em.
  // Not a full markdown spec, but enough for these articles.
  const s = String(text || '')
  let i = 0

  while (i < s.length) {
    const rest = s.slice(i)

    // Link: [text](url)
    const linkMatch = rest.match(/^\[([^\]]+)\]\(([^)\s]+)\)/)
    if (linkMatch) {
      const linkText = linkMatch[1]
      const href = linkMatch[2]
      const k = key12()
      markDefs.push({_key: k, _type: 'link', href})
      pushText(linkText, [k])
      i += linkMatch[0].length
      continue
    }

    // Inline code: `code`
    const codeMatch = rest.match(/^`([^`]+)`/)
    if (codeMatch) {
      pushText(codeMatch[1], ['code'])
      i += codeMatch[0].length
      continue
    }

    // Strong: **text**
    const strongMatch = rest.match(/^\*\*([^*]+)\*\*/)
    if (strongMatch) {
      pushText(strongMatch[1], ['strong'])
      i += strongMatch[0].length
      continue
    }

    // Emphasis: *text*
    const emMatch = rest.match(/^\*([^*]+)\*/)
    if (emMatch) {
      pushText(emMatch[1], ['em'])
      i += emMatch[0].length
      continue
    }

    // Plain text until the next special token
    const nextSpecial = rest.search(/\[|`|\*\*/)
    if (nextSpecial === -1) {
      pushText(rest)
      break
    }
    if (nextSpecial > 0) {
      pushText(rest.slice(0, nextSpecial))
      i += nextSpecial
      continue
    }

    // Fallback: consume one char
    pushText(s[i])
    i += 1
  }

  return {children, markDefs}
}

function makeBlock({style = 'normal', text = '', listItem, level}) {
  const {children, markDefs} = parseInlineMarkdownToChildren(text)
  const block = {
    _type: 'block',
    _key: key12(),
    style,
    children: children.length ? children : [{_type: 'span', _key: key12(), text: '', marks: []}],
    markDefs,
  }
  if (listItem) block.listItem = listItem
  if (level) block.level = level
  return block
}

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_TOKEN || requiredEnv('SANITY_API_TOKEN')

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

function ensurePortableTextKeys(value) {
  if (!Array.isArray(value)) return value

  return value.map((node) => {
    if (!node || typeof node !== 'object') return node

    const out = {...node}
    if (!out._key) out._key = key12()

    if (Array.isArray(out.children)) {
      out.children = out.children.map((child) => {
        if (!child || typeof child !== 'object') return child
        const c = {...child}
        if (!c._key) c._key = key12()
        return c
      })
    }

    if (Array.isArray(out.markDefs)) {
      out.markDefs = out.markDefs.map((def) => {
        if (!def || typeof def !== 'object') return def
        const d = {...def}
        if (!d._key) d._key = key12()
        return d
      })
    }

    return out
  })
}

function parseFirstMatch(text, regex) {
  const m = text.match(regex)
  return m ? m[1].trim() : null
}

function normalizeBody(md) {
  // Keep only the main content section if present.
  const split = md.split(/\n##\s+CONȚINUT\s+PRINCIPAL[^\n]*\n/i)
  const raw = split.length > 1 ? split.slice(1).join('\n') : md

  // Remove common front-matter-ish sections for these files
  return raw
    .replace(/^#\s+ARTICOL\s+\d+[^\n]*\n+/i, '')
    .replace(/^##\s+METADATA\s*&\s*SEO\s*\n+/i, '')
    .trim()
}

function markdownToPortableText(md) {
  // Minimal markdown -> Portable Text conversion.
  // Supports: headings (#/##/###/####), paragraphs, bullet/numbered lists, hr, blockquote, tables (as code), fenced code.
  const blocks = []

  const lines = md.replace(/\r\n/g, '\n').split('\n')

  let paragraph = []
  let inCodeFence = false
  let codeLang = ''
  let codeLines = []

  let listMode = null // 'bullet' | 'number'
  let pendingListItems = []

  let inTable = false
  let tableLines = []

  const flushParagraph = () => {
    const text = paragraph.join(' ').trim()
    if (!text) {
      paragraph = []
      return
    }
    blocks.push(makeBlock({style: 'normal', text}))
    paragraph = []
  }

  const flushList = () => {
    if (!listMode || pendingListItems.length === 0) return
    pendingListItems.forEach((text) => {
      blocks.push(makeBlock({style: 'normal', text, listItem: listMode, level: 1}))
    })
    listMode = null
    pendingListItems = []
  }

  const flushCode = () => {
    if (!codeLines.length) return
    blocks.push({
      _type: 'code',
      _key: key12(),
      language: codeLang || 'text',
      code: codeLines.join('\n'),
    })
    codeLang = ''
    codeLines = []
  }

  const flushTable = () => {
    if (!tableLines.length) return
    blocks.push({
      _type: 'code',
      _key: key12(),
      language: 'markdown',
      code: tableLines.join('\n'),
    })
    tableLines = []
    inTable = false
  }

  const isTableLike = (line) => {
    // very naive: contains pipes and looks like a row
    return /\|/.test(line) && !/^\s*-{3,}\s*$/.test(line)
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // fenced code blocks
    const fence = line.match(/^```\s*(\w+)?\s*$/)
    if (fence) {
      if (!inCodeFence) {
        flushParagraph()
        flushList()
        flushTable()
        inCodeFence = true
        codeLang = fence[1] || ''
        continue
      }
      inCodeFence = false
      flushCode()
      continue
    }

    if (inCodeFence) {
      codeLines.push(line)
      continue
    }

    // tables -> render as code for now
    if (isTableLike(line)) {
      flushParagraph()
      flushList()
      inTable = true
      tableLines.push(line)
      continue
    } else if (inTable) {
      // end table when a non-table line appears
      flushTable()
    }

    // horizontal rule
    if (/^---\s*$/.test(line)) {
      flushParagraph()
      flushList()
      blocks.push(makeBlock({style: 'normal', text: ''}))
      continue
    }

    // headings
    const h = line.match(/^(#{1,4})\s+(.*)$/)
    if (h) {
      flushParagraph()
      flushList()
      const hashes = h[1]
      let text = (h[2] || '').trim()

      // Special-case SEO drafts that write headings like: "### H2: Something"
      // We map based on the explicit Hn prefix, not the number of #.
      const explicit = text.match(/^H([1-6])\s*:\s*(.+)$/i)
      if (explicit) {
        const n = Number(explicit[1])
        text = explicit[2].trim()
        const style = n === 1 ? 'h1' : n === 2 ? 'h2' : n === 3 ? 'h3' : n === 4 ? 'h4' : n === 5 ? 'h5' : 'h6'
        blocks.push(makeBlock({style, text}))
        continue
      }

      const level = hashes.length
      const style = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4'
      blocks.push(makeBlock({style, text}))
      continue
    }

    // blockquote
    if (/^>\s*$/.test(line)) {
      flushParagraph()
      flushList()
      continue
    }
    const bq = line.match(/^>\s*(.*)$/)
    if (bq) {
      const text = (bq[1] || '').trim()
      if (!text) {
        flushParagraph()
        flushList()
        continue
      }
      flushParagraph()
      flushList()
      blocks.push(makeBlock({style: 'blockquote', text}))
      continue
    }

    // list items
    const bullet = line.match(/^\s*[-*]\s+(.*)$/)
    const number = line.match(/^\s*\d+[.)]\s+(.*)$/)
    if (bullet) {
      flushParagraph()
      if (listMode && listMode !== 'bullet') flushList()
      listMode = 'bullet'
      pendingListItems.push(bullet[1].trim())
      continue
    }
    if (number) {
      flushParagraph()
      if (listMode && listMode !== 'number') flushList()
      listMode = 'number'
      pendingListItems.push(number[1].trim())
      continue
    }

    // blank line ends paragraph/list
    if (!line.trim()) {
      flushParagraph()
      flushList()
      continue
    }

    // normal paragraph line
    paragraph.push(line.trim())
  }

  flushTable()
  flushParagraph()
  flushList()
  flushCode()

  // Sanity expects at least 1 block sometimes; but we can return empty.
  return blocks
}

async function importOne(mdPath) {
  const absolute = path.resolve(mdPath)
  const raw = await fs.readFile(absolute, 'utf8')

  const title = parseFirstMatch(raw, /\*\*Titlu Principal:\*\*\s*\n([^\n]+)/i) || parseFirstMatch(raw, /^#\s+(.+)$/m) || path.basename(mdPath)
  const slugStr = parseFirstMatch(raw, /\*\*Slug:\*\*\s*\n([^\n]+)/i)
  const metaTitle = parseFirstMatch(raw, /\*\*Meta Title[^\n]*\*\*\s*\n([^\n]+)/i)
  const metaDescription = parseFirstMatch(raw, /\*\*Meta Description[^\n]*\*\*\s*\n([^\n]+)/i)
  const excerpt = parseFirstMatch(raw, /\*\*Extras \(Preview\):\*\*\s*\n([^\n]+)/i)
  const readingTimeStr = parseFirstMatch(raw, /\*\*Timp de Citire:\*\*\s*\n([^\n]+)/i)
  const readingTime = readingTimeStr ? parseInt(readingTimeStr, 10) : undefined

  const contentMd = normalizeBody(raw)
  const content = ensurePortableTextKeys(markdownToPortableText(contentMd))

  const doc = {
    _type: 'blogPost',
    title,
    slug: slugStr ? {current: slugStr} : undefined,
    excerpt: excerpt || '',
    content,
    readingTime,
    metaTitle: metaTitle || undefined,
    metaDescription: metaDescription || undefined,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFeatured: false,
  }

  const created = await client.create(doc)
  return created
}

async function patchMissingKeys(docId) {
  const doc = await client.getDocument(docId)
  if (!doc) throw new Error(`Document not found: ${docId}`)
  const fixed = ensurePortableTextKeys(doc.content)
  await client.patch(docId).set({content: fixed}).commit({autoGenerateArrayKeys: true})
  // eslint-disable-next-line no-console
  console.log(`Patched keys for: ${docId}`)
}

async function reimportContentFromMd(docId, mdPath) {
  const absolute = path.resolve(mdPath)
  const raw = await fs.readFile(absolute, 'utf8')
  const contentMd = normalizeBody(raw)
  const content = ensurePortableTextKeys(markdownToPortableText(contentMd))
  await client.patch(docId).set({content}).commit({autoGenerateArrayKeys: true})
  // eslint-disable-next-line no-console
  console.log(`Reimported content for: ${docId} from ${mdPath}`)
}

async function main() {
  const args = process.argv.slice(2)

  // Usage: node importBlogPostsFromMd.mjs --patch-keys <docId1> <docId2> ...
  if (args[0] === '--patch-keys') {
    const ids = args.slice(1)
    if (ids.length === 0) throw new Error('Missing document ids after --patch-keys')
    for (const id of ids) {
      await patchMissingKeys(id)
    }
    return
  }

  // Usage: node importBlogPostsFromMd.mjs --reimport-content <docId> <mdPath> [<docId> <mdPath> ...]
  if (args[0] === '--reimport-content') {
    const pairs = args.slice(1)
    if (pairs.length === 0 || pairs.length % 2 !== 0) {
      throw new Error('Usage: --reimport-content <docId> <mdPath> [<docId> <mdPath> ...]')
    }
    for (let i = 0; i < pairs.length; i += 2) {
      await reimportContentFromMd(pairs[i], pairs[i + 1])
    }
    return
  }

  const files = args.length ? args : ['articol_1_seo.md', 'articol_2_seo.md']

  for (const f of files) {
    const created = await importOne(f)
    // eslint-disable-next-line no-console
    console.log(`Created blogPost: ${created._id} (${created.slug?.current || 'no-slug'})`)
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
