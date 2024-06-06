import { test } from '@playwright/test';
import { DemoPage } from 'test-automation-playwright/pages/DemoPage';
import { LoginPage } from 'test-automation-playwright/pages/DemoPage';

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
