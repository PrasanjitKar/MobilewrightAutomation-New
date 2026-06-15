# TC-LOGIN-025 — Reset password form validation errors

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-025 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/reset-password.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the Reset Password form shows appropriate inline validation errors for: blank fields, non-numeric verification code, passwords not meeting policy, and mismatched new/confirm passwords.

---

## ✅ Preconditions

- App is on the Reset Password screen

---

## 🔢 Test Steps — Scenario Outline (multiple variants)

| Variant | Condition | Expected Error |
|---|---|---|
| A | Blank verification code | "Please enter verification code" |
| B | Non-numeric verification code (e.g., `abc`) | "Please enter valid code" |
| C | Blank new password | "Please enter password" |
| D | New password too weak | "Please enter valid password" |
| E | Blank confirm password | "Please confirm password" |
| F | Confirm password ≠ new password | "Entered password doesn't match" |

For each variant:

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Set field values per scenario | Fields populated as described |
| 2 | Tap Submit | `_isValidForm()` returns `false` |
| 3 | Observe error label below the relevant field | Correct error text shown |
| 4 | Verify no API call | Submit button re-enables; no loading state |

---

## 🏁 Expected Results

- Each validation case shows the exact i18n error string
- Fields are highlighted with error decoration when invalid
- No `AuthenticationResetPasswordEvent` dispatched on invalid form

---

## 🔍 Flutter Source Reference

```dart
// reset_password_form.dart — _isValidForm validation matrix
if (verificationCode.isEmpty)         → 'pleaseEnterVerificationCode'  // "Please enter verification code"
else if (int.tryParse(vc) == null)    → 'pleaseEnterValidCode'         // "Please enter valid code"
if (newPassword.isEmpty)              → 'pleaseEnterPassword'           // "Please enter password"
else if (!isValidPassword(np))        → 'pleaseEnterValidPassword'      // "Please enter valid password"
if (confirmPassword.isEmpty)          → 'pleaseConfirmPassword'         // "Please confirm password"
else if (!isValidPassword(cp))        → 'pleaseEnterValidPassword'
else if (cp != newPassword)           → 'enteredPasswordDoesntMatch'    // "Entered password doesn't match"
```

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario Outline: Reset password form shows validation errors
  Given The app is on the Reset Password screen
  When User sets verification code "<code>" and new password "<new_pw>" and confirm "<confirm_pw>"
  And User taps Submit
  Then The error "<expected_error>" is shown

  Examples:
    | code  | new_pw           | confirm_pw       | expected_error                    |
    |       | ValidP@ss1word   | ValidP@ss1word   | Please enter verification code    |
    | abc   | ValidP@ss1word   | ValidP@ss1word   | Please enter valid code           |
    | 12345 | weak             | weak             | Please enter valid password       |
    | 12345 | ValidP@ss1word   | Different1!pass  | Entered password doesn't match    |
    | 12345 | ValidP@ss1word   |                  | Please confirm password           |
```

---

## 🔗 Related

- [TC-LOGIN-023 — Reset password screen UI](./tc-login-023-reset-password-screen-ui.md)
- [TC-LOGIN-030 — Password policy](./tc-login-030-password-policy.md)
- [Suite index](./index.md)
