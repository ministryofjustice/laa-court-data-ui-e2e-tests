import { Given, When, Then, Before, setDefaultTimeout, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { SignInPage } from "../../src/Page-objects/signIn.po.js";

setDefaultTimeout(60 * 1000);

let page;
let browser;
let signIn;
const AuthFile = "playwright/.auth/user.json";


Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext(
        {
            storageState: AuthFile
        }
    );
    page = await context.newPage();
    signIn = new SignInPage(page);
});

Given("User navigates to the test environment", async () => {
    await page.goto("https://test.view-court-data.service.justice.gov.uk/");
});

When("User logs in", async () => {
    await signIn.signIn();
});

Then("User should land in the home page", async () => {
    await page.pause();
    await page.url(process.env.AUTHORITY)
});

After(async function () {
    await browser.close();    
})