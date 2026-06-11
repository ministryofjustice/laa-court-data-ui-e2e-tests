import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

When("User selects the {word} icon from the breadcrumbs", async function (value) {
    await this.homePage.selectBreadcrumb(value);
});

When("User opens related court applications tab", async function () {
    await this.caseDetailPage.clickRelatedCourtApplications();
    await expect(this.page).toHaveTitle(/^Case\s.+/);
});

Then("I should see the error message {string}", async function (message) {
    await expect(this.genericPage.body()).toContainText(message);
});

Then("I should see the subheading {string}", async function (text) {
    await expect(this.genericPage.subheading(text)).toBeVisible();
});
