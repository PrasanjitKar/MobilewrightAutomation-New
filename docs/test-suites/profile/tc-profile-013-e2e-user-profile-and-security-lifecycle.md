# TC-PROFILE-013: E2E User Profile & Security Lifecycle (Avatar, Units, Password, Logs, Re-Login)

> **Suite**: `profile` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/` & `lib/src/blocs/user/`

---

## 🎯 Objective
Execute the full end-to-end Profile and Account Security lifecycle:
1. Open Profile from top app bar -> verify user header and summary cards.
2. Navigate to My Information -> upload and crop a new avatar photo -> verify avatar sync.
3. Open Settings -> toggle Unit of Measure from Metric to Imperial -> verify global unit update.
4. Open Change Password -> update account password to a new compliant password.
5. Trigger Report Issue -> export zipped diagnostic logs with device metadata.
6. Logout of the application.
7. Log in with the new password and verify updated avatar, imperial unit system, and account state persist.

---

## 📋 Preconditions
- User is logged in.

---

## 🧪 Test Steps
1. Tap the top-right profile icon in `ContiAppBar`.
2. Tap the header arrow -> open `ProfileInformationScreen`.
3. Tap camera icon on avatar -> select image -> crop and save -> verify success snackbar.
4. Navigate back to Profile -> tap **Settings** -> select "Imperial" units -> tap Save.
5. In My Information, tap **Change Password** -> enter current password and new valid password `NewStrongPass2026!` -> tap Save -> verify confirmation.
6. Open **Report Issue** -> type feedback comments -> tap Submit -> verify log zip created and share sheet opened.
7. On Profile screen, tap **Logout** -> confirm return to Welcome screen.
8. Log in using the new password `NewStrongPass2026!`.
9. Verify login succeeds, dashboard loads, profile avatar displays the updated image, and measurements display in imperial units (inches/feet).

---

## 🔍 Expected Results
- Complete user profile configuration, credential rotation, and session recovery operate flawlessly end-to-end.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/profile/profile_screen.dart`
- `lib/src/ui/screens/profile/profile_information_screen.dart`
- `lib/src/ui/screens/profile/settings_screen.dart`
- `lib/src/ui/screens/profile/change_password_screen.dart`
- `lib/src/blocs/user/user_account_bloc.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_e2e_security_lifecycle @e2e @both
Scenario: End-to-End User Profile and Security Lifecycle
  Given the user updates profile photo and switches unit system to Imperial
  When the user changes password and exports diagnostics logs
  And logs out of the app
  When the user logs in with the new password
  Then the session should authenticate successfully
  And updated avatar and imperial unit preferences should be preserved
```
