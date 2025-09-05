import { expect } from '@playwright/test'

export class HearingDetailPage {
  constructor(page) {
    this.page = page
  }

  async clickNext() {
    await this.page.getByRole('link', { name: 'Next' }).click();
  }

  async clickPrevious() {
    await this.page.getByRole('link', { name: 'Previous' }).click();
  }

  async expectTitle(day) {
    await expect(this.page).toHaveTitle(this.buildRegexp(`Hearing day ${day}`))
  }

  buildRegexp(string) {
    return new RegExp(string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'));
  }
}
