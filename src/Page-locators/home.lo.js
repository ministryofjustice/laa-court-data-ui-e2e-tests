import NewPage from "../Page/NewPage.js";

export default class HomePageLocators extends NewPage {
    constructor(page) {
        super(page);

        // Header
        this.header = {
            breadcrumbs: this.page.locator('ol[class="govuk-breadcrumbs__list"]'),
            logout: this.page.locator('a[data-method="delete"]')
        };
        this.title = this.page.locator('h1.govuk-fieldset__heading')
    }
}