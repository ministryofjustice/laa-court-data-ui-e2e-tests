// @ts-check
import { test, expect } from '@playwright/test';


test('Sign in and Search', async ({ page }) => {
    // TODO: use ENV variables to set vcd_url, email and password
  let vcd_url = "https://....view-court-data.service.justice.gov.uk/"
  let email = "...@digital.justice.gov.uk'"
  let password = "..."

  await page.goto(vcd_url);

  await page.locator('[data-cy="login-username"]')
            .fill(email);

  await page.locator('[data-cy="login-password"]')
            .fill(password)

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
