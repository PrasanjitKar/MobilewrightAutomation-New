# TC-LOGIN-022 — Back button and Login link on Forgot Password screen

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-022 |
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

Verify that both the "Back" button and the "Login" link on the Forgot Password screen navigate the user back to the Login screen via `AuthenticationGoBackEvent`.

---

## ✅ Preconditions

- App is on the Forgot Password screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Verify Back button is visible | `← Back` button is shown at top-left |
| 2 | Tap the Back button | `AuthenticationGoBackEvent(contiplusFormTemplateType: forgotPassword)` dispatched |
| 3 | Observe navigation | App returns to the Login screen |
| 4 | Navigate back to Forgot Password screen | Forgot Password screen shown again |
| 5 | Scroll to the "Login" underlined link | "Login" link visible at bottom of form |
| 6 | Tap the "Login" link | Same `AuthenticationGoBackEvent` dispatched |
| 7 | Observe navigation | App returns to the Login screen |

---

## 🏁 Expected Results

- Both Back button and "Login" link navigate to the Login screen
- The Login screen shows email pre-populated with any email entered on Forgot Password

---

## 🔍 Flutter Source Reference

```dart
// contiplus_form_template.dart — back button for non-login screens
BlocProvider.of<AuthenticationBloc>(context).add(
  AuthenticationGoBackEvent(
    email: widget.email ?? '',
    contiplusFormTemplateType: widget.contiplusFormTemplateType,  // forgotPassword
    isLoginScreen: false,
  ),
);

// forgot_password_form.dart — "Login" link
_buildUnderlineText(AppLocalizations.of(context)!.login, () {
  authBlock.add(
    const AuthenticationGoBackEvent(
      email: '',
      contiplusFormTemplateType: ContiplusFormTemplateType.forgotPassword,
      isLoginScreen: false,
    ),
  );
});
```

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario Outline: Navigation back to Login from Forgot Password
  Given The app is on the Forgot Password screen
  When User taps "<element>"
  Then The Login screen is displayed

  Examples:
    | element        |
    | Back button    |
    | Login link     |
```

---

## 🔗 Related

- [TC-LOGIN-017 — Forgot password navigation](./tc-login-017-forgot-password-navigation.md)
- [TC-LOGIN-018 — Forgot Password screen UI](./tc-login-018-forgot-password-screen-ui.md)
- [Suite index](./index.md)
