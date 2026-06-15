# TC-LOGIN-041 — Old password is rejected after successful password change

> Suite: [Login](./index.md) | Priority: High | Status: 🔴 Blocked

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-041 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_change_password` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts`, `src/pages/change-password.page.ts` *(to create)* |
| **Status** | 🔴 Blocked |
| **Blocker** | Requires a reversible test account where password can be changed and reset — provisioning needed |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that after a user successfully changes their password via the Change Password form, the **old password is no longer accepted** for login, and only the new password grants access.

---

## ✅ Preconditions

- A reversible test account `login_change_password` exists in STG
- The account's current password is known
- Password can be reset back to original after the test

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in with `td.username` and `td.password.current` | Login succeeds; first-login change password screen OR Home screen shown |
| 2 | Navigate to Change Password (via Profile or first-login flow) | Change Password screen displayed |
| 3 | Enter current password, new policy-compliant password, and matching confirm | All fields valid |
| 4 | Tap Save | `AuthenticationSaveChangePasswordEvent` dispatched; API call succeeds |
| 5 | Verify success | User navigates to Home screen (`AuthenticationAuthorizedState`) |
| 6 | Log out | Welcome screen shown |
| 7 | Attempt to log in with the **old password** (`td.password.current`) | Login form submitted |
| 8 | Observe result | `AuthenticationErrorState(errorKey: 'authenticationError')` — old password is rejected |
| 9 | Log in with the **new password** | Login succeeds — new password is accepted |

---

## 🏁 Expected Results

- Old password is permanently invalidated after change
- API returns 401 when attempting to use old password
- New password grants access successfully
- No session residue from old password in local storage

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — change password API call
final request = UserChangePasswordRequest(
  oldPassword: event.currentPassword,
  newPassword: event.newPassword,
);
final response = await ibd.userManager.changePassword(request);
// On success: user is re-authenticated with new password
emit(AuthenticationAuthorizedState(user: user));

// On old password login attempt after change:
// API returns 401 → BLoC emits:
emit(AuthenticationErrorState(errorKey: 'authenticationError', ...));
```

---

## 📝 Suggested Gherkin

```gherkin
# Blocked — requires reversible test account
# @DataFile:resources/data/logindata.csv @Key:login_change_password @regression @both
# Scenario: Old password is rejected after successful password change
#   Given User changes password from "td.password.current" to "td.password.new"
#   When User logs out and attempts login with "td.password.current"
#   Then An authentication error is displayed
#   When User logs in with "td.password.new"
#   Then The Home screen is displayed
```

---

## 🔗 Related

- [TC-LOGIN-027 — Change password success](./tc-login-027-change-password-success.md)
- [TC-LOGIN-028 — Change password validation](./tc-login-028-change-password-validation.md)
- [TC-LOGIN-012 — Invalid credentials](./tc-login-012-invalid-credentials.md)
- [Suite index](./index.md)
