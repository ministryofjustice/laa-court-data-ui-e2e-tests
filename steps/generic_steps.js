import { expect } from '@playwright/test'
import { GenericPage } from '../src/Page-objects/generic.po.js'

export class GenericSteps {
  constructor(page) {
    this.page = page
    this.genericPage = new GenericPage(page)
  }

  async thenIShouldSeeText(message) {
    await expect(this.genericPage.body()).toContainText(message)
  }

  async andIClickOnTheLink(linkText) {
    await this.genericPage.clickLink(linkText)
  }

  // This method checks that the <h1> heading contains all the expected texts
  async thenIShouldSeeHeading(...expectedTexts) {
    const heading = this.genericPage.heading()
    await expect(heading).toBeVisible()

    for (const t of expectedTexts) {
      await expect(heading).toContainText(t)
    }
  }

  async thenIShouldSeeSubheading(text) {
    const h2 = this.genericPage.subheading(text)
    await expect(h2).toBeVisible()
  }
}

// Aliases for readability in tests:
GenericSteps.prototype.andIShouldSeeSubheading = GenericSteps.prototype.thenIShouldSeeSubheading
GenericSteps.prototype.andIShouldSeeText = GenericSteps.prototype.thenIShouldSeeText
