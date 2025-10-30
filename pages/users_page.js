import {  VCD_URL } from '../config'

export class UsersPage {
  constructor(page) {
    this.page = page
  }

  async goto() {
    await this.page.goto(`${VCD_URL}/users`)
  }

  async addNewCaseworker(firstName, lastName, username, email) {
    await this.page.getByRole('button', { name: 'Create a new user' })
              .click()
    await this.page.getByLabel('First name').fill(firstName)
    await this.page.getByLabel('Last name').fill(lastName)
    await this.page.getByLabel('Username').fill(username)
    await this.page.getByRole('textbox', { name: 'Email address', exact: true }).fill(email)
    await this.page.getByLabel('Confirm email').fill(email)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async changeEmail(fullName, newEmail) {
    let row = await this.page.locator('tr', { hasText: fullName })
    await row.getByRole('link', { name: 'Edit '}).click()
    await this.page.getByRole('textbox', { name: 'Email address', exact: true }).fill(newEmail)
    await this.page.getByLabel('Confirm email').fill(newEmail)
    await this.page.getByRole('button', { name: 'Save' }).click()
  }

  async deleteUser(fullName) {
    let row = await this.page.locator('tr', { hasText: fullName })
    this.page.on('dialog', dialog => dialog.accept());
    await row.getByRole('link', { name: 'Delete '}).click()
  }
}
