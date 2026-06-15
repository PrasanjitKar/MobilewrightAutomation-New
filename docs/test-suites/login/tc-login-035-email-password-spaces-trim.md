# TC-LOGIN-035 — Email and password fields trim leading and trailing spaces

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-035 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_valid` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the Login form trims leading and trailing whitespace from email and password values before submitting to the authentication API and before client-side validation, preventing accidental login failures due to invisible spaces.

---

## ✅ Preconditions

- App is on the Login screen
- Test data `login_valid` contains valid credentials

---

## 🔢 Test Steps — Scenario Outline (3 variants)

| Variant | Email | Password | Expected |
|---|---|---|---|
| A | `" user@example.com"` (leading space) | Valid password | Login succeeds — space trimmed |
| B | `"user@example.com "` (trailing space) | Valid password | Login succeeds — space trimmed |
| C | Valid email | `" ValidP@ss1word "` (spaces both ends) | Login succeeds — space trimmed |

For each variant:

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter email/password with spaces as per variant | Field accepts input |
| 2 | Tap Login | `_onLogin()` calls `_emailController.text.trim()` and `_passwordController.text.trim()` |
| 3 | Verify no validation error | Trimmed value passes format validation |
| 4 | Observe login result | Login succeeds (trimmed value is correct credential) |

---

## 🏁 Expected Results

- Both `email` and `password` are trimmed via `.trim()` before validation and API submission
- No "Please enter valid email" error for emails with surrounding spaces
- Login succeeds when credentials are valid after trimming

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart — _onLogin()
_authBloc.add(
  AuthenticationLogInEvent(
    username: _emailController.text.trim(),   // ← trim applied
    password: _passwordController.text.trim(), // ← trim applied
  ),
);

// _validateEmail also uses trimmed value via _isValidForm()
bool _isValidForm() {
  final String email = _emailController.text.trim();
  final String password = _passwordController.text.trim();
  _emailErrorText = _validateEmail(email);
  _passwordErrorText = _validatePassword(password);
  ...
}
```

> **Note:** The `LowerCaseTextFormatter` is applied as the user types, so leading/trailing spaces in the email field are preserved in display but trimmed on submit. The password field has no such formatter — spaces are accepted and trimmed on submit.

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:login_valid @regression @both
Scenario Outline: Login succeeds when email or password has surrounding spaces
  Given The app is on the Login screen
  When User enters email "<email>" and password "<password>"
  And User taps Login
  Then The Home screen is displayed (spaces were trimmed before authentication)

  Examples:
    | email                      | password               |
    | " td.username"             | td.password.admin      |
    | "td.username "             | td.password.admin      |
    | td.username                | " td.password.admin "  |
```

---

## 🔗 Related

- [TC-LOGIN-007 — Email auto-lowercase](./tc-login-007-email-auto-lowercase.md)
- [TC-LOGIN-009 — Login form validation: empty fields](./tc-login-009-login-form-empty-fields.md)
- [Suite index](./index.md)
