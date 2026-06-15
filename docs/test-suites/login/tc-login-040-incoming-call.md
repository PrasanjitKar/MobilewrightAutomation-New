# TC-LOGIN-040 — Incoming call interruption during login

> Suite: [Login](./index.md) | Priority: Low | Status: 🔴 Blocked

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-040 |
| **Suite** | login |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🔴 Blocked |
| **Blocker** | Requires real incoming call on device — cannot be automated via MobileWright WebView API |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the Conti+ app correctly handles an incoming phone call interrupting the login flow: the app suspends cleanly, the call can be answered, and on return to the app the Login screen is intact with previously entered data.

---

## ✅ Preconditions

- App is on the Login screen
- A second device or SIM available to make an incoming call

---

## 🔢 Test Steps — Scenario A: Decline call, return to app

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter email and password on Login screen | Fields are populated |
| 2 | Trigger an incoming call to the device | Call notification appears |
| 3 | Decline / dismiss the call | Call ends; app returns to foreground |
| 4 | Observe Login screen | Login screen is intact with previously entered values |
| 5 | Tap Login | Login completes successfully |

### Scenario B: Answer call, then return to app

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter email and password on Login screen | Fields are populated |
| 2 | Answer the incoming call | App moves to background during call |
| 3 | End the call | App returns to foreground |
| 4 | Observe Login screen | Login screen displayed; data intact |
| 5 | Tap Login | Login completes successfully |

---

## 🏁 Expected Results

- App handles `AppLifecycleState.paused` / `inactive` during call without losing UI state
- Login form data is preserved across the interruption
- No crash, hang, or unexpected navigation to Welcome screen
- Login succeeds after call ends

---

## 🔍 Flutter Source Reference

```dart
// LoginForm is a StatefulWidget — controller values survive lifecycle pause
// No explicit AppLifecycleObserver registered in LoginForm
// Flutter preserves widget tree state during brief pause lifecycle events
```

---

## 📝 Suggested Gherkin

```gherkin
# Cannot be automated — requires real incoming call
# Manual test steps documented above
```

---

## 🔗 Related

- [TC-LOGIN-038 — App backgrounding](./tc-login-038-app-backgrounding.md)
- [TC-LOGIN-005 — Login screen UI](./tc-login-005-login-screen-ui.md)
- [Suite index](./index.md)
