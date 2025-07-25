// @ts-check
import { test, expect } from '@playwright/test'
import { VCD_URL, EMAIL, PASSWORD} from '../config.js'

test('Sign in and Search', async ({ page }) => {
  // Sign in
  await page.goto(VCD_URL)

  await page.getByLabel('Username or email')
            .fill(EMAIL)

  await page.getByRole('textbox', { name: 'Password' })
            .fill(PASSWORD)

  await page.getByRole('button', { name: 'Sign in' })
            .click();

  await expect(page.locator('.lcdui-notice-summary')).toHaveText('Signed in successfully.');

  // Search by URN
  await page.getByLabel('A case by URN')
            .check()

  await page.getByRole('button', { name: 'Continue' })
            .click();

  await page.locator('#search-term-field')
            .fill('XZKWOGUORZ')

  await page.getByRole('button', { name: 'Search' })
            .click();

  await expect(page.locator('body')).toContainText('1 search result');
});
