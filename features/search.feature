Feature: Case search in VCD

    Background:
        Given User navigates to the test environment
        When User logs in
        Then User should land in the home page
        And User selects the Home icon from the breadcrumbs
    
    Scenario: User searches using URN
        When User searches by valid URN
        Then I should see 4 search results


    Scenario: User searches using ASN
        When User searches by valid ASN
        Then I should see 7 search results

    Scenario: User searches using NI number
        When User searches by valid NI number
        Then I should see 7 search results

    Scenario: User searches using name and DOB
        When User searches by name and DOB
        Then I should see 7 search results

    Scenario: User searches with an invalid ASN
        When User searches by invalid ASN
        Then I should see 0 search results
        And I should see the no results message

    Scenario: User searches with a blank NI identifier
        When User searches with a blank NI identifier
        Then I should see the search term required warning