import NewPage from "../Page/NewPage.js";

export default class CourtApplicationLocators extends NewPage {
    get firstAppellantLink() {
        return this.page.locator('table.govuk-table tbody tr td:nth-child(1) a').first();
    }
}
