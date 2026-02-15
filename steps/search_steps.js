import { expect } from '@playwright/test'
import { SearchPage } from '../src/Page-objects/search.po.js'
import { GenericPage } from '../src/Page-objects/generic.po.js'

export class SearchSteps {
  constructor(page, testData) {
    this.page = page
    this.searchPage = new SearchPage(page)
    this.genericPage = new GenericPage(page)

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
    const resultsRegex = new RegExp(`${this.numberOfDefendants}\\s+search results`)
    await expect(this.searchPage.resultsCountHeading()).toContainText(resultsRegex)
  }

  async thenIShouldSeeResultsForAllDefendantsConnectedToTheSearchedDefendant() {
    await expect(this.searchPage.resultsCountHeading()).toContainText(/7\s+search results/)
  }

  async thenIShouldSeeNoSearchResults() {
    await expect(this.searchPage.resultsCountHeading()).toContainText(/0\s+search results/)
    await expect(this.genericPage.body()).toContainText('There are no matching results.');
  }

  async thenIShouldSeeAWarningThatSearchTermIsRequired() {
    await expect(this.genericPage.body()).toContainText('There is a problem');
    await expect(this.genericPage.body()).toContainText('Search term required');
  }
}
