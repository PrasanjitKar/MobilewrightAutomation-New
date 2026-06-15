# TC-LOGIN-019 — Forgot password with valid email sends verification code

> Suite: [Login](./index.md) | Priority: High | Status: 🔴 Blocked

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-019 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_valid` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/forgot-password.page.ts` *(to create)* |
| **Status** | 🔴 Blocked |
| **Blocker** | Requires a real email inbox to receive and verify the OTP / verification code |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that submitting a valid registered email on the Forgot Password screen triggers the reset password API call and transitions the app to the Reset Password screen.

---

## ✅ Preconditions

- App is on the Forgot Password screen
- `login_valid` test data contains a real email registered in STG
- Access to the email inbox to read the verification code

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter a valid registered email into the email field | Email accepted; no error |
| 2 | Tap the "Get Verification Code" button | `shouldCallResetApi: true`; loading indicator appears |
| 3 | Wait for API response (`ibd.userManager.resetPassword(...)`) | API call completes successfully |
| 4 | Observe the navigation | App transitions to the Reset Password screen (`AuthenticationResetPasswordState`) |
| 5 | Verify email is pre-filled on Reset screen | The submitted email appears in the reset form |

---

## 🏁 Expected Results

- Loading indicator visible during API call (`ForgotPasswordStatus.loading`)
- On success: app navigates to Reset Password screen
- Email field on Reset Password screen is pre-filled with the entered email
- A verification code is sent to the user's email

---

## 🔍 Flutter Source Reference

```dart
// forgot_password_form.dart — _onSubmitTap
authBlock.add(
  AuthenticationShowResetPasswordEvent(
    email: _emailController.text,
    shouldCallResetApi: !bypassCheck,  // true = call API
  ),
);

// authentication_bloc.dart — reset password API call
await ibd.userManager.resetPassword(userResetPasswordRequest);
// On success:
emit(AuthenticationResetPasswordState(email: email));
```

---

## 📝 Suggested Gherkin

```gherkin
# Blocked — requires email inbox access
# @DataFile:resources/data/logindata.csv @Key:login_valid @regression @both
# Scenario: Submitting valid email on Forgot Password sends verification code
#   Given The app is on the Forgot Password screen
#   When User enters "td.username" and taps "Get Verification Code"
#   Then The Reset Password screen is displayed
#   And The email field is pre-filled with "td.username"
```

---

## 🔗 Related

- [TC-LOGIN-018 — Forgot Password screen UI](./tc-login-018-forgot-password-screen-ui.md)
- [TC-LOGIN-024 — Reset password: successful](./tc-login-024-reset-password-success.md)
- [Suite index](./index.md)
