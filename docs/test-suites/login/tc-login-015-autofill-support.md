# TC-LOGIN-015 — Autofill support for email and password fields

> Suite: [Login](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-015 |
| **Suite** | login |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the email and password fields support platform autofill (iOS Keychain / Android Autofill Service) via the declared `AutofillHints`, and that autofill context is properly committed before the login API call.

---

## ✅ Preconditions

- Device has saved credentials for the Conti+ app in Keychain (iOS) or Autofill Service (Android)
- App is on the Login screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the email field | Platform autofill suggestions appear (iOS: QuickType bar / Android: autofill dropdown) |
| 2 | Select the saved email from autofill suggestions | Email field is filled with the saved email |
| 3 | Tap the password field | Platform autofill populates the saved password |
| 4 | Verify both fields are populated | Both fields show the saved credential values |
| 5 | Tap Login | `TextInput.finishAutofillContext()` is called before the API request |
| 6 | Login succeeds | User is authenticated successfully |

---

## 🏁 Expected Results

- Email field declares `AutofillHints.email` and password field declares `AutofillHints.password`
- Platform credential suggestions appear when fields are tapped
- After login, `TextInput.finishAutofillContext()` is called to save the new credentials to Keychain/Autofill

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart
AutofillGroup(
  child: ...,
)

// Email field
TextFormField(autofillHints: const [AutofillHints.email], ...)

// Password field
TextFormField(autofillHints: const [AutofillHints.password], ...)

// Commit autofill context before API call (saves credentials on success)
TextInput.finishAutofillContext();
```

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Autofill populates email and password fields
  Given The app is on the Login screen
  And The device has saved credentials for the Conti+ app
  When User taps the email field
  Then Autofill suggestions are displayed
  When User selects the saved email credential
  Then Both email and password fields are populated via autofill
```

---

## 🔗 Related

- [TC-LOGIN-005 — Login screen UI](./tc-login-005-login-screen-ui.md)
- [Suite index](./index.md)
