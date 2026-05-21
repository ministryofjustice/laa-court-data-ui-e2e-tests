import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

When("User visits the search page", async function () {
    const url = this.authMode === "dev-auth"
        ? `${this.parameters.devUrl}/search_filters/new`
        : `${this.parameters.baseUrl}/search_filters/new`;
    await this.searchPage.goto(url);
});

When("User searches by valid {string}", async function (urnValue) {
    let urn;

    if (urnValue === "URN") {
        urn = this.testData.urn;
    } else {
        urn = urnValue;
    }

    await this.searchPage.searchByURN(urn);
});

When("User searches by valid ASN", async function () {
    await this.searchPage.searchByASNOrNI(this.testData.asn);
});

When("User searches by valid NI number", async function () {
    await this.searchPage.searchByASNOrNI(this.testData.niNumber);
});

When("User searches by name and DOB", async function () {
    await this.searchPage.searchByDefendant(this.testData.defendantName, this.testData.defendantDob);
});

When("User searches by invalid ASN", async function () {
    await this.searchPage.searchByASNOrNI("AAAAAAAAAAAA");
});

When("User searches with a blank NI identifier", async function () {
    await this.searchPage.searchByASNOrNI("");
});

Then("I should see {int} search result(s)", async function (count) {
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

When('User searches by valid URN', async function () {
  await this.searchPage.searchByURN(this.testData.urn);
})
