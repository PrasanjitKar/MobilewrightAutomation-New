# TC-LOGIN-036 — Legal & Privacy link opens in-app browser

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-036 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/profile.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that tapping the "Legal & Privacy" card in the Profile screen opens the Continental legal URL in an in-app WebView (Android) or the platform default browser (iOS), and that the user can navigate back to the Profile screen.

---

## ✅ Preconditions

- User is authenticated and on the Profile screen
- Device has an active internet connection

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to the Profile screen | Profile screen is displayed with the grid of cards |
| 2 | Observe the "Legal & Privacy" card | Card is visible with legal privacy icon |
| 3 | Tap the "Legal & Privacy" card | `launchUrl(Uri.parse(legalUrl), ...)` is called |
| 4 | Observe on **Android** | URL opens in in-app WebView (`LaunchMode.inAppWebView`) |
| 5 | Observe on **iOS** | URL opens in platform default browser (`LaunchMode.platformDefault`) |
| 6 | Verify the content | Continental legal/privacy page is displayed |
| 7 | Navigate back to the Profile screen | Back navigation returns to Profile screen without issues |

---

## 🏁 Expected Results

- Legal & Privacy card is always visible (not conditional on ConsentBloc state)
- Android: opens in in-app WebView
- iOS: opens in platform default (Safari/SafariViewController)
- Content loaded is the Continental `legalUrl` endpoint
- Back navigation works correctly

---

## 🔍 Flutter Source Reference

```dart
// profile_screen.dart — Legal & Privacy card
buildIconCard(
  icon: SvgPicture.asset(ContiPlusIcon.text_24x24),
  text: AppLocalizations.of(context)!.legalPrivacy,  // "Legal & Privacy"
  onTap: () {
    launchUrl(
      Uri.parse(legalUrl),
      mode: Platform.isAndroid
          ? LaunchMode.inAppWebView
          : LaunchMode.platformDefault,
    );
  },
),
```

**UI strings (en):**
- Card label: `legalPrivacy` → "Legal & Privacy"
- Related: `termsandConditions` → "Terms and Conditions"
- Related: `privacyPolicy` → "Privacy Policy"

> **Note:** "Privacy Settings" is a separate card that opens the CMP consent manager (`ConsentBloc`) and is only shown when `consentState is! ConsentNotRequired`. This TC covers the "Legal & Privacy" link which is always visible.

---

## 📝 Suggested Gherkin

```gherkin
@regression @android
Scenario: Legal & Privacy card opens legal URL in WebView on Android
  Given The user is on the Profile screen
  When User taps the "Legal & Privacy" card
  Then The legal URL opens in the in-app WebView
  And User can navigate back to the Profile screen

@regression @ios
Scenario: Legal & Privacy card opens legal URL in platform browser on iOS
  Given The user is on the Profile screen
  When User taps the "Legal & Privacy" card
  Then The legal URL opens in the platform default browser
```

---

## 🔗 Related

- [TC-LOGIN-002 — Welcome screen UI](./tc-login-002-welcome-screen-ui.md)
- [TC-LOGIN-031 — Logout flow](./tc-login-031-logout-flow.md)
- [Suite index](./index.md)
