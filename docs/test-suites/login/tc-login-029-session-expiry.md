# TC-LOGIN-029 — Session expiry redirects to Login with session expired message

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-029 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_valid` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a user's session (access + refresh tokens) expires, the app automatically redirects the user to the Login screen and displays the session-expired message: "Your Login session expired, Please login to proceed".

---

## ✅ Preconditions

- User is logged in and on the Home screen
- Session tokens have expired (simulate by waiting for token TTL or by revoking tokens server-side)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | User is authenticated and on the Home screen | Home screen is visible |
| 2 | Simulate/wait for session token expiry | Access token expires; refresh token also expires or is invalid |
| 3 | Attempt any navigation or data-fetching action | App detects `isAuthenticationExpired: true` |
| 4 | Observe app behaviour | App transitions to the Login screen |
| 5 | Verify session-expired message | "Your Login session expired, Please login to proceed" is shown |
| 6 | Verify Login screen is active | Email and password fields are visible for re-authentication |

---

## 🏁 Expected Results

- When both access and refresh tokens are invalid, `AuthenitcationUnauthorizedState` is emitted
- Session-expired message (`yourLoginSessionExpiredPleaseLoginToProceed`) is shown
- User is redirected to Login screen automatically
- No data from the previous session is visible

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — app load event / session check
if (isAuthenticationExpired) {
  // refresh token also fails
  emit(AuthenitcationUnauthorizedState());
}

// i18n string (en)
AppLocalizations.of(context)!.yourLoginSessionExpiredPleaseLoginToProceed
// → "Your Login session expired, Please login to proceed"

// Token refresh attempt
authenticatedUserResponse = await ibd.authenticationManager.refreshAuthentication();
// If refresh fails → emit AuthenitcationUnauthorizedState
```

> **State class name note:** The class is `AuthenitcationUnauthorizedState` (intentional typo `Authenit` in source) — see `authentication_state.dart` line 42.

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Expired session redirects to Login with expiry message
  Given The user is logged in and on the Home screen
  When The user's login session expires
  Then The Login screen is displayed
  And The message "Your Login session expired, Please login to proceed" is shown
```

---

## 🔗 Related

- [TC-LOGIN-006 — Successful login](./tc-login-006-successful-login.md)
- [Suite index](./index.md)
