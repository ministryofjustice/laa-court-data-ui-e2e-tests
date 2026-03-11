import NewPage from "../Page/NewPage.js";

export default class SearchPageLocators extends NewPage {
    get searchLink() {
        return this.page.locator('strong.govuk-service-navigation__active-fallback', {name: 'Search'})
    }

    get caseByUrnRadio() {
        return this.page.getByRole('radio', { name: 'A case by URN' });
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
        return this.page.getByRole('textbox');
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
        return this.page.getByRole('button', { type: 'Search' });
    }

    get resultsCountHeading() {
        return this.page.locator('div.govuk-heading-l');
    }

    caseURNLink(urn) {
        return this.page.getByRole('link', { name: urn })
    }
}