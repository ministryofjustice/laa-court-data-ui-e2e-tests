import { test, expect } from '@playwright/test'
import { VCD_URL, EMAIL, PASSWORD, URN, DEFENDANT_NAME, DEFENDANT_DOB, ASN } from '../config.js'
import { SigninPage } from './signin_page.js'
import { SearchPage } from './search_page.js'

test.describe('Sign in and Search', () => {
  test.describe('when the user is logged in', () => {
    test('show the results of the search', async ({ page }) => {
      // Sign in
      const signinPage = new SigninPage(page, VCD_URL)
      await signinPage.signin(EMAIL, PASSWORD)

      const searchPage = new SearchPage(page)

      // Search by URN
      await searchPage.searchByUrn(URN)

      await expect(page.locator('body')).toContainText('4 search results')

      // Search by ASN - with 0 results
      await searchPage.searchByASN('AAAAAAAAAAAA')

      await expect(page.locator('body')).toContainText('0 search results');
      await expect(page.locator('body')).toContainText('There are no matching results.');

      await searchPage.searchByASN(ASN)

      await expect(page.locator('body')).toContainText('4 search results');

      // Search by Defendant and Date
      await searchPage.searchByDefendant(DEFENDANT_NAME, DEFENDANT_DOB)

      await expect(page.locator('body')).toContainText('4 search results')
    })
  })

  test.describe('when the user is NOT logged in', () => {
    test('shows a warning message', async ({ page }) => {
      const searchPage = new SearchPage(page)

      await searchPage.goto()

      await expect(page.locator('body')).toContainText('You need to sign in before continuing.')
    })
  })
})
