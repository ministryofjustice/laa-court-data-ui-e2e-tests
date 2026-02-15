import NewPage from "../Page/NewPage.js";

export default class UsersLocators extends NewPage {
    get createNewUserButton() {
        return this.page.getByRole('button', { name: 'Create a new user' });
    }

    get firstNameField() {
        return this.page.getByLabel('First name');
    }

    get lastNameField() {
        return this.page.getByLabel('Last name');
    }

    get usernameField() {
        return this.page.getByLabel('Username');
    }

    get emailField() {
        return this.page.getByRole('textbox', { name: 'Email address', exact: true });
    }

    get confirmEmailField() {
        return this.page.getByLabel('Confirm email address');
    }

    get saveButton() {
        return this.page.getByRole('button', { name: 'Save' });
    }

    userRow(fullName) {
        return this.page.locator('tr', { hasText: fullName });
    }

    editLinkForRow(row) {
        return row.getByRole('link', { name: 'Edit ' });
    }

    deleteLinkForRow(row) {
        return row.getByRole('link', { name: 'Delete ' });
    }
}
