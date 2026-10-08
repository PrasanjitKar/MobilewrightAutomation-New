@regression @both @launch @login
Feature: Semnox Mobile App Flow

  @DataFile:resources/data/testdata.csv @Key:app_launch_login @timeout:600000 @runThisNow
  Scenario: Verify successful order placement flow
    Given the app is launched
    When the user is on login screen
    And the user clicks on login button
    Then the user should see the login screen
    And the user provides the email as "td.Username"
    And the user provides the password as "td.Password"
    And the user taps on the login button
    Then the user locates the store manually
    And the user selects the location as SKIMMERSITEA
    And the user confirms the location
    Then the dashboard screen should be displayed successfully
    When the user orders food as Chicken Biryani
    And the user selects the payment method as card
    And the user pays with card
    Then the order should be placed successfully
    And the user clicks on the back to home button
    Then the dashboard screen should be displayed successfully
    And the user logs out from the application
    Then the user is on login screen

