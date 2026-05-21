@dev-auth
Feature: Manage users

    Scenario: Not-logged-in users cannot access the page
        Given User is not signed in
        When User visits the users page
        Then I should see the error message "You need to sign in before continuing"

    Scenario: Caseworkers cannot access the page
        Given User is signed in as a caseworker
        When User visits the users page
        Then I should see the error message "You are unauthorised to manage users"

    Scenario: Admins can access the page
        Given User is signed in as an admin
        When User visits the users page
        Then I should see the header "Manage Users"

    Scenario: Admins can create and delete new users
        Given User is signed in as an admin
        When User visits the users page
        And User creates a new user
        Then I should see the message "account created"
        And User navigates back to the manage users page
        And User deletes a user
        Then I should see the message "account deleted"

    Scenario: Admins can edit user details
        Given User is signed in as an admin
        When User visits the users page
        And User creates a new user
        And User visits the users page
        And User updates a user's email address
        Then I should see the message "account updated"
        And User navigates back to the manage users page
        And User deletes a user
