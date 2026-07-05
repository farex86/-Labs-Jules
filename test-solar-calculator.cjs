const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Listen for console and page errors
  page.on('console', msg => console.log(`BROWSER CONSOLE: ${msg.text()}`));
  page.on('pageerror', error => console.error(`BROWSER ERROR: ${error.message}`));

  try {
    console.log('Navigating to calculator...');
    await page.goto('http://127.0.0.1:4173/calculator', { waitUntil: 'domcontentloaded' });

    // Wait for a specific element to ensure page has loaded
    await page.waitForSelector('text=حاسبة الطاقة الشمسية', { timeout: 10000 });

    console.log('Taking screenshot...');
    const screenshotPath = path.join(__dirname, 'solar_calculator_screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${screenshotPath}`);

    // Wait for the select element to be present
    await page.waitForSelector('select', { timeout: 5000 });

    // Select the "farm" facility
    await page.selectOption('select', 'farm');

    console.log('Taking screenshot of farm calculation...');
    const farmScreenshotPath = path.join(__dirname, 'solar_calculator_farm_screenshot.png');
    await page.screenshot({ path: farmScreenshotPath, fullPage: true });
    console.log(`Screenshot saved to ${farmScreenshotPath}`);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();
