import { expect } from '@playwright/test'
import { SearchPage } from "../pages/search_page";
import { URN, DEFENDANT_NAME, DEFENDANT_DOB, ASN, NI_NUMBER } from '../config.js'

export class SearchSteps {
  constructor(page) {
    this.page = page
    this.searchPage = new SearchPage(page)
  }

  async whenIVisitTheSearchPage() {
    await this.searchPage.goto()
  }

  async andISearchForAValidURN() {
    await this.searchPage.searchByURN(URN)
  }

  async andISearchForAnInvalidASN() {
    await this.searchPage.searchByASNOrNI('AAAAAAAAAAAA')
  }

  async andISearchForAValidASN() {
   await this.searchPage.searchByASNOrNI(ASN)
  }

  async andISearchForAValidNINumber() {
   await this.searchPage.searchByASNOrNI(NI_NUMBER)
  }

  async andISearchWithABlankNIIdentifier() {
   await this.searchPage.searchByASNOrNI('')
  }

  async andISearchByNameAndDOB() {
   await this.searchPage.searchByDefendant(DEFENDANT_NAME, DEFENDANT_DOB)
  }

  async thenIShouldSeeResultsForAllDefendantsInTheCase() {
    await expect(this.page.locator('body')).toContainText('4 search results')
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
