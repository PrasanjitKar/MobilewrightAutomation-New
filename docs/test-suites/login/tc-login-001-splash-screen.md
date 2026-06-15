# TC-LOGIN-001 — Splash screen displays correct branding

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-001 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/smoke/login.feature` |
| **Page Objects** | `src/pages/splash.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that when the Conti+ mobile app is launched, the splash screen is displayed with the correct Continental and Conti+ brand logos before transitioning to the Welcome screen.

---

## ✅ Preconditions

- Device has the Conti+ app installed
- App is launched fresh (not resumed from background)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Launch the Conti+ app | Splash screen appears immediately |
| 2 | Observe the splash screen content | Continental logo (`continental-logo.png`) is visible |
| 3 | Observe the splash screen further | Conti+ logo (`contiplus-logo.png`) is visible below Continental logo |
| 4 | Wait for splash screen to complete | App transitions to the Welcome screen |

---

## 🏁 Expected Results

- Splash screen shows two logos: Continental (top/center) and Conti+ (below)
- Background uses `ContiplusBackground` widget (branded background)
- Transition to Welcome screen happens automatically without user interaction

---

## 🔍 Flutter Source Reference

```dart
// contiplus/lib/src/ui/screens/splash_screen.dart
class SplashScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    return ContiplusBackground(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Image.asset('assets/images/continental-logo.png', width: 300),
          Image.asset('assets/images/contiplus-logo.png', width: 150),
        ],
      ),
    );
  }
}
```

**Semantic labels / locators:**
- Continental logo: `assets/images/continental-logo.png`
- Conti+ logo: `assets/images/contiplus-logo.png`

---

## 📝 Suggested Gherkin

```gherkin
@smoke @both
Scenario: Splash screen shows Continental and Conti+ branding
  Given The Conti+ app is launched
  Then The splash screen is displayed with Continental logo
  And The Conti+ logo is visible on the splash screen
  And The app transitions to the Welcome screen
```

---

## 🔗 Related

- [TC-LOGIN-002 — Welcome screen UI](./tc-login-002-welcome-screen-ui.md)
- [Suite index](./index.md)
