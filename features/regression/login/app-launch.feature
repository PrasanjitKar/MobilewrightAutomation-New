@regression @both @launch @login
Feature: Login welcome flow
  As a QA engineer
  I want to launch the Conti+ mobile app and reach the login form
  So that I can confirm the native authentication entry flow is ready for automation

  @DataFile:resources/data/testdata.csv @Key:app_launch_login @timeout:600000 @conveyorpoc @runThisNow
  Scenario: Login successful flow
    Given the Conti+ app is launched
    And the Conti+ app has loaded completely
    When the user accepts all consent options
    Then the Welcome screen should be displayed
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "td.Username" and password as "td.Password" from test data
    And the user clicks on the login button
    Then the user should be logged in successfully
    And the user clicks on later button in the update app popup
    And wait for the home screen to load completely
    Then the user should see the home screen


  @DataFile:resources/data/testdata.csv @Key:app_launch_login @timeout:600000 @conveyorpoc
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
    And the user clicks on later button in the update app popup
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
    And the user clicks on add button in dashboard
    Then the user should see the list of module
    And the user clicks on the Add Conveyor module
    Then the user should see the add conveyor screen
    And the user clicks cancel button
    Then the user should see the home screen
    And the user clicks on Conveyor tab in the bottom navigation
    Then the user should see the conveyor details screen
    And the user clicks on add button in conveyor details screen
    Then the user should see the add conveyor screen
    And the user clicks back button
    Then the user should see the conveyor details screen
    And the user clicks on Profile icon from top right corner
    Then the user should see the profile screen
    And the user clicks on Logout button
    And the user should be logged out successfully
    Then the Welcome screen should be displayed  


  @DataFile:resources/data/testdata.csv @Key:app_launch_login @timeout:600000 @conveyorpoc
  Scenario: Verify Conveyor Inspect upload functionality in the Conti+ app
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
    And the user clicks on add button in dashboard
    Then the user should see the list of module
    And the user clicks on the Add Conveyor Inspect module
    Then the user should see the Add Conveyor Inspect Event screen
    And the user fills the conveyor name field with "CV-1 Pipe Belt A" from test data
    And the user fills the inspection date field with today's date
    And the user fills the inspector time field with current time
    And the user selects the colormap as "Hot (For Hot Weather)" from the dropdown
    And the user clicks on the Create button
    Then "Successfully created" message should be displayed
    Then the user should see the home screen
    And the user clicks on Conveyor Inspect card in the home screen
    Then the user should see the Conveyor Inspect list screen
    And the user clicks the first event in the list
    Then the user should see the View Conveyor Inspect Event details screen
    And the user clicks on the Upload button
    Then the user should see the Edit Conveyor Inspect Event screen
    And the user fills the inspection date field with today's date
    And the user fills the inspector time field with current time
    And the user clicks on the Upload button from LHS
    And the user clicks Save button
    Then "Upload successful" message should be displayed
    Then the user should see the View Conveyor Inspect Event details screen

