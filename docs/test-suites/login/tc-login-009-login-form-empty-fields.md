# TC-LOGIN-009 — Login form validation — empty and blank fields

> Suite: [Login](./index.md) | Priority: Critical | Status: 🟢 Active — Automated

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-009 |
| **Suite** | login |
| **Priority** | Critical |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login/login.feature` (automated) |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🟢 Active — Automated |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that tapping the Login button with empty email, empty password, or both empty fields triggers inline validation error messages below the respective fields, and no API call is made.

---

## ✅ Preconditions

- App is on the Login screen with both fields empty

---

## 🔢 Test Steps — Scenario Outline (3 variants)

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Leave email empty, leave password empty, tap Login | Both error labels appear: "Please enter email" + "Please enter password" |
| 2 | Leave email empty, enter valid password, tap Login | Email error: "Please enter email"; no password error |
| 3 | Enter valid email, leave password empty, tap Login | Password error: "Please enter password"; no email error |

For each variant:

| # | Action | Expected Result |
|---|--------|----------------|
| A | Tap the Login button | `_isValidForm()` returns `false`; no `AuthenticationLogInEvent` dispatched |
| B | Observe the email field | Error label visible with `pleaseEnterEmail` text (if email empty) |
| C | Observe the password field | Error label visible with `pleaseEnterPassword` text (if password empty) |
| D | Observe field border | Field border turns to error style (`formFieldErrorContainerDecoration`) |
| E | Observe field text color | Field text color changes to `continentalLightRed` |

---

## 🏁 Expected Results

- Inline error labels appear immediately below the invalid field(s)
- No network request is triggered
- Error state styling: red border decoration + red text color in the field
- Login button remains enabled (ready for retry after user corrects input)
- **Note:** Validation runs on trimmed values (`_emailController.text.trim()`), so a field containing only spaces is treated as empty and shows the "Please enter email/password" error

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart — _validateEmail / _validatePassword
String _validateEmail(String email) {
  if (email.isEmpty) return AppLocalizations.of(context)!.pleaseEnterEmail;  // "Please enter email"
  if (!_authBloc.isValidEmail(email)) return AppLocalizations.of(context)!.pleaseEnterValidEmail;
  return '';
}

String _validatePassword(String pass) {
  if (pass.isEmpty) return AppLocalizations.of(context)!.pleaseEnterPassword;  // "Please enter password"
  if (!_authBloc.isValidPassword(pass)) return AppLocalizations.of(context)!.pleaseEnterValidPassword;
  return '';
}

// Error decoration applied when errorText != ''
decoration: _emailErrorText == '' ? formFieldContainerDecoration : formFieldErrorContainerDecoration
```

**Error messages (en locale):**

| Condition | Message |
|---|---|
| Email blank | `"Please enter email"` |
| Password blank | `"Please enter password"` |

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario Outline: Login form shows validation errors for empty fields
  Given The app is on the Login screen
  When User enters email "<email>" and password "<password>"
  And User taps the Login button
  Then The login error "<email_error>" is shown for the email field
  And The login error "<password_error>" is shown for the password field
  And No login API call is made

  Examples:
    | email              | password       | email_error        | password_error        |
    |                    |                | Please enter email | Please enter password |
    |                    | ValidP@ss1word |  Please enter email |                       |
    | user@example.com   |                |                    | Please enter password |
```

---

## 🔗 Related

- [TC-LOGIN-010 — Invalid email format](./tc-login-010-login-form-invalid-email.md)
- [TC-LOGIN-011 — Invalid password format](./tc-login-011-login-form-invalid-password.md)
- [Suite index](./index.md)
