Feature: Link and unlink defendants

    Scenario: Link status is visible
        When User logs in
        And User visits the summary page of an unlinked case
        Then I should see the message "Not linked"

    Scenario: Defendant details are accessible
        When User logs in
        And User visits the summary page of an unlinked case
        And User opens the defendant details
        Then I should see the defendant details page

    Scenario: MAAT is validated and errors are highlighted
        When User logs in
        And User visits the summary page of an unlinked case
        And User opens the defendant details
        And User enters an invalid MAAT ID
        Then I should see the message "Enter a MAAT ID in the correct format"

    Scenario: Caseworkers can link valid MAAT IDs
        When User logs in
        And User visits the summary page of an unlinked case
        And User opens the defendant details
        And User enters a valid MAAT ID
        Then I should see the message "You have successfully linked to the court data source"
        And I should see the MAAT ID on the page

    Scenario: Caseworkers can unlink
        When User logs in
        And User visits the summary page of a linked case
        And User opens the defendant details
        And User unlinks the defendant
        Then I should see the message "You have successfully unlinked from the court data source"
