import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ADMIN_EMAIL, EMAIL, MANAGER_EMAIL } from "../../config.js";

setDefaultTimeout(60 * 1000);

 async function getTextFromNthColumn(n, value) {
    const rowItems = await this.usersPage.locators.userTableBody.locator('tr').all();

    const nameTexts = Promise.all(rowItems.map(row => row.locator('td').nth(n).innerText()));
    const testValue = await Promise.all(nameTexts.find(item => item.contains(value)));
    
    return testValue;
}

 const randomUser = new Date().toLocaleDateString('en', {month: 'long'});
 const randomiser =  Math.floor(Math.random() * randomUser.length);
 const userName = `a${randomiser + randomiser}`

Given("User is not signed in", async function () {
    // Intentionally no action for unauthenticated access.
});

Given("User is signed in as a caseworker", async function () {
    await this.signIn.signInAs(EMAIL);
});

Given("User is signed in as a manager", async function () {
    await this.signIn.signInAs(MANAGER_EMAIL);
});

Given("User is signed in as an admin", async function () {
    await this.signIn.signInAs(ADMIN_EMAIL);
});

When("User visits the users page", async function () {

        const data = await this.worldContext

    if (data.pickle.tags.some(tag => tag.name === "@dev-auth") === true)
    {
        await this.signIn.gotoDevUsers();

    } else {
        await this.signIn.gotoUsers();
    }
});

When("User creates a new user", async function () {
    await this.usersPage.addNewCaseworker(userName, `test`, `j${userName}`, `test${userName}@example.com`);
});

When("User updates a user's email address", async function () {   
    await this.usersPage.changeEmail("a", `${randomUser}@example-other.com`);
});

When("User deletes a user", async function () {
    await this.usersPage.deleteUser("a");
});

When("User navigates back to the manage users page", async function () {
    await this.genericPage.goBackToUserPage()
})

Then("I should see the message {string}", async function (message) {
    // await expect(this.genericPage.locators.errorBox).toContainText(message);
    await expect(this.genericPage.locators.bannerMessage).toContainText(message);
});

Then("I should see the success message {string}", async function (message) {
    await expect(this.genericPage.signInMessageBox).toContainText(message);
});

Then("I should see the header {string}", async function (message) {
    await expect(this.genericPage.heading()).toContainText(message);
});

Then("I should see the error {string}", async function (message) {
    await expect(this.genericPage.signInBox()).toContainText(message);
});

Then("I should see {string} linked on the page", async function (maat_id) {
    await expect(this.defendantPage.locators.maatField).toHaveText(maat_id);
});
