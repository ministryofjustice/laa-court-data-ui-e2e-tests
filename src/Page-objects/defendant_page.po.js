import NewPage from "../Page/NewPage.js";
import DefendantPageLocators from "../Page-locators/defendant_page.lo.js";

export default class DefendantPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new DefendantPageLocators(page);
    }

    async viewCase() {
        await this.locators.caseButton.click()
    }

    async clickLinkMaatID() {
        await this.locators.maatIDLink.click();
    }

    async copyDetailsByType(name) {
        await this.locators.copyButtonByType(name).click();
    }

    async getValueByType(name) {
        return await this.locators.valueByType(name).innerText();
    }

    async getDefendantName() {
        return await this.locators.defendantName;
    }
}