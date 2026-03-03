import NewPage from "../Page/NewPage.js";

export default class DefendantPageLocators extends NewPage {
    get navLinks() {
        return this.page.locators('div.govuk-service-navigation__container')
    }

    get breadcrumbs() {
        return this.page.locators('ol.govuk-breadcrumbs__list')
    }

    get caption() {
        return this.page.locators('span.govuk-caption-xl')
    }

    get header() {
        return this.page.locators('h1')
    }

    get tag() {
        return this.page.locators('strong[class="govuk-tag govuk-!-margin-bottom-5"]')
    }

    get table() {
        return this.page.getByRole('table')
    }

    get viewCaseButton() {
        return this.page.getByRole('button', {name: 'View case'})
    }
}