#!/usr/bin/env node

/**
 * Submit important pages to IndexNow for instant indexing
 * Run: node scripts/submit-indexnow.mjs
 */

const INDEXNOW_KEY = '80ed490583fd4cb8b5705e6e8cb33fec';
const BASE_URL = 'https://www.meseriaslocal.ro';

// Top priority pages to index immediately
const priorityUrls = [
  '/',
  '/servicii/',
  '/servicii/amenajari-interioare/',
  '/servicii/amenajari-interioare/zugraveli-vopsitorii/',
  '/servicii/amenajari-interioare/zugraveli-vopsitorii/bucuresti/',
  '/servicii/instalatii-utilitati/',
  '/servicii/instalatii-utilitati/instalatii-sanitare/',
  '/servicii/instalatii-utilitati/instalatii-sanitare/bucuresti/',
  '/servicii/constructii-renovari/',
  '/servicii/constructii-renovari/zidari/',
  '/servicii/constructii-renovari/zidari/bucuresti/',
  '/blog/',
];

async function submitToIndexNow(urls) {
  try {
    console.log(`📤 Submitting ${urls.length} URLs to IndexNow...`);
    
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        host: 'www.meseriaslocal.ro',
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls.map(url => url.startsWith('http') ? url : `${BASE_URL}${url}`)
      })
    });

    if (response.ok) {
      console.log('✅ Successfully submitted to IndexNow!');
      console.log('   URLs will be indexed by Bing, Yandex, and other search engines.');
      return true;
    } else {
      const text = await response.text();
      console.error('❌ IndexNow submission failed:', response.status, text);
      return false;
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error.message);
    return false;
  }
}

// Submit in batches of 100 (IndexNow limit is 10,000 per day)
async function submitInBatches(urls, batchSize = 100) {
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  console.log(`📦 Submitting ${urls.length} URLs in ${batches.length} batch(es)...\n`);

  for (let i = 0; i < batches.length; i++) {
    console.log(`Batch ${i + 1}/${batches.length}:`);
    await submitToIndexNow(batches[i]);
    
    // Wait 1 second between batches to avoid rate limiting
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Run
submitInBatches(priorityUrls);
