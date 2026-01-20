#!/usr/bin/env node

/**
 * Submit ALL pages from sitemap to IndexNow for instant indexing
 * Run: node scripts/submit-indexnow.mjs
 */

const INDEXNOW_KEY = '80ed490583fd4cb8b5705e6e8cb33fec';
const BASE_URL = 'https://www.meseriaslocal.ro';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const BATCH_SIZE = 10000; // IndexNow max per request
const DELAY_BETWEEN_BATCHES = 1000; // 1 second

async function fetchSitemapUrls() {
  console.log('📥 Fetching sitemap from:', SITEMAP_URL);
  
  try {
    const response = await fetch(SITEMAP_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status}`);
    }
    
    const xml = await response.text();
    
    // Simple XML parsing - extract all <loc> tags
    const locMatches = xml.match(/<loc>(.*?)<\/loc>/g);
    if (!locMatches) {
      throw new Error('No URLs found in sitemap');
    }
    
    const urls = locMatches.map(match => 
      match.replace('<loc>', '').replace('</loc>', '').trim()
    );
    
    console.log(`✅ Found ${urls.length} URLs in sitemap`);
    return urls;
  } catch (error) {
    console.error('❌ Error fetching sitemap:', error.message);
    throw error;
  }
}

async function submitBatchToIndexNow(urlList, batchNumber, totalBatches) {
  const payload = {
    host: 'www.meseriaslocal.ro',
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urlList
  };

  console.log(`\n📤 Submitting batch ${batchNumber}/${totalBatches}...`);
  console.log(`   URLs in batch: ${urlList.length}`);

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`✅ Batch ${batchNumber}/${totalBatches} submitted successfully!`);
      console.log(`   Status: ${response.status}`);
      return true;
    } else {
      const text = await response.text();
      console.error(`❌ Batch ${batchNumber}/${totalBatches} failed`);
      console.error(`   Status: ${response.status}`);
      console.error(`   Response: ${text}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error submitting batch ${batchNumber}/${totalBatches}:`, error.message);
    return false;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function submitAllToIndexNow() {
  console.log('🚀 Starting IndexNow submission...');
  console.log(`   Host: www.meseriaslocal.ro`);
  console.log(`   Batch size: ${BATCH_SIZE} URLs per batch`);
  console.log(`   Delay: ${DELAY_BETWEEN_BATCHES}ms between batches\n`);

  try {
    // Fetch all URLs from sitemap
    const allUrls = await fetchSitemapUrls();
    
    if (allUrls.length === 0) {
      console.log('⚠️  No URLs found in sitemap');
      return;
    }

    // Split into batches
    const batches = [];
    for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
      batches.push(allUrls.slice(i, i + BATCH_SIZE));
    }

    console.log(`\n📦 Split into ${batches.length} batch(es)`);

    // Submit each batch
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < batches.length; i++) {
      const success = await submitBatchToIndexNow(batches[i], i + 1, batches.length);
      
      if (success) {
        successCount++;
      } else {
        failCount++;
      }

      // Delay between batches (except for last batch)
      if (i < batches.length - 1) {
        console.log(`   ⏳ Waiting ${DELAY_BETWEEN_BATCHES}ms before next batch...`);
        await sleep(DELAY_BETWEEN_BATCHES);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 SUBMISSION SUMMARY');
    console.log('='.repeat(50));
    console.log(`   Total URLs: ${allUrls.length}`);
    console.log(`   Batches: ${batches.length}`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log('='.repeat(50));
    
    if (successCount > 0) {
      console.log('\n🎉 URLs will be indexed in 24-48 hours by:');
      console.log('   • Bing');
      console.log('   • Yandex');
      console.log('   • Seznam.cz');
      console.log('   • Naver');
      console.log('\n💡 For Google, use Google Search Console separately');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

submitAllToIndexNow();
