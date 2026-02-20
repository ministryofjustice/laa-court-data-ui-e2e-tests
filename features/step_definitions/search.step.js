import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { URN, ASN, NI_NUMBER, DEFENDANT_NAME, DEFENDANT_DOB } from "../../config.js";

setDefaultTimeout(60 * 1000);

When("User visits the search page", async function () {
    await this.searchPage.goto();
});

When("User searches by valid {string}", async function (urnValue) {
    let urn

    if (urnValue === "URN") {
        urn = URN
    } else {
        urn = urnValue
    }

    await this.searchPage.searchByURN(urn);
});

When("User searches by valid ASN", async function () {
    await this.searchPage.searchByASNOrNI(ASN);
});

When("User searches by valid NI number", async function () {
    await this.searchPage.searchByASNOrNI(NI_NUMBER);
});

When("User searches by name and DOB", async function () {
    await this.searchPage.searchByDefendant(DEFENDANT_NAME, DEFENDANT_DOB);
});

When("User searches by invalid ASN", async function () {
    await this.searchPage.searchByASNOrNI("AAAAAAAAAAAA");
});

When("User searches with a blank NI identifier", async function () {
    await this.searchPage.searchByASNOrNI("");
});

Then("I should see {int} search results", async function (count) {
    const responseText = count > 1 ? 'search results'  : 'search result'
    const resultsText = `${count} ${responseText}`
    await expect(this.searchPage.resultsCountHeading()).toContainText(resultsText);
});

Then("I should see the no results message", async function () {
    await expect(this.page.locator("body")).toContainText("There are no matching results.");
});

Then("I should see the search term required warning", async function () {
    await expect(this.page.locator("body")).toContainText("There is a problem");
    await expect(this.page.locator("body")).toContainText("Search term required");
});