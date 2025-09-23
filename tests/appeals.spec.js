import { test } from '@playwright/test'
import { SignInSteps } from '../steps/sign_in_steps'
import { SearchSteps } from '../steps/search_steps'
import { GenericSteps } from '../steps/generic_steps'
import { CaseDetailSteps } from '../steps/case_detail_steps'
import { AppealSteps } from '../steps/appeal_steps'
import { CommonPlatformTestData } from '../lib/common_platform_test_data'

test.describe('Appeal workflow', () => {
  let signInSteps
  let searchSteps
  let genericSteps
  let appealSteps
  let caseDetailSteps

  test.beforeEach(async ({ page }) => {
    const testData = new CommonPlatformTestData('appeal_with_two_defendants').content

    console.log(testData)
    signInSteps = new SignInSteps(page)
    searchSteps = new SearchSteps(page, testData)
    appealSteps = new AppealSteps(page)
    genericSteps = new GenericSteps(page)
    caseDetailSteps = new CaseDetailSteps(page)
  })

  test('caseworker visits the "Related court applications" and the Appeal page', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()

    await searchSteps.whenIVisitTheSearchPage()
    await searchSteps.andISearchForAValidURN()

    await searchSteps.thenIShouldSeeResultsForAllDefendantsInTheCase()

    await caseDetailSteps.whenIVisitTheSummaryPageOfACase('TESTAP123')
    await caseDetailSteps.andIClickOnRelatedCourtApplications()
    await genericSteps.andIClickOnTheLink("Appeal against conviction and sentence by a Magistrates' Court to the Crown Court")

    await genericSteps.thenIShouldSeeHeading('Appeal', 'TESTAP123')
  })

  test('caseworker links and unlinks an appeal', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()
    await caseDetailSteps.andIVisitRelatedCourtApplications('TESTAP123')
    await genericSteps.andIClickOnTheLink("Appeal against conviction and sentence by a Magistrates' Court to the Crown Court")

    await genericSteps.thenIShouldSeeHeading('Appeal', 'TESTAP123')

    await appealSteps.andIClickOnTheFirstAppellantLink()
    await genericSteps.thenIShouldSeeHeading('Appellant')

    await appealSteps.andIEnterAValidMAAT()
    await genericSteps.thenIShouldSeeText('You have successfully linked to the court data source')

    await appealSteps.andIUnlink()
    await genericSteps.thenIShouldSeeText('You have successfully unlinked from the court data source')
  })
})
