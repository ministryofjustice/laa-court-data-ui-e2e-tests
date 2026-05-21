import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

const newUserKeyword = "autotest";
const randomWords = ["amber", "cedar", "falcon", "maple", "nova", "river", "summit", "violet"];
const pickWord = () => randomWords[Math.floor(Math.random() * randomWords.length)];

function buildTestUser() {
    const timestamp = Date.now();
    const randomiser = Math.floor(Math.random() * 10000);
    const token = `${pickWord()}-${pickWord()}-${timestamp}-${random}`;
    // Username appears to be truncated by the app; keep it short to preserve exact matching.
    const username = `at${String(timestamp).slice(-3)}${String(random).padStart(4, '0')}`;

    return {
        firstName: `${newUserKeyword}-${pickWord()}`,
        lastName: "test",
        username,
        email: `${newUserKeyword}-${token}@example.com`,
        updatedEmail: `${newUserKeyword}-updated-${token}@example-other.com`
    };
}

Given("User is not signed in", async function () {
    // Intentionally no action for unauthenticated access.
});

Given("User is signed in as a caseworker", async function () {
    await this.genericPage.logout();
    await this.signIn.signInAs(this.parameters.defaultEmail);
});

Given("User is signed in as a manager", async function () {
    await this.genericPage.logout();
    await this.signIn.signInAs(this.parameters.managerEmail);
});

Given("User is signed in as an admin", async function () {
    await this.genericPage.logout();
    await this.signIn.signInAs(this.parameters.adminEmail);
});

When("User visits the users page", async function () {
    if (this.authMode === "dev-auth") {
        await this.signIn.gotoDevUsers();
    } else {
        await this.signIn.gotoUsers();
    }
});

When("User creates a new user", async function () {
    this.createdUser = buildTestUser();
    await this.usersPage.addNewCaseworker(
        this.createdUser.firstName,
        this.createdUser.lastName,
        this.createdUser.username,
        this.createdUser.email
    );
});

When("User updates a user's email address", async function () {   
    if (!this.createdUser?.username) {
        throw new Error("No created test user found in world state");
    }
    await this.usersPage.changeEmail(this.createdUser.username, this.createdUser.updatedEmail);
});

When("User deletes a user", async function () {
    if (!this.createdUser?.username) {
        throw new Error("No created test user found in world state");
    }
    await this.usersPage.deleteUser(this.createdUser.username);
});

When("User navigates back to the manage users page", async function () {
    if (this.authMode === "dev-auth") {
        await this.signIn.gotoDevUsers();
    } else {
        await this.signIn.gotoUsers();
    }
    await this.page.waitForLoadState("networkidle");
})

Then("I should see the message {string}", async function (message) {
    await expect(this.genericPage.body()).toContainText(message);
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
