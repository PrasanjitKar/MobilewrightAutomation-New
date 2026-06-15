# TC-LOGIN-004 — Continue as Guest navigates to Onboarding screen

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

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
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/welcome.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that tapping "Continue as a Guest" on the Welcome screen navigates the user to the Onboarding screen (route: `onboardingScreen`).

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

---

## 🏁 Expected Results

- Tapping "Continue as a Guest" pushes `OnboardingScreen` onto the navigation stack using `MaterialPageRoute`
- The Onboarding screen is rendered correctly
- No authentication credentials are required

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
```

**Semantic labels / locators:**
- `loginGuestButton` — secondary action button on Welcome screen

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Continue as Guest navigates to Onboarding screen
  Given The app is on the Welcome screen
  When User taps the "Continue as a Guest" button
  Then The Onboarding screen is displayed
```

---

## 🔗 Related

- [TC-LOGIN-002 — Welcome screen UI](./tc-login-002-welcome-screen-ui.md)
- [Suite index](./index.md)
