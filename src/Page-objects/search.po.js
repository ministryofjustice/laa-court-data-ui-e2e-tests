import NewPage from "../Page/NewPage.js";
import SearchPageLocators from "../Page-locators/search.lo.js";
import { VCD_URL } from "../../config.js";

export default class SearchPage extends NewPage {
    constructor(page) {
        super(page);
        this.locators = new SearchPageLocators(page);
        this.searchUrl = `${VCD_URL}/search_filters/new`;
    }

        async goto() {
        await this.page.goto(this.searchUrl);
    }

    async searchByURN(urn) {
        await this.goto();
        await this.locators.caseByUrnRadio.check();
        await this.locators.continueButton.click();
        await this.locators.searchTermField.fill(urn);
        await this.locators.searchButton.click();
    }

    async searchByASNOrNI(asnOrNi) {
        await this.locators.defendantByAsnOrNiRadio.check();
        await this.locators.continueButton.click();
        await this.locators.searchTermField.fill(asnOrNi);
        await this.locators.searchButton.click();
    }

    async searchByDefendant(defendantName, dateStr) {
        await this.locators.defendantByNameDobRadio.check();
        await this.locators.continueButton.click();
        await this.locators.defendantNameField.fill(defendantName);

        const [day, month, year] = dateStr.split('-');
        await this.locators.dayField.fill(day);
        await this.locators.monthField.fill(month);
        await this.locators.yearField.fill(year);
        await this.locators.searchButton.click();
    }

    resultsCountHeading() {
        return this.locators.resultsCountHeading;
    }

    openSearchedCase(urn){
        return this.locators.caseURNLink(urn).click()
    }

}
