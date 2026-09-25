@smoke @both @login
Feature: Login smoke — Welcome and Login screen essentials
  As a QA engineer
  I want the most critical Login module screens and the happy-path sign-in to be verified on every run
  So that the team gets immediate confidence the Conti+ authentication entry point is not broken

  Background:
    Given the Conti+ app is launched
    And the Conti+ app has loaded completely
    When the user accepts all consent options

  # TC-LOGIN-001 — Splash screen displays correct branding
  # NOTE: the splash screen images (`continental-logo.png` / `contiplus-logo.png`) have no
  # SemanticsLabel in the Flutter source (see splash_screen.dart), so they cannot be located
  # via the accessibility tree. The automatable, still-valuable equivalent verified here is
  # that the app transitions past the splash screen to the Welcome screen within the loading
  # timeout, without the user having to take any action.
  @TC-LOGIN-001 @smoke @passed
  Scenario: Splash screen transitions automatically to the Welcome screen
    Then the Welcome screen should be displayed

  # TC-LOGIN-002 — Welcome screen displays correct UI elements
  @TC-LOGIN-002 @smoke @passed
  Scenario: Welcome screen displays all required UI elements
    Then the Welcome screen should be displayed
    And the Welcome screen displays the Contiplus logo, heading, both login buttons and separator

  # TC-LOGIN-005 — Login screen displays correct UI elements
  @TC-LOGIN-005 @smoke @passed
  Scenario: Login screen displays all required UI elements
    Then the Welcome screen should be displayed
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the Login screen displays a "Back" button
    And the Login screen displays the "Welcome!" heading
    And the "Forgot password" link is visible on the Login screen

  # TC-LOGIN-006 — Successful login with valid credentials
  @TC-LOGIN-006 @smoke @passed @DataFile:resources/data/smokedata.csv @Key:login_valid @timeout:300000
  Scenario: Successful login with valid credentials navigates to the Home screen
    Then the Welcome screen should be displayed
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "td.Username" and password as "td.Password" from test data
    And the user clicks on the login button
    Then the user should be logged in successfully
    And wait for the home screen to load completely
    Then the user should see the home screen
