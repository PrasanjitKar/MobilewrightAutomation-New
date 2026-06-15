# TC-LOGIN-014 — Login button shows loading state during authentication

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-014 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_valid` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that after tapping the Login button with valid credentials, the button enters a disabled loading state (`AuthenticationLoadingState`) and a "Login..." snackbar is displayed while the authentication API call is in progress, preventing double-submit.

---

## ✅ Preconditions

- App is on the Login screen
- Valid credentials in test data `login_valid`
- Network is slow enough to observe the loading state (STG may have latency)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter valid email and password | Fields are populated |
| 2 | Tap the Login button | "Login..." snackbar appears at the bottom of the screen |
| 3 | Observe the Login button immediately after tap | Button is disabled (`onPressed: null`) while `AuthenticationLoadingState` is active |
| 4 | Attempt to tap Login button again during loading | No second event dispatched (button is disabled) |
| 5 | Wait for API response | Loading state ends; button re-enables or navigation occurs |

---

## 🏁 Expected Results

- Snackbar with "Login..." text and yellow background (`continentalYellow`) appears on tap
- Snackbar duration is 1500 ms
- `loginButton` is disabled (`onPressed: null`) during `AuthenticationLoadingState`
- No duplicate `AuthenticationLogInEvent` events are possible during loading

---

## 🔍 Flutter Source Reference

```dart
// login_form.dart — _onLogin snackbar
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    backgroundColor: ContinentalColors.continentalYellow[900],
    duration: const Duration(milliseconds: 1500),
    content: Text(AppLocalizations.of(context)!.loginFormLoggingInSnack),  // "Login..."
  ),
);

// Login button state
BlocBuilder<AuthenticationBloc, AuthenticationState>(
  builder: (context, state) {
    return CommonActionButton(
      onPressed: state is AuthenticationLoadingState ? null : _onLogin,
      title: AppLocalizations.of(context)!.login,
    );
  },
)
```

**Semantic labels / locators:**
- `loginButton` — disabled when `AuthenticationLoadingState` is active

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:login_valid @regression @both
Scenario: Login button shows loading state during authentication
  Given The app is on the Login screen
  When User enters valid credentials and taps the Login button
  Then The "Login..." snackbar is visible
  And The Login button is disabled during loading
```

---

## 🔗 Related

- [TC-LOGIN-006 — Successful login](./tc-login-006-successful-login.md)
- [Suite index](./index.md)
