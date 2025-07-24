// @ts-check
import { test, expect } from '@playwright/test'
import { VCD_URL, EMAIL, PASSWORD} from '../config.js'

test('Sign in and Search', async ({ page }) => {
  // if (!vcd_url || !email || !password) {
  //   throw new Error('Missing required environment variables: VCD_URL, EMAIL, or PASSWORD');
  // }

  await page.goto(VCD_URL);

  await page.locator('[data-cy="login-username"]')
            .fill(EMAIL);

  await page.locator('[data-cy="login-password"]')
            .fill(PASSWORD)

  await page.click('[data-cy="login-submit"]');

  await expect(page.locator('.lcdui-notice-summary')).toHaveText('Signed in successfully.');

  await page.getByLabel('A case by URN').check()

  await page.getByRole('button', { name: 'Continue' }).click();

  await page.click('[data-module="govuk-button"]');

  await page.locator('#search-term-field')
            .fill('XZKWOGUORZ')

  await page.getByRole('button', { name: 'Search' }).click();

  await page.click('[data-module="govuk-button"]');

  await expect(page.locator('body')).toContainText('1 search result');

});
