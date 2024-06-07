import 'dotenv/config';

import { expect, test, chromium } from '@playwright/test';
import { DemoPage } from '../pages/DemoPage.js';
import { LoginPage } from '../pages/LoginPage.js';

const email = process.env.EMAIL;
const code = process.env.CODE;
const baseUrl = process.env.BASE_URL;
let browser;
let context;

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

test('open in new tab', async () => {
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

  await expect(demoPage.logoutButtonTextWithUserName).toBeDefined();
});
