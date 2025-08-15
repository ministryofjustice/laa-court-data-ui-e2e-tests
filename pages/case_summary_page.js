import {  VCD_URL } from '../config'

export class CaseSummaryPage {
  constructor(page) {
    this.page = page
  }

  async goto(urn) {
    await this.page.goto(`${VCD_URL}/prosecution_cases/${urn}`)
  }

  async sortByDate() {
    await this.page.getByRole('link', { name: 'Date' })
              .click();
  }

  async sortByHearingType() {
    await this.page.locator('a[aria-label="Sort type desc"]')
              .click();
  }
}
