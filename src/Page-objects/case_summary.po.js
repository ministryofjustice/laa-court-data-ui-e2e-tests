import NewPage from "../Page/NewPage.js";
import CaseSummaryLocators from "../Page-locators/case_summary.lo.js";
import { VCD_URL, VCD_DEV_URL } from "../../config.js";

export default class CaseSummaryPage extends NewPage {
    constructor(page) {
        super(page);
        this.locators = new CaseSummaryLocators(page);
    }

    async goto(urn) {
        await this.page.goto(`${VCD_URL}/prosecution_cases/${urn}`);
    }

    async gotoDev(urn) {
        await this.page.goto(`${VCD_DEV_URL}/prosecution_cases/${urn}`);
    }

    async gotoRelatedCourtApplications(urn) {
        await this.page.goto(`${VCD_URL}/prosecution_cases/${urn}/related_court_applications`);
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
