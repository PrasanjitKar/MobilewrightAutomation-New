# TC-PROFILE-003: Profile Avatar Upload, Crop & Update

> **Suite**: `profile` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/profile_information_screen.dart` (`ContiplusImageRoundedPicker`)

---

## 🎯 Objective
Verify updating the user's profile avatar photo from `ProfileInformationScreen` via camera or gallery picker, applying circular crop, uploading via `UserAccountBloc`, showing progress indicator, and updating the avatar in the header.

---

## 📋 Preconditions
- User is on `ProfileInformationScreen`.

---

## 🧪 Test Steps
1. Tap the profile avatar camera icon in `ProfileInformationScreen`.
2. Choose **Gallery** (or Camera) and select a new image.
3. In the circular crop tool, adjust crop bounds and confirm.
4. Verify `ProfileUpdateEvent(user, imageFile)` is dispatched to `UserAccountBloc`.
5. Verify circular loading progress indicator appears over the avatar during upload.
6. Verify snackbar notification displays: "Profile updated successfully".
7. Verify the header avatar updates with the new image URL.
8. Navigate back to `ProfileScreen` and verify the avatar reflects the updated photo.

---

## 🔍 Expected Results
- Profile avatar can be cropped and updated with real-time UI synchronization.

---

## 📱 Flutter Source Reference
- **Picker Widget**: `lib/src/ui/widgets/contiplus_image_rounded_picker.dart`
- **Bloc**: `lib/src/blocs/user/user_account_bloc.dart` (`ProfileUpdateEvent`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_avatar_update @regression @both
Scenario: Update profile photo with crop tool
  Given the user is on the My Information screen
  When the user selects a new profile photo and confirms crop
  Then the upload progress indicator should display
  And a success snackbar "Profile updated successfully" should appear
  And the avatar should display the new image
```
