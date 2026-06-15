# TC-LOGIN-018 — Forgot Password screen displays correct UI elements

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-018 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/forgot-password.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the Forgot Password screen contains all required UI elements: "Forgot password" heading, E-Mail field, "Get Verification Code" button, "Verification Code already received" link, and a "Login" back-link.

---

## ✅ Preconditions

- App is on the Forgot Password screen (reached from Login via "Forgot password" link)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to Forgot Password screen | Forgot Password screen is active |
| 2 | Verify "Back" button | Back button (`← Back`) is visible at top-left |
| 3 | Verify screen title | "Forgot password" heading is displayed |
| 4 | Verify email field | E-Mail field is visible with mandatory label |
| 5 | Verify primary button | "Get Verification Code" button is visible and enabled |
| 6 | Verify secondary link | "Verification Code already received" underlined link is visible |
| 7 | Verify Login link | "Login" underlined link is visible for navigation back |

---

## 🏁 Expected Results

- All 7 UI elements are present and correctly rendered
- Email field may be pre-filled if navigated from Login screen with an email entered
- Both "Verification Code already received" and "Login" links are styled as underlined white text

---

## 🔍 Flutter Source Reference

```dart
// contiplus/lib/src/ui/screens/forms/forgot_password_form.dart
_buildTitle(AppLocalizations.of(context)!.email.replaceAll('*', ''))  // "E-Mail"
_buildEmailTextField()
_buildButton()  // "Get Verification Code"
_buildUnderlineText(AppLocalizations.of(context)!.verificationCodeAlreadyReceived, ...)
_buildUnderlineText(AppLocalizations.of(context)!.login, ...)  // "Login"

// Screen title from contiplus_form_template.dart
case ContiplusFormTemplateType.forgotPassword:
  return AppLocalizations.of(context)!.forgotPassword;  // "Forgot password"
```

**UI strings (en):**

| Widget | Text |
|---|---|
| Screen heading | "Forgot password" |
| Email label | "E-Mail" |
| Primary button | "Get Verification Code" |
| Secondary link | "Verification Code already received" |
| Back link | "Login" |

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Forgot Password screen shows all required elements
  Given The app is on the Forgot Password screen
  Then The "Forgot password" heading is displayed
  And The email field is visible
  And The "Get Verification Code" button is visible
  And The "Verification Code already received" link is visible
  And The "Login" back-link is visible
```

---

## 🔗 Related

- [TC-LOGIN-019 — Valid email sends verification code](./tc-login-019-forgot-password-valid-email.md)
- [TC-LOGIN-020 — Forgot password validation](./tc-login-020-forgot-password-validation.md)
- [TC-LOGIN-021 — Verification code already received](./tc-login-021-verification-code-already-received.md)
- [TC-LOGIN-022 — Back button on Forgot Password](./tc-login-022-back-button-forgot-password.md)
- [Suite index](./index.md)
