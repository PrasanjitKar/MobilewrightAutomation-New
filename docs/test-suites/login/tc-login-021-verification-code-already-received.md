# TC-LOGIN-021 — "Verification Code already received" skips API and goes to Reset screen

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-021 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/forgot-password.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that tapping the "Verification Code already received" link on the Forgot Password screen bypasses the API call and navigates directly to the Reset Password screen.

---

## ✅ Preconditions

- App is on the Forgot Password screen
- User already has a verification code from a prior request

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to Forgot Password screen | Screen is displayed |
| 2 | Observe the "Verification Code already received" link | Link is visible and tappable |
| 3 | Tap the link | `_onSubmitTap(bypassCheck: true)` is called |
| 4 | Verify no API call | `shouldCallResetApi: false` means reset password API is NOT called |
| 5 | Observe navigation | App transitions to the Reset Password screen |
| 6 | Verify email field on Reset screen | Email is populated from the Forgot Password form |

---

## 🏁 Expected Results

- Tapping "Verification Code already received" skips the `resetPassword` API call
- Navigation to Reset Password screen occurs immediately (no loading state)
- No `ForgotPasswordStatus.loading` state appears
- The user can enter the existing code directly on the Reset Password form

---

## 🔍 Flutter Source Reference

```dart
// forgot_password_form.dart — "Verification Code already received" link handler
_buildUnderlineText(AppLocalizations.of(context)!.verificationCodeAlreadyReceived, () {
  _onSubmitTap(bypassCheck: true);  // skip API call
});

// _onSubmitTap with bypassCheck = true
void _onSubmitTap({bool bypassCheck = false}) {
  if (!bypassCheck) {
    // ... validation + API call
  }
  authBlock.add(
    AuthenticationShowResetPasswordEvent(
      email: _emailController.text,
      shouldCallResetApi: !bypassCheck,  // false → skip API
    ),
  );
}

// authentication_bloc.dart
if (event.shouldCallResetApi) {
  // call API
} else {
  // skip API, emit reset state directly
  emit(AuthenticationResetPasswordState(email: event.email));
}
```

**UI string (en):** `"Verification Code already received"`

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Verification code already received skips API and goes to Reset Password
  Given The app is on the Forgot Password screen
  When User taps "Verification Code already received"
  Then The Reset Password screen is displayed without an API call
  And The email is pre-filled from the Forgot Password form
```

---

## 🔗 Related

- [TC-LOGIN-018 — Forgot Password screen UI](./tc-login-018-forgot-password-screen-ui.md)
- [TC-LOGIN-023 — Reset password screen UI](./tc-login-023-reset-password-screen-ui.md)
- [Suite index](./index.md)
