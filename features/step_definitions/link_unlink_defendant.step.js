import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { DEFENDANT_NAME, URN } from "../../config.js";
import testUsers from "../../data/testUsers.js";

setDefaultTimeout(60 * 1000);

const MAAT_ID = "6079985";

When("User visits the summary page of unlinked case {string}", async function (urn) {
    await this.searchPage.searchByURN(urn)
    await this.searchPage.openSearchedCase(urn)
});

When("User visits the summary page of a linked case", async function () {
    await this.searchPage.searchByURN(urn)
    await this.searchPage.openSearchedCase()
    await expect(this.genericPage.body()).toContainText(MAAT_ID);
});

When("User opens the defendant details", async function () {
    await this.caseDetailPage.clickDefendant(DEFENDANT_NAME);
});

When("User enters an invalid MAAT ID", async function () {
    await this.caseDetailPage.enterMaatId("123456");
    await this.caseDetailPage.createLinkToCourtData();
});

When("User enters a valid MAAT ID", async function () {
    await this.caseDetailPage.enterMaatId(MAAT_ID);
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
    await expect

});

Then("I should see the defendant details page", async function () {
    await expect(this.page).toHaveTitle(/^Defendant details/);
});

Then("I should see the MAAT ID on the page", async function () {
    await expect(this.genericPage.body()).toContainText(MAAT_ID);
});

Then("I should see the MAAT ID as {string}", async function (status) {
    await expect(this.caseDetailPage.locators.mattColumn).toContainText(status)
});
