import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

When("User visits the summary page of a POCA case", async function () {
    await this.caseSummaryPage.goto(this.testData.pocaUrn);
})