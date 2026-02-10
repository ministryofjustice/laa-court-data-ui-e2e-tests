import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

const AuthFile = "playwright/.auth/user.json";

Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({ storageState: AuthFile });
    this.page = await this.context.newPage();
});

After(async function () {
    await this.browser.close();
});