import { EMAIL, MANAGER_EMAIL, VCD_URL } from '../config'

export class SigninPage {
  constructor(page) {
    this.page = page;
  }

  async signInAsCaseworker() {
    await this.signIn(EMAIL)
  }

  async signInAsManager() {
    await this.signIn(MANAGER_EMAIL)
  }

  async signIn(email) {
    await this.page.goto(VCD_URL)

    await this.page
              .getByLabel('Or (in dev environment only) choose a user to sign in as')
              .selectOption(email);

    await this.page
              .getByRole('button', { name: 'Sign in without SSO' })
              .click();
  }
}
