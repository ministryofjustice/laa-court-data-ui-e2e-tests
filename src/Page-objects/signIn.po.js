import NewPage from "../Page/NewPage.js";
import SignInLocators from "../Page-locators/signIn.lo.js";

/** Sign in page class and methods */

export class SignInPage extends NewPage {
    constructor(page) {
        super(page);
        this.locators = new SignInLocators(page);
    }

    async signIn() {
        await this.locators.signInButton().click();
        await this.page.waitForLoadState();
    }
}