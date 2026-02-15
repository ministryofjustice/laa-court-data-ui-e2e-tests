import NewPage from "../Page/NewPage.js";

export default class CaseDetailLocators extends NewPage {
    defendantLink(defendantName) {
        return this.page.getByRole('link', { name: defendantName });
    }

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
}
