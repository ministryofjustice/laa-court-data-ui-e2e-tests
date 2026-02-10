Feature: Sign into page
    Scenario: Sign-in to page

        Given User navigates to the test environment
        When User logs in
        Then User should land in the home page