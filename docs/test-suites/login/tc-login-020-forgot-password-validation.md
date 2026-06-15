# TC-LOGIN-020 — Forgot password form validation — empty and invalid email

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-020 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/forgot-password.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that submitting the Forgot Password form with an empty email or an invalid email format shows inline validation errors and prevents the API call.

---

## ✅ Preconditions

- App is on the Forgot Password screen

---

## 🔢 Test Steps — Scenario Outline (2 variants)

| Variant | Email Input | Expected Error |
|---|---|---|
| Empty | *(blank)* | "Please enter email" |
| Invalid format | `notanemail` | "Please enter valid email" |

For each variant:

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter the email value (or leave blank) | Field state set |
| 2 | Tap "Get Verification Code" | `_onSubmitTap()` runs validation |
| 3 | Observe error label | Correct error text appears below the email field |
| 4 | Observe button state | Button re-enables; no API call made |
| 5 | Observe field decoration | Border changes to error decoration if email is invalid |

---

## 🏁 Expected Results

- Empty email → error: "Please enter email"
- Invalid format → error: "Please enter valid email"
- No `AuthenticationShowResetPasswordEvent` dispatched
- Field border and text color reflect error state

---

## 🔍 Flutter Source Reference

```dart
// forgot_password_form.dart — _onSubmitTap validation
final String email = _emailController.text;
if (email.isEmpty) {
  emailErrorText = AppLocalizations.of(context)!.pleaseEnterEmail;  // "Please enter email"
} else if (!authBlock.isValidEmail(email)) {
  emailErrorText = AppLocalizations.of(context)!.pleaseEnterValidEmail;  // "Please enter valid email"
} else {
  emailErrorText = '';
}
if (emailErrorText != '') { return; }  // guard: no API call
```

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario Outline: Forgot password email validation shows correct error
  Given The app is on the Forgot Password screen
  When User enters email "<email>" and taps "Get Verification Code"
  Then The error "<expected_error>" is shown below the email field

  Examples:
    | email       | expected_error              |
    |             | Please enter email          |
    | notanemail  | Please enter valid email    |
```

---

## 🔗 Related

- [TC-LOGIN-018 — Forgot Password screen UI](./tc-login-018-forgot-password-screen-ui.md)
- [TC-LOGIN-019 — Valid email](./tc-login-019-forgot-password-valid-email.md)
- [Suite index](./index.md)
