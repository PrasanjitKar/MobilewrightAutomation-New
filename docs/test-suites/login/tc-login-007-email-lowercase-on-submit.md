# TC-LOGIN-007 — Email value is lowercased and trimmed on submit (not live as-you-type)

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-007 |
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

Verify that the email field in the Login form **preserves the exact case as typed** while the user is entering it (no live auto-lowercase), but that the value is converted to lowercase (and trimmed) when the Login button is tapped, immediately before it is sent to `AuthenticationLogInEvent`.

> **Correction note:** The `LowerCaseTextFormatter` `TextInputFormatter` class still exists in `login_form.dart`, but its `inputFormatters: [LowerCaseTextFormatter()]` wiring on the email `TextFormField` is **commented out** in the current source. This means the field does **not** auto-lowercase in real time as previously assumed — the actual lowercase conversion happens only once, on submit, via `.trim().toLowerCase()` inside `_onLogin()`.

---

## ✅ Preconditions

- App is on the Login screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the email field (`emailTextFieldBox`) | Keyboard appears |
| 2 | Type a mixed-case email address (e.g., `TEST.User@Example.COM`) | The field **displays the text exactly as typed**, preserving uppercase characters (no live formatter is applied) |
| 3 | Without clearing the field, tap the `loginButton` (with a matching valid password) | `_onLogin()` reads `_emailController.text.trim().toLowerCase()` and dispatches `AuthenticationLogInEvent(username: 'test.user@example.com', ...)` |
| 4 | Verify the API/BLoC receives the lowercased value | The login request uses the fully lowercased, trimmed username regardless of the case displayed in the field |

---

## 🏁 Expected Results

- The email field's on-screen value retains whatever case the user typed or pasted — it is **not** transformed live
- The value used for authentication is always lowercased and trimmed, exactly once, at submit time
- This applies equally to typed and pasted input, since both go through the same `_onLogin()` submit path

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart — _buildEmailTextField()
child: SemanticsLabel(
  label: 'emailTextFieldBox',
  child: TextFormField(
    autofillHints: const [AutofillHints.email],
    controller: _emailController,
    // inputFormatters: [LowerCaseTextFormatter()],   // ← commented out: NOT live-applied
    ...
  ),
),

// login_form.dart — _onLogin()
_authBloc.add(
  AuthenticationLogInEvent(
    username: _emailController.text.trim().toLowerCase(),  // ← lowercase applied here, on submit only
    password: _passwordController.text.trim(),
  ),
);

// login_form.dart — LowerCaseTextFormatter is still defined but currently unused
class LowerCaseTextFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    return TextEditingValue(text: newValue.text.toLowerCase(), selection: newValue.selection);
  }
}
```

**Semantic labels / locators:**
- `emailTextFieldBox` — email input field (case preserved on screen; lowercased only at submit time)
- `loginButton` — triggers the lowercase+trim conversion via `_onLogin()`

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Email is preserved as typed but lowercased at submit time
  Given The app is on the Login screen
  When User types "TEST.User@Example.COM" into the email field
  Then The email field should still display "TEST.User@Example.COM"
  When User enters a matching valid password and taps the Login button
  Then The login request should use the lowercased email "test.user@example.com"
```

---

## 🔗 Related

- [TC-LOGIN-005 — Login screen UI](./tc-login-005-login-screen-ui.md)
- [TC-LOGIN-010 — Login form validation: invalid email](./tc-login-010-login-form-invalid-email.md)
- [TC-LOGIN-035 — Email/password spaces trim](./tc-login-035-email-password-spaces-trim.md)
- [Suite index](./index.md)
