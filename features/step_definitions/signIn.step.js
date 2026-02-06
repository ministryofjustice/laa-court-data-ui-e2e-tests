import { Given, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

setDefaultTimeout(60 * 1000);

let page;
let browser;

Before(async function () {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
});

Given("User navigates to the test environment", async () => {
    await page.goto("https://test.view-court-data.service.justice.gov.uk/");
});