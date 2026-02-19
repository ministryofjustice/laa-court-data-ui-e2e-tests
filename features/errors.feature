@dev-auth
Feature: Errors

    Scenario: 404 errors are handled appropriately
        When User logs in
        And User visits the summary page for a nonexistent case
        Then I should see the message "There was a problem getting the information you requested. If this problem persists, please contact the IT Helpdesk on 0800 9175148."
