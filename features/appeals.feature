Feature: Appeals
   Background:
        When User logs in
        And User visits the summary page of unlinked case "RQ122682519"
        And User opens related court applications tab
        And User opens the breach application for the link "Appeal against sentence by a Magistrates' Court to the Crown Court"


    Scenario: Caseworker visits related court applications and the appeal page
        When User visits the summary page for appeal case "TESTAP12345"
        And User opens related court applications tab
        And User opens the appeal application
        Then I should see the appeal heading for case "TESTAP12345"

    # Scenario: Caseworker links and unlinks an appeal
    #     When User logs in
    #     And User visits related court applications for appeal case "TESTAP12345"
    #     And User opens the appeal application
    #     Then I should see the appeal heading for case "TESTAP12345"
    #     When User opens the first appellant
    #     Then I should see the appellant heading
    #     When User links a valid MAAT ID
    #     Then I should see the message "You have successfully linked to the court data source"
    #     When User unlinks the court application
    #     Then I should see the message "You have successfully unlinked from the court data source"
