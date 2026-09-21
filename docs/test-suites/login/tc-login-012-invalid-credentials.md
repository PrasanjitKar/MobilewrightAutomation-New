# TC-LOGIN-012 — Login with invalid credentials shows authentication error

> Suite: [Login](./index.md) | Priority: Critical | Status: 🟢 Active — Automated

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-012 |
| **Suite** | login |
| **Priority** | Critical |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_invalid` |
| **Feature File** | `features/regression/login/login.feature` (automated) |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 🟢 Active — Automated |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that entering a valid-format email and password that are not recognised by the server results in an `AuthenticationErrorState` with `errorKey: 'authenticationError'` being displayed to the user.

---

## ✅ Preconditions

- App is on the Login screen and device is online
- Test data `login_invalid` contains an email that exists but an incorrect password (or a non-existent account), both meeting the format/policy rules

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter a valid-format email that exists in STG | Email accepted |
| 2 | Enter an incorrect password (meets policy, but wrong) | Password field accepted |
| 3 | Tap the Login button | Form is valid; `AuthenticationLogInEvent` is dispatched |
| 4 | "Login..." snackbar appears; button is disabled | Loading state active |
| 5 | API returns `401` / auth error | `AuthenticationErrorState(errorKey: 'authenticationError')` emitted |
| 6 | Observe the UI | Error message is displayed on the Login screen |
| 7 | Verify the form remains accessible | User can retry with different credentials |

---

## 🏁 Expected Results

- An error UI is shown after the failed authentication attempt
- The error corresponds to `AuthenticationLoginErrorState(errorKey: 'authenticationError')`
- No navigation away from the Login screen
- Email and password fields are pre-populated with the entered values
- Login button is re-enabled for retry

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — _mapAuthenticationLoginEventToState
// On API error (401 / auth failure):
emit(AuthenticationLoginErrorState(
  errorKey: 'authenticationError',
));

// AuthenticationLoginErrorState (distinct from AuthenticationErrorState)
class AuthenticationLoginErrorState extends AuthenticationState {
  const AuthenticationLoginErrorState({this.errorKey = ''});
  final String errorKey;  // 'authenticationError' | 'offlineError'
}
```

> **Note:** The local codebase uses `AuthenticationLoginErrorState` for login errors and `AuthenticationErrorState` for general errors. Both have `errorKey` fields.

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:login_invalid @regression @both
Scenario: Invalid credentials show authentication error
  Given The app is on the Login screen
  When User enters email "td.username" and password "td.password.wrong"
  And User taps the Login button
  Then An authentication error is displayed
  And The user remains on the Login screen
```

---

## 🔗 Related

- [TC-LOGIN-013 — Offline error](./tc-login-013-login-offline-error.md)
- [TC-LOGIN-006 — Successful login](./tc-login-006-successful-login.md)
- [Suite index](./index.md)
