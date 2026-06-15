# TC-LOGIN-024 — Reset password — successful flow with valid data

> Suite: [Login](./index.md) | Priority: High | Status: 🔴 Blocked

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-024 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/reset-password.page.ts` *(to create)* |
| **Status** | 🔴 Blocked |
| **Blocker** | Requires access to real email inbox to obtain OTP verification code |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that submitting the Reset Password form with a valid verification code, a policy-compliant new password, and a matching confirm password successfully resets the password and navigates the user to the Login screen.

---

## ✅ Preconditions

- App is on the Reset Password screen
- A valid verification code has been received in the email inbox
- New password meets the policy (min 10 chars, uppercase, lowercase, digit, special char)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Verify the email field is pre-filled | Correct email shown |
| 2 | Enter the numeric verification code received by email | Code entered; field accepts only numbers |
| 3 | Enter a policy-compliant new password | New password entered |
| 4 | Enter the same password in Confirm Password | Both fields match |
| 5 | Tap the Submit button | `AuthenticationResetPasswordEvent` dispatched |
| 6 | Observe loading state | Submit button disabled; loading indicator shown |
| 7 | Wait for API response | `ibd.userManager.setNewPassword(...)` returns success |
| 8 | Observe navigation | App navigates to Login screen (or success confirmation) |

---

## 🏁 Expected Results

- All validation passes; `_isValidForm()` returns `true`
- API call to set new password succeeds
- User is returned to the Login screen and can log in with the new password

---

## 🔍 Flutter Source Reference

```dart
// reset_password_form.dart — _onSubmit
_authBloc.add(
  AuthenticationResetPasswordEvent(
    email: _emailController.text,
    verificationCode: int.tryParse(_verificationCodeController.text) ?? 0,
    newPassword: _newPasswordController.text,
  ),
);

// authentication_bloc.dart
await ibd.userManager.setNewPassword(request);
// On success: navigate to login or authorized state
```

---

## 📝 Suggested Gherkin

```gherkin
# Blocked — requires email inbox access for OTP
# Scenario: Successful password reset with valid code and matching passwords
#   Given The app is on the Reset Password screen
#   When User enters verification code "td.otp" and new password "td.newPassword"
#   And User confirms the password and taps Submit
#   Then The password is reset successfully
#   And The Login screen is displayed
```

---

## 🔗 Related

- [TC-LOGIN-023 — Reset password screen UI](./tc-login-023-reset-password-screen-ui.md)
- [TC-LOGIN-025 — Reset password validation](./tc-login-025-reset-password-validation.md)
- [Suite index](./index.md)
