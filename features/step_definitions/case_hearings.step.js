import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import orderedHearingDates from "../../data/ordered_hearing_dates.js";

setDefaultTimeout(60 * 1000);

When("User visits the summary page for the configured case {string}", async function (urn) {
    if (this.authMode === "dev-auth") {
        await this.caseSummaryPage.gotoDev(urn);
    } else {
        await this.searchPage.searchByURN(urn);
        await this.searchPage.openSearchedCase(urn);
    }
});

When("User opens the first hearing", async function () {
    await this.caseSummaryPage.clickOnHearing(orderedHearingDates[0]);
});

When("User opens the last hearing", async function () {
    await this.caseSummaryPage.clickOnHearing(orderedHearingDates.at(-1));
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
    await expect(this.caseDetailPage.locators.tableCells).toContainText(orderedHearingDates);
});

Then("Hearings should be sorted by date descending", async function () {
    await expect(this.caseDetailPage.locators.tableCells).toContainText(orderedHearingDates.slice().reverse());
});

Then("Hearings should be sorted by hearing type descending", async function () {
    const cellList = this.caseDetailPage.tableCells();
    await expect(cellList).toContainText([
        "Mention - Defendant to Attend (MDA)",
        "Changed description to this",
        "Application to Break Fixture (BFA)"
    ]);
});

Then("User should see the first hearing details", async function () {
    await expect(this.page).toHaveTitle(new RegExp(`Hearing day ${orderedHearingDates[0]}`));
});

Then("User should see the second hearing details", async function () {
    await expect(this.page).toHaveTitle(new RegExp(`Hearing day ${orderedHearingDates[1]}`));
});

Then("User should see the second last hearing details", async function () {
    await expect(this.page).toHaveTitle(new RegExp(`Hearing day ${orderedHearingDates.at(-2)}`));
});
