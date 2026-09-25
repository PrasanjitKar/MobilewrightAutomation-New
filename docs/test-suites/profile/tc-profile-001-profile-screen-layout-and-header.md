# TC-PROFILE-001: Profile Screen Layout & Header Card

> **Suite**: `profile` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/profile_screen.dart` (`profileHeader`)

---

## 🎯 Objective
Verify the layout of `ProfileScreen` when opened via the top-right profile icon in `ContiAppBar`, confirming the screen title ("Profile"), user avatar (cached network image), full name, profile type/role, 4-grid options (Settings, Report Issue, Privacy Settings, Legal & Privacy), App Version box, and Logout button.

---

## 📋 Preconditions
- User is authenticated and on the Dashboard/Home screen.

---

## 🧪 Test Steps
1. On `HomeScreen`, tap the top-right profile icon (`profileIcon`).
2. Verify `ProfileScreen` opens with AppBar title "Profile" and back button.
3. In the profile header card, verify:
   - Circular avatar displays with user's profile image (or placeholder).
   - User's Full Name (e.g. "DEV Ostan Master") is displayed.
   - User's Profile Type/Role (e.g. "Master" or "Admin") is displayed.
   - Right arrow button (`rightArrowIcon_20x20`) is visible.
4. Verify the 4-card grid displays:
   - Settings
   - Report Issue
   - Privacy Settings
   - Legal & Privacy
5. Verify the App Version container displays `V.11.0.0 (464)`.
6. Verify the primary orange **Logout** button is visible at the bottom.

---

## 🔍 Expected Results
- Profile screen renders all user summary information, menu actions, version details, and logout CTA accurately.

---

## 📱 Flutter Source Reference
- **Screen Widget**: `lib/src/ui/screens/profile/profile_screen.dart` (`profileHeader`, `profileBody`)
- **App Bar**: `lib/src/ui/app/conti_app_bar.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_screen_layout @smoke @both
Scenario: Verify Profile screen layout and header card details
  Given the user is logged in
  When the user taps the Profile icon in the top app bar
  Then the Profile screen should be displayed
  And the profile header should show the user full name and role
  And the Settings, Report Issue, Privacy, and Legal options should be visible
  And the App Version and Logout button should be displayed
```
