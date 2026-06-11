import NewPage from "../Page/NewPage.js";

export default class GenericLocators extends NewPage {
    get errorBox() {
        return this.page.locator('div.govuk-error-summary')
    }

    get signInMessageBox() {
        return this.page.locator('div.govuk-error-summary__title');
    }

    get successMessageBox() {
        return this.page.locator('div.lcdui-notice-summary')
    }

    get body() {
        return this.page.locator('body');
    }

    get pageTitle() {
        return this.page.getByRole("heading", { level: 1 });
    }

    get heading() {
        return this.page.locator('h1');
    }

    subheading(text) {
        return this.page.locator('h2', { hasText: text });
    }

    linkByName(linkText) {
        return this.page.getByRole('link', { name: linkText });
    }

    get searchLink() {
        return this.page.getByRole('link', { name: 'Search' });
    }

    get bannerMessage() {
        return this.page.locator('div.moj-banner__message')
    }

    get backToUsersLink() {
        return this.page.getByRole('link', { name: 'Back to Manage Users'})
    }

    // Navigation tabs — try MOJ sub-navigation and GOV.UK tabs components
    get subNavigationTabs() {
        return this.page.locator("ul.moj-sub-navigation__list");
    }

    get tableTabs() {
        return this.page.locator(
            "ul.moj-sub-navigation__list, div.govuk-tabs, nav[aria-label*='tab'], [role='tablist']"
        ).first();
    }

    getTabByName(tabName) {
        const byLink = this.page.getByRole("link", { name: new RegExp(tabName, "i") });
        const byTab = this.page.getByRole("tab", { name: new RegExp(tabName, "i") });
        return byLink.or(byTab);
    }

    getActiveTab() {
        return this.page.locator("[role='link'][aria-selected='true']");
    }

    clickLinkByName(linkName) {
        // Try link role first (standard <a> tags), fall back to tab role (aria tabs)
        const byLink = this.page.getByRole("link", { name: new RegExp(linkName, "i") });
        const byTab = this.page.getByRole("tab", { name: new RegExp(linkName, "i") });
        return byLink.or(byTab);
    }

    logoutButton() {
        return this.page.locator("a").filter({ hasText: "Sign out" });
    }
}
