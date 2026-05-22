import { When, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000);

When("User visits the summary page for a nonexistent case", async function () {
    await this.caseSummaryPage.gotoDev("NOT_A_REAL_CASE");
});
