import NewPage from '../Page/NewPage.js';

export default class SignInLocators extends NewPage {
    get userSelect() {
        return this.page.getByLabel('Or (in dev environment only) choose a user to sign in as');
    }

    get signInWithoutSsoButton() {
        return this.page.getByRole('button', { name: 'Sign in without SSO' });
    }

    get signInButton() {
        return this.page.locator('button[type="submit"]');
    }
}