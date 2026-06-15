# TC-LOGIN-026 — First-time login triggers mandatory Change Password screen

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-026 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_first_time` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts`, `src/pages/change-password.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a user logs in for the first time (or when the backend flags the account as requiring a password change), the app transitions to the Change Password screen instead of the Home screen.

---

## ✅ Preconditions

- App is on the Login screen
- Test data `login_first_time` contains credentials for a freshly created / reset account in STG

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter the first-time account email and temporary password | Fields populated |
| 2 | Tap Login | Authentication API call succeeds |
| 3 | Observe post-login screen | Instead of Home, the **Change Password** screen appears |
| 4 | Verify screen title | "Change password" heading is displayed |
| 5 | Verify fields present | Current Password, New Password, Confirm Password fields are visible |
| 6 | Verify Submit button | "Save" button is visible |

---

## 🏁 Expected Results

- First-login flag detected by the BLoC — server returns an indicator that password change is required
- BLoC emits `AuthenticationRedirectChangePasswordState` (routes to Change Password screen)
- Change Password screen is shown (not the Home screen)
- User cannot skip the change password step

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — first login detection
if (/* userInfo indicates first login / password change required */) {
  loggingService.logAuthenticationInfo('user info is first login asking to change password');
  emit(const AuthenticationRedirectChangePasswordState());
  // → Routes to ContiplusFormTemplate with changePassword type
}
```

**State:** `AuthenticationRedirectChangePasswordState` (see `authentication_state.dart`)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:login_first_time @regression @both
Scenario: First-time login shows mandatory Change Password screen
  Given The app is on the Login screen
  When User logs in with first-time account "td.username" and "td.password.firstlogin"
  Then The Change Password screen is displayed
  And The "Save" button is visible
```

---

## 🔗 Related

- [TC-LOGIN-006 — Successful login](./tc-login-006-successful-login.md)
- [TC-LOGIN-027 — Change password success](./tc-login-027-change-password-success.md)
- [TC-LOGIN-028 — Change password validation](./tc-login-028-change-password-validation.md)
- [Suite index](./index.md)
