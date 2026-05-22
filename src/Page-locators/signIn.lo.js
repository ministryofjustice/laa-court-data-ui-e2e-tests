import NewPage from '../Page/NewPage.js';

export default class SignInLocators extends NewPage {
    get userSelect() {
        return this.page.getByLabel('Or (in dev environment only) choose a user to sign in as');
    }

    get signInWithoutSsoButton() {
        return this.page.getByRole('button', { name: 'Sign in without SSO' });
    }

    get signInButton() {
        // Specific selector for Microsoft SSO sign-in button (govuk-button--start style)
        return this.page.locator('button.govuk-button--start[type="submit"]');
    }

    get microsoftSignInButton() {
        // Fallback for any submit button if the primary selector fails
        return this.page.locator('button[type="submit"]');
    }
}