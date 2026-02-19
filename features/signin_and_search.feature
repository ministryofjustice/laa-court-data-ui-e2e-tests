@dev-auth
Feature: Sign in and search

    Scenario: Not-logged-in users cannot access the page
        Given User is not signed in
        When User visits the search page
        Then I should see the message "You need to sign in before continuing"

    Scenario: Caseworkers can search by URN
        When User logs in
        And User visits the search page
        And User searches by valid URN
        Then I should see 4 search results

    Scenario: Caseworkers can search by ASN
        When User logs in
        And User visits the search page
        And User searches by valid ASN
        Then I should see 7 search results

    Scenario: Caseworkers can search by NI Number
        When User logs in
        And User visits the search page
        And User searches by valid NI number
        Then I should see 7 search results

    Scenario: Caseworkers can search by defendant name and DOB
        When User logs in
        And User visits the search page
        And User searches by name and DOB
        Then I should see 7 search results

    Scenario: Searches without results are handled appropriately
        When User logs in
        And User visits the search page
        And User searches by invalid ASN
        Then I should see 0 search results
        And I should see the no results message

    Scenario: Blank searches are handled appropriately
        When User logs in
        And User visits the search page
        And User searches with a blank NI identifier
        Then I should see the search term required warning
