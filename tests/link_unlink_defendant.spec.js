import { test, expect } from '@playwright/test'
import { URN, DEFENDANT_NAME } from '../config.js'
import { SigninPage } from '../pages/signin_page.js'
import { CaseSummaryPage } from '../pages/case_summary_page.js'

const MAAT_ID = '6079985'
test.describe.configure({ mode: 'serial' })

test.describe('Link and Unlink defendant flow', () => {
  let sharedContext
  let sharedPage

  // Sign in once before all tests and keep the context alive
  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext()
    sharedPage = await sharedContext.newPage()

    const signinPage = new SigninPage(sharedPage)
    await signinPage.signInAsCaseworker()
  })

  // Clean up the shared context after all tests
  test.afterAll(async () => {
    if (sharedContext) {
      await sharedContext.close()
    }
  })

  test('step 1: checks "Not linked" status', async () => {
    await (new CaseSummaryPage(sharedPage)).goto(URN)
    await expect(sharedPage.locator('body')).toContainText('Not linked')
  })

  test.describe('step 2: Link a defendant to a Court Data', () => {
    test ('Link page can be accessed', async() => {
      await (new CaseSummaryPage(sharedPage)).goto(URN)
      await sharedPage.getByRole('link', { name: DEFENDANT_NAME })
                .click();

      await expect(sharedPage).toHaveTitle(/^Defendant details/)
    })

    test('Link using an invalid MAAT ID', async () => {
      await sharedPage.getByLabel('MAAT ID')
                .fill('123456')

      await sharedPage.getByRole('button', { name: 'Create link to court data' })
                .click();
      await expect(sharedPage.locator('.govuk-error-summary__body')).toContainText('Enter a MAAT ID in the correct format')
    })

    test('Link using a correct MAAT ID', async () => {
      await sharedPage.getByLabel('MAAT ID')
                .fill(MAAT_ID)

      await sharedPage.getByRole('button', { name: 'Create link to court data' })
                .click();

      await expect(sharedPage.locator('body')).toContainText('You have successfully linked to the court data source')
      await expect(sharedPage.locator('body')).toContainText(MAAT_ID)
    })
  })

  test.describe('step 3: Unlink the defendant from Court Data', async () => {
    test('Unlink the defendant', async () => {
      await (new CaseSummaryPage(sharedPage)).goto(URN)

      await sharedPage.getByRole('link', { name: DEFENDANT_NAME })
                .click();

      await sharedPage.locator('summary:has-text("Remove link to court data")') // Expand the summary section
                .click();

      await sharedPage.getByLabel('Reason for unlinking')
                .selectOption('1')

      await sharedPage.getByRole('button', { name: 'Remove link to court data' })
                .click();

      await expect(sharedPage.locator('body')).toContainText('You have successfully unlinked from the court data source')
    })
  })
})
