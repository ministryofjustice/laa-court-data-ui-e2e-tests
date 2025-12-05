import { test } from '@playwright/test'
import { SignInSteps } from '../steps/sign_in_steps'
import { GenericSteps } from '../steps/generic_steps'
import { CaseDetailSteps } from '../steps/case_detail_steps'
import { CourtApplicationSteps } from '../steps/court_application_steps'
import { CommonPlatformTestData } from '../lib/common_platform_test_data'

test.describe('Breach workflow', () => {
  let signInSteps
  let genericSteps
  let courtApplicationSteps
  let caseDetailSteps

  test.beforeEach(async ({ page }) => {
    const testData = new CommonPlatformTestData('breach').content

    console.log(testData)
    signInSteps = new SignInSteps(page)
    courtApplicationSteps = new CourtApplicationSteps(page)
    genericSteps = new GenericSteps(page)
    caseDetailSteps = new CaseDetailSteps(page)
  })

  test('caseworker visits the "Related court applications" and the Breach page', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()
    await caseDetailSteps.whenIVisitTheSummaryPageOfACase('TESTBR11111')
    await caseDetailSteps.andIClickOnRelatedCourtApplications()

    await genericSteps.andIClickOnTheLink("Failing to comply with the community requirements of a suspended sentence order")

    await genericSteps.thenIShouldSeeHeading('Breach', 'TESTBR11111')
    await genericSteps.andIShouldSeeSubheading('Respondent')
    await genericSteps.andIShouldSeeSubheading('Hearings')
  })

  test('caseworker links and unlinks a breach', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker()
    await caseDetailSteps.andIVisitRelatedCourtApplications('TESTBR11111')

    await genericSteps.andIClickOnTheLink("Failing to comply with the community requirements of a suspended sentence order")

    await genericSteps.thenIShouldSeeHeading('Breach', 'TESTBR11111')
    await genericSteps.andIShouldSeeText('Not linked') // in the table of Respondents

    await courtApplicationSteps.andIClickOnTheFirstAppellantLink()

    await genericSteps.thenIShouldSeeHeading('Respondent')
    await genericSteps.andIShouldSeeText('Breach')

    await courtApplicationSteps.andIEnterAValidMAAT()
    await genericSteps.andIShouldSeeText('You have successfully linked to the court data source')

    await courtApplicationSteps.andIUnlink()
    await genericSteps.thenIShouldSeeText('You have successfully unlinked from the court data source')
  })
})
