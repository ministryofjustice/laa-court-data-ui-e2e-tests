import { test } from '@playwright/test'
import { SignInSteps } from '../steps/sign_in_steps'
import { SearchSteps } from '../steps/search_steps'
import { GenericSteps } from '../steps/generic_steps'
import { CaseDetailSteps } from '../steps/case_detail_steps'
import { AppealSteps } from '../steps/appeal_steps'

test.describe('Appeal workflow', () => {
  let signInSteps
  let searchSteps
  let genericSteps
  let appealSteps
  let caseDetailSteps

  test.beforeEach(async ({ page }) => {
    signInSteps = new SignInSteps(page)
    searchSteps = new SearchSteps(page)
    appealSteps = new AppealSteps(page)
    genericSteps = new GenericSteps(page)
    caseDetailSteps = new CaseDetailSteps(page)
  })

  test('caseworker visits the "Related court applications" and the Appeal page', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()
    await searchSteps.whenIVisitTheSearchPage()
    await searchSteps.andISearchForAValidURN('TESTAP123')

    await searchSteps.thenIShouldSeeResultsForAllDefendantsInTheCase(2)

    await caseDetailSteps.whenIVisitTheSummaryPageOfACase('TESTAP123')
    await caseDetailSteps.andIClickOnRelatedCourtApplications()
    await genericSteps.andIClickOnTheLink("Appeal against conviction and sentence by a Magistrates' Court to the Crown Court")

    await genericSteps.thenIShouldSeeHeading('Appeal', 'TESTAP123')
  })

  test('caseworker links an Appeal', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()
    await caseDetailSteps.andIVisitRelatedCourtApplications('TESTAP123')
    await genericSteps.andIClickOnTheLink("Appeal against conviction and sentence by a Magistrates' Court to the Crown Court")

    await genericSteps.thenIShouldSeeHeading('Appeal', 'TESTAP123')

    await appealSteps.andIClickOnTheFirstAppellantLink()
    await genericSteps.thenIShouldSeeHeading('Appellant')

    // Test Link Appellant
    await appealSteps.andIEnterAValidMAAT('7777777')
    await genericSteps.thenIShouldSeeText('You have successfully linked to the court data source')

    // Test Unlink Appellant
    await appealSteps.andIUnlink()
    await genericSteps.thenIShouldSeeText('You have successfully unlinked from the court data source')
  })
})
