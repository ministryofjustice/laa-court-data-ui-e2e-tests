@dev-auth
Feature: Manage users

    Scenario: Not-logged-in users cannot access the page
        Given User is not signed in
        When User visits the users page
        Then I should see the message "You need to sign in before continuing"

    Scenario: Caseworkers cannot access the page
        Given User is signed in as a caseworker
        When User visits the users page
        Then I should see the message "You are unauthorised to manage users"

    Scenario: Managers can access the page
        Given User is signed in as a manager
        When User visits the users page
        Then I should see the message "List of users"

    Scenario: Managers can create new users
        Given User is signed in as a manager
        When User visits the users page
        And User creates a new user
        Then I should see the message "User successfully added"

    Scenario: Managers can edit user details
        Given User is signed in as a manager
        When User visits the users page
        And User updates a user's email address
        Then I should see the message "User details successfully updated"

    Scenario: Managers can delete users
        Given User is signed in as a manager
        When User visits the users page
        And User deletes a user
        Then I should see the message "User successfully deleted"
