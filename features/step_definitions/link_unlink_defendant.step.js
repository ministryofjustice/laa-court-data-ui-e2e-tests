import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { DEFENDANT_NAME, URN } from "../../config.js";

setDefaultTimeout(60 * 1000);

const MAAT_ID = "6079985";

When("User visits the summary page of an unlinked case", async function () {
    await this.caseSummaryPage.goto(URN);
    await expect(this.genericPage.body()).toContainText("Not linked");
});

When("User visits the summary page of a linked case", async function () {
    await this.caseSummaryPage.goto(URN);
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

Then("I should see the MAAT ID on the page", async function () {
    await expect(this.genericPage.body()).toContainText(MAAT_ID);
});
