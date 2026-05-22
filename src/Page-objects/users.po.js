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

    async findUserRowByUsername(username) {
        const targetUsername = String(username || "").trim();
        if (!targetUsername) {
            throw new Error("Username must be provided");
        }

        const maxAttempts = 6;
        for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
            if (attempt > 0) {
                const usersUrl = new URL('/users', this.page.url()).toString();
                await this.page.goto(usersUrl);
                await this.page.waitForLoadState("networkidle");
            }

            const maxPagesToScan = 20;
            for (let pageIndex = 0; pageIndex < maxPagesToScan; pageIndex += 1) {
                const rows = this.locators.userTableBody.locator("tr");
                const totalRows = await rows.count();
                const matches = [];

                for (let i = 0; i < totalRows; i += 1) {
                    const row = rows.nth(i);
                    const usernameInRow = (await row.locator("td").nth(1).innerText()).trim();
                    if (usernameInRow === targetUsername) {
                        matches.push(row);
                    }
                }

                if (matches.length === 1) {
                    return matches[0];
                }

                if (matches.length > 1) {
                    throw new Error(`More than one row matched username "${targetUsername}"`);
                }

                const nextPageLink = this.page.getByRole("link", { name: /Next/i });
                const hasNextPage = await nextPageLink.isVisible().catch(() => false);
                if (!hasNextPage) {
                    break;
                }

                await Promise.all([
                    this.page.waitForLoadState("networkidle"),
                    nextPageLink.click()
                ]);
            }

            if (attempt < maxAttempts - 1) {
                await this.page.waitForTimeout(1000);
            }
        }

        throw new Error(`No user row found for username "${targetUsername}"`);
    }

    async changeEmail(username, newEmail) {
        const row = await this.findUserRowByUsername(username);
        await this.locators.editLinkForRow(row).first().click();
        await this.locators.emailField.fill(newEmail);
        await this.locators.confirmEmailField.fill(newEmail);
        await Promise.all([
            this.page.waitForURL(/\/users(\/.*)?$/),
            this.locators.saveButton.click()
        ]);
        await this.page.waitForLoadState("networkidle");
    }

    async deleteUser(username) {
        const row = await this.findUserRowByUsername(username);
        this.page.on('dialog', dialog => dialog.accept());
        await this.locators.deleteLinkForRow(row).first().click();
        await this.page.waitForURL(`**/users/**`);
        await this.locators.confirmDeleteButton.click();
    }
}
