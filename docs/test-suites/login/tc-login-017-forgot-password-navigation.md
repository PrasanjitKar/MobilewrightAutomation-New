# TC-LOGIN-017 — Forgot Password link navigates to Forgot Password screen

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-017 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that tapping the "Forgot password" link on the Login screen dispatches `AuthenticationShowForgotPasswordEvent` and transitions to the Forgot Password screen, with the current email field value pre-populated.

---

## ✅ Preconditions

- App is on the Login screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Optionally enter an email in the email field | Email value is available for pre-population |
| 2 | Tap the `forgotPasswordText` link ("Forgot password") | `AuthenticationShowForgotPasswordEvent(email: ...)` dispatched |
| 3 | Observe transition | App navigates to the Forgot Password screen |
| 4 | Verify email pre-fill | If email was entered on Login screen, it is pre-filled in Forgot Password email field |
| 5 | Verify screen title | "Forgot password" heading is displayed |

---

## 🏁 Expected Results

- "Forgot password" link is tappable and renders correctly (underlined, white)
- Tapping navigates to `AuthenticationForgotPasswordState`
- The email entered on the Login screen is carried over to the Forgot Password form

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart — forgotPasswordText tap handler
GestureDetector(
  onTap: () {
    _authBloc.add(
      AuthenticationShowForgotPasswordEvent(email: _emailController.text),
    );
  },
  child: SemanticsLabel(label: 'forgotPasswordText', child: Text('...forgotPassword')),
)
```

**Semantic labels / locators:**
- `forgotPasswordText` — "Forgot password" underlined link at the bottom of the Login form

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Forgot password link navigates to Forgot Password screen
  Given The app is on the Login screen
  And User has entered email "user@example.com" in the email field
  When User taps the "Forgot password" link
  Then The Forgot Password screen is displayed
  And The email field shows "user@example.com"
```

---

## 🔗 Related

- [TC-LOGIN-018 — Forgot Password screen UI](./tc-login-018-forgot-password-screen-ui.md)
- [TC-LOGIN-019 — Forgot password with valid email](./tc-login-019-forgot-password-valid-email.md)
- [Suite index](./index.md)
