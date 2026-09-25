# TC-PROFILE-008: App Version & Build Number Display

> **Suite**: `profile` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/profile_screen.dart` (`appVersionWidget`)

---

## 🎯 Objective
Verify that the App Version container in `ProfileScreen` displays the current application version and build number formatted as `V.<version> (<buildNumber>)` (e.g. `V.11.0.0 (464)`) queried directly from `PackageInfo.fromPlatform()`.

---

## 📋 Preconditions
- User is on `ProfileScreen`.

---

## 🧪 Test Steps
1. On `ProfileScreen`, locate the App Version box positioned above the Logout button.
2. Inspect the text content inside the decorated container.
3. Verify the string prefix matches `AppLocalizations.of(context)!.appVer` ("V.").
4. Verify the version matches `PackageInfo.version` and the build number matches `PackageInfo.buildNumber`.
5. Verify text style uses `ContiplusStyle.regularFont16pxR` with `ContiplusColors.continentalGray1`.

---

## 🔍 Expected Results
- Application version and build number are clearly and accurately displayed for build identification.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/ui/screens/profile/profile_screen.dart` (`appVersionWidget`)
- **Package**: `package_info_plus`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_app_version @regression @both
Scenario: Verify app version and build number on profile screen
  Given the user is on the Profile screen
  Then the app version box should display the correct version and build number
```
