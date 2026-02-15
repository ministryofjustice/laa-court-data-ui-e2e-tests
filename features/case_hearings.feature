Feature: Case hearings

    Scenario: Hearings are sorted by date by default
        When User logs in
        And User visits the summary page for the configured case
        Then Hearings should be sorted by date ascending

    Scenario: Hearing details pages have forward links
        When User logs in
        And User visits the summary page for the configured case
        And User opens the first hearing
        And User clicks next hearing
        Then User should see the second hearing details

    Scenario: Hearing details pages have backwards links
        When User logs in
        And User visits the summary page for the configured case
        And User opens the last hearing
        And User clicks previous hearing
        Then User should see the second last hearing details

    Scenario: Hearings date direction can be reversed
        When User logs in
        And User visits the summary page for the configured case
        And User sorts hearings by date
        Then Hearings should be sorted by date descending

    Scenario: Hearings can be sorted by type
        When User logs in
        And User visits the summary page for the configured case
        And User sorts hearings by type
        Then Hearings should be sorted by hearing type descending

    Scenario: Hearings are clickable
        When User logs in
        And User visits the summary page for the configured case
        And User opens the first hearing
        Then User should see the first hearing details
