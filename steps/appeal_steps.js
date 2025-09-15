import { expect } from '@playwright/test'

export class AppealSteps {
  constructor(page) {
    this.page = page
  }

// TODO: test this method
  async andIClickOnTheFirstAppellantLink() {
    const nameLink = this.page.locator('table.govuk-table tbody tr td:nth-child(1) a').first();

    // log nameLink for debugging
    console.log('>>>');
    console.log(await nameLink.textContent());

    await expect(nameLink).toBeVisible();
    await nameLink.click();
  }

  async andIEnterAValidMAAT(maatId) {
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
}
