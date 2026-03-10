import NewPage from "../Page/NewPage.js";

export default class GenericLocators extends NewPage {
    get errorBox() {
        return this.page.locator('div.govuk-error-summary')
    }

    get signInMessageBox() {
        return this.page.locator('div.govuk-error-summary__title');
    }

    get successMessageBox() {
        return this.page.locator('div.lcdui-notice-summary')
    }

    get body() {
        return this.page.locator('body');
    }

    get heading() {
        return this.page.locator('h1');
    }

    subheading(text) {
        return this.page.locator('h2', { hasText: text });
    }

    linkByName(linkText) {
        return this.page.getByRole('link', { name: linkText });
    }

    get searchLink() {
        return this.page.getByRole('link', { name: 'Search' });
    }

    get bannerMessage() {
        return this.page.locator('div.moj-banner__message')
    }

    get backToUsersLink() {
        return this.page.getByRole('link', { name: 'Back to Manage Users'})
    }
}
