import 'dotenv/config';

import { test, expect, chromium } from '@playwright/test';
import path from 'path';
import { DemoPage } from '../pages/demoPage.js';
import { LoginPage } from '../pages/loginPage.js';

const email = process.env.EMAIL;
const code = process.env.CODE;
const blockchainOption = process.env.BLOCKCHAIN_OPTION;
const baseUrl = process.env.BASE_URL;

async function launchBrowserWithExtension() {
  const extensionPath = path.join(__dirname, '../my_extension');

    const browser = await chromium.launchPersistentContext('', {
    headless: false,
      args: [
          `--disable-extensions-except=${extensionPath}`,
          `--load-extension=${extensionPath}`
      ]
  });

  return browser;
}

test.beforeEach(async ({}, testInfo) => {
    try {
        testInfo.context.browser = await launchBrowserWithExtension();
    } catch (error) {
        console.error('Failed to launch browser:', error);
    }
});

test.afterEach(async ({ context }) => {
    if (context.browser && typeof context.browser.close === 'function') {
        try {
            await context.browser.close();
        } catch (error) {
            console.error('Failed to close browser:', error);
        }
    }
});

test('purchase ethereum', async ({ context }) => {
  const page = await context.newPage();
  const demoPage = new DemoPage(page);

  await demoPage.goto();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    demoPage.connectInNewTab()
  ]);

  const loginPage = new LoginPage(await newPage);

  await loginPage.loginWithEmail(email, code);
  await page.waitForTimeout(3000);

  const imageUrl = await demoPage.getImageUrl();

  await expect(imageUrl).toContain('hotrod.png');

  await demoPage.selectBlockchainOption(blockchainOption);
  await demoPage.fillPurchaseImageUrl(baseUrl + imageUrl);
  await demoPage.clickSubmitButton();
  await demoPage.waitForiFrame();
  await demoPage.clickForPay();
});