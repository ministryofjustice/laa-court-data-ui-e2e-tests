import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

Given("User navigates to the test environment", async function () {
    await this.page.goto(this.parameters.baseUrl);
    await this.page.waitForLoadState();
});

When("User logs in", async function () {
    await this.loginAsDefaultUser();
});

Then("The system will pause", async function () {
    await this.page.pause();
})

Then("User should land in the home page", async function () {
    await expect(this.page).toHaveURL(`${this.parameters.baseUrl}search_filters/new`);
});