# TC-LOGIN-031 — Logout flow clears session and returns to Welcome screen

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-031 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_valid` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/profile.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the Logout button in the Profile screen dispatches `AuthenticationLogOutEvent`, calls the logout API with the device refresh token, clears all local session data (Hive, secure storage, HTTP auth headers), cancels all background tasks, and navigates the user back to the Welcome screen.

---

## ✅ Preconditions

- User is authenticated and on the Home/Dashboard screen
- Device is online

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to the Profile screen from the Home screen | Profile screen is displayed with user name and profile type in the header |
| 2 | Scroll to the bottom of the Profile screen | Logout button is visible |
| 3 | Tap the **Logout** button | `AuthenticationLogOutEvent` is dispatched |
| 4 | Observe loading (optional) | No blocking UI, logout proceeds silently |
| 5 | Wait for logout to complete | `logoutUserDevice(refreshToken)` API call is made |
| 6 | Observe navigation | App transitions to the Welcome screen (`AuthenitcationUnauthorizedState`) |
| 7 | Verify the Welcome screen | "Login with:" heading and both login buttons displayed |
| 8 | Verify session is cleared | Attempt to go back — no authenticated screen is accessible |
| 9 | Re-launch app | App starts at Welcome screen (login flag cleared via `setFlag(isLogin: false)`) |

---

## 🏁 Expected Results

- Logout API is called with the device's refresh token
- All local data cleared: `secureStorage.deleteAll()`, Hive data, HTTP auth headers removed
- All background manager tasks cancelled (conveyor, company, ultrasonic, monitoring, inspection, etc.)
- User lands on Welcome screen, not Login screen (BLoC emits `AuthenitcationUnauthorizedState`)
- After app restart, Welcome screen is shown (login flag is `false`)

---

## 🔍 Flutter Source Reference

```dart
// profile_screen.dart — logoutButton
CommonActionButton(
  onPressed: () async {
    authBloc.add(AuthenticationLogOutEvent());
  },
  title: AppLocalizations.of(context)!.logout,  // "Logout"
)

// authentication_bloc.dart — _mapAuthenticationLogOutEventToState
await ibd.authenticationManager.logoutUserDevice(logoutDeviceRequest);
await setFlag(isLogin: false);
await secureStorage.deleteAll();
ctp.http.removeAuthentication();
// ... all manager.cancel*Task() calls
await clearAllHiveData();
emit(AuthenitcationUnauthorizedState());
```

**Semantic label / locator:**
- Logout button: `CommonActionButton` with text `"Logout"` — at the bottom of `ProfileScreen`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:login_valid @regression @both
Scenario: Logout clears session and returns to Welcome screen
  Given The user is logged in and on the Home screen
  When User navigates to the Profile screen
  And User taps the Logout button
  Then The Welcome screen is displayed
  And The user cannot navigate back to an authenticated screen
```

---

## 🔗 Related

- [TC-LOGIN-029 — Session expiry](./tc-login-029-session-expiry.md)
- [TC-LOGIN-033 — Multi-user session isolation](./tc-login-033-multi-user-session-isolation.md)
- [TC-LOGIN-006 — Successful login](./tc-login-006-successful-login.md)
- [Suite index](./index.md)
