const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log('Navigating to calculator route...');
  await page.goto('http://127.0.0.1:4173/calculator');

  console.log('Waiting for network idle...');
  await page.waitForLoadState('networkidle');

  console.log('Taking screenshot...');
  await page.screenshot({ path: 'calculator-screenshot.png', fullPage: true });

  await browser.close();
  console.log('Verification complete.');
})();
