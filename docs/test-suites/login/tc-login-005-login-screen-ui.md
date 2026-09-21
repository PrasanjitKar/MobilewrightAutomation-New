# TC-LOGIN-005 — Login screen displays correct UI elements

> Suite: [Login](./index.md) | Priority: Critical | Status: 🟢 Active — Automated

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-005 |
| **Suite** | login |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/smoke/login.feature` (automated) |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🟢 Active — Automated |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the Login screen (reached via "Continental Account" on Welcome) renders all expected elements: Conti+ logo, "Welcome!" heading, Email field, Password field with eye icon, Login button, and "Forgot password" link.

---

## ✅ Preconditions

- App is on the Welcome screen
- User has tapped "Continental Account" to reach the Login screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap "Continental Account" from Welcome screen | Login screen is displayed |
| 2 | Verify "Back" button | Back button is visible at top-left (`shouldShowBackButton()` returns `true` for login) |
| 3 | Verify Conti+ logo | `conti+Logo` is displayed |
| 4 | Verify "Welcome!" heading | `welcomeText` label shows "Welcome!" |
| 5 | Verify email field label | "E-Mail" label with mandatory indicator is shown |
| 6 | Verify email text field | `emailTextFieldBox` is visible and accepts input |
| 7 | Verify password field label | "Password" label with mandatory indicator is shown |
| 8 | Verify password field | `passwordTextFieldBox` is visible; input is obscured by default |
| 9 | Verify eye icon on password field | Eye icon is present to toggle visibility |
| 10 | Verify Login button | `loginButton` with text "Login" is visible and enabled |
| 11 | Verify Forgot Password link | `forgotPasswordText` link with text "Forgot password" is visible |

---

## 🏁 Expected Results

- All 11 UI elements are present and correctly rendered
- Password is masked (`obscureText: true`) by default
- Login button is enabled when no loading state is active
- "Forgot password" is styled as underlined white text

---

## 🔍 Flutter Source Reference

```dart
// contiplus/lib/src/ui/screens/forms/login_form.dart
SemanticsLabel(label: 'emailTextFieldBox', child: TextFormField(...))
SemanticsLabel(label: 'passwordTextFieldBox', child: TextFormField(obscureText: _passwordObscured))
SemanticsLabel(label: 'loginButton', child: CommonActionButton(title: '...login'))
SemanticsLabel(label: 'forgotPasswordText', child: Text('...forgotPassword'))
```

**Semantic labels / locators:**

| Label | Widget | Text (en) |
|---|---|---|
| `conti+Logo` | Conti+ logo | — |
| `welcomeText` | Screen title | "Welcome!" |
| `emailTextFieldBox` | Email input | — |
| `passwordTextFieldBox` | Password input | — |
| `loginButton` | Login button | "Login" |
| `forgotPasswordText` | Forgot password link | "Forgot password" |

---

## 📝 Suggested Gherkin

```gherkin
@smoke @both
Scenario: Login screen shows all required UI elements
  Given The app is on the Welcome screen
  When User taps the "Continental Account" button
  Then The Login screen is displayed with Conti+ logo
  And The email field is visible
  And The password field is visible and masked
  And The Login button is visible
  And The "Forgot password" link is visible
```

---

## 🔗 Related

- [TC-LOGIN-006 — Successful login](./tc-login-006-successful-login.md)
- [TC-LOGIN-008 — Password visibility toggle](./tc-login-008-password-visibility-toggle.md)
- [TC-LOGIN-016 — Back button on Login screen](./tc-login-016-back-button-login.md)
- [Suite index](./index.md)
