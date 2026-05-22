import NewPage from "../Page/NewPage.js";

export default class LinkCasesPageLocators extends NewPage {
    // Navigation links
    get linkMigratedCasesNavLink() {
        return this.page.getByRole("link", { name: /link migrated cases/i });
    }

    // Table tabs
    get tableTabs() {
        return this.page.locator("nav.moj-tabs, div.govuk-tabs");
    }

    get needLinkingTab() {
        return this.page.getByRole("tab", { name: /need linking/i });
    }

    get manuallyLinkedTab() {
        return this.page.getByRole("tab", { name: /manually linked/i });
    }

    get autoLinkedTab() {
        return this.page.getByRole("tab", { name: /auto linked/i });
    }

    getTabByName(tabName) {
        return this.page.getByRole("tab", { name: new RegExp(tabName, "i") });
    }

    // Table elements
    get linkCaseTable() {
        return this.page.locator("table.govuk-table");
    }

    get linkCaseTableHeader() {
        return this.page.locator("thead.govuk-table__head");
    }

    get linkCaseTableHeaders() {
        return this.page.locator("th.govuk-table__header");
    }

    get linkCaseTableBody() {
        return this.page.locator("tbody.govuk-table__body");
    }

    get linkCaseTableRows() {
        return this.page.locator("tbody.govuk-table__body tr");
    }

    get linkCaseTableCells() {
        return this.page.locator("td.govuk-table__cell");
    }

    // Row selection and interactions
    linkCaseTableRowByIndex(index) {
        return this.page.locator(`tbody.govuk-table__body tr:nth-child(${index})`);
    }

    linkCaseTableRowByText(text) {
        return this.page.locator(`tr:has-text("${text}")`);
    }

    getCaseLinkButton(index) {
        return this.page.locator(`tbody.govuk-table__body tr:nth-child(${index}) a`);
    }

    // Empty state
    get emptyStateMessage() {
        return this.page.locator("p.govuk-body").last();
    }

    // Guidance text
    get guidanceText() {
        return this.page.locator(".guidance-text, .inset-text");
    }
}
