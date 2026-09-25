# TC-PROFILE-012: Guest / Free User Profile & View Intro Navigation

> **Suite**: `profile` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/profile_screen.dart` (`isFreeUser`, `viewIntro`, `OnboardingScreen`)

---

## 🎯 Objective
Verify the Profile screen presentation for Guest / Free Market users (`isFreeUser == true`), confirming that the standard 4-grid options (Settings, Report Issue, Privacy, Legal) and the personal info navigation arrow are hidden, and replaced with the **View Intro** (`OnboardingScreen`) card.

---

## 📋 Preconditions
- User is browsing as a Guest / Free user (`email == guestUsername`).

---

## 🧪 Test Steps
1. Tap the Profile icon in `ContiAppBar` while in Guest mode.
2. Verify `ProfileScreen(isFreeUser: true)` opens.
3. In the profile header, verify:
   - Guest avatar is displayed.
   - Profile information arrow icon is hidden (`Visibility(visible: widget.isFreeUser != true)`).
4. Verify the 4-card settings grid is hidden.
5. Verify the **View Intro** card (`Icon_onboard.svg`) is displayed across full width.
6. Tap **View Intro**.
7. Verify navigation to `OnboardingScreen(fromSettings: true)` showing app feature walkthrough slides.
8. Tap close/back on onboarding screen and verify return to `ProfileScreen`.

---

## 🔍 Expected Results
- Profile screen adapts appropriately for guest users with onboarding introduction walkthrough.

---

## 📱 Flutter Source Reference
- **Profile Screen**: `lib/src/ui/screens/profile/profile_screen.dart` (`isFreeUser`)
- **Onboarding Screen**: `lib/src/ui/screens/free_market/onboard_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_guest_view @regression @both
Scenario: Verify Guest user profile screen and View Intro walkthrough
  Given the user is logged in as a Guest user
  When the user opens the Profile screen
  Then the settings grid should be replaced with the "View Intro" card
  When the user taps "View Intro"
  Then the Onboarding walkthrough screen should be displayed
```
