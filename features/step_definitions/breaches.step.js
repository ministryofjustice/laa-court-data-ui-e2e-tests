import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { VCD_URL } from "../../config.js";


setDefaultTimeout(60 * 1000);

const breachLinkText = "Failing to comply with the community requirements of a suspended sentence order";

When("User visits the summary page for breach case {string}", async function (urn) {
    await this.caseSummaryPage.goto(urn);
});

When("User visits related court applications for breach case {string}", async function (urn) {
    await this.caseSummaryPage.gotoRelatedCourtApplications(urn);
});

When("User opens related court applications tab", async function () {
    await this.caseDetailPage.clickRelatedCourtApplications();
    await expect(this.page).toHaveTitle(/^Case\s.+/);
});

When("User opens the breach application", async function () {
    await this.genericPage.clickLink(breachLinkText);
});

When("User opens the breach application for the link {string}", async function (link) {
    await this.genericPage.clickLink(link);
    await this.page.waitForLoadState('domcontentloaded');
});

When("User opens the first respondent", async function () {
    await this.page.waitForURL(`${VCD_URL}court_applications/**`);
    await this.courtApplicationPage.clickFirstAppellant();
});

Then("I should see the tag for the breach", async function () {
    const element = this.breachPage.locators.breachTag;
    await expect(element).toHaveText('Breach');
    await expect(element).toHaveCSS('background-color', 'rgb(255, 247, 191)')
});

Then("I should see the breach heading for case {string}", async function (urn) {
    const heading = this.genericPage.heading();
    await expect(heading).toContainText("Breach");
    await expect(heading).toContainText(urn);
});

Then("I should see the link {string}", async function (text) {
    const heading = this.caseSummaryPage.locators.applicationTypeLink;
    await expect(heading).toContainText(text);
});

Then("I should see the respondent heading", async function () {
    await expect(this.genericPage.heading()).toContainText("Respondent");
});

Then("I should see the subheading {string}", async function (text) {
    await expect(this.genericPage.subheading(text)).toBeVisible();
});