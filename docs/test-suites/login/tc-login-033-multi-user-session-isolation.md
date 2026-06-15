# TC-LOGIN-033 — Multi-user session isolation — no data bleed after logout

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-033 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_valid`, `login_user2` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts`, `src/pages/profile.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that after User A logs out and User B logs in on the same device, User B sees only their own data and no residual data from User A's session. All local caches, Hive data, secure storage, and HTTP auth headers are cleared during logout.

---

## ✅ Preconditions

- Two valid STG user accounts: `login_valid` (User A) and `login_user2` (User B)
- App installed and running on device

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in as User A (`td.username`) | User A is authenticated; Home screen shows User A's data |
| 2 | Note User A's profile name visible in Profile screen header | User A's name recorded |
| 3 | Navigate to Profile and tap Logout | User A is logged out; Welcome screen shown |
| 4 | Tap "Continental Account" and log in as User B (`td.username2`) | User B is authenticated |
| 5 | Navigate to Profile screen | Profile header shows User B's name and profile type — **not** User A's |
| 6 | Navigate to Home screen | Home data shows User B's entities — no User A data visible |
| 7 | Verify no stale authentication | HTTP requests use User B's auth token (not User A's) |

---

## 🏁 Expected Results

- After User A logout: all Hive data, secure storage, HTTP auth headers, and background task caches cleared
- User B's session is completely isolated from User A's
- No cross-contamination of user data between sessions

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — logout clears ALL data
await secureStorage.deleteAll();           // clears login/token data
ctp.http.removeAuthentication();           // removes HTTP Bearer header
await clearAllHiveData();                  // clears all cached entity data
// All manager.cancel*Task() called — stops stale data downloads
emit(AuthenitcationUnauthorizedState());

// On new login (User B):
setFlag(isLogin: true);
await hiveStorage.setUserEmail(userEmail: authenticatedUserResponse.email ?? '');
// Fresh HTTP auth headers set for User B
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:login_valid @regression @both
Scenario: User B sees no data from User A after logout and re-login
  Given User A is logged in and their profile name is visible
  When User A logs out from the Profile screen
  And User B logs in with different credentials "td.username2"
  Then User B's profile name is displayed in the Profile screen
  And No data from User A is visible in the Home screen
```

---

## 🔗 Related

- [TC-LOGIN-031 — Logout flow](./tc-login-031-logout-flow.md)
- [TC-LOGIN-029 — Session expiry](./tc-login-029-session-expiry.md)
- [Suite index](./index.md)
