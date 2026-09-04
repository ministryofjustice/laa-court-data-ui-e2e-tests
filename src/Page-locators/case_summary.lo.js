import NewPage from "../Page/NewPage.js";

export default class CaseSummaryLocators extends NewPage {
    get dateSortLink() {
        return this.page.getByRole('link', { name: 'Date' });
    }

    get hearingTypeSortLink() {
        return this.page.locator('a[aria-label="Sort type descending"]');
    }

    hearingLink(hearingDate, index = 0) {
        return this.page.getByRole('link', { name: hearingDate }).nth(index);
    }

    get applicationTypeLink() {
        return this.page.locator('td.govuk-table__cell:has-text("Fail"):has(a)')
    }

    get referenceLink() {
        return this.page.locator('[href*="/laa_references/#"]');
    }

    get MAATLink() {
        return this.page.getByRole('columnheader', { name: 'MAAT number' });
    }
}
