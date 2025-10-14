/**
 * Investigate korter.ge page structure
 */

const puppeteer = require('puppeteer');

async function investigatePage() {
  const browser = await puppeteer.launch({ headless: false }); // visible browser
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Opening page...');
  await page.goto('https://korter.ge/mshenebare-binebi-tbilisi', {
    waitUntil: 'networkidle2'
  });

  await new Promise(r => setTimeout(r, 3000));

  console.log('\nChecking page structure...\n');

  // Check for pagination or load more button
  const pageInfo = await page.evaluate(() => {
    return {
      // Check for pagination
      hasPagination: !!document.querySelector('[class*="pagination"]'),
      paginationHTML: document.querySelector('[class*="pagination"]')?.outerHTML || 'None',

      // Check for load more button
      hasLoadMore: !!document.querySelector('button[class*="load"], button[class*="more"]'),
      loadMoreHTML: document.querySelector('button[class*="load"], button[class*="more"]')?.outerHTML || 'None',

      // Count building cards
      buildingCards: document.querySelectorAll('[class*="building"], [class*="card"], a[href*="mshenebare"]').length,

      // Check page height
      pageHeight: document.body.scrollHeight,

      // Check if there's window.INITIAL_STATE
      hasInitialState: typeof window.INITIAL_STATE !== 'undefined',

      // Get all class names that might be relevant
      relevantClasses: Array.from(document.querySelectorAll('div[class*="list"], div[class*="grid"], div[class*="container"]'))
        .map(el => el.className)
        .filter(c => c)
        .slice(0, 20)
    };
  });

  console.log('Page Info:', JSON.stringify(pageInfo, null, 2));

  console.log('\n\nPress Ctrl+C to close the browser when you\'re done investigating...');

  // Keep browser open for manual investigation
  await new Promise(r => setTimeout(r, 300000)); // 5 minutes

  await browser.close();
}

investigatePage().catch(console.error);
