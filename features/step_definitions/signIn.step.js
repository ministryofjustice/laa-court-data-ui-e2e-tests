import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { VCD_URL } from "../../config.js";


setDefaultTimeout(60 * 1000);

Given("User navigates to the test environment", async function () {
    await this.page.goto(VCD_URL);

});

When("User logs in", async function () {
    await this.signIn.signInNormal();
});

Then("User should land in the home page", async function () {
    await expect(this.page).toHaveURL(VCD_URL);
    await expect(this.homePage.locators.title).toContainText('List of users')
});