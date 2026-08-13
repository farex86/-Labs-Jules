const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log(`BROWSER CONSOLE: ${msg.text()}`));
  page.on('pageerror', error => console.error(`BROWSER ERROR: ${error}`));

  console.log('Navigating to calculator...');
  await page.goto('http://127.0.0.1:4173/calculator');

  await page.waitForLoadState('domcontentloaded');

  // Wait for a key element to ensure React has rendered
  await page.waitForSelector('h1:has-text("حاسبة الطاقة الشمسية")', { timeout: 10000 });

  console.log('Taking screenshot of initial state...');
  await page.screenshot({ path: 'calculator-initial.png', fullPage: true });

  console.log('Selecting facility...');
  await page.selectOption('select#facility', 'company');

  // Wait for appliances to load (checking for 'مكيف' text which is in company appliances)
  await page.waitForSelector('input[value="مكيف"]', { timeout: 5000 });

  console.log('Taking screenshot of selected facility...');
  await page.screenshot({ path: '/app/calculator-selected.png', fullPage: true });

  await browser.close();
  console.log('Done.');
})();
