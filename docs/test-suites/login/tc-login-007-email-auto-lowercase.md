# TC-LOGIN-007 — Email field auto-converts input to lowercase

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

Verify that the email field in the Login form automatically converts any uppercase characters typed by the user to lowercase, using `LowerCaseTextFormatter`.

---

## ✅ Preconditions

- App is on the Login screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the email field (`emailTextFieldBox`) | Keyboard appears |
| 2 | Type a mixed-case email address (e.g., `TEST.User@Example.COM`) | As each character is typed, it is immediately converted to lowercase |
| 3 | Observe the field value after input | Field shows `test.user@example.com` (all lowercase) |
| 4 | Verify no uppercase characters remain | The field value contains no capital letters |

---

## 🏁 Expected Results

- All characters in the email field are automatically lowercased in real time
- The transformation is transparent to the user (no typing lag)
- This behaviour applies both to keyboard input and paste operations

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart — email TextFormField
inputFormatters: [LowerCaseTextFormatter()],

class LowerCaseTextFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    return TextEditingValue(
      text: newValue.text.toLowerCase(),
      selection: newValue.selection,
    );
  }
}
```

**Semantic labels / locators:**
- `emailTextFieldBox` — email input with `LowerCaseTextFormatter`

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Email field auto-lowercases input
  Given The app is on the Login screen
  When User types "TEST.User@Example.COM" into the email field
  Then The email field displays "test.user@example.com"
```

---

## 🔗 Related

- [TC-LOGIN-005 — Login screen UI](./tc-login-005-login-screen-ui.md)
- [TC-LOGIN-010 — Login form validation: invalid email](./tc-login-010-login-form-invalid-email.md)
- [Suite index](./index.md)
