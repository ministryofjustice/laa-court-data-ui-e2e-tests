const { Before, Given, When, Then, After } = require('@cucumber/cucumber')
const { chromium, expect } = require('@playwright/test')
// const { SigninPage } = require('../pages/signin_page.js')
const { UsersPage } = require('../pages/users_page.js')

let browser, page, context, usersPage

Before(async function(){
  // TODO: How do we automatically run each test in every browser like playwright does?
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();
  usersPage = new UsersPage(page)
});

Given('I am not signed in', async function () {
  // Nothing to do
});

When('I visit the users page', async function() {
  await usersPage.visit()
})

Then('I should see text {string}', async function (expectedText) {
  await expect(page.locator('body')).toContainText(expectedText)
})

After(async function(){
  await context.close();
  await browser.close();
});
