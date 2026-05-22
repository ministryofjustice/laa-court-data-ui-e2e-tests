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
        // Wait for navigation to start (redirect to SSO or stay on page)
        await this.page.waitForLoadState('domcontentloaded');
        
        // Check if we're on the Microsoft sign-in page and click the sign-in button
        const signInButton = this.locators.signInButton;
        try {
            // Wait up to 5 seconds for the button to be available (if on Microsoft login)
            if (await signInButton.isVisible({ timeout: 5000 }).catch(() => false)) {
                console.log('Found SSO sign-in button, clicking it');
                await signInButton.click();
                // Wait for the OAuth flow to complete and return to app
                await this.page.waitForLoadState('networkidle');
            } else {
                // Already signed in, just wait for page to load
                console.log('No SSO button found, assuming already authenticated');
                await this.page.waitForLoadState('networkidle');
            }
        } catch (error) {
            console.log('Error during SSO button interaction:', error.message);
            // If button click fails, wait for normal page load
            await this.page.waitForLoadState();
        }
    }

    async signInAs(email) {
        await this.goToDev();
        await this.locators.userSelect.selectOption(email);
        await this.locators.signInWithoutSsoButton.click();
        await this.page.waitForLoadState();
    }
}