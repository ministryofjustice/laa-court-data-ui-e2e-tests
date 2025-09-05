import { test } from '@playwright/test'
import { SignInSteps } from '../steps/sign_in_steps'
import { CaseDetailSteps } from '../steps/case_detail_steps'
import { HearingDetailSteps } from '../steps/hearing_detail_steps'

test.describe('Sort hearings', () => {
  let signInSteps
  let caseDetailSteps
  let hearingDetailSteps

  test.beforeEach(async ({ page }) => {
    signInSteps = new SignInSteps(page)
    caseDetailSteps = new CaseDetailSteps(page)
    hearingDetailSteps = new HearingDetailSteps(page)
  })

  test('Hearings are sorted by date by default', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await caseDetailSteps.whenIVisitTheSummaryPageOfACase();
    await caseDetailSteps.thenHearingsShouldBeSortedByDateAscending();
  })

  test('Hearing details pages have forward links', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await caseDetailSteps.whenIVisitTheSummaryPageOfACase();
    await caseDetailSteps.andIClickOnTheFirstHearingDate();
    await hearingDetailSteps.andIClickNext();
    await hearingDetailSteps.thenIShouldSeeTheDetailsPageForTheSecondHearing();
  })

  test('Hearing details pages have backwards links', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await caseDetailSteps.whenIVisitTheSummaryPageOfACase();
    await caseDetailSteps.andIClickOnTheLastHearingDate();
    await hearingDetailSteps.andIClickPrevious();
    await hearingDetailSteps.thenIShouldSeeTheDetailsPageForTheSecondLastHearing();
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
    await caseDetailSteps.andIClickOnTheFirstHearingDate();
    await hearingDetailSteps.thenIShouldSeeTheDetailsPageForTheFirstHearing();
  })
})
