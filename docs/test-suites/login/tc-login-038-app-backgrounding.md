# TC-LOGIN-038 — App backgrounding and foreground resume during login

> Suite: [Login](./index.md) | Priority: Medium | Status: 🔴 Blocked

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-038 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🔴 Blocked |
| **Blocker** | Requires native OS-level app switching (Home button / app switcher) — cannot be automated via MobileWright WebView API without device-level control |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that if the user starts entering login credentials, backgrounds the app (switches to another app or presses Home), and then resumes the Conti+ app, the Login screen is still displayed with the previously entered data intact.

---

## ✅ Preconditions

- App is on the Login screen with credentials partially entered

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to the Login screen | Login screen is displayed |
| 2 | Enter email `user@example.com` in the email field | Email field is populated |
| 3 | Press the device Home button / switch to another app | Conti+ moves to background |
| 4 | Wait 10–30 seconds | App is suspended in background |
| 5 | Switch back to the Conti+ app | App resumes from background |
| 6 | Observe the Login screen | Login screen is still displayed |
| 7 | Observe the email field | Previously entered email is still present |
| 8 | Complete login with password | Login succeeds normally |

---

## 🏁 Expected Results

- App resumes to the Login screen (not Welcome or splash)
- Previously entered email is retained in the text field
- No session reset or unexpected state change on resume
- Keyboard state is restored correctly

---

## 🔍 Flutter Source Reference

```dart
// ContiplusFormTemplate uses StatefulWidget — state is preserved during app resume
// Flutter lifecycle: didChangeAppLifecycleState is not overridden in LoginForm
// → Default Flutter behaviour preserves widget state on brief background/foreground cycle
```

---

## 📝 Suggested Gherkin

```gherkin
# Cannot be fully automated — requires native OS app switching
# Manual test steps documented above
# Partial automation possible via driver-level commands if WebDriver supports app backgrounding
```

---

## 🔗 Related

- [TC-LOGIN-039 — Network switch mid-flow](./tc-login-039-network-switch.md)
- [TC-LOGIN-005 — Login screen UI](./tc-login-005-login-screen-ui.md)
- [Suite index](./index.md)
