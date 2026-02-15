import NewPage from "../Page/NewPage.js";

export default class CaseSummaryLocators extends NewPage {
    get dateSortLink() {
        return this.page.getByRole('link', { name: 'Date' });
    }

    get hearingTypeSortLink() {
        return this.page.locator('a[aria-label="Sort type desc"]');
    }

    hearingLink(hearingDate) {
        return this.page.getByRole('link', { name: hearingDate });
    }
}
