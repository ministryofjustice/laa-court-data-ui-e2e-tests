@dev-auth
Feature: Appeals

    Scenario: Caseworker visits related court applications and the appeal page
        When User logs in
        And User visits the search page
        And User searches by valid URN
        Then I should see 4 search results
        When User visits the summary page for appeal case "TESTAP12345"
        And User opens related court applications
        And User opens the appeal application
        Then I should see the appeal heading for case "TESTAP12345"

    Scenario: Caseworker links and unlinks an appeal
        When User logs in
        And User visits related court applications for appeal case "TESTAP12345"
        And User opens the appeal application
        Then I should see the appeal heading for case "TESTAP12345"
        When User opens the first appellant
        Then I should see the appellant heading
        When User links a valid MAAT ID
        Then I should see the message "You have successfully linked to the court data source"
        When User unlinks the court application
        Then I should see the message "You have successfully unlinked from the court data source"
