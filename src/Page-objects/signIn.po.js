import NewPage from "../Page/NewPage.js";
import SignInLocators from "../Page-locators/signIn.lo.js";

/** Sign in page class and methods */

export default class SignInPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new SignInLocators(page);
    }

    async goTo() {
        console.log(this.baseUrl);
        await this.page.goto(this.baseUrl);
    }

    async goToDev() {
        await this.page.goto(this.devUrl);
    }

    async gotoUsers() {
        await this.page.goto(`${this.baseUrl}/users`);
    }

    async gotoDevUsers() {
        await this.page.goto(`${this.devUrl}/users`);
    }

    async signIn() {
        await this.goTo();
        await this.page.waitForLoadState();
    }

    async signInAs(email) {
        await this.goToDev();
        await this.locators.userSelect.selectOption(email);
        await this.locators.signInWithoutSsoButton.click();
        await this.page.waitForLoadState();
    }
}