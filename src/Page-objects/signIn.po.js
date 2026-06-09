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
        await this.page.goto(this.parameters.devUrl);
    }

    async gotoUsers() {
        await this.page.goto(`${this.baseUrl}/users`);
    }

    async gotoDevUsers() {
        await this.page.goto(`${this.parameters.devUrl}/users`);
    }

    async signIn() {
        await this.goTo();
        await this.page.waitForLoadState('domcontentloaded');

        const signInButton = this.locators.signInButton;
        const devUserSelect = this.locators.userSelect;
        const devSignInButton = this.locators.signInWithoutSsoButton;

        if (await signInButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            console.log('Found SSO sign-in button, clicking it');
            await signInButton.click();
            await this.page.waitForLoadState('networkidle');
            return;
        }

        if (await devUserSelect.isVisible({ timeout: 3000 }).catch(() => false)) {
            console.log('Detected dev sign-in form, signing in without SSO');
            await devUserSelect.selectOption(this.parameters.defaultEmail);
            await devSignInButton.click();
            await this.page.waitForLoadState('networkidle');
            return;
        }

        console.log('No sign-in controls found, continuing with existing session');
        await this.page.waitForLoadState('networkidle');
    }

    async signInAs(email) {
        await this.goToDev();
        await this.locators.userSelect.selectOption(email);
        await this.locators.signInWithoutSsoButton.click();
        await this.page.waitForLoadState();
    }
}