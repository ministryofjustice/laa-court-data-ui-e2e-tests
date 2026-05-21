import { setDefaultTimeout, Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

// Given steps
Given("User navigates to the {string} page", async function (pageName) {
    if (pageName.includes("Link migrated cases")) {
        await this.linkCasesPage.navigateToLinkMigratedCases();
    } else {
        throw new Error(`Unknown page: ${pageName}`);
    }
});

// Then steps - Page verification (delegated to generic page)
Then("I should see the {string} page title", async function (expectedTitle) {
    await this.genericPage.verifyPageTitle(expectedTitle);
});

Then("I should see the table tabs", async function () {
    await this.genericPage.verifyTableTabsVisible();
});

Then("I should see the {string} tab is active", async function (tabName) {
    await this.genericPage.verifyTabIsActive(tabName);
});

// Table column verification
Then("I should see the cases table with the following columns:", async function (dataTable) {
    const columns = dataTable.raw().map(row => row[0]);
    await this.linkCasesPage.verifyTableColumnsExist(columns);
});

Then("I should see at least {int} case in the table", async function (minimumCount) {
    await this.linkCasesPage.verifyAtLeastOneCase(minimumCount);
});

// Column data type validation
Then("I should see that the {string} column contains valid URN formats", async function (columnName) {
    const isValid = await this.linkCasesPage.verifyColumnContainsValidData(
        columnName,
        (value) => /^[A-Z0-9]+$/.test(value) && value.length > 0
    );
    expect(isValid).toBe(true);
});

Then("I should see that the {string} column contains text values", async function (columnName) {
    const isValid = await this.linkCasesPage.verifyColumnContainsValidData(
        columnName,
        (value) => value.trim().length > 0
    );
    expect(isValid).toBe(true);
});

Then("I should see that the {string} column contains valid reference values", async function (columnName) {
    const isValid = await this.linkCasesPage.verifyColumnContainsValidData(
        columnName,
        (value) => value.trim().length > 0
    );
    expect(isValid).toBe(true);
});

// When steps - Tab interaction
When("User clicks on the {string} tab", async function (tabName) {
    await this.genericPage.clickLinkByName(tabName);
});

// Empty state verification
Given("there are no pending migrated cases available", async function () {
    // For now, we just navigate and assume the state
    await this.genericPage.clickLinkByName("Link migrated cases");
});

Then("I should see the empty table message {string}", async function (message) {
    await this.linkCasesPage.verifyEmptyState(message);
});

Then("I should see guidance text about linking migrated cases", async function () {
    await this.linkCasesPage.verifyGuidanceTextVisible();
});
