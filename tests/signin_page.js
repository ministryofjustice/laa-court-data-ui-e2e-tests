import { expect } from '@playwright/test';

export class SigninPage {
  constructor(page, base_url) {
    this.page = page;
    this.signin_url = `${base_url}/users/sign_in`
  }

  async signin(email, password) {
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
