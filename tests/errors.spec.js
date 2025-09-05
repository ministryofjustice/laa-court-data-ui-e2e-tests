import { test } from '@playwright/test'
import { SignInSteps } from '../steps/sign_in_steps'
import { GenericSteps } from '../steps/generic_steps'
import { CaseDetailSteps } from '../steps/case_detail_steps'

test.describe('Errors', () => {
  let signInSteps
  let caseDetailSteps
  let genericSteps

  test.beforeEach(async ({ page }) => {
    signInSteps = new SignInSteps(page)
    caseDetailSteps = new CaseDetailSteps(page)
    genericSteps = new GenericSteps(page)
  })

  test('404 errors are handled appropriately', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await caseDetailSteps.whenIVisitTheSummaryPageOfANonexistentCase();
    await genericSteps.thenIShouldSeeText(
      'There was a problem getting the information you requested. ' +
      'If this problem persists, please contact the IT Helpdesk on 0800 9175148.'
    )
  })
})
