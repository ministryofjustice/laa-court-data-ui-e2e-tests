import NewPage from "../Page/NewPage.js";

export default class CaseDetailLocators extends NewPage {

    get maatIdField() {
        return this.page.getByLabel('MAAT ID');
    }

    get createLinkButton() {
        return this.page.getByRole('button', { name: 'Create link to court data' });
    }

    get unlinkReasonSelect() {
        return this.page.getByLabel('Reason for unlinking');
    }

    get removeLinkButton() {
        return this.page.getByRole('button', { name: 'Remove link to court data' });
    }

    get relatedCourtApplicationsLink() {
        return this.page.getByRole('link', { name: 'Related court applications' });
    }

    get tableCells() {
        return this.page.locator('td');
    }

    get dateCells() {
        return this.page.locator('a');
    }

    defendantLink(defendantName) {
        return this.page.getByRole('link', { name: defendantName });
    }

    get defendantTable() {
        return this.page.getByRole('table').first();
    }

    get hearingsTable() {
        return this.page.getByRole('table').nth(1);
    }

    get mattColumn() {
        return this.defendantTable.filter()
    }

    get maatDefendantColumn() {
        return this.page.locator('th.govuk-table__header').filter({ hasText: 'MAAT number' })
    }
    
    get dobColumn() {
        return this.page.getByRole('columnheader', { name: 'Date of birth' })
    }
}
