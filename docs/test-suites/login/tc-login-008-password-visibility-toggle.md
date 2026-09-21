# TC-LOGIN-008 — Password field visibility toggle (eye icon)

> Suite: [Login](./index.md) | Priority: Medium | Status: 🟢 Active — Automated

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-008 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login/login.feature` (automated) |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🟢 Active — Automated |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the eye icon button in the password field toggles the password between obscured (hidden) and visible text, and that the icon changes to reflect the current state.

---

## ✅ Preconditions

- App is on the Login screen
- Password field has some text entered

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter a password (e.g., `MyP@ssword1`) into the password field | Password is entered; field shows `••••••••••` (obscured) |
| 2 | Observe the eye icon | `eye_open.svg` icon is shown (indicating password is hidden) |
| 3 | Tap the eye icon | Password becomes visible as plain text (`MyP@ssword1`) |
| 4 | Observe the icon after tap | Icon changes to `eye.svg` (indicating password is visible) |
| 5 | Tap the eye icon again | Password returns to obscured state |
| 6 | Observe the icon again | Icon reverts to `eye_open.svg` |

---

## 🏁 Expected Results

- Default state: password is obscured (`_passwordObscured = true`); `eye_open.svg` shown
- After first toggle: password is visible; `eye.svg` shown
- Toggle is bidirectional and repeatable
- Password value is not lost during toggle

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart — password field with eye toggle
TextFormField(obscureText: _passwordObscured, ...)
IconButton(
  onPressed: () { setState(() { _passwordObscured = !_passwordObscured; }); },
  icon: _passwordObscured
    ? SvgPicture.asset('assets/svg/eye_open.svg', height: 12)
    : SvgPicture.asset('assets/svg/eye.svg', height: 15),
)
```

**Semantic labels / locators:**
- `passwordTextFieldBox` — password input (stack containing the field and eye icon button)

**SVG assets:**
- `assets/svg/eye_open.svg` — password is hidden
- `assets/svg/eye.svg` — password is visible

> **Note:** Same toggle pattern is used on the Reset Password and Change Password forms.

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Password visibility toggle works correctly
  Given The app is on the Login screen
  When User enters password "MyP@ssword1" in the password field
  Then The password field is obscured by default
  When User taps the eye icon
  Then The password is displayed as plain text
  When User taps the eye icon again
  Then The password is obscured again
```

---

## 🔗 Related

- [TC-LOGIN-005 — Login screen UI](./tc-login-005-login-screen-ui.md)
- [TC-LOGIN-023 — Reset password screen UI](./tc-login-023-reset-password-screen-ui.md)
- [TC-LOGIN-027 — Change password success](./tc-login-027-change-password-success.md)
- [Suite index](./index.md)
