Feature: Breaches

    Scenario: Caseworker visits related court applications and the breach page
        When User logs in
        And User visits the summary page for breach case "TESTBR11111"
        And User opens related court applications
        And User opens the breach application
        Then I should see the breach heading for case "TESTBR11111"
        And I should see the subheading "Respondent"
        And I should see the subheading "Hearings"

    Scenario: Caseworker links and unlinks a breach
        When User logs in
        And User visits related court applications for breach case "TESTBR11111"
        And User opens the breach application
        Then I should see the breach heading for case "TESTBR11111"
        And I should see the message "Not linked"
        When User opens the first respondent
        Then I should see the respondent heading
        And I should see the message "Breach"
        When User links a valid MAAT ID
        Then I should see the message "You have successfully linked to the court data source"
        When User unlinks the court application
        Then I should see the message "You have successfully unlinked from the court data source"
