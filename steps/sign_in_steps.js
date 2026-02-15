import { SignInPage } from '../src/Page-objects/signIn.po.js'
import { EMAIL, MANAGER_EMAIL } from '../config.js'

export class SignInSteps {
  constructor(page) {
    this.signInPage = new SignInPage(page)
  }

  async givenIAmSignedInAsACaseworker() {
    await this.signInPage.signInNormal()
  }
  async givenIAmSignedInAsAManager() {
    await this.signInPage.signInAs(MANAGER_EMAIL)
  }
  async givenIAmSignedInAsACaseworkerInDev() {
    await this.signInPage.signInAs(EMAIL)
  }
  async givenIAmNotSignedIn() {}
}
