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
  async thenISeeHeading(...expectedTexts) {
    const heading = this.page.locator('h1')
    await expect(heading).toBeVisible()

    const text = await heading.innerText()
    for (const t of expectedTexts) {
      expect(text).toContain(t)
    }
  }
}
