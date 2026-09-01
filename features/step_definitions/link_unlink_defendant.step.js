import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import testUsers from "../../data/testUsers.js";

setDefaultTimeout(60 * 1000);

const MAAT_ID = "6079985";

When("User visits the summary page of unlinked case {string}", async function (urn) {
    await this.genericPage.clickSearchLink();
    await this.searchPage.searchByURN(urn)
    await this.searchPage.openSearchedCase(urn)
});

When("User visits the summary page of a linked case", async function () {
    await this.searchPage.searchByURN(urn)
    await this.searchPage.openSearchedCase()
    await expect(this.genericPage.body()).toContainText(MAAT_ID);
});

When("User visits the summary page of an appeal case", async function () {
    await this.searchPage.searchByURN(this.testData.appealUrn)
    await this.searchPage.openSearchedCase(this.testData.appealUrn)
    await expect(this.genericPage.body()).toContainText(this.testData.appealUrn);
});

When("User opens the defendant details for {string}", async function (urn) {
    const testUser = testUsers.find(v => v.urn === urn);
    await this.caseDetailPage.clickDefendant(testUser.name);
});

When("User opens the defendant details page", async function () {
    await this.caseDetailPage.clickDefendant();
});

When("User enters an invalid MAAT ID", async function () {
    await this.defendantPage.clickLinkMaatID();
    await this.caseDetailPage.enterMaatId("123456");
    await this.caseDetailPage.createLinkToCourtData();
});

When("User enters a valid MAAT ID", async function () {
    await this.caseDetailPage.enterMaatId(MAAT_ID);
    await this.caseDetailPage.createLinkToCourtData();
});

When("User enters MAAT ID {string}", async function (matt_id) {
    await this.caseDetailPage.enterMaatId(matt_id);
    await this.caseDetailPage.createLinkToCourtData();
});

When("User unlinks the defendant", async function () {
    await this.caseDetailPage.selectUnlinkReason("1");
    await this.caseDetailPage.removeLinkToCourtData();
});

Then("I should see the defendant details page", async function () {
    await expect(this.page).toHaveTitle(/^Defendant details/);
});

Then("I should see the defendant details page for {string}", async function (urn) {
    const testUser = testUsers.find(v => v.urn === urn);
    await expect(this.page).toHaveTitle(/^Defendant details/);
    await expect(this.defendantPage.locators.header).toContainText('Defendant');
    await expect(this.defendantPage.locators.header).toContainText(testUser.name);
    await expect(this.defendantPage.locators.tag).toHaveText('Case');
});

Then("I should see the MAAT ID on the page", async function () {
    await expect(this.genericPage.body()).toContainText(MAAT_ID);
});

Then("I should see the MAAT ID as {string}", async function (status) {
    await expect(this.caseDetailPage.locators.mattColumn).toContainText(status)
});

Then("I should be able to copy the defendant's name to the clipboard", async function () {
    const value = await this.defendantPage.getDefendantName();
    await this.defendantPage.copyDetailsByType("Defendant name");
    const clipboardText = await this.page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(value);
});

Then('I should be able to copy the following details to clipboard:', async function (dataTable) {
    const keys = dataTable.raw()[0]
    for (const key of keys) {
        const value = await this.defendantPage.getValueByType(key);
        await this.defendantPage.copyDetailsByType(key);
        const clipboardText = await this.page.evaluate(() => navigator.clipboard.readText());
        expect(clipboardText).toBe(value);
    }
});
