import NewPage from "../Page/NewPage.js";

export default class SearchPageLocators extends NewPage {
    get caseByUrnRadio() {
        return this.page.getByLabel('A case by URN');
    }

    get defendantByAsnOrNiRadio() {
        return this.page.getByLabel('A defendant by ASN or National insurance number');
    }

    get defendantByNameDobRadio() {
        return this.page.getByLabel('A defendant by name and date of birth');
    }

    get continueButton() {
        return this.page.getByRole('button', { name: 'Continue' });
    }

    get searchTermField() {
        return this.page.locator('#search-term-field');
    }

    get defendantNameField() {
        return this.page.getByLabel('Defendant name');
    }

    get dayField() {
        return this.page.getByLabel('Day');
    }

    get monthField() {
        return this.page.getByLabel('Month');
    }

    get yearField() {
        return this.page.getByLabel('Year');
    }

    get searchButton() {
        return this.page.getByRole('button', { name: 'Search' });
    }

    get resultsCountHeading() {
        return this.page.locator('div.govuk-heading-l');
    }
}