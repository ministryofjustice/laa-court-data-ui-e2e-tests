import NewPage from "../Page/NewPage.js";
import UsersLocators from "../Page-locators/users.lo.js";

export default class UsersPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new UsersLocators(page);
    }

    async goto() {
        await this.page.goto(`${this.baseUrl}/users`);
    }

    async addNewCaseworker(firstName, lastName, username, email) {
        await this.locators.createNewUserButton.click();
        await this.locators.firstNameField.fill(firstName);
        await this.locators.lastNameField.fill(lastName);
        await this.locators.usernameField.fill(username);
        await this.locators.emailField.fill(email);
        await this.locators.confirmEmailField.fill(email);
        await this.locators.saveButton.click();
    }

    async changeEmail(fullName, newEmail) {
        const row = this.locators.userRow(fullName);
        await this.locators.editLinkForRow(row).first().click();
        await this.locators.emailField.fill(newEmail);
        await this.locators.confirmEmailField.fill(newEmail);
        await this.locators.saveButton.click();
        await this.page.waitForLoadState();
        await this.locators.saveButton.click();
    }

    async deleteUser(fullName) {
        const row = this.locators.userRow(fullName);
        this.page.on('dialog', dialog => dialog.accept());
        await this.locators.deleteLinkForRow(row).first().click();
        await this.page.waitForURL(`**/users/**`);
        await this.locators.confirmDeleteButton.click();
    }
}
