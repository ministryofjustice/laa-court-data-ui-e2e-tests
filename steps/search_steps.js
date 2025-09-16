import { expect } from '@playwright/test'
import { SearchPage } from "../pages/search_page";

export class SearchSteps {
  constructor(page, testData) {
    this.page = page
    this.searchPage = new SearchPage(page)

    this.urn = testData.urn
    this.defendantName = testData.defendant_name
    this.defendantDob = testData.defendant_dob
    this.asn = testData.asn
    this.niNumber = testData.ni_number
    this.numberOfDefendants = testData.number_of_defendants
  }

  async whenIVisitTheSearchPage() {
    await this.searchPage.goto()
  }

  async andISearchForAValidURN() {
    await this.searchPage.searchByURN(this.urn)
  }

  async andISearchForAnInvalidASN() {
    await this.searchPage.searchByASNOrNI('AAAAAAAAAAAA')
  }

  async andISearchForAValidASN() {
   await this.searchPage.searchByASNOrNI(this.asn)
  }

  async andISearchForAValidNINumber() {
   await this.searchPage.searchByASNOrNI(this.niNumber)
  }

  async andISearchWithABlankNIIdentifier() {
   await this.searchPage.searchByASNOrNI('')
  }

  async andISearchByNameAndDOB() {
   await this.searchPage.searchByDefendant(this.defendantName, this.defendantDob)
  }

  async thenIShouldSeeResultsForAllDefendantsInTheCase() {
    await expect(this.page.locator('body')).toContainText(`${this.numberOfDefendants} search results`)
  }

  async thenIShouldSeeResultsForAllDefendantsConnectedToTheSearchedDefendant() {
    await expect(this.page.locator('body')).toContainText('7 search results');
  }

  async thenIShouldSeeNoSearchResults() {
    await expect(this.page.locator('body')).toContainText('0 search results');
    await expect(this.page.locator('body')).toContainText('There are no matching results.');
  }

  async thenIShouldSeeAWarningThatSearchTermIsRequired() {
    await expect(this.page.locator('body')).toContainText('There is a problem');
    await expect(this.page.locator('body')).toContainText('Search term required');
  }
}
