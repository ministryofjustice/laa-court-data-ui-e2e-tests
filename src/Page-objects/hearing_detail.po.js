import NewPage from "../Page/NewPage.js";
import HearingDetailLocators from "../Page-locators/hearing_detail.lo.js";

export default class HearingDetailPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new HearingDetailLocators(page);
    }

    async clickNext() {
        await this.locators.nextLink.click();
    }

    async clickPrevious() {
        await this.locators.previousLink.click();
    }
}
