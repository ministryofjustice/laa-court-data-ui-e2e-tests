@smoke-test
Feature: Errors

    Scenario: Unauthorised users are redirected to sign in
        Given User is not signed in
        And User visits the summary page for a nonexistent case
        Then I should see the error message "You need to sign in before continuing."
        And I should see the error message "Sign in to view court data"
