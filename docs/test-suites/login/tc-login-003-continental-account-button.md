# TC-LOGIN-003 — Continental Account button launches Continental login flow

> Suite: [Login](./index.md) | Priority: High | Status: 🟢 Active — Automated

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-003 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login/login.feature` (automated) |
| **Page Objects** | `src/pages/welcome.page.ts` *(to create)* |
| **Status** | 🟢 Active — Automated |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that tapping the "Continental Account" button on the Welcome screen fires `AuthenticationShowContinentalEvent` and navigates the user to the Continental/LDAP login screen.

---

## ✅ Preconditions

- App is on the Welcome screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to the Welcome screen | Welcome screen is displayed with both login options |
| 2 | Tap the "Continental Account" button (`continentalAccountButton`) | `AuthenticationShowContinentalEvent` is dispatched to the BLoC |
| 3 | Observe navigation | App navigates away from the Welcome screen |
| 4 | Verify destination | Login screen is displayed for Continental/internal account credentials |

---

## 🏁 Expected Results

- Tapping "Continental Account" **clears all Hive data** via `clearAllHiveData()` before transitioning — this ensures a fresh state for the Continental auth flow
- The app transitions from `AuthenticationWelcomeState` to `AuthenticationContinentalLoginState`
- The Continental login screen is presented (email + password form via `LoginForm`)
- A back button labelled "Back" appears at the top left, allowing return to Welcome

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — _mapAuthenticationShowContinentalEventToState
Future<void> _mapAuthenticationShowContinentalEventToState(...) async {
  await clearAllHiveData();  // ← clears cached data before Continental login
  emit(const AuthenticationContinentalLoginState());
}

// authentication_event.dart
class AuthenticationShowContinentalEvent extends AuthenticationEvent {}
```

**Semantic labels / locators:**
- `continentalAccountButton` — primary action button on Welcome screen

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Continental Account button navigates to Continental login
  Given The app is on the Welcome screen
  When User taps the "Continental Account" button
  Then The Continental login screen is displayed
  And A "Back" button is visible to return to Welcome
```

---

## 🔗 Related

- [TC-LOGIN-002 — Welcome screen UI](./tc-login-002-welcome-screen-ui.md)
- [TC-LOGIN-005 — Login screen UI](./tc-login-005-login-screen-ui.md)
- [Suite index](./index.md)
