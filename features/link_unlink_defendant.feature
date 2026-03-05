Feature: Link and unlink defendants

    Scenario: Link status is visible
        When User logs in
        And User visits the summary page of unlinked case "ZFAC125888"
        Then I should see the MAAT ID as "Not linked"

    Scenario: Defendant details are accessible
        When User logs in
        And User visits the summary page of unlinked case "ZFAC125888"
        And User opens the defendant details for "ZFAC125888"
        Then I should see the defendant details page for "ZFAC125888"

    Scenario: MAAT is validated and errors are highlighted
        When User logs in
        And User visits the summary page of unlinked case "ZFAC125888"
        And User opens the defendant details for "ZFAC125888"
        And User enters an invalid MAAT ID
        Then I should see the error message "Enter a MAAT ID in the correct format"

    Scenario: Caseworkers can link and unlink valid MAAT IDs
        When User logs in
        And User visits the summary page of unlinked case "KR139776672"
        And User opens the defendant details for "KR139776672"
        And User enters MAAT ID "6277243"
        Then I should see the message "You have successfully linked to the court data source"
        And I should see "6277243" linked on the page
        And User unlinks the defendant
        Then I should see the message "You have successfully unlinked from the court data source"