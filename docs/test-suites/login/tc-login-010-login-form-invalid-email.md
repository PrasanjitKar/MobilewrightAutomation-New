# TC-LOGIN-010 — Login form validation — invalid email format

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-010 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that entering a malformed email address in the Login form and tapping Login shows the "Please enter valid email" inline error without making an API call.

---

## ✅ Preconditions

- App is on the Login screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter an invalid email (e.g., `notanemail`, `user@`, `@domain.com`, `user@domain`) | Email field accepts the input |
| 2 | Enter any password | Password field accepts the input |
| 3 | Tap the Login button | `_validateEmail()` returns an error; `_isValidForm()` returns `false` |
| 4 | Observe the email field | Error label shows "Please enter valid email" |
| 5 | Verify no network call | No `AuthenticationLogInEvent` dispatched; no loading state |

---

## 🏁 Expected Results

- Error label "Please enter valid email" appears below the email field
- Field border changes to error decoration
- Field text color changes to `continentalLightRed`
- Login does not proceed

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — email validation regex
bool isValidEmail(String email) {
  final emailRegex = RegExp(
    r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@'
    r'((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|'
    r'(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$',
  );
  return emailRegex.hasMatch(email);
}

// Error message (en)
AppLocalizations.of(context)!.pleaseEnterValidEmail  // "Please enter valid email"
```

**Invalid email examples:**

| Input | Reason invalid |
|---|---|
| `notanemail` | No `@` symbol |
| `user@` | No domain |
| `@domain.com` | No local part |
| `user@domain` | No TLD |
| `user @example.com` | Space in local part |

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario Outline: Invalid email format shows validation error
  Given The app is on the Login screen
  When User enters email "<invalid_email>" and a valid password
  And User taps the Login button
  Then The error "Please enter valid email" is shown below the email field

  Examples:
    | invalid_email   |
    | notanemail      |
    | user@           |
    | @domain.com     |
    | user@domain     |
```

---

## 🔗 Related

- [TC-LOGIN-009 — Empty fields validation](./tc-login-009-login-form-empty-fields.md)
- [TC-LOGIN-030 — Password policy](./tc-login-030-password-policy.md)
- [Suite index](./index.md)
