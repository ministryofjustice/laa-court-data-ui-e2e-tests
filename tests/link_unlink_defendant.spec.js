import { test, expect } from '@playwright/test'
import { VCD_URL, EMAIL, PASSWORD} from '../config.js'
import { SigninPage } from './signin_page.js'

const URN = 'SIYSRNYEFV'
const MAAT_ID = '6079985'
const DEFENDANT_NAME = 'John Doe TestLink1'
let prosecution_cases_url = `${VCD_URL}/prosecution_cases/${URN}`

test.describe.configure({ mode: 'serial' })

test.describe('Link and Unlink defendant flow', () => {
  let sharedContext
  let sharedPage

  // Sign in once before all tests and keep the context alive
  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext()
    sharedPage = await sharedContext.newPage()

    const signinPage = new SigninPage(sharedPage, VCD_URL)
    await signinPage.signin(EMAIL, PASSWORD)
  })

  // Clean up the shared context after all tests
  test.afterAll(async () => {
    if (sharedContext) {
      await sharedContext.close()
    }
  })

  test('step 1: checks "Not linked" status', async () => {
    await sharedPage.goto(prosecution_cases_url)
    await expect(sharedPage.locator('body')).toContainText('Not linked')
  })

  test.describe('step 2: Link a defendant to a Court Data', () => {
    test('Link using a wrong MAAT ID', async () => {
      await sharedPage.goto(prosecution_cases_url)

      await sharedPage.getByRole('link', { name: DEFENDANT_NAME })
                .click();

      await expect(sharedPage).toHaveTitle(/^Defendant details/)

      await sharedPage.getByLabel('MAAT ID')
                .fill('1234567')

      await sharedPage.getByRole('button', { name: 'Create link to court data' })
                .click();
      await expect(sharedPage.locator('.govuk-error-summary__body')).toContainText('The MAAT reference you provided is not available to be associated with this defendant')
    })

    test('Link using a correct MAAT ID', async () => {
      await sharedPage.getByLabel('MAAT ID')
                .fill(MAAT_ID)

      await sharedPage.getByRole('button', { name: 'Create link to court data' })
                .click();

      await expect(sharedPage.locator('body')).toContainText('You have successfully linked to the court data source')
      await expect(sharedPage.locator('body')).toContainText(MAAT_ID)
    })

    test.describe('step 3: Unlink the defendant from Court Data', async () => {
      test('Unlink the defendant', async () => {
        await sharedPage.goto(prosecution_cases_url)

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
})
