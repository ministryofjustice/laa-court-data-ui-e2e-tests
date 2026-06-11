import NewPage from "../Page/NewPage.js";
import SearchPageLocators from "../Page-locators/search.lo.js";

export default class SearchPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new SearchPageLocators(page);
    }

    async goto(url) {
        await this.navigateTo(url);
    }

    async searchByURN(urn) {
        await this.locators.caseByUrnRadio.check();
        await this.locators.continueButton.click();
        await this.locators.searchTermField.fill(urn);
        await this.locators.searchButton.click();
        await this.waitForSearchOutcome();
    }

    async searchByASNOrNI(asnOrNi) {
        await this.locators.defendantByAsnOrNiRadio.check();
        await this.locators.continueButton.click();
        await this.locators.searchTermField.fill(asnOrNi);
        await this.locators.searchButton.click();
        await this.waitForSearchOutcome();
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
        await this.waitForSearchOutcome();
    }

    async waitForSearchOutcome() {
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForSelector(
            "h1, .govuk-error-summary, body",
            { timeout: 10000 }
        );
    }

    resultsCountHeading() {
        return this.locators.resultsCountHeading;
    }

    async openSearchedCase(urn){
        await this.locators.caseURNLink(urn).first().click()
    }

}
