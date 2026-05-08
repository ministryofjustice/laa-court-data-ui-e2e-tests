import NewPage from "../Page/NewPage.js";
import CourtApplicationLocators from "../Page-locators/court_application.lo.js";

export default class CourtApplicationPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new CourtApplicationLocators(page);
    }

    async clickFirstAppellant() {
        await this.locators.firstAppellantLink.click();
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
}
