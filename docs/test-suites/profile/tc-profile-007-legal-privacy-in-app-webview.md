# TC-PROFILE-007: Legal & Privacy In-App WebView

> **Suite**: `profile` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/profile_screen.dart` (`legalPrivacy`, `legalUrl`)

---

## 🎯 Objective
Verify tapping the "Legal & Privacy" card in `ProfileScreen` launches the official Continental Conti+ legal terms and privacy policy URL (`legalUrl`) in an in-app WebView on Android or platform default browser on iOS.

---

## 📋 Preconditions
- User is on `ProfileScreen`.
- Device has network access.

---

## 🧪 Test Steps
1. On `ProfileScreen`, tap the **Legal & Privacy** card (`text_24x24`).
2. Verify `launchUrl(Uri.parse(legalUrl))` is called.
3. On Android, verify in-app WebView (`LaunchMode.inAppWebView`) renders the Continental privacy terms.
4. On iOS, verify Safari / default browser opens the legal URL.
5. Verify close / back button returns the user seamlessly to `ProfileScreen`.

---

## 🔍 Expected Results
- Legal and privacy documentation is easily accessible within the application.

---

## 📱 Flutter Source Reference
- **Profile Screen**: `lib/src/ui/screens/profile/profile_screen.dart`
- **URL Configuration**: `lib/src/ui/constants.dart` (`legalUrl`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_legal_privacy @regression @both
Scenario: Open Legal & Privacy policy documentation
  Given the user is on the Profile screen
  When the user taps Legal & Privacy
  Then the Continental legal and privacy page should open
  And the user can return back to the Profile screen
```
