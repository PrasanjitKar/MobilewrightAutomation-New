# TC-LOGIN-042 — Account activation flow via verification code

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-042 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_activate_account` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` *(activate account form)* |
| **Status** | 🔴 Blocked |
| **Blocker** | Requires a newly created account in STG that has not yet been activated; email inbox access needed for activation code |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the account activation flow: a newly created user account that has not been activated is presented with an account activation screen. Entering the verification code received by email activates the account, transitioning the user to the Continental login screen with a success message.

---

## ✅ Preconditions

- A new account `login_activate_account` exists in STG but has NOT been activated
- Access to the email inbox for the activation verification code
- App is on the Login screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter the new (non-activated) account email | Email accepted |
| 2 | Enter the temporary password for the new account | Password accepted |
| 3 | Tap Login | API call detects account is not verified |
| 4 | Observe navigation | `AuthenitcationActivateUserState` emitted; account activation screen displayed |
| 5 | Verify activation screen | Email field (pre-filled), verification code field, and activate button visible |
| 6 | Retrieve the verification code from the email inbox | Code received |
| 7 | Enter the verification code | Code field populated |
| 8 | Tap Activate / Submit | `AuthenticationActivateAccountEvent` dispatched with email and code |
| 9 | Observe loading state | `AuthenticationActivateAccountLoadingState` emitted |
| 10 | Wait for API response (`ibd.userManager.verify(...)`) | Account verified |
| 11 | Observe success | `AuthenticationContinentalLoginState(email, successMessage: "Account Activated")` emitted |
| 12 | Verify success message | "Account Activated" message shown on login screen |

### Negative: Invalid verification code

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter an incorrect verification code | Code field filled |
| 2 | Tap Activate | API returns error |
| 3 | Observe result | `AuthenticationActivateAccountErrorState` emitted; error shown |
| 4 | User can retry with correct code | Activation screen remains accessible |

---

## 🏁 Expected Results

- **Happy path:** Account activated → `AuthenticationContinentalLoginState` with `successMessage: "Account Activated"`
- **Error path:** Invalid code → `AuthenticationActivateAccountErrorState` displayed
- Verification code is numeric (sent by email)
- After activation, user proceeds with Continental login flow

---

## 🔍 Flutter Source Reference

```dart
// authentication_event.dart
class AuthenticationShowActivateAccountEvent extends AuthenticationEvent {
  const AuthenticationShowActivateAccountEvent({required this.email});
  final String email;
}

class AuthenticationActivateAccountEvent extends AuthenticationEvent {
  const AuthenticationActivateAccountEvent({
    required this.email,
    required this.verificationCode,
  });
  final String email;
  final int verificationCode;
}

// authentication_bloc.dart — activation success
emit(AuthenticationContinentalLoginState(
  email: event.email,
  succesMessage: "Account Activated",  // Note: typo 'succes' in source
));

// activation error
emit(const AuthenticationActivateAccountErrorState());
```

**BLoC States:**

| State | Trigger |
|---|---|
| `AuthenitcationActivateUserState` | Account needs activation → show activation screen |
| `AuthenticationActivateAccountLoadingState` | API call in progress |
| `AuthenticationActivateAccountErrorState` | Invalid/expired code |
| `AuthenticationContinentalLoginState(successMessage)` | Activation successful |

---

## 📝 Suggested Gherkin

```gherkin
# Blocked — requires new unactivated account + email inbox access
# @DataFile:resources/data/logindata.csv @Key:login_activate_account @regression @both
# Scenario: New account activation via verification code
#   Given A new unactivated account exists in STG
#   When User logs in and is presented with the activation screen
#   And User enters the verification code from email
#   And User taps Activate
#   Then The account is activated with success message "Account Activated"
#   And User can proceed with Continental login
#
# Scenario: Invalid activation code shows error
#   Given The account activation screen is displayed
#   When User enters an incorrect verification code
#   Then An error is shown and user can retry
```

---

## 🔗 Related

- [TC-LOGIN-006 — Successful login](./tc-login-006-successful-login.md)
- [TC-LOGIN-003 — Continental Account button](./tc-login-003-continental-account-button.md)
- [TC-LOGIN-019 — Forgot password valid email](./tc-login-019-forgot-password-valid-email.md)
- [Suite index](./index.md)
