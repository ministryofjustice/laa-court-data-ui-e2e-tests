import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { VCD_URL, EMAIL } from "../../config.js";


setDefaultTimeout(60 * 1000);

Given("User navigates to the test environment", async function () {
    await this.page.goto(VCD_URL);
    await this.page.wait
});

When("User logs in", async function () {
    const data = await this.worldContext


    if (data.pickle.tags.some(tag => tag.name === "@dev-auth") === true)
    {
        await this.signIn.signInAs(EMAIL);

    } else {
        await this.signIn.signIn();
        // await this.page.pause();
        // await this.page.context().storageState({ path: ".auth/user.json"});
        await this.page.waitForLoadState();
        await this.homePage.selectBreadcrumb("Home");
        await this.page.waitForLoadState();
    }
});

Then("The system will pause", async function () {
    await this.page.pause();
})

Then("User should land in the home page", async function () {
    await expect(this.page).toHaveURL(`${VCD_URL}search_filters/new`);
    // await expect(this.homePage.locators.title).toContainText('Search for')
});