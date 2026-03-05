import NewPage from "../Page/NewPage.js";

export default class DefendantPagelocator extends NewPage {
    get navLinks() {
        return this.page.locator('div.govuk-service-navigation__container');
    }

    get breadcrumbs() {
        return this.page.locator('ol.govuk-breadcrumbs__list');
    }

    get caption() {
        return this.page.locator('span.govuk-caption-xl');
    }

    get header() {
        return this.page.locator('h1');
    }

    get tag() {
        return this.page.locator('strong[class="govuk-tag govuk-!-margin-bottom-5"]');
    }

    get table() {
        return this.page.getByRole('table');
    }

    get caseButton() {
        return this.page.getByRole('button', {name: 'View case'});
    }

    get maatField() {
        return this.page.getByRole('row', { name: 'MAAT number' }).getByRole('cell');
    }
}