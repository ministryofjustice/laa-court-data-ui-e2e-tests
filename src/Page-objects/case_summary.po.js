import NewPage from "../Page/NewPage.js";
import CaseSummaryLocators from "../Page-locators/case_summary.lo.js";

export default class CaseSummaryPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new CaseSummaryLocators(page);
    }

    async goto(urn) {
        await this.page.goto(`${this.baseUrl}/prosecution_cases/${urn}`);
    }

    async gotoDev(urn) {
        await this.page.goto(`${this.devUrl}/prosecution_cases/${urn}`);
    }

    async gotoRelatedCourtApplications(urn) {
        await this.page.goto(`${this.baseUrl}/prosecution_cases/${urn}/related_court_applications`);
    }

    async sortByDate() {
        await this.locators.dateSortLink.click();
    }

    async sortByHearingType() {
        await this.locators.hearingTypeSortLink.click();
    }

    async clickOnHearing(hearingDate) {
        await this.locators.hearingLink(hearingDate).click();
    }

    async clickOnApplication() {
        await this.locators.applicationTypeLink().click();
    }
}
