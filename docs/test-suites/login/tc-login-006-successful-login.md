# TC-LOGIN-006 — Successful login with valid credentials

> Suite: [Login](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-006 |
| **Suite** | login |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `login_valid` |
| **Feature File** | `features/smoke/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that entering valid credentials and tapping the Login button successfully authenticates the user and navigates to the Home/Dashboard screen. If the account requires a first-time password change, the Change Password screen appears instead.

---

## ✅ Preconditions

- App is on the Login screen
- Test data `login_valid` row contains a valid username and password for STG
- Account is not a first-login account (use an already-activated account)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter valid email into `emailTextFieldBox` | Email is accepted; auto-lowercased |
| 2 | Enter valid password into `passwordTextFieldBox` | Password is entered (masked) |
| 3 | Tap the `loginButton` | "Login..." snackbar appears; button enters disabled/loading state (`AuthenticationLoadingState`) |
| 4 | Wait for API response | `POST /auth/login` API call completes successfully |
| 5 | Observe navigation | App transitions to the Home/Dashboard screen (`AuthenticationAuthorizedState`) |
| 6 | Verify Home screen | Home screen is displayed with the user's data |

---

## 🏁 Expected Results

- User is authenticated and navigated to the Home screen
- "Login..." snackbar shown during the API call (1500 ms, yellow background)
- Login button is disabled while `AuthenticationLoadingState` is active
- A 500 ms delay is introduced before the API call (to allow iOS to commit autofill fields)
- No error message is shown
- Login flag and user email are persisted in Hive storage

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart — _onLogin()
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(content: Text(AppLocalizations.of(context)!.loginFormLoggingInSnack))  // "Login..."
);
TextInput.finishAutofillContext();
await Future<void>.delayed(const Duration(milliseconds: 500));  // let iOS commit autofill

_authBloc.add(AuthenticationLogInEvent(
  username: _emailController.text.trim(),
  password: _passwordController.text.trim(),
));

// authentication_bloc.dart — login success
setFlag(isLogin: true);
await hiveStorage.setUserEmail(userEmail: authenticatedUserResponse.email ?? '');
emit(AuthenitcationAuthorizedState(user: user));  // Note: intentional typo in class name
```

> **State class names** (as defined in `authentication_state.dart`): `AuthenitcationAuthorizedState`, `AuthenitcationUnauthorizedState`, `AuthenitcationLoginState` — these contain a deliberate typo (`Authenit`) in the source code.

**Semantic labels / locators:**
- `emailTextFieldBox` — email input field
- `passwordTextFieldBox` — password input field
- `loginButton` — login submit button

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:login_valid @smoke @both
Scenario: Successful login with valid credentials
  Given The app is on the Login screen
  When User enters email "td.username"
  And User enters password "td.password.admin"
  And User taps the Login button
  Then The "Login..." snackbar is shown
  And The Home screen is displayed
```

---

## 🔗 Related

- [TC-LOGIN-026 — First login: mandatory change password](./tc-login-026-first-login-change-password.md)
- [TC-LOGIN-012 — Invalid credentials error](./tc-login-012-invalid-credentials.md)
- [Suite index](./index.md)
