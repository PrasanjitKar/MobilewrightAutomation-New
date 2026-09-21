# TC-LOGIN-015 — Autofill support for email and password fields

> Suite: [Login](./index.md) | Priority: Low | Status: 🟢 Active — Automated

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
| **Feature File** | `features/regression/login/login.feature` (automated) |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🟢 Active — Automated |
| **Platform** | iOS + Android |

---

## ⚠️ Automation Scope Note

MobileWright's `Screen`/`Device` APIs do not expose a way to drive the platform's native
autofill UI (iOS QuickType bar / Android Autofill dropdown), so genuine autofill *selection*
cannot be automated end-to-end. The automated scenario in `features/regression/login/login.feature`
verifies the automatable prerequisite instead: both fields are standard, focusable text inputs
that declare `AutofillHints.email` / `AutofillHints.password` in the Flutter source, making
them eligible for platform autofill. Full autofill-selection coverage (steps 1–4 below) remains
a manual test.

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
