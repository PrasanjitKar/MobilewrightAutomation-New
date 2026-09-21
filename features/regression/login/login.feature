@regression @both @login
Feature: Login regression — navigation, validation and error handling
  As a QA engineer
  I want the Login module's navigation, form validation and error states to be automated
  So that regressions in the Conti+ authentication flow are caught before release

  Background:
    Given the Conti+ app is launched
    And the Conti+ app has loaded completely
    When the user accepts all consent options
    Then the Welcome screen should be displayed

  # TC-LOGIN-003 — Continental Account button launches Continental login flow
  @TC-LOGIN-003 @regression
  Scenario: Continental Account button navigates to the Login screen
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the Login screen displays a "Back" button

  # TC-LOGIN-004 — Continue as Guest navigates to Onboarding screen
  @TC-LOGIN-004 @regression
  Scenario: Continue as Guest navigates to the Onboarding screen and Skip Introduction opens the Dashboard
    When the user taps the "Continue as a Guest" button on the Welcome screen
    Then the Onboarding screen should be displayed
    When the user taps the "Skip Introduction" button
    Then the Dashboard screen should be displayed

  # TC-LOGIN-007 — Email is preserved as typed but lowercased/trimmed at submit time
  @TC-LOGIN-007 @regression @DataFile:resources/data/testdata.csv @Key:app_launch_login @timeout:300000
  Scenario: Email retains typed case on screen but still authenticates successfully at submit time
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "PRASANJITMM@Yopmail.COM" and password as "td.Password" from test data
    Then the email field still displays "PRASANJITMM@Yopmail.COM"
    When the user clicks on the login button
    Then the user should be logged in successfully

  # TC-LOGIN-008 — Password field visibility toggle (eye icon)
  @TC-LOGIN-008 @regression
  Scenario: Password field visibility can be toggled via the eye icon
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user types "MyP@ssword1" into the password field
    Then the password field is obscured showing "MyP@ssword1"
    When the user taps the password visibility toggle
    Then the password field shows "MyP@ssword1" in plain text
    When the user taps the password visibility toggle
    Then the password field is obscured showing "MyP@ssword1"

  # TC-LOGIN-009 — Login form validation: empty and blank fields
  @TC-LOGIN-009 @regression
  Scenario Outline: Login form shows validation errors for empty email and/or password
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "<email>" and password as "<password>"
    And the user clicks on the login button
    Then the email field shows the error "<email_error>" and the password field shows the error "<password_error>"
    And no login request should be sent

    Examples:
      | email             | password        | email_error         | password_error         |
      |                   |                  | Please enter email  | Please enter password  |
      |                   | ValidP@ssw0rd1   | Please enter email  |                        |
      | user@example.com  |                  |                     | Please enter password  |

  # TC-LOGIN-010 — Login form validation: invalid email format
  @TC-LOGIN-010 @regression @timeout:300000
  Scenario Outline: Invalid email format shows a validation error on the Login screen
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "<invalid_email>" and password as "ValidP@ssw0rd1"
    And the user clicks on the login button
    Then the email field shows the error "Please enter valid email" and the password field shows the error ""
    And no login request should be sent

    Examples:
      | invalid_email   |
      | notanemail      |
      | user@           |
      | @domain.com     |
      | user@domain     |

  # TC-LOGIN-011 — Login form validation: password not meeting policy
  @TC-LOGIN-011 @regression
  Scenario Outline: Weak password shows a validation error on the Login screen
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "user@example.com" and password as "<weak_password>"
    And the user clicks on the login button
    Then the email field shows the error "" and the password field shows the error "Please enter valid password"
    And no login request should be sent

    Examples:
      | weak_password |
      | password      |
      | Password1     |
      | P@ss1         |
      | 1234567890    |

  # TC-LOGIN-012 — Login with invalid credentials shows authentication error
  @TC-LOGIN-012 @regression @DataFile:resources/data/logindata.csv @Key:login_invalid @timeout:300000
  Scenario: Invalid credentials show an authentication error
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "td.Username" and password as "td.Password" from test data
    And the user clicks on the login button
    Then an authentication error is displayed
    And the user remains on the Login screen

  # TC-LOGIN-014 — Login button shows loading state during authentication
  @TC-LOGIN-014 @regression @DataFile:resources/data/smokedata.csv @Key:login_valid @timeout:300000
  Scenario: Login button shows a loading state while authenticating
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "td.Username" and password as "td.Password" from test data
    And the user clicks on the login button
    Then the login-in-progress snackbar is displayed
    And the login button is disabled while authenticating
    And the user should be logged in successfully

  # TC-LOGIN-015 — Autofill support for email and password fields
  # NOTE: MobileWright's Screen/Device APIs do not expose a way to trigger the platform's
  # native autofill UI (iOS QuickType bar / Android Autofill dropdown), so genuine autofill
  # selection cannot be driven end-to-end. This scenario verifies the automatable
  # prerequisite instead: both fields are standard, focusable text inputs that declare
  # `AutofillHints.email` / `AutofillHints.password` in the Flutter source, making them
  # eligible for platform autofill. Full autofill-selection coverage remains a manual check.
  @TC-LOGIN-015 @regression
  Scenario: Login screen fields are eligible for platform autofill
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the email and password fields are focusable and accept keyboard input
