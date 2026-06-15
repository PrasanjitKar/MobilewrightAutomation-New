# TC-LOGIN-002 — Welcome screen displays correct UI elements

> Suite: [Login](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-002 |
| **Suite** | login |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/smoke/login.feature` |
| **Page Objects** | `src/pages/welcome.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify the Welcome screen renders all required UI elements: Conti+ logo, "Login with:" heading, "Continental Account" primary button, an "or" separator, and a "Continue as a Guest" secondary button, along with the app version footer.

---

## ✅ Preconditions

- App freshly launched or user has logged out
- App is on the Welcome screen (`AuthenticationWelcomeState`)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe the Welcome screen | Conti+ logo (`conti+Logo` semantic label) is visible at the top |
| 2 | Verify heading text | `loginWithText` label shows "Login with:" |
| 3 | Verify primary button | "Continental Account" button (`continentalAccountButton`) is visible and enabled |
| 4 | Verify separator | "or" text is displayed between the two buttons |
| 5 | Verify secondary button | "Continue as a Guest" button (`loginGuestButton`) is visible and enabled |
| 6 | Verify footer | App version string is displayed at the bottom |

---

## 🏁 Expected Results

- All six UI elements are visible and correctly rendered
- "Continental Account" uses primary button style; "Continue as a Guest" uses secondary style
- No back button is shown (Welcome is root screen; `shouldShowBackButton()` returns `false`)

---

## 🔍 Flutter Source Reference

```dart
// contiplus/lib/src/ui/screens/contiplus_form_template.dart — WelcomeForm widget
SemanticsLabel(label: 'loginWithText', child: Text(AppLocalizations.of(context)!.loginWith))
SemanticsLabel(label: 'continentalAccountButton', child: CommonActionButton(title: '...continentalAccount'))
SemanticsLabel(label: 'loginGuestButton',
  child: CommonActionButton(type: ActionButtonTypes.secondary, title: '...continueAsGuest'))
SemanticsLabel(label: 'conti+Logo', child: Image.asset('assets/images/contiplus-logo.png'))
```

**Semantic labels / locators:**

| Label | Widget | Text (en) |
|---|---|---|
| `conti+Logo` | Conti+ logo image | — |
| `loginWithText` | Heading text | "Login with:" |
| `continentalAccountButton` | Primary button | "Continental Account" |
| `loginGuestButton` | Secondary button | "Continue as a Guest" |
| `welcomeText` | Screen title | "Welcome!" |

---

## 📝 Suggested Gherkin

```gherkin
@smoke @both
Scenario: Welcome screen displays all required elements
  Given The app is on the Welcome screen
  Then The Conti+ logo is visible
  And The "Login with:" heading is displayed
  And The "Continental Account" button is visible
  And The "or" separator is visible
  And The "Continue as a Guest" button is visible
  And The app version is shown in the footer
```

---

## 🔗 Related

- [TC-LOGIN-003 — Continental Account button](./tc-login-003-continental-account-button.md)
- [TC-LOGIN-004 — Continue as Guest](./tc-login-004-continue-as-guest.md)
- [Suite index](./index.md)
