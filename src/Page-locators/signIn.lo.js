import NewPage from '../Page/NewPage.js';

export default class SignInLocators extends NewPage {
    constructor(page) {
        super(page);
    }

    signInButton() {
        return this.page.getByRole('button', { hasText: 'Sign in' });
    }
}