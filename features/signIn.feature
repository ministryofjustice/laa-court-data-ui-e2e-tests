@dev-auth
@smoke-test
Feature: Sign into page
    Scenario: Sign-in to page
        When User logs in
        Then User should land in the home page