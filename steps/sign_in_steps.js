
import { SigninPage } from '../pages/signin_page.js'

export class SignInSteps {
  constructor(page) {
    this.signinPage = new SigninPage(page)
  }

  async givenIAmSignedInAsACaseworker() {
    await this.signinPage.signInAsCaseworker()
  }
  async givenIAmSignedInAsAManager() {
    await this.signinPage.signInAsManager()
  }
  async givenIAmNotSignedIn() {}
}
