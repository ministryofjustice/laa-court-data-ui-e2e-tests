import { VCD_URL } from '../config.js'

export class SearchPage {
  constructor(page) {
    this.page = page
    this.search_url = `${VCD_URL}/search_filters/new`
  }

  async searchByUrn(urn) {
    await this.goto()

    await this.page.getByLabel('A case by URN')
              .check()

    await this.page.getByRole('button', { name: 'Continue' })
              .click();

    await this.page.locator('#search-term-field')
              .fill(urn)

    await this.page.getByRole('button', { name: 'Search' })
              .click();
  }

  async searchByASN(asn) {
    await this.goto()

    await this.page.getByLabel('A defendant by ASN or National insurance number')
              .check()

    await this.page.getByRole('button', { name: 'Continue' })
              .click();

    await this.page.locator('#search-term-field')
              .fill(asn)

    await this.page.getByRole('button', { name: 'Search' })
              .click();

  }

  async searchByDefendant(defendantName, date_str) {
    this.goto()

    await this.page.getByLabel('A defendant by name and date of birth')
              .check()

    await this.page.getByRole('button', { name: 'Continue' })
              .click();

    await this.page.getByLabel('Defendant name')
              .fill(defendantName)

    let [day, month, year] = date_str.split('-')

    await this.page.getByLabel('Day').fill(day)
    await this.page.getByLabel('Month').fill(month)
    await this.page.getByLabel('Year').fill(year)

    await this.page.getByRole('button', { name: 'Search' })
              .click();

  }

  async goto() {
    await this.page.goto(this.search_url)
  }
}
