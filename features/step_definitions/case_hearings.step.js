import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

async function getOrderedHearingDates(page) {
    const dates = await page.dateCells().allTextContents();
    return dates.map((date) => date.trim())
                .sort((a, b) => new Date(a) - new Date(b));
}

async function getOrderedHearingTypes(page) {
    const hearingTypes = await page.hearingTypeCells().allTextContents();
    return hearingTypes.map((type) => type.trim())
                       .sort();
}

When("User visits the summary page of a case with multiple hearings", async function () {
    await this.caseSummaryPage.goto(this.testData.urnWithMultipleHearings);
    this.orderedHearingDates = await getOrderedHearingDates(this.caseDetailPage);
    this.orderedHearingTypes = await getOrderedHearingTypes(this.caseDetailPage);
});

When("User visits the summary page for the configured case {string}", async function (urn) {
    if (this.authMode === "dev-auth") {
        await this.caseSummaryPage.gotoDev(urn);
    } else {
        await this.searchPage.searchByURN(urn);
        await this.searchPage.openSearchedCase(urn);
    }
});

When("User opens the first hearing", async function () {
    await this.caseSummaryPage.clickOnHearing(this.orderedHearingDates[0], 0);
});

When("User opens the last hearing", async function () {
    await this.caseSummaryPage.clickOnHearing(this.orderedHearingDates.at(-1), -1);
});

When("User clicks next hearing", async function () {
    await this.hearingDetailPage.clickNext();
});

When("User clicks previous hearing", async function () {
    await this.hearingDetailPage.clickPrevious();
});

When("User sorts hearings by date", async function () {
    await this.caseSummaryPage.sortByDate();
});

When("User sorts hearings by type", async function () {
    await this.caseSummaryPage.sortByHearingType();
});

Then("Hearings should be sorted by date ascending", async function () {
    await expect(this.caseDetailPage.dateCells()).toContainText(this.orderedHearingDates);
});

Then("Hearings should be sorted by date descending", async function () {
    await expect(this.caseDetailPage.dateCells()).toContainText(this.orderedHearingDates.slice().reverse());
});

Then("Hearings should be sorted by hearing type descending", async function () {
    const cellList = this.caseDetailPage.hearingTypeCells();
    await expect(cellList).toContainText(this.orderedHearingTypes.slice().reverse());
});

Then("User should see the first hearing details", async function () {
    await expect(this.page).toHaveTitle(new RegExp(`Hearing day ${this.orderedHearingDates[0]}`));
});

Then("User should see the second hearing details", async function () {
    await expect(this.page).toHaveTitle(new RegExp(`Hearing day ${this.orderedHearingDates[1]}`));
});

Then("User should see the second last hearing details", async function () {
    await expect(this.page).toHaveTitle(new RegExp(`Hearing day ${this.orderedHearingDates.at(-2)}`));
});
