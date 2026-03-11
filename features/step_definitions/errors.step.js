import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

When("User visits the summary page for a nonexistent case", async function () {
    await this.caseSummaryPage.gotoDev("NOT_A_REAL_CASE");
});

Then("I should see the error message {string}", async function (message) {
    await expect(this.genericPage.body()).toContainText(message);
});
