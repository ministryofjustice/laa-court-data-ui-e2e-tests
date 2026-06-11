import NewPage from "../Page/NewPage.js";
import LinkCasesPageLocators from "../Page-locators/link_cases_page.lo.js";
import { expect } from "@playwright/test";

export default class LinkCasesPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new LinkCasesPageLocators(page);
    }

    async navigateToLinkMigratedCases() {
        await this.locators.linkMigratedCasesNavLink.click();
        await this.page.waitForLoadState("networkidle");
    }

    async goto() {
        await this.navigateToLinkMigratedCases();
    }

    // Tab interactions
    async clickTab(tabName) {
        const tab = this.locators.getTabByName(tabName);
        await tab.click();
        await this.page.waitForLoadState("networkidle");
    }

    // Table verification methods
    async verifyTableHeadersVisible() {
        const headers = await this.locators.linkCaseTableHeaders.count();
        return headers > 0;
    }

    async getTableRowCount() {
        return await this.locators.linkCaseTableRows.count();
    }

    async verifyAtLeastOneCase(minimumCount = 1) {
        const rowCount = await this.getTableRowCount();
        expect(rowCount).toBeGreaterThanOrEqual(minimumCount);
    }

    async verifyTableColumnsExist(expectedColumns) {
        const headerTexts = await this.locators.linkCaseTableHeaders.allTextContents();
        const normalizedHeaders = headerTexts.map(h => h.trim());
        
        for (const expectedCol of expectedColumns) {
            const found = normalizedHeaders.some(h => h.includes(expectedCol.trim()));
            if (!found) {
                throw new Error(`Column "${expectedCol}" not found in table headers`);
            }
        }
        
        return true;
    }

    // Column data validation
    async verifyColumnDataType(columnName) {
        const columnIndex = this.getColumnIndexByName(columnName);
        const cellSelector = this.getColumnCellSelector(columnIndex);
        const cells = await this.page.locator(cellSelector).allTextContents();
        
        return cells.filter(cell => cell.trim().length > 0);
    }

    getColumnIndexByName(columnName) {
        const columnMap = {
            "Case URN": 1,
            "Defendant name": 2,
            "Xhibit ref.": 3,
            "Court": 4,
            "Mode of trial": 5,
            "Reason for man. linking": 6,
            "MAAT ID": 7
        };
        return columnMap[columnName] || 1;
    }

    getColumnCellSelector(index) {
        return `tbody.govuk-table__body tr td:nth-child(${index})`;
    }

    async verifyColumnContainsValidData(columnName, validationFn) {
        const cells = await this.verifyColumnDataType(columnName);
        
        for (const cell of cells) {
            if (!validationFn(cell.trim())) {
                return false;
            }
        }
        
        return true;
    }

    // Empty state methods
    async verifyEmptyState(message) {
        await expect(this.locators.emptyStateMessage).toBeVisible();
        await expect(this.locators.emptyStateMessage).toContainText(message);
    }

    async verifyGuidanceTextVisible() {
        await expect(this.locators.guidanceText).toBeVisible();
    }

    // Utility methods
    async getCaseUrnFromFirstRow() {
        const firstCell = await this.locators.linkCaseTableRowByIndex(1).locator("td:first-child").textContent();
        return firstCell?.trim();
    }

    async getDefendantNameFromFirstRow() {
        const secondCell = await this.locators.linkCaseTableRowByIndex(1).locator("td:nth-child(2)").textContent();
        return secondCell?.trim();
    }

    async verifyCaseInTable(urn) {
        const row = this.locators.linkCaseTableRowByText(urn);
        await expect(row).toBeVisible();
    }

    async verifyCaseNotInTable(urn) {
        const row = this.locators.linkCaseTableRowByText(urn);
        await expect(row).not.toBeVisible();
    }
}
