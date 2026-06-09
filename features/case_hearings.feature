@dev-auth
@smoke-test
Feature: Case hearings
    Background:
        When User logs in
        And User visits the summary page of unlinked case "JEZUCBHAYN"

    Scenario: Hearings are sorted by date by default
        Then Hearings should be sorted by date ascending

    Scenario: Hearing details pages have forward links
        When User opens the first hearing
        And User clicks next hearing
        Then User should see the second hearing details

    Scenario: Hearing details pages have backwards links
        When User opens the last hearing
        And User clicks previous hearing
        Then User should see the second last hearing details

    Scenario: Hearings date direction can be reversed
        When User sorts hearings by date
        Then Hearings should be sorted by date descending

    Scenario: Hearings can be sorted by type
        When User sorts hearings by type
        Then Hearings should be sorted by hearing type descending

    Scenario: Hearings are clickable
        When User opens the first hearing
        Then User should see the first hearing details
