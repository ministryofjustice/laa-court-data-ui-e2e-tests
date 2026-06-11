import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

const appealLinkText = "Appeal against conviction and sentence by a Magistrates' Court to the Crown Court";

When("User visits the summary page for appeal case {string}", async function (urn) {
    await this.caseSummaryPage.goto(urn);
});

When("User visits related court applications for appeal case {string}", async function (urn) {
    await this.caseSummaryPage.gotoRelatedCourtApplications(urn);
});

When("User opens the appeal application", async function () {
    await this.genericPage.clickLink(appealLinkText);
});

When("User opens the first appellant", async function () {
    await this.page.waitForURL(`${this.parameters.baseUrl}/court_applications/**`);
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

Then("I should see the tag for the appeal", async function () {
    const element = this.breachPage.locators.tag('Appeal');
    await expect(element).toHaveText('Appeal');
    await expect(element).toHaveCSS('background-color', 'rgb(239, 223, 237)');
});

Then("I should see the appeal heading for case {string}", async function (urn) {
    const heading = this.genericPage.heading();
    await expect(heading).toContainText("Appeal");
    await expect(heading).toContainText(urn);
});

Then("I should see the appellant heading", async function () {
    await expect(this.genericPage.heading()).toContainText("Appellant");
});
