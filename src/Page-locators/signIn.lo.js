import { Locator } from '@playwright/test';
import Page from '@playwright/test'
import NewPage from '../Page/NewPage';

export default class SignInLocators extends NewPage{
    /** stores the element via a getter */

    signInButton() {
        const button = this.page.getByRole('button', { hasText: 'Sign in'});
    }
}