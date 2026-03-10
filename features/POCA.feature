Feature: POCA 

    Scenario: Caseworker visits related court applications and the POCA case
        When User logs in
        When User visits the summary page of unlinked case "20NX6541582"
        And User opens related court applications tab
        And User opens the breach application for the link "Application for a confiscation order in the Crown Court"
        Then I should see the POCA heading for case "20NX6541582"
        And I should see the subheading "Respondent"
        And I should see the subheading "Hearings"
        When User opens the first respondent
        Then I should see the respondent heading
        And I should see the tag for the POCA
