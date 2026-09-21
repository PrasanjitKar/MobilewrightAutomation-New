# TC-LOGIN-011 — Login form validation — password not meeting policy

> Suite: [Login](./index.md) | Priority: High | Status: 🟢 Active — Automated

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-011 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login/login.feature` (automated) |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🟢 Active — Automated |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that entering a password that does not meet the security policy (minimum 10 characters, at least 1 uppercase, 1 lowercase, 1 digit, 1 special character) shows the "Please enter valid password" error.

---

## ✅ Preconditions

- App is on the Login screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter a valid email address | Email accepted |
| 2 | Enter a weak password (e.g., `password`, `1234567890`, `Pass1`) | Password field accepts input |
| 3 | Tap the Login button | `_validatePassword()` returns error; form is invalid |
| 4 | Observe the password field | Error label shows "Please enter valid password" |
| 5 | Verify hint text (if shown) | Policy hint: "min 10 chars, 1 special char, 1 lower case, 1 upper case, 1 number" |

---

## 🏁 Expected Results

- Error label "Please enter valid password" appears below the password field
- No API call is made
- Field border and text color change to error style

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — password validation regex
bool isValidPassword(String password) {
  final passwordRegex = RegExp(
    r'''^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#/$%&*~+"=',-.:;?{}|_`<>^()\[\]]).{10,}$'''
  );
  return passwordRegex.hasMatch(password);
}

// Error message (en)
AppLocalizations.of(context)!.pleaseEnterValidPassword  // "Please enter valid password"
// Hint (en)
AppLocalizations.of(context)!.passwordSuggest
// "Enter a valid password of minimum 10 character having 1 special character,
//  1 lower case, 1 upper case and a number."
```

**Password policy requirements:**

| Rule | Requirement |
|---|---|
| Minimum length | 10 characters |
| Uppercase letter | At least 1 (`[A-Z]`) |
| Lowercase letter | At least 1 (`[a-z]`) |
| Digit | At least 1 (`[0-9]`) |
| Special character | At least 1 from: `!@#/$%&*~+"=',-.:;?{}|_\`<>^()[]` |

**Weak password examples:**

| Input | Why it fails |
|---|---|
| `password` | No uppercase, no digit, no special char, < 10 chars |
| `Password1` | No special character |
| `P@ss1` | Too short (< 10 chars) |
| `1234567890` | No letters |

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario Outline: Weak password shows validation error on Login
  Given The app is on the Login screen
  When User enters email "user@example.com" and password "<weak_password>"
  And User taps the Login button
  Then The error "Please enter valid password" is shown below the password field

  Examples:
    | weak_password |
    | password      |
    | Password1     |
    | P@ss1         |
    | 1234567890    |
```

---

## 🔗 Related

- [TC-LOGIN-030 — Password policy documentation](./tc-login-030-password-policy.md)
- [TC-LOGIN-009 — Empty fields validation](./tc-login-009-login-form-empty-fields.md)
- [Suite index](./index.md)
