import { test, expect } from '@playwright/test'
import { VCD_URL, EMAIL, PASSWORD} from '../config.js'
import { SigninPage } from './signin_page.js'

test.describe('Link and Unlink defendant to Court Data', () => {
  test.describe('when the defendand is not linked', () => {
    test('it links and then unlinks the defendant to Court Data', async ({ page }) => {
      // Sign in
      const signinPage = new SigninPage(page, VCD_URL)
      await signinPage.signin(EMAIL, PASSWORD)

      const URN = 'SIYSRNYEFV'
      const MAAT_ID = '6079985'
      const DEFENDANT_ID='6bdd2bcc-1ab3-4c4d-986f-ff86c9b35bbe'

      // Check Non Linked status
      let prosecution_cases_url = `${VCD_URL}/prosecution_cases/${URN}`

      await page.goto(prosecution_cases_url)

      await expect(page.locator('body')).toContainText('Not linked')

      // LINK

      await page.getByRole('link', { name: 'John Doe TestLink1' })
                .click();

      await expect(page).toHaveTitle(/^Defendant details/)

      await page.getByLabel('MAAT ID')
                .fill(MAAT_ID)

      await page.getByRole('button', { name: 'Create link to court data' })
                .click();

      await expect(page.locator('body')).toContainText('You have successfully linked to the court data source')
      await expect(page.locator('body')).toContainText(MAAT_ID)

      // UNLINK

      await page.goto(prosecution_cases_url)

      await page.getByRole('link', { name: 'John Doe TestLink1' })
                .click();

      await page.locator('summary:has-text("Remove link to court data")') // Expand the summary section
                .click();

      await page.getByLabel('Reason for unlinking')
                .selectOption('1')

      await page.getByRole('button', { name: 'Remove link to court data' })
                .click();

      await expect(page.locator('body')).toContainText('You have successfully unlinked from the court data source')
    })
  })
})
