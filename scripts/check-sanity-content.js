import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '7094dn36',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Optional, for draft content
});

async function checkServicePage() {
  console.log('🔍 Checking Sanity content for: instalatii-electrice + bucuresti\n');
  
  // Query for the specific page
  const query = `*[
    _type == "servicePage" &&
    lower(tradeSlug) == "instalatii-electrice" &&
    lower(citySlug) == "bucuresti"
  ][0] {
    _id,
    title,
    tradeSlug,
    citySlug,
    isPublished,
    heroTitle,
    heroSubtitle,
    heroDescription,
    seoTitle,
    seoDescription,
    content,
    faqSection,
    priceRanges,
    relatedServices,
    localTips,
    publishedAt,
    updatedAt
  }`;
  
  const result = await sanityClient.fetch(query);
  
  if (!result) {
    console.log('❌ NO CONTENT FOUND in Sanity for instalatii-electrice + bucuresti');
    console.log('\n📋 Checking all instalatii-electrice pages...\n');
    
    const allElectricQuery = `*[
      _type == "servicePage" &&
      lower(tradeSlug) match "*electric*"
    ] {
      _id,
      title,
      tradeSlug,
      citySlug,
      isPublished
    }`;
    
    const allElectric = await sanityClient.fetch(allElectricQuery);
    console.log('Found pages:', allElectric);
    return;
  }
  
  console.log('✅ CONTENT FOUND!\n');
  console.log('📄 Page Details:');
  console.log('  ID:', result._id);
  console.log('  Title:', result.title);
  console.log('  Published:', result.isPublished ? '✅ Yes' : '❌ No');
  console.log('  Last Updated:', result.updatedAt || result.publishedAt || 'N/A');
  
  console.log('\n🎯 HERO SECTION:');
  console.log('  Hero Title:', result.heroTitle || '❌ MISSING');
  console.log('  Hero Subtitle:', result.heroSubtitle || '❌ MISSING');
  console.log('  Hero Description:', result.heroDescription ? '✅ Present' : '❌ MISSING');
  
  console.log('\n🔍 SEO META TAGS:');
  const effectiveTitle = result.seoTitle || result.heroTitle || result.title;
  const effectiveDesc = result.seoDescription || result.heroDescription;
  console.log('  SEO Title:', result.seoTitle || `⚠️ FALLBACK → heroTitle: "${result.heroTitle || result.title}"`);
  console.log('  SEO Description:', result.seoDescription || `⚠️ FALLBACK → heroDescription: "${result.heroDescription ? '✅ Present' : '❌ MISSING'}"`);
  
  console.log('\n📝 CONTENT STRUCTURE:');
  if (result.content && result.content.length > 0) {
    console.log('  Content blocks:', result.content.length);
    
    // Analyze heading structure
    const headings = {
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      normal: 0,
      lists: 0
    };
    
    result.content.forEach(block => {
      if (block._type === 'block') {
        if (block.style === 'h1') headings.h1++;
        else if (block.style === 'h2') headings.h2++;
        else if (block.style === 'h3') headings.h3++;
        else if (block.style === 'h4') headings.h4++;
        else if (block.style === 'normal') headings.normal++;
        
        if (block.listItem) headings.lists++;
      }
    });
    
    console.log('  Heading structure:');
    console.log('    H1:', headings.h1, headings.h1 === 1 ? '✅' : headings.h1 === 0 ? '❌ MISSING' : '⚠️ Multiple H1s');
    console.log('    H2:', headings.h2, headings.h2 > 0 ? '✅' : '❌ MISSING');
    console.log('    H3:', headings.h3);
    console.log('    H4:', headings.h4);
    console.log('    Paragraphs:', headings.normal);
    console.log('    List items:', headings.lists);
  } else {
    console.log('  ❌ NO CONTENT BLOCKS');
  }
  
  console.log('\n❓ FAQ SECTION:');
  if (result.faqSection && result.faqSection.length > 0) {
    console.log('  ✅', result.faqSection.length, 'questions');
    result.faqSection.forEach((faq, i) => {
      console.log(`    ${i + 1}. ${faq.question}`);
    });
  } else {
    console.log('  ❌ NO FAQ');
  }
  
  console.log('\n💰 PRICE RANGES:');
  if (result.priceRanges && result.priceRanges.length > 0) {
    console.log('  ✅', result.priceRanges.length, 'price ranges');
    result.priceRanges.forEach(price => {
      console.log(`    - ${price.service}: ${price.minPrice}-${price.maxPrice} RON`);
    });
  } else {
    console.log('  ❌ NO PRICES');
  }
  
  console.log('\n🔗 RELATED SERVICES:');
  if (result.relatedServices && result.relatedServices.length > 0) {
    console.log('  ✅', result.relatedServices.length, 'related services');
    result.relatedServices.forEach(service => {
      console.log(`    - ${service.serviceName} (${service.serviceSlug})`);
    });
  } else {
    console.log('  ❌ NO RELATED SERVICES');
  }
  
  console.log('\n💡 LOCAL TIPS:');
  if (result.localTips && result.localTips.length > 0) {
    console.log('  ✅', result.localTips.length, 'local tips');
  } else {
    console.log('  ❌ NO LOCAL TIPS');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(60));
  
  const checks = {
    'Published': result.isPublished,
    'Hero Title (= H1)': !!result.heroTitle,
    'Hero Description': !!result.heroDescription,
    'SEO Title (sau fallback heroTitle)': !!(result.seoTitle || result.heroTitle || result.title),
    'SEO Description (sau fallback heroDescription)': !!(result.seoDescription || result.heroDescription),
    'Content': result.content && result.content.length > 0,
    'FAQ': result.faqSection && result.faqSection.length > 0,
    'Prices': result.priceRanges && result.priceRanges.length > 0,
    'Related Services': result.relatedServices && result.relatedServices.length > 0,
  };
  
  const passed = Object.values(checks).filter(Boolean).length;
  const total = Object.keys(checks).length;
  
  console.log(`\nScore: ${passed}/${total} checks passed\n`);
  
  Object.entries(checks).forEach(([key, value]) => {
    console.log(`  ${value ? '✅' : '❌'} ${key}`);
  });
  
  console.log('\n');
}

checkServicePage().catch(console.error);
