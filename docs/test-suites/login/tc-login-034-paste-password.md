# TC-LOGIN-034 — Paste text into password field

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-034 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that a user can paste a password from the clipboard into the password field of the Login form, and that the pasted value is accepted and can be used for login.

---

## ✅ Preconditions

- App is on the Login screen
- A valid password is pre-copied to the device clipboard

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Copy a valid password to the clipboard (e.g., `ValidP@ss1word`) | Password is in the device clipboard |
| 2 | Tap the password field (`passwordTextFieldBox`) | Keyboard appears; cursor is in the field |
| 3 | Long-press the password field | Context menu appears with "Paste" option |
| 4 | Tap **Paste** | Clipboard content is pasted into the password field |
| 5 | Observe the field | Field shows `••••••••••••••` (obscured — paste accepted) |
| 6 | Tap the eye icon | Password reveals as `ValidP@ss1word` — confirms paste worked |
| 7 | Enter a valid email and tap Login | Login proceeds using the pasted password |
| 8 | Verify login success | Home screen is displayed |

---

## 🏁 Expected Results

- Paste operation is supported on both iOS and Android
- Pasted content is obscured (not shown in plain text by default)
- The password field does not block or clear paste operations
- Login with pasted password succeeds if credentials are valid

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart — password TextFormField
// No inputFormatters on password field — paste is unrestricted
SemanticsLabel(
  label: 'passwordTextFieldBox',
  child: TextFormField(
    autofillHints: const [AutofillHints.password],
    controller: _passwordController,
    obscureText: _passwordObscured,
    // No paste restriction — system clipboard paste enabled
  ),
)

// Note: the email field's LowerCaseTextFormatter wiring is currently commented out,
// so pasted text (like typed text) keeps its original case on screen; lowercasing
// happens only once, at submit time, in _onLogin() via .trim().toLowerCase().
```

> **Note:** Pasting an uppercase email address into the email field does **not** get auto-lowercased on screen — the `LowerCaseTextFormatter` is defined in source but not currently wired to the field's `inputFormatters`. The lowercase conversion is applied only at submit time (see TC-LOGIN-007).

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Paste password into password field and login successfully
  Given The app is on the Login screen
  And The user has a valid password in the clipboard
  When User long-presses the password field and selects Paste
  Then The clipboard content is pasted into the password field
  And The field displays obscured text
  When User enters a valid email and taps Login
  Then The Home screen is displayed
```

---

## 🔗 Related

- [TC-LOGIN-008 — Password visibility toggle](./tc-login-008-password-visibility-toggle.md)
- [TC-LOGIN-015 — Autofill support](./tc-login-015-autofill-support.md)
- [Suite index](./index.md)
