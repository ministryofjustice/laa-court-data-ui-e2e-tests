import { test, expect } from '@playwright/test'
import { SigninPage } from '../pages/signin_page.js'
import { UsersPage } from '../pages/users_page.js'

test.describe('Manage users', () => {
  let currentPage
  let usersPage

  const givenIAmSignedInAsACaseworker = async () => {
    const signinPage = new SigninPage(currentPage)
    await signinPage.signInAsCaseworker()
  }
  const givenIAmSignedInAsAManager = async () => {
    const signinPage = new SigninPage(currentPage)
    await signinPage.signInAsManager()
  }
  const givenIAmNotSignedIn = async () => {}
  const whenIVisitTheUsersPage = async () => {
    await usersPage.goto()
  }
  const whenIAddANewUser = async () => {
    await usersPage.addNewCaseworker('Jane', 'Doe', 'jdoe', 'jane@example.com');
  }

  const whenIDeleteAUser = async () => {
    await usersPage.deleteUser('Jane Doe');
  }

  const thenIShouldSeeText = async (message) => {
    await expect(currentPage.locator('body')).toContainText(message)
  }

  test.beforeEach(async ({ page }) => {
    currentPage = page
    usersPage = new UsersPage(page)
  })

  test('not-logged-in users cannot access the page', async () => {
    await givenIAmNotSignedIn();
    await whenIVisitTheUsersPage();
    await thenIShouldSeeText('You need to sign in before continuing')
  });

  test('caseworkers cannot access the page', async () => {
    await givenIAmSignedInAsACaseworker();
    await whenIVisitTheUsersPage();
    await thenIShouldSeeText('You are unauthorised to manage users')
  });

  test('managers can access the page', async () => {
    await givenIAmSignedInAsAManager();
    await whenIVisitTheUsersPage();
    await thenIShouldSeeText('List of users')
  });

  test('managers can create new users', async () => {
    await givenIAmSignedInAsAManager();
    await whenIVisitTheUsersPage();
    await whenIAddANewUser();
    await thenIShouldSeeText('User successfully added and password reset instructions sent')
  });

  test('managers can delete users', async () => {
    await givenIAmSignedInAsAManager();
    await whenIVisitTheUsersPage();
    await whenIDeleteAUser();
    await thenIShouldSeeText('User successfully deleted')
  });
})
