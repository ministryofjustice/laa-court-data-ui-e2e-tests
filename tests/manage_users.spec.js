import { test } from '@playwright/test'
import { SignInSteps } from '../steps/sign_in_steps'
import { UsersSteps } from '../steps/users_steps'
import { GenericSteps } from '../steps/generic_steps'

test.describe('Manage users', () => {
  let signInSteps
  let usersSteps
  let genericSteps

  test.beforeEach(async ({ page }) => {
    signInSteps = new SignInSteps(page)
    usersSteps = new UsersSteps(page)
    genericSteps = new GenericSteps(page)
  })

  test('not-logged-in users cannot access the page', async () => {
    await signInSteps.givenIAmNotSignedIn();
    await usersSteps.whenIVisitTheUsersPage();
    await genericSteps.thenIShouldSeeText('You need to sign in before continuing')
  });

  test('caseworkers cannot access the page', async () => {
    await signInSteps.givenIAmSignedInAsACaseworker();
    await usersSteps.whenIVisitTheUsersPage();
    await genericSteps.thenIShouldSeeText('You are unauthorised to manage users')
  });

  test('managers can access the page', async () => {
    await signInSteps.givenIAmSignedInAsAManager();
    await usersSteps.whenIVisitTheUsersPage();
    await genericSteps.thenIShouldSeeText('List of users')
  });

  test('managers can create new users', async () => {
    await signInSteps.givenIAmSignedInAsAManager();
    await usersSteps.whenIVisitTheUsersPage();
    await usersSteps.andIAddANewUser();
    await genericSteps.thenIShouldSeeText('User successfully added and password reset instructions sent')
  });

  test('managers can edit user details', async () => {
    await signInSteps.givenIAmSignedInAsAManager();
    await usersSteps.whenIVisitTheUsersPage();
    await usersSteps.andIChangeAUsersEmailAddress();
    await genericSteps.thenIShouldSeeText('User details successfully updated')
  });

  test('managers can delete users', async () => {
    await signInSteps.givenIAmSignedInAsAManager();
    await usersSteps.whenIVisitTheUsersPage();
    await usersSteps.andIDeleteAUser();
    await genericSteps.thenIShouldSeeText('User successfully deleted')
  });
})
