import { test } from '@playwright/test'
import { SignInSteps } from '../steps/sign_in_steps'
import { SearchSteps } from '../steps/search_steps'
import { GenericSteps } from '../steps/generic_steps'
import { CommonPlatformTestData } from '../lib/common_platform_test_data'

test.describe('Sign in and search', () => {
  let signInSteps
  let searchSteps
  let genericSteps

  test.beforeEach(async ({ page }) => {
    const testData = new CommonPlatformTestData('prosecution_case_with_four_defendants').content

    signInSteps = new SignInSteps(page)
    searchSteps = new SearchSteps(page, testData)
    genericSteps = new GenericSteps(page)
  })

  test('not-logged-in users cannot access the page', async () => {
    await signInSteps.givenIAmNotSignedIn();
    await searchSteps.whenIVisitTheSearchPage();
    await genericSteps.thenIShouldSeeText('You need to sign in before continuing')
  })

  test('caseworkers can search by URN', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await searchSteps.whenIVisitTheSearchPage();
    await searchSteps.andISearchForAValidURN();
    await searchSteps.thenIShouldSeeResultsForAllDefendantsInTheCase(4);
  })

  test('caseworkers can search by ASN', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await searchSteps.whenIVisitTheSearchPage();
    await searchSteps.andISearchForAValidASN();
    await searchSteps.thenIShouldSeeResultsForAllDefendantsConnectedToTheSearchedDefendant();
  })

  test('caseworkers can search by NI Number', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await searchSteps.whenIVisitTheSearchPage();
    await searchSteps.andISearchForAValidNINumber();
    await searchSteps.thenIShouldSeeResultsForAllDefendantsConnectedToTheSearchedDefendant();
  })

  test('caseworkers can search by defendant name/DOB', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await searchSteps.whenIVisitTheSearchPage();
    await searchSteps.andISearchByNameAndDOB();
    await searchSteps.thenIShouldSeeResultsForAllDefendantsConnectedToTheSearchedDefendant();
  })

  test('searches without results are handled appropriately', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await searchSteps.whenIVisitTheSearchPage();
    await searchSteps.andISearchForAnInvalidASN();
    await searchSteps.thenIShouldSeeNoSearchResults();
  })

  test('blank searches are handled appropriately', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await searchSteps.whenIVisitTheSearchPage();
    await searchSteps.andISearchWithABlankNIIdentifier();
    await searchSteps.thenIShouldSeeAWarningThatSearchTermIsRequired();
  })
})
