import NewPage from "../Page/NewPage.js";
import CourtApplicationLocators from "../Page-locators/court_application.lo.js";
import CaseDetailLocators from "../Page-locators/case_detail.lo.js";

export default class CourtApplicationPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new CourtApplicationLocators(page);
        this.linkingLocators = new CaseDetailLocators(page);
    }

    async clickFirstAppellant() {
        await this.locators.firstAppellantLink.click();
    }

    async enterMaatId(maatId) {
        await this.linkingLocators.maatIdField.fill(maatId);
    }

    async createLinkToCourtData() {
        await this.linkingLocators.createLinkButton.click();
    }

    async selectUnlinkReason(value) {
        await this.linkingLocators.unlinkReasonSelect.selectOption(value);
    }

    async removeLinkToCourtData() {
        await this.linkingLocators.removeLinkButton.click();
    }
}
