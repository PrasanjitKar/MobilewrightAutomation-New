# TC-PROFILE-002: My Information Screen Details & Subscription Info

> **Suite**: `profile` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/profile_information_screen.dart` (`ProfileInformationScreen`)

---

## 🎯 Objective
Verify navigating from the Profile Header arrow to `ProfileInformationScreen` ("My Information"), confirming all displayed user fields: Personal Information (Full Name, Phone, Email), Company Information (Corporate Name), and User Information (Profile Type, Unit of Measure, Subscription Type, Subscription Ends).

---

## 📋 Preconditions
- User is on `ProfileScreen`.

---

## 🧪 Test Steps
1. On `ProfileScreen`, tap the right arrow icon in the profile header.
2. Verify Firebase analytics logs: `'Clicked on arrow icon from profile redirecting to user information screen'`.
3. Verify `ProfileInformationScreen` opens with AppBar title "My Information".
4. Verify the following read-only fields under **Personal Information**:
   - Full Name (populated with user's name).
   - Phone (populated with user's phone + phone icon).
   - Email (populated with user's email + email icon).
5. If the user is non-master, verify under **Company Information**:
   - Corporate Name.
6. Verify under **User Information**:
   - Profile Type.
   - Unit of Measure (Metric or Imperial).
   - Subscription Type (e.g. "Enterprise").
   - Subscription Ends (formatted as `dd MMM yyyy`).
7. Verify the bottom action bar displays the **Change Password** button.

---

## 🔍 Expected Results
- `ProfileInformationScreen` presents complete and accurate account metadata.

---

## 📱 Flutter Source Reference
- **Screen Widget**: `lib/src/ui/screens/profile/profile_information_screen.dart`
- **Cubit**: `UserInfoCubit`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_information_fields @smoke @both
Scenario: View My Information details on profile screen
  Given the user is on the Profile screen
  When the user taps the profile information arrow
  Then the My Information screen should be displayed
  And personal details, company info, and subscription fields should match user profile
  And the Change Password button should be visible at the bottom
```
