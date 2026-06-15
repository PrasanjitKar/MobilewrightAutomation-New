# TC-LOGIN-016 — Back button on Login screen returns to Welcome screen

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-016 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that tapping the "Back" button on the Login screen dispatches `AuthenticationShowLoginEvent` and navigates the user back to the Welcome screen.

---

## ✅ Preconditions

- App is on the Login screen (reached via "Continental Account" from Welcome)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Verify Back button is visible | Back button (`← Back` text) is shown at the top-left |
| 2 | Tap the Back button | `AuthenticationShowLoginEvent` is dispatched |
| 3 | Observe navigation | App transitions back to the Welcome screen |
| 4 | Verify Welcome screen | "Login with:" heading and both login buttons are displayed |

---

## 🏁 Expected Results

- Back button is visible on the Login screen (`shouldShowBackButton()` returns `true`)
- Tapping Back emits `AuthenticationWelcomeState`
- Welcome screen is displayed with both login options intact

---

## 🔍 Flutter Source Reference

```dart
// contiplus_form_template.dart — back button handler
onPressed: () {
  if (widget.contiplusFormTemplateType == ContiplusFormTemplateType.login) {
    BlocProvider.of<AuthenticationBloc>(context).add(AuthenticationShowLoginEvent());
    // → emits AuthenticationWelcomeState()
  }
}

// AuthenticationShowLoginEvent handler in bloc
Future<void> _mapAuthenticationShowLoginEventToState(...) async {
  emit(AuthenticationWelcomeState());
}
```

**UI element:**
- Back button: `← Back` text in white, positioned `top: padding.top, left: 16`

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario: Back button on Login screen returns to Welcome
  Given The app is on the Login screen
  When User taps the Back button
  Then The Welcome screen is displayed
  And Both login options are visible
```

---

## 🔗 Related

- [TC-LOGIN-002 — Welcome screen UI](./tc-login-002-welcome-screen-ui.md)
- [TC-LOGIN-005 — Login screen UI](./tc-login-005-login-screen-ui.md)
- [Suite index](./index.md)
