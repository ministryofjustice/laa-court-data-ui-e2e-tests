import NewPage from "../Page/NewPage.js";
import SignInLocators from "../Page-locators/signIn.lo.js";
import { VCD_DEV_URL, VCD_URL } from "../../config.js";

/** Sign in page class and methods */

export default class SignInPage extends NewPage {
    constructor(page) {
        super(page);
        this.locators = new SignInLocators(page);
    }

    async goTo() {
        await this.page.goto(VCD_URL);
    }

    async goToDev() {
        await this.page.goto(VCD_DEV_URL);
    }

    async gotoUsers() {
        await this.page.goto(`${VCD_URL}/users`);
    }

    async gotoDevUsers() {
        await this.page.goto(`${VCD_DEV_URL}/users`);
    }

    async signIn() {
        await this.goTo(VCD_URL);
        await this.page.waitForLoadState();
        await this.locators.signInButton.click();
    }

    async signInAs(email) {
        await this.goToDev();
        await this.locators.userSelect.selectOption(email);
        await this.locators.signInWithoutSsoButton.click();
        await this.page.waitForLoadState();
    }
}