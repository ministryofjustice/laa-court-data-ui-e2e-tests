import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { SignInPage } from "../../src/Page-objects/signIn.po.js";
import { VCD_URL } from "../../config.js";


setDefaultTimeout(60 * 1000);

Given("User navigates to the test environment", async function () {
    await this.page.goto("https://test.view-court-data.service.justice.gov.uk/");
});

When("User logs in", async function () {
    const signIn = new SignInPage(this.page);
    await signIn.signIn();
});

Then("User should land in the home page", async function () {
    // await this.page.pause();
    await expect(this.page).toHaveURL(VCD_URL);
});