import NewPage from "../Page/NewPage.js";

export default class CourtApplicationLocators extends NewPage {
    get firstAppellantLink() {
        return this.page.locator('table.govuk-table tbody tr td:nth-child(1) a').first();
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
}
