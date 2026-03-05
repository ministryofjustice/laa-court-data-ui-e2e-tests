import NewPage from "../Page/NewPage.js";
import CaseDetailLocators from "../Page-locators/case_detail.lo.js";

export default class CaseDetailPage extends NewPage {
    constructor(page) {
        super(page);
        this.locators = new CaseDetailLocators(page);
    }

    async clickDefendant(defendantName) {
        await this.locators.defendantLink(defendantName).click();
    }

    async enterMaatId(maatId) {
        await this.locators.maatIdField.fill(maatId);
    }

    async createLinkToCourtData() {
        await this.locators.createLinkButton.click();
    }

    async selectUnlinkReason(value) {
        await this.locators.unlinkReasonSelect.selectOption(value);
    }

    async removeLinkToCourtData() {
        await this.locators.removeLinkButton.click();
    }

    async clickRelatedCourtApplications() {
        await this.locators.relatedCourtApplicationsLink.click();
    }

    tableCells() {
        return this.locators.tableCells;
    }
}
