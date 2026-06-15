# TC-LOGIN-023 — Reset Password screen displays correct UI elements

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-023 |
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

Verify that the Reset Password screen contains all required form elements: email field, verification code field with eye icon, new password field with eye icon, confirm password field with eye icon, and Submit button.

---

## ✅ Preconditions

- App is on the Reset Password screen (reached from Forgot Password)
- Screen title: "Reset password"

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to Reset Password screen | Screen is displayed |
| 2 | Verify "Back" button | `← Back` is visible at top-left |
| 3 | Verify screen title | "Reset password" heading is displayed |
| 4 | Verify email field | E-Mail field is visible; pre-filled with the email from Forgot Password |
| 5 | Verify verification code field | "Verification Code" field is visible; numeric keyboard type; eye icon present |
| 6 | Verify new password field | "New Password" field is visible; masked; eye icon present |
| 7 | Verify confirm password field | "Confirm Password" field is visible; masked; eye icon present |
| 8 | Verify Submit button | "Submit" button is visible and enabled |
| 9 | Verify eye icon default state | All three password-like fields start obscured |

---

## 🏁 Expected Results

- All form elements are present with correct labels
- Email is pre-filled and editable
- Verification code uses numeric keyboard (`TextInputType.number`)
- All three obscured fields have independent eye icon toggles
- Submit button is enabled when not in loading state

---

## 🔍 Flutter Source Reference

```dart
// contiplus/lib/src/ui/screens/forms/reset_password_form.dart
_buildTitle('...email')             // "E-Mail" — pre-filled
_buildTitle('...enterVerificationCode')  // "Verification Code *"
_buildTitle('...newPassword')       // "New Password *"
_buildTitle('...confirmPassword')   // "Confirm Password *"
CommonActionButton(title: '...submit')   // "Submit"

// Keyboard types
keyboardType: TextInputType.emailAddress   // email
keyboardType: TextInputType.number         // verification code

// Eye icons on: verificationCode, newPassword, confirmPassword
IconButton(icon: _verificationCodeObscured ? eye_open.svg : eye.svg)
IconButton(icon: _newPasswordObscured ? eye_open.svg : eye.svg)
IconButton(icon: _confirmPasswordObscured ? eye_open.svg : eye.svg)
```

**Field labels (en):**

| Field | Label |
|---|---|
| Email | "E-Mail" |
| Verification Code | "Verification Code *" |
| New Password | "New Password *" |
| Confirm Password | "Confirm Password *" |
| Submit button | "Submit" |

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Reset Password screen shows all required UI elements
  Given The app is on the Reset Password screen
  Then The "Reset password" heading is displayed
  And The email field is visible and pre-filled
  And The verification code field is visible with eye icon
  And The new password field is visible and masked
  And The confirm password field is visible and masked
  And The Submit button is visible
```

---

## 🔗 Related

- [TC-LOGIN-024 — Reset password: successful](./tc-login-024-reset-password-success.md)
- [TC-LOGIN-025 — Reset password validation](./tc-login-025-reset-password-validation.md)
- [TC-LOGIN-008 — Password visibility toggle](./tc-login-008-password-visibility-toggle.md)
- [Suite index](./index.md)
