import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

const breachLinkText = "Failing to comply with the community requirements of a suspended sentence order";

When("User visits the summary page for breach case {string}", async function (urn) {
    await this.caseSummaryPage.goto(urn);
});

When("User visits related court applications for breach case {string}", async function (urn) {
    await this.caseSummaryPage.gotoRelatedCourtApplications(urn);
});

When("User opens related court applications", async function () {
    await this.caseDetailPage.clickRelatedCourtApplications();
    await expect(this.page).toHaveTitle(/^Case\s.+/);
});

When("User opens the breach application", async function () {
    await this.genericPage.clickLink(breachLinkText);
});

When("User opens the first respondent", async function () {
    await this.courtApplicationPage.clickFirstAppellant();
});

When("User links a valid MAAT ID", async function () {
    const maatId = Date.now().toString().slice(-7);
    await this.courtApplicationPage.enterMaatId(maatId);
    await this.courtApplicationPage.createLinkToCourtData();
});

When("User unlinks the court application", async function () {
    await this.courtApplicationPage.selectUnlinkReason("1");
    await this.courtApplicationPage.removeLinkToCourtData();
});

Then("I should see the breach heading for case {string}", async function (urn) {
    const heading = this.genericPage.heading();
    await expect(heading).toContainText("Breach");
    await expect(heading).toContainText(urn);
});

Then("I should see the respondent heading", async function () {
    await expect(this.genericPage.heading()).toContainText("Respondent");
});

Then("I should see the subheading {string}", async function (text) {
    await expect(this.genericPage.subheading(text)).toBeVisible();
});
