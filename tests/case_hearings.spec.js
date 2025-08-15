import { test } from '@playwright/test'
import { SignInSteps } from '../steps/sign_in_steps'
import { CaseDetailSteps } from '../steps/case_detail_steps'

test.describe('Sort hearings', () => {
  let signInSteps
  let caseDetailSteps

  test.beforeEach(async ({ page }) => {
    signInSteps = new SignInSteps(page)
    caseDetailSteps = new CaseDetailSteps(page)
  })

  test('Hearings are sorted by date by default', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await caseDetailSteps.whenIVisitTheSummaryPageOfACase();
    await caseDetailSteps.thenHearingsShouldBeSortedByDateAscending();
  })

  test('Hearings date direction can be reversed', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await caseDetailSteps.whenIVisitTheSummaryPageOfACase();
    await caseDetailSteps.andISortByDate();
    await caseDetailSteps.thenHearingsShouldBeSortedByDateDescending();
  })

  test('Hearings can be sorted by type', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await caseDetailSteps.whenIVisitTheSummaryPageOfACase();
    await caseDetailSteps.andISortByHearingType();
    await caseDetailSteps.thenHearingsShouldBeSortedByHearingTypeDescending();
  })

  test('Hearings are clickable', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await caseDetailSteps.whenIVisitTheSummaryPageOfACase();
    await caseDetailSteps.andIClickOnAHearingDate();
    await caseDetailSteps.thenIShouldSeeTheHearingDetailsPageForThatDate();
  })
})
