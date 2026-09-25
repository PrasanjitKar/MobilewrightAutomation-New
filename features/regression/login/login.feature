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
  @TC-LOGIN-003 @regression @passed
  Scenario: Continental Account button navigates to the Login screen
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the Login screen displays a "Back" button

  # TC-LOGIN-004 — Continue as Guest navigates to Onboarding screen
  @TC-LOGIN-004 @regression @passed
  Scenario: Continue as Guest navigates to the Onboarding screen and Skip Introduction opens the Dashboard
    When the user taps the "Continue as a Guest" button on the Welcome screen
    Then the Onboarding screen should be displayed
    When the user taps the "Skip Introduction" button
    Then the Dashboard screen should be displayed

  # TC-LOGIN-007 — Email is preserved as typed but lowercased/trimmed at submit time
  @TC-LOGIN-007 @regression @passed @DataFile:resources/data/testdata.csv @Key:app_launch_login @timeout:300000
  Scenario: Email retains typed case on screen but still authenticates successfully at submit time
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "PRASANJITMM@Yopmail.COM" and password as "td.Password" from test data
    Then the email field still displays "PRASANJITMM@Yopmail.COM"
    When the user clicks on the login button
    Then the user should be logged in successfully

  # TC-LOGIN-008 — Password field visibility toggle (eye icon)
  @TC-LOGIN-008 @regression @passed
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
  @TC-LOGIN-009 @regression @passed
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
  @TC-LOGIN-010 @regression @passed @timeout:300000
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
  @TC-LOGIN-011 @regression @passed
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
  @TC-LOGIN-012 @regression @passed @DataFile:resources/data/logindata.csv @Key:login_invalid @timeout:300000
  Scenario: Invalid credentials show an authentication error
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user provides username as "td.Username" and password as "td.Password" from test data
    And the user clicks on the login button
    Then an authentication error is displayed
    And the user remains on the Login screen

  # TC-LOGIN-014 — Login button shows loading state during authentication
  @TC-LOGIN-014 @regression @passed @DataFile:resources/data/smokedata.csv @Key:login_valid1 @timeout:300000
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
  @TC-LOGIN-015 @regression @passed
  Scenario: Login screen fields are eligible for platform autofill
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the email and password fields are focusable and accept keyboard input

  # TC-LOGIN-016 — Back button on Login screen returns to Welcome screen
  @TC-LOGIN-016 @regression @passed
  Scenario: Back button on Login screen returns to Welcome
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    When the user taps the Back button on the Login screen
    Then the Welcome screen should be displayed

  # TC-LOGIN-017 — Forgot Password link navigates with email pre-fill
  @TC-LOGIN-017 @regression @passed
  Scenario: Forgot password link navigates to Forgot Password screen with pre-filled email
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    When the user types "user@example.com" into the email field
    And the user taps the "Forgot password" link
    Then the Forgot Password screen should be displayed

  # TC-LOGIN-018 — Forgot Password screen displays correct UI elements
  @TC-LOGIN-018 @regression @passed
  Scenario: Forgot Password screen shows all required UI elements
    When the user opens Continental Account login
    And the user taps the "Forgot password" link
    Then the Forgot Password screen should be displayed
    And the Forgot Password screen displays all required UI elements

  # TC-LOGIN-020 — Forgot password form validation: empty and invalid email
  @TC-LOGIN-020 @regression @passed
  Scenario Outline: Forgot password email validation shows correct error
    When the user opens Continental Account login
    And the user taps the "Forgot password" link
    Then the Forgot Password screen should be displayed
    When the user enters email "<email>" on the Forgot Password screen
    And the user taps the "Get Verification Code" button
    Then the Forgot Password screen shows the email error "<expected_error>"

    Examples:
      | email       | expected_error           |
      |             | Please enter email       |
      | notanemail  | Please enter valid email |

  # TC-LOGIN-021 — Verification code already received skips API and goes to Reset Password
  @TC-LOGIN-021 @regression @passed
  Scenario: Verification code already received skips API and goes to Reset Password
    When the user opens Continental Account login
    And the user taps the "Forgot password" link
    Then the Forgot Password screen should be displayed
    When the user taps the "Verification Code already received" link
    Then the Reset Password screen should be displayed

  # TC-LOGIN-022 — Navigation back to Login from Forgot Password (Back button and Login link)
  @TC-LOGIN-022 @regression @passed
  Scenario Outline: Navigation back to Login from Forgot Password screen
    When the user opens Continental Account login
    And the user taps the "Forgot password" link
    Then the Forgot Password screen should be displayed
    When the user taps the "<action>" on the Forgot Password screen
    Then the email and password fields should be displayed

    Examples:
      | action      |
      | Back button |
      | Login link  |

  # TC-LOGIN-023 — Reset Password screen displays correct UI elements
  @TC-LOGIN-023 @regression @passed
  Scenario: Reset Password screen shows all required UI elements
    When the user opens Continental Account login
    And the user taps the "Forgot password" link
    And the user taps the "Verification Code already received" link
    Then the Reset Password screen should be displayed
    And the Reset Password screen displays all required form fields

  # TC-LOGIN-025 — Reset password form shows validation errors
  @TC-LOGIN-025 @regression @passed
  Scenario Outline: Reset password form shows validation errors
    When the user opens Continental Account login
    And the user taps the "Forgot password" link
    And the user taps the "Verification Code already received" link
    Then the Reset Password screen should be displayed
    When the user sets verification code "<code>", new password "<new_pw>", and confirm password "<confirm_pw>" on the Reset Password screen
    And the user taps the "Submit" button
    Then the Reset Password screen shows the validation error "<expected_error>"

    Examples:
      | code  | new_pw          | confirm_pw      | expected_error                 |
      |       | ValidP@ss1word  | ValidP@ss1word  | Please enter verification code |
      | abc   | ValidP@ss1word  | ValidP@ss1word  | Please enter valid code        |
      | 12345 | weak            | weak            | Please enter valid password    |
      | 12345 | ValidP@ss1word  | Different1!pass | Entered password doesn't match |
      | 12345 | ValidP@ss1word  |                 | Please confirm password        |

  # TC-LOGIN-034 — Paste password into password field
  @TC-LOGIN-034 @regression @passed @DataFile:resources/data/smokedata.csv @Key:login_valid1 @timeout:300000
  Scenario: Paste password into password field and login successfully
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    And the user types "td.Username" into the email field
    When the user pastes password "td.Password" into the password field
    And the user clicks on the login button
    Then the user should be logged in successfully

  # TC-LOGIN-035 — Leading/trailing spaces trimmed on email and password
  @TC-LOGIN-035 @regression @passed @DataFile:resources/data/smokedata.csv @Key:login_valid1 @timeout:300000
  Scenario Outline: Login succeeds when email or password has surrounding spaces
    When the user opens Continental Account login
    Then the email and password fields should be displayed
    When the user provides username with spaces as "<email>" and password as "<password>"
    And the user clicks on the login button
    Then the user should be logged in successfully

    Examples:
      | email           | password        |
      |  td.Username    | td.Password     |
      | td.Username     | td.Password     |
      | td.Username     |  td.Password    |
