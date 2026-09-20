@regression @android @launch @login
Feature: Login welcome flow
  As a QA engineer
  I want to launch the Conti+ mobile app and reach the login form
  So that I can confirm the native authentication entry flow is ready for automation

  @DataFile:resources/data/testdata.csv @Key:app_launch_login @timeout:300000 @conveyorpoc
  Scenario: Add Conveyor and verify the conveyor count is updated on home screen and conveyor details screen
    Given the Conti+ app is launched
    And the Conti+ app has loaded completely
    When the user accepts all consent options
    Then the Welcome screen should be displayed
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "td.Username" and password as "td.Password" from test data
    And the user clicks on the login button
    Then the user should be logged in successfully
    And wait for the home screen to load completely
    Then the user should see the home screen
    And verify the conveyor count is displayed on the home screen
    And the user clicks on the conveyor card
    Then the user should see the conveyor details screen
    And verify the same conveyor count is displayed on the bottom of the conveyor details screen
    And user clicks on add conveyor button
    Then the user should see the add conveyor screen
    And user provides the conveyor name as "td.ConveyorName" from test data
    And user provides the customer site as "td.CustomerSite" from test data
    And user clicks on the Create button
    Then the user should see the conveyor details screen with the newly added conveyor
    And verify the conveyor count is updated on the conveyor details screen after adding a new conveyor
    And user clicks on home tab button
    Then the user should see the home screen
    And verify the conveyor count is updated on the home screen after adding a new conveyor