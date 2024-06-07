import 'dotenv/config';

import { test, expect, chromium } from '@playwright/test';
import { DemoPage } from '../pages/demoPage.js';
import { LoginPage } from '../pages/loginPage.js';

const email = process.env.EMAIL;
const code = process.env.CODE;
const blockchainOption = process.env.BLOCKCHAIN_OPTION;
const baseUrl = process.env.BASE_URL;
let browser;
let context;

// установка плагина метамаск, решил не использовать так как далее тест не выстроен
// async function launchBrowserWithExtension() {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   const extensionPath = path.join(__dirname, '../my_extension');
  
//   const browser = await chromium.launchPersistentContext('', {
//     headless: false,
//     args: [
//       `--disable-extensions-except=${extensionPath}`,
//       `--load-extension=${extensionPath}`
//     ]
//   });
  
//   return browser;
// }
    
test.beforeAll(async () => {
  try {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
} catch (error) {
    console.error('Failed to launch browser:', error);
  }
});
  
test.afterAll(async () => {
if (browser) {
    try {
    await browser.close();
    } catch (error) {
    console.error('Failed to close browser:', error);
    }
}
});

test('purchase ethereum', async () => {
  const page = await context.newPage();
  const demoPage = new DemoPage(page);

  await demoPage.goto();
  await expect(page).toHaveURL(baseUrl + '/demo/');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    demoPage.connectInNewTab()
  ]);
  await expect(newPage).toBeTruthy();

  const loginPage = new LoginPage(await newPage);

  await loginPage.loginWithEmail(email, code);
  await page.waitForTimeout(3000);

  const imageUrl = await demoPage.getImageUrl();
  expect(imageUrl).toContain('hotrod.png');

  await demoPage.selectBlockchainOption(blockchainOption);
  await demoPage.fillPurchaseImageUrl(baseUrl + imageUrl);
  await demoPage.clickSubmitButton();
  await demoPage.waitForiFrame();
  await demoPage.clickForPay();
});