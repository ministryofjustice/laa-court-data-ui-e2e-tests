import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { EMAIL, MANAGER_EMAIL } from "../../config.js";

setDefaultTimeout(60 * 1000);

Given("User is not signed in", async function () {
    // Intentionally no action for unauthenticated access.
});

Given("User is signed in as a caseworker", async function () {
    await this.signIn.signInAs(EMAIL);
});

Given("User is signed in as a manager", async function () {
    await this.signIn.signInAs(MANAGER_EMAIL);
});

When("User visits the users page", async function () {
    await this.usersPage.goto();
});

When("User creates a new user", async function () {
    await this.usersPage.addNewCaseworker("Jane", "Doe", "jdoe", "jane@example.com");
});

When("User updates a user's email address", async function () {
    await this.usersPage.changeEmail("Jane Doe", "jane-other@example-other.com");
});

When("User deletes a user", async function () {
    await this.usersPage.deleteUser("Jane Doe");
});

Then("I should see the message {string}", async function (message) {
    await expect(this.genericPage.body()).toContainText(message);
});
