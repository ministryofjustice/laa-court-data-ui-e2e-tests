Feature: Breaches
    Background:
        When User logs in
        And User visits the summary page of unlinked case "OQAC172426"
        And User opens related court applications tab
        And User opens the breach application for the link "Failing to comply with the requirements of an engagement and support order"

    Scenario: Caseworker visits related court applications and the breach page
        Then I should see the breach heading for case "OQAC172426"
        And I should see the subheading "Respondent"
        And I should see the subheading "Hearings"

    Scenario: Caseworker links and unlinks a breach
        When User opens the first respondent
        And I should see the respondent heading
        And I should see the tag for the breach
        When User enters MAAT ID "6286243"
        Then I should see the message "You have successfully linked to the court data source"
        When User unlinks the court application
        Then I should see the message "You have successfully unlinked from the court data source"
