import { test } from '@playwright/test'
import { SignInSteps } from '../steps/sign_in_steps'
import { CaseDetailSteps } from '../steps/case_detail_steps'
import { GenericSteps } from '../steps/generic_steps'

test.describe('Link and unlink defendants', () => {
  let signInSteps
  let caseDetailSteps
  let genericSteps

  test.beforeEach(async ({ page }) => {
    signInSteps = new SignInSteps(page)
    caseDetailSteps = new CaseDetailSteps(page)
    genericSteps = new GenericSteps(page)
  })

  test('link status is visible', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await caseDetailSteps.whenIVisitTheSummaryPageOfAnUnlinkedCase();
    await genericSteps.thenIShouldSeeText('Not linked')
  });

  test('defendant details are accessible', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()
    await caseDetailSteps.whenIVisitTheSummaryPageOfAnUnlinkedCase()
    await caseDetailSteps.thenICanClickThroughToTheDefendantDetailsScreen()
  });

  test('MAAT is validated and errors are highlighted', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()
    await caseDetailSteps.whenIVisitTheSummaryPageOfAnUnlinkedCase()
    await caseDetailSteps.andIClickThroughToTheDefendantDetailsScreen()
    await caseDetailSteps.andIEnterAnInvalidMAAT()
    await genericSteps.thenIShouldSeeText('Enter a MAAT ID in the correct format')
  })

  test('caseworkers can link valid MAAT IDs', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()
    await caseDetailSteps.whenIVisitTheSummaryPageOfAnUnlinkedCase()
    await caseDetailSteps.andIClickThroughToTheDefendantDetailsScreen()
    await caseDetailSteps.andIEnterAValidMAAT()
    await genericSteps.thenIShouldSeeText('You have successfully linked to the court data source')
    await caseDetailSteps.andIShouldSeeTheMAAT()
  })

  test('caseworkers can unlink', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()
    // Note that this test relies on a previous test having changed the initial DB state to link
    // defendant
    await caseDetailSteps.whenIVisitTheSummaryPageOfAnLinkedCase()
    await caseDetailSteps.andIClickThroughToTheDefendantDetailsScreen()
    await caseDetailSteps.andIUnlinkTheDefendant()
    await genericSteps.thenIShouldSeeText('You have successfully unlinked from the court data source')
  })
})
