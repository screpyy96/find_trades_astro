#!/usr/bin/env node
/**
 * Script pentru import content markdown în Sanity
 * 
 * Usage:
 *   node scripts/importMarkdownContent.mjs <tradeSlug> <categorySlug> <markdown-file.md>
 * 
 * Exemplu:
 *   node scripts/importMarkdownContent.mjs instalatii-sanitare instalatii-utilitare content.md
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';

const client = createClient({
  projectId: '7094dn36',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // Needs write token
});

// Parse markdown to PortableText blocks
function markdownToPortableText(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let currentList = [];
  let listType = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip empty lines (but close any open list)
    if (!line.trim()) {
      if (currentList.length > 0) {
        blocks.push(...currentList);
        currentList = [];
        listType = null;
      }
      continue;
    }

    // H2: ## Heading
    if (line.startsWith('## ')) {
      if (currentList.length > 0) {
        blocks.push(...currentList);
        currentList = [];
        listType = null;
      }
      blocks.push(createBlock(line.slice(3).trim(), 'h2'));
      continue;
    }

    // H3: ### Heading
    if (line.startsWith('### ')) {
      if (currentList.length > 0) {
        blocks.push(...currentList);
        currentList = [];
        listType = null;
      }
      blocks.push(createBlock(line.slice(4).trim(), 'h3'));
      continue;
    }

    // H1: # Heading (skip - H1 is separate field)
    if (line.startsWith('# ')) {
      continue;
    }

    // Bullet list: - item
    if (line.match(/^[-*]\s+/)) {
      const text = line.replace(/^[-*]\s+/, '').trim();
      currentList.push(createBlock(text, 'normal', 'bullet'));
      listType = 'bullet';
      continue;
    }

    // Numbered list: 1. item
    if (line.match(/^\d+\.\s+/)) {
      const text = line.replace(/^\d+\.\s+/, '').trim();
      currentList.push(createBlock(text, 'normal', 'number'));
      listType = 'number';
      continue;
    }

    // Skip tables, code blocks, horizontal rules
    if (line.startsWith('|') || line.startsWith('```') || line.startsWith('---')) {
      continue;
    }

    // Skip CTA markers
    if (line.startsWith('[CTA:')) {
      continue;
    }

    // Normal paragraph
    if (currentList.length > 0) {
      blocks.push(...currentList);
      currentList = [];
      listType = null;
    }
    blocks.push(createBlock(line.trim(), 'normal'));
  }

  // Close any remaining list
  if (currentList.length > 0) {
    blocks.push(...currentList);
  }

  return blocks;
}

function createBlock(text, style = 'normal', listItem = null) {
  const block = {
    _type: 'block',
    _key: randomUUID().slice(0, 8),
    style: style,
    children: parseInlineMarks(text),
    markDefs: [],
  };

  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }

  return block;
}

function parseInlineMarks(text) {
  const children = [];
  let remaining = text;
  
  // Simple regex for **bold** and *italic*
  const boldRegex = /\*\*(.+?)\*\*/g;
  const italicRegex = /\*(.+?)\*/g;
  
  // First pass: extract bold
  let lastIndex = 0;
  let match;
  
  // Reset regex
  boldRegex.lastIndex = 0;
  
  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index);
      if (beforeText) {
        children.push({
          _type: 'span',
          _key: randomUUID().slice(0, 8),
          text: beforeText,
          marks: [],
        });
      }
    }
    
    // Add bold text
    children.push({
      _type: 'span',
      _key: randomUUID().slice(0, 8),
      text: match[1],
      marks: ['strong'],
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    if (remainingText) {
      children.push({
        _type: 'span',
        _key: randomUUID().slice(0, 8),
        text: remainingText,
        marks: [],
      });
    }
  }
  
  // If no bold found, just return plain text
  if (children.length === 0) {
    children.push({
      _type: 'span',
      _key: randomUUID().slice(0, 8),
      text: text,
      marks: [],
    });
  }
  
  return children;
}

async function main() {
  const [,, tradeSlug, categorySlug, filePath] = process.argv;
  
  if (!tradeSlug || !categorySlug || !filePath) {
    console.log('Usage: node scripts/importMarkdownContent.mjs <tradeSlug> <categorySlug> <file.md>');
    console.log('Example: node scripts/importMarkdownContent.mjs instalatii-sanitare instalatii-utilitare content.md');
    process.exit(1);
  }
  
  if (!process.env.SANITY_TOKEN) {
    console.log('❌ Missing SANITY_TOKEN environment variable');
    console.log('Get a token from: https://www.sanity.io/manage/project/7094dn36/api#tokens');
    process.exit(1);
  }
  
  console.log(`📖 Reading ${filePath}...`);
  const markdown = readFileSync(filePath, 'utf-8');
  
  console.log('🔄 Converting markdown to PortableText...');
  const blocks = markdownToPortableText(markdown);
  
  console.log(`✅ Converted ${blocks.length} blocks`);
  
  // Check if document exists
  const existing = await client.fetch(
    `*[_type == "servicePageNoCity" && tradeSlug == $tradeSlug && categorySlug == $categorySlug][0]`,
    { tradeSlug, categorySlug }
  );
  
  if (existing) {
    console.log(`📝 Updating existing document: ${existing._id}`);
    await client.patch(existing._id).set({ content: blocks }).commit();
    console.log('✅ Content updated!');
  } else {
    console.log('📝 Creating new document...');
    await client.create({
      _type: 'servicePageNoCity',
      title: `${tradeSlug} - Content`,
      tradeSlug,
      categorySlug,
      slug: { _type: 'slug', current: tradeSlug },
      content: blocks,
      isPublished: false,
    });
    console.log('✅ Document created! Go to Sanity Studio to fill in SEO fields and publish.');
  }
}

main().catch(console.error);
