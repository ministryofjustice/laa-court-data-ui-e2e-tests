import NewPage from "../Page/NewPage.js";
import SignInLocators from "../Page-locators/signIn.lo.js";
import { VCD_DEV_URL, VCD_URL } from "../../config.js";

/** Sign in page class and methods */

export class SignInPage extends NewPage {
    constructor(page) {
        super(page);
        this.locators = new SignInLocators(page);
    }

    async goTo() {
        await this.page.goto(VCD_URL);
    }

    async goToDev() {
        await this.page.goto(VCD_DEV_URL || VCD_URL);
    }

    async signInNormal() {
        await this.goTo();
        await this.page.waitForLoadState();
    }

    async signInAs(email) {
        await this.goToDev();
        await this.locators.userSelect.selectOption(email);
        await this.locators.signInWithoutSsoButton.click();
        await this.page.waitForLoadState();
    }

    async signIn() {
        await this.signInNormal();
    }
}