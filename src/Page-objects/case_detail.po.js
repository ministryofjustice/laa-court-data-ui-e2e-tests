import NewPage from "../Page/NewPage.js";
import CaseDetailLocators from "../Page-locators/case_detail.lo.js";

export default class CaseDetailPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new CaseDetailLocators(page);
    }

    async clickDefendant(defendantName) {
        if (defendantName) {
            await this.locators.defendantLink(defendantName).click();
        } else {
            await this.locators.firstDefendantLink.click();
        }
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

    dateCells() {
        return this.locators.dateCells;
    }

    hearingTypeCells() {
        return this.locators.hearingTypeCells;
    }
}
