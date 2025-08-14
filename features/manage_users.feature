# test('not-logged-in users cannot access the page', async () => {
#     await givenIAmNotSignedIn();
#     await whenIVisitTheUsersPage();
#     await thenIShouldSeeText('You need to sign in before continuing')
#   });

#   test('caseworkers cannot access the page', async () => {
#     await givenIAmSignedInAsACaseworker();
#     await whenIVisitTheUsersPage();
#     await thenIShouldSeeText('You are unauthorised to manage users')
#   });

#   test('managers can access the page', async () => {
#     await givenIAmSignedInAsAManager();
#     await whenIVisitTheUsersPage();
#     await thenIShouldSeeText('List of users')
#   });

#   test('managers can create new users', async () => {
#     await givenIAmSignedInAsAManager();
#     await whenIVisitTheUsersPage();
#     await andIAddANewUser();
#     await thenIShouldSeeText('User successfully added and password reset instructions sent')
#   });

#   test('managers can delete users', async () => {
#     await givenIAmSignedInAsAManager();
#     await whenIVisitTheUsersPage();
#     await andIDeleteAUser();
#     await thenIShouldSeeText('User successfully deleted')
#   });

Feature: Manage users
  Scenario: Not-logged-in users cannot access the page
    Given I am not signed in
    When I visit the users page
    Then I should see text "You need to sign in before continuing"
