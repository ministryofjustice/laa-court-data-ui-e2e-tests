@dev-auth
Feature: Appeals
   Background:
        When User logs in
        And User visits the summary page of unlinked case "TESTAP123"
        And User opens related court applications tab
        And User opens the breach application for the link "Appeal against conviction and sentence by a Magistrates' Court to the Crown Court"

    Scenario: Caseworker visits related court applications and the appeal page
        Then I should see the appeal heading for case "AppealMyString"
        And I should see the subheading "Appellant"
        And I should see the subheading "Hearings"

# Flaky test due to test data
    # Scenario: Caseworker links and unlinks an appeal
    #     When User opens the first appellant
    #     Then I should see the appellant heading
    #     And I should see the tag for the appeal
    #     When User enters MAAT ID "6152402"
    #     Then I should see the message "You have successfully linked to the court data source"
    #     When User unlinks the court application
    #     Then I should see the message "You have successfully unlinked from the court data source"
