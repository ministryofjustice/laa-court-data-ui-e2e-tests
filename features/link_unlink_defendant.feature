Feature: Link and unlink defendants
    Background: 
        When User logs in

    Scenario: Link status is visible
        # When User visits the summary page of unlinked case "ZFAC125888"
        When User visits the summary page of unlinked case "PYAC513991"
        And User opens the defendant details for "PYAC513991"
        And I should be able to copy the following details to clipboard:
            | Case URN | Defendant name | Date of birth | ASN |
            | PYAC513991 | Seymour Adams| 03/12/1975| 2391NX0000143825641D |

    Scenario: Defendant details are accessible
        When User visits the summary page of unlinked case "PYAC513991"
        And User opens the defendant details for "PYAC513991"
        Then I should see the defendant details page for "PYAC513991"

    Scenario: MAAT is validated and errors are highlighted
        When User visits the summary page of unlinked case "PYAC513991"
        And User opens the defendant details for "PYAC513991"
        And User enters an invalid MAAT ID
        Then I should see the error message "Enter a MAAT ID in the correct format"

    # Scenario: Defendant details are accessible
    #     When User visits the summary page of unlinked case "PYAC513991"
    #     And User opens the defendant details for "PYAC513991"
    #     Then I should see the defendant details page for "PYAC513991"

    # Scenario: MAAT is validated and errors are highlighted
    #     When User visits the summary page of unlinked case "PYAC513991"
    #     And User opens the defendant details for "PYAC513991"
    #     And User enters an invalid MAAT ID
    #     Then I should see the error message "Enter a MAAT ID in the correct format"
        
        #Test below is too flaky to run consistently

    # Scenario: Caseworkers can link and unlink valid MAAT IDs
    #     When User visits the summary page of unlinked case "VHAC168852"
    #     And User opens the defendant details for "VHAC168852"
    #     And User enters MAAT ID "6280202"
    #     Then I should see the error message "You have successfully linked to the court data source"
    #     And I should see "6280202" linked on the page
    #     And User unlinks the defendant
    #     Then I should see the error message "You have successfully unlinked from the court data source"