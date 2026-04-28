# commented out because the user does not land on the home page
Feature: Sign into page
    Scenario: Sign-in to page
        When User logs in
        Then User should land in the home page