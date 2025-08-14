import { expect } from '@playwright/test';
import { EMAIL, PASSWORD, MANAGER_EMAIL, MANAGER_PASSWORD, VCD_URL } from '../config'

export class SigninPage {
  constructor(page) {
    this.page = page;
    this.signin_url = `${VCD_URL}/users/sign_in`
  }

  async signInAsCaseworker() {
    await this.signIn(EMAIL, PASSWORD)
  }

  async signInAsManager() {
    await this.signIn(MANAGER_EMAIL, MANAGER_PASSWORD)
  }

  async signIn(email, password) {
    await this.page.goto(this.signin_url)

    await this.page.getByLabel('Username or email')
              .fill(email)

    await this.page.getByRole('textbox', { name: 'Password' })
              .fill(password)

    await this.page.getByRole('button', { name: 'Sign in' })
              .click();

    await expect(this.page.locator('.lcdui-notice-summary')).toHaveText('Signed in successfully.')
  }
}
