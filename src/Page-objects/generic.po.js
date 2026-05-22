import NewPage from "../Page/NewPage.js";
import GenericLocators from "../Page-locators/generic.lo.js";
import { expect } from "@playwright/test";

export default class GenericPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new GenericLocators(page);
    }

    async clickLink(linkText) {
        await this.locators.linkByName(linkText).click();
    }

    signInBox() {
        return this.locators.signInMessageBox;
    }

    body() {
        return this.locators.body;
    }

    heading() {
        return this.locators.heading;
    }

    subheading(text) {
        return this.locators.subheading(text);
    }

    async clickSearchLink() {
        await this.locators.searchLink.click();
    }

    async goBackToUserPage() {
        await this.locators.backToUsersLink.click();
        await this.page.waitForLoadState("networkidle");
    }

    async verifyPageTitle(expectedTitle) {
        await expect(this.locators.heading).toContainText(expectedTitle);
    }

    async verifyTableTabsVisible() {
        await expect(this.locators.tableTabs).toBeVisible();
    }

    async clickTab(tabName) {
        await this.locators.getTabByName(tabName).click();
    }

    async clickLinkByName(linkName) {
        await this.locators.clickLinkByName(linkName).click();
    }

    async verifyTabIsActive(tabName) {
        const tab = this.locators.getTabByName(tabName).first();
        const ariaCurrent = await tab.getAttribute('aria-current');
        const ariaSelected = await tab.getAttribute('aria-selected');
        if (ariaCurrent !== 'page' && ariaSelected !== 'true') {
            throw new Error(`Expected tab "${tabName}" to be active, but aria-current="${ariaCurrent}" and aria-selected="${ariaSelected}"`);
        }
    }

    async logout() {
        const button = this.locators.logoutButton();
        if (await button.isVisible()) {
            await button.click();
        }
    }
}
