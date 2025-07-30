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

  // Search by ASN

  await page.goto('https://dev.view-court-data.service.justice.gov.uk/search_filters/new')

  await page.getByLabel('A defendant by ASN or National insurance number')
            .check()

  await page.getByRole('button', { name: 'Continue' })
            .click();

  await page.locator('#search-term-field')
            .fill('AAAAAAAAAAAA')

  await page.getByRole('button', { name: 'Search' })
            .click();

  await expect(page.locator('body')).toContainText('0 search results');
  await expect(page.locator('body')).toContainText('There are no matching results.');

  await page.locator('#search-term-field')
            .fill('912ZWN690MMK')

  await page.getByRole('button', { name: 'Search' })
            .click();

  await expect(page.locator('body')).toContainText('1 search result');

  // Search by ASN

  await page.goto(`${VCD_URL}/search_filters/new`)

  await page.getByLabel('A defendant by name and date of birth')
            .check()

  await page.getByRole('button', { name: 'Continue' })
            .click();

  await page.getByLabel('Defendant name')
            .fill('Duane')

  await page.getByLabel('Day').fill('02')
  await page.getByLabel('Month').fill('11')
  await page.getByLabel('Year').fill('1960')

  await page.getByRole('button', { name: 'Search' })
            .click();

  await expect(page.locator('body')).toContainText('1 search result');
});
