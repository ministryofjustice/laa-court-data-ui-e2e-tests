import { expect } from '@playwright/test'

export class GenericSteps {
  constructor(page) {
    this.page = page;
  }

  async thenIShouldSeeText(message) {
    await expect(this.page.locator('body')).toContainText(message)
  }
}
