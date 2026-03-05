import NewPage from "../Page/NewPage.js";
import DefendantPageLocators from "../Page-locators/defendant_page.lo.js";

export default class DefendantPage extends NewPage {
    constructor(page) {
        super(page);
        this.locators = new DefendantPageLocators(page);
    }

    async viewCase() {
        await this.locators.caseButton().click()
    }
}