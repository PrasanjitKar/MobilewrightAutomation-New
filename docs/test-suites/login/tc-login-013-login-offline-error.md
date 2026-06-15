# TC-LOGIN-013 — Login while offline shows offline error

> Suite: [Login](./index.md) | Priority: High | Status: 🔴 Blocked

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-013 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_valid` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🔴 Blocked |
| **Blocker** | Requires device-level network toggle (airplane mode); not automatable via MobileWright WebView API |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that when the device has no network connectivity and the user attempts to log in, the BLoC emits `AuthenticationErrorState(errorKey: 'offlineError')` and an appropriate offline error is shown.

---

## ✅ Preconditions

- App is on the Login screen
- Device network is disabled (airplane mode or no WiFi/data)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Disable network on the device (airplane mode) | Device is offline; `connectivityHelper.isOnline` returns `false` |
| 2 | Enter valid-format credentials | Fields accept input |
| 3 | Tap the Login button | Form validation passes; `AuthenticationLogInEvent` dispatched |
| 4 | Observe the result | Offline error state emitted: `errorKey: 'offlineError'` |
| 5 | Verify error UI | Offline error message is displayed to the user |
| 6 | Re-enable network | Network restored |

---

## 🏁 Expected Results

- When offline, the BLoC skips the API call and immediately emits `AuthenticationLoginErrorState(errorKey: 'offlineError')`
- An error message appropriate to an offline state is shown
- Credentials are preserved in the error state for retry

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — _mapAuthenticationLoginEventToState
final bool isOnline = connectivityHelper.isOnline;
if (isOnline) {
  // ... make API call
} else {
  loggingService.logAuthenticationInfo('User not Online for login');
  emit(AuthenticationLoginErrorState(errorKey: 'offlineError'));
}
```

---

## 📝 Suggested Gherkin

```gherkin
# Cannot be automated — requires physical network toggle
# Manual test only
Scenario: Login while offline shows offline error
  Given The app is on the Login screen
  And The device has no network connectivity
  When User enters valid credentials and taps Login
  Then An offline error message is displayed
  And The user remains on the Login screen
```

---

## 🔗 Related

- [TC-LOGIN-012 — Invalid credentials](./tc-login-012-invalid-credentials.md)
- [Suite index](./index.md)
