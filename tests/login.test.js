import { test, expect } from '@playwright/test';
const { DemoPage } = require('../pages/DemoPage');
const { LoginPage } = require('../pages/LoginPage');

test('open in new tab', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const demoPage = new DemoPage(page);

  const email = 'ta.test.assignment@faraway.com';
  const code = '378934';

  await demoPage.goto();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    demoPage.connectInNewTab(),
  ]);

  const loginPage = new LoginPage(await newPage);

  await loginPage.loginWithEmail(email, code);
});
