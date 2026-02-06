import NewPage from "../Page/NewPage";
import Page from '@playwright/test'
import SignInLocators from "../Page-locators/signIn.lo";

/** Sign in page class and methods */

export class SignInPage extends NewPage{
    constructor() {
        this.page = Page;
        signInButton = new SignInLocators(page);
    }

    async signIn(){
        signIn = this.signInButton;
        await this.signIn?.click();
        await this.page?.waitForLoadState();
    }
}