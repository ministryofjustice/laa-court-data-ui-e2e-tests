import NewPage from '../Page/NewPage.js';

export default class SignInLocators extends NewPage {
    get signInButton() {
        return this.page.locator('button[type="submit"]');

    }
}