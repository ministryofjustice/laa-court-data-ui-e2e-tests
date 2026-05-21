Feature: Pending Xhibit cases
  Background:
    When User logs in

  Scenario: View pending Xhibit cases on Need linking tab
    Given User navigates to the "Link migrated cases" page
    Then I should see the "Link migrated cases" page title
    And I should see the table tabs
    And I should see the "Pending" tab is active
    And I should see the cases table with the following columns:
      | Case URN | Defendant name | Xhibit ref. | Court | Mode of trial | Reason for man. linking | MAAT ID |
    And I should see at least 1 case in the table

  Scenario: Data types within Need linking table
    Given User navigates to the "Link migrated cases" page
    Then I should see the "Link migrated cases" page title
    And I should see the cases table with the following columns:
      | Case URN | Defendant name | Xhibit ref. | Court | Mode of trial | Reason for man. linking | MAAT ID |
    And I should see that the "Case URN" column contains valid URN formats
    And I should see that the "Defendant name" column contains text values
    And I should see that the "Xhibit ref." column contains valid reference values
    And I should see that the "Court" column contains text values
    And I should see that the "Mode of trial" column contains text values

  Scenario: View Manually linked cases tab
    Given User navigates to the "Link migrated cases" page
    When User clicks on the "Manually linked cases" tab
    Then I should see the "Manually linked cases" tab is active
    And I should see the cases table with the following columns:
      | Case URN | MAAT ID | Defendant name | Date of birth | Linked date | Linked by |

  Scenario: View Auto linked cases tab
    Given User navigates to the "Link migrated cases" page
    When User clicks on the "Auto linked cases" tab
    Then I should see the "Auto linked cases" tab is active
    And I should see the cases table with the following columns:
      | Case URN | MAAT ID | Defendant name | Date of birth | Auto linked date |
    Then I should see the empty table message "No link migrated cases found"

  # Scenario: Empty table state is handled appropriately
  #   Given User navigates to the "Link migrated cases" page
  #   When there are no pending migrated cases available
  #   Then I should see the empty table message "No link migrated cases found"
  #   And I should see guidance text about linking migrated cases

