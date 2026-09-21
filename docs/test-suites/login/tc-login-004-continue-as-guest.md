# TC-LOGIN-004 — Continue as Guest navigates to Onboarding screen

> Suite: [Login](./index.md) | Priority: Medium | Status: 🟢 Active — Automated

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-004 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login/login.feature` (automated) |
| **Page Objects** | `src/pages/welcome.page.ts` *(to create)* |
| **Status** | 🟢 Active — Automated |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that tapping "Continue as a Guest" on the Welcome screen navigates the user to the Onboarding screen (route: `onboardingScreen`), and that tapping "Skip Introduction" on that screen logs the user in as a guest and lands on the Dashboard (home) screen.

---

## ✅ Preconditions

- App is on the Welcome screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to the Welcome screen | Welcome screen is displayed |
| 2 | Tap the "Continue as a Guest" button (`loginGuestButton`) | Navigation to `OnboardingScreen` begins |
| 3 | Verify destination screen | The Onboarding screen is displayed (route: `RouteNameKeys.onboardingScreen`) |
| 4 | Tap the "Skip Introduction" button | `AuthenticationLogInEvent` is dispatched with guest credentials |
| 5 | Verify destination screen | The Dashboard (home) screen is displayed once `AuthenticationAuthorizedState` is reached |

---

## 🏁 Expected Results

- Tapping "Continue as a Guest" pushes `OnboardingScreen` onto the navigation stack using `MaterialPageRoute`
- The Onboarding screen is rendered correctly
- Tapping "Skip Introduction" triggers a guest login (`guestUsername`/`guestPassword`) via `AuthenticationLogInEvent`
- On successful authorization, the app navigates to the Dashboard (home) screen
- No manual authentication credentials are required from the user

---

## 🔍 Flutter Source Reference

```dart
// WelcomeForm — loginGuestButton tap handler
Navigator.push(
  context,
  MaterialPageRoute<dynamic>(
    builder: (_) { return const OnboardingScreen(); },
    settings: const RouteSettings(name: RouteNameKeys.onboardingScreen),
  ),
);

// OnboardingScreen — _onLogin() invoked by the "Skip Introduction" TextButton
void _onLogin() {
  BlocProvider.of<AuthenticationBloc>(
    context,
  ).add(AuthenticationLogInEvent(username: guestUsername, password: guestPassword));
}
```

**Semantic labels / locators:**
- `loginGuestButton` — secondary action button on Welcome screen
- "Skip Introduction" (`AppLocalizations.skipIntroduction`) — plain `TextButton` with no SemanticsLabel, located by visible text

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Continue as Guest navigates to the Onboarding screen and Skip Introduction opens the Dashboard
  Given The app is on the Welcome screen
  When User taps the "Continue as a Guest" button
  Then The Onboarding screen is displayed
  When User taps the "Skip Introduction" button
  Then The Dashboard screen is displayed
```

---

## 🔗 Related

- [TC-LOGIN-002 — Welcome screen UI](./tc-login-002-welcome-screen-ui.md)
- [Suite index](./index.md)
