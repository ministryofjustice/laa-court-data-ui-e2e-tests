import { expect } from '@playwright/test'

export class GenericSteps {
  constructor(page) {
    this.page = page
  }

  async thenIShouldSeeText(message) {
    await expect(this.page.locator('body')).toContainText(message)
  }

  async andIClickOnTheLink(linkText) {
    await this.page.getByRole('link', { name: linkText }).click()
  }

  // This method checks that the <h1> heading contains all the expected texts
  async thenIShouldSeeHeading(...expectedTexts) {
    const heading = this.page.locator('h1')
    await expect(heading).toBeVisible()

    for (const t of expectedTexts) {
      await expect(heading).toContainText(t)
    }
  }

  async thenIShouldSeeSubheading(text) {
    const h2 = this.page.locator('h2', { hasText: text })
    await expect(h2).toBeVisible()
  }
}

// Aliases for readability in tests:
GenericSteps.prototype.andIShouldSeeSubheading = GenericSteps.prototype.thenIShouldSeeSubheading
GenericSteps.prototype.andIShouldSeeText = GenericSteps.prototype.thenIShouldSeeText
