# TC-PROFILE-004: Settings Unit of Measure Toggle & Save

> **Suite**: `profile` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/settings_screen.dart` (`SettingsScreen`)

---

## 🎯 Objective
Verify opening `SettingsScreen` from the Profile grid, changing the Unit of Measure between **Metric** and **Imperial**, saving the change, displaying the confirmation snackbar, and refreshing the cached user preferences.

---

## 📋 Preconditions
- User is on `ProfileScreen`.

---

## 🧪 Test Steps
1. On `ProfileScreen`, tap the **Settings** card (`settingIcon_24x24`).
2. Verify Firebase analytics logs: `'Clicked on settings icon from profile redirecting to unit of measure screen'`.
3. Verify `SettingsScreen` opens with AppBar title "Edit Settings".
4. Verify the **Units** section displays radio options: **Metric** and **Imperial**.
5. Select the opposite unit (e.g. switch from Metric to Imperial).
6. Tap the primary **Save** button.
7. Verify `UserAccountBloc.add(ProfileUpdateEvent(user, null))` is dispatched.
8. Verify a confirmation snackbar "Profile updated successfully" appears.
9. Verify returning to `ProfileScreen` triggers `UserInfoCubit.getUserInfo(getFromCache: true)`.
10. Navigate to any calculation or conveyor screen and verify units reflect the newly selected system (e.g., mm/m vs in/ft).

---

## 🔍 Expected Results
- Measurement units preference persists and propagates throughout all app modules.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/profile/settings_screen.dart`
- **Bloc**: `lib/src/blocs/user/user_account_bloc.dart`
- **Widget**: `lib/src/ui/widgets/radio_checkbox.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_settings_units @regression @both
Scenario: Change unit of measure in Profile Settings
  Given the user is on the Profile screen
  When the user taps Settings
  And selects the "Imperial" unit of measure
  And taps Save
  Then a success snackbar "Profile updated successfully" should appear
  And measurement units across the app should display in imperial format
```
