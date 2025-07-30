import { test, expect } from '@playwright/test'
import { VCD_URL, EMAIL, PASSWORD} from '../config.js'
import { SigninPage } from './signin_page.js'
import { SearchPage } from './search_page.js'

test('Sign in and Search', async ({ page }) => {
  // Sign in
  const signinPage = new SigninPage(page, VCD_URL)

  await signinPage.signin(EMAIL, PASSWORD)

  const searchPage = new SearchPage(page)

  // Search by URN
  await searchPage.searchByUrn('XZKWOGUORZ')

  await expect(page.locator('body')).toContainText('1 search result')

  // Search by ASN - with 0 results
  await searchPage.searchByASN('AAAAAAAAAAAA')

  await expect(page.locator('body')).toContainText('0 search results');
  await expect(page.locator('body')).toContainText('There are no matching results.');

  await searchPage.searchByASN('912ZWN690MMK')

  await expect(page.locator('body')).toContainText('1 search result');

  // Search by Defendant and Date
  await searchPage.searchByDefendant('Duane', '02-11-1960')

  await expect(page.locator('body')).toContainText('1 search result');
});
