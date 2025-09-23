import { expect } from '@playwright/test'

export class AppealSteps {
  constructor(page) {
    this.page = page
  }

  async andIClickOnTheFirstAppellantLink() {
    const nameLink = this.page.locator('table.govuk-table tbody tr td:nth-child(1) a').first();

    await expect(nameLink).toBeVisible();
    await nameLink.click();
  }

  async andIEnterAValidMAAT() {

    const maatId = this.getRandomMaatId();
    console.log(`Using MAAT ID: ${maatId}`);

    await this.page.getByLabel('MAAT ID')
                    .fill(maatId)

    await this.page.getByRole('button', { name: 'Create link to court data' })
              .click();
  }

  async andIUnlink() {
    await this.page.getByLabel('Reason for unlinking')
              .selectOption('1')

    await this.page.getByRole('button', { name: 'Remove link to court data' })
              .click();
  }

  // Return 7 digit timestamp to use as MAAT ID
  // Used to generate unique MAAT IDs to avoid conflicts
  getRandomMaatId() {
    return Date.now().toString().slice(-7);
  }
}
