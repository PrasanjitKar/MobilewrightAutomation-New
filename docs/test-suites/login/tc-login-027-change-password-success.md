# TC-LOGIN-027 — Change password — successful with valid data

> Suite: [Login](./index.md) | Priority: High | Status: 🔴 Blocked

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-027 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_change_password` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/change-password.page.ts` *(to create)* |
| **Status** | 🔴 Blocked |
| **Blocker** | Requires a dedicated reversible test account that can change password and be reset |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that providing the correct current password, a policy-compliant new password, and a matching confirm password on the Change Password screen successfully updates the password via the API and navigates the user to the Home screen.

---

## ✅ Preconditions

- App is on the Change Password screen (first-time login or profile navigation)
- Test account is reversible (password can be reset after the test)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter the current password in "Current password" field | Field accepts input |
| 2 | Enter a policy-compliant new password | New password field accepts input |
| 3 | Enter the same password in "Confirm Password" field | Fields match |
| 4 | Tap "Save" button | `AuthenticationSaveChangePasswordEvent` dispatched |
| 5 | Observe loading state | Button disabled; loading indicator shown (`ChangePasswordStatus.loading`) |
| 6 | Wait for API response (`ibd.userManager.changePassword(...)`) | API returns success |
| 7 | Observe navigation | App navigates to Home screen (`AuthenticationAuthorizedState`) |

---

## 🏁 Expected Results

- All validation passes
- `changePassword` API call succeeds
- User is authenticated and navigated to Home screen
- Old password no longer works for future logins
- Success: "Password changed successfully" message shown (if applicable)

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — _mapAuthenticationSaveChangePasswordEventToState
emit(const AuthenticationChangePasswordState(changePasswordStatus: ChangePasswordStatus.loading));
final response = await ibd.userManager.changePassword(request);
// On success:
setFlag(isLogin: true);
emit(AuthenticationAuthorizedState(user: user));

// change_password_form.dart — Save button
CommonActionButton(
  title: AppLocalizations.of(context)!.save,  // "Save"
  onPressed: state.changePasswordStatus == ChangePasswordStatus.loading ? null : _onSubmit,
)
```

---

## 📝 Suggested Gherkin

```gherkin
# Blocked — requires reversible test account
# @DataFile:resources/data/logindata.csv @Key:login_change_password @regression @both
# Scenario: Successfully change password on first login
#   Given The app is on the Change Password screen
#   When User enters current password "td.password.current"
#   And User enters new password "td.password.new"
#   And User confirms the new password "td.password.new"
#   And User taps Save
#   Then The Home screen is displayed
```

---

## 🔗 Related

- [TC-LOGIN-026 — First login triggers Change Password](./tc-login-026-first-login-change-password.md)
- [TC-LOGIN-028 — Change password validation](./tc-login-028-change-password-validation.md)
- [Suite index](./index.md)
