import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { chromiumPageAndBrowser } from '../playwrightUtils.js'
import { SigninPage } from '../pages/signin_page.js'
import { UsersPage } from '../pages/users_page.js'

let pageAndBrowser, usersPage

const setup = async function () {
  pageAndBrowser = await chromiumPageAndBrowser();
  usersPage = new UsersPage(pageAndBrowser.page)
}

Given('I am not signed in', async function () {
  setup()
});

When('I visit the users page', async function() {
  await usersPage.goto()
})

Then('I should see text {string}', async function (expectedText) {
  await expect(pageAndBrowser.page.locator('body')).toContainText(expectedText)
  await pageAndBrowser.browser.close()
})
