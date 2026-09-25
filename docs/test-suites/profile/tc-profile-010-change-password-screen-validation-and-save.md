# TC-PROFILE-010: Change Password Screen Validations & Save

> **Suite**: `profile` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/change_password_screen.dart` (`ChangePasswordScreen`)

---

## 🎯 Objective
Verify the password change workflow in `ChangePasswordScreen`: password visibility toggles, mandatory current password validation, password mismatch validation, password complexity policy validation, successful update via `UserChangePasswordEvent`, and snackbar feedback.

---

## 📋 Preconditions
- User is on `ProfileInformationScreen`.

---

## 🧪 Test Steps
1. On `ProfileInformationScreen`, tap **Change Password** in the bottom action bar.
2. Verify `ChangePasswordScreen` opens with fields:
   - Current Password
   - New Password
   - Retype New Password
3. Tap the eye icon next to each field and verify text obscuring toggles between hidden (`*`) and visible.
4. **Validation 1 (Empty Current Password)**:
   - Leave Current Password empty and tap Save.
   - Verify snackbar: "Please enter current password".
5. **Validation 2 (Password Mismatch)**:
   - Enter valid Current Password, New Password "Password123!", and Retype Password "Different123!".
   - Tap Save and verify snackbar: "Retype password is invalid".
6. **Validation 3 (Complexity Policy)**:
   - Enter New Password "abc" (too short / no uppercase/special char).
   - Tap Save and verify snackbar: "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character".
7. **Happy Path**:
   - Enter valid Current Password and matching strong New Passwords.
   - Tap Save.
   - Verify `UserAccountBloc.add(UserChangePasswordEvent(currentPassword, newPassword))` is dispatched.
   - Verify snackbar: "Password changed successfully".
   - Verify screen pops back to `ProfileInformationScreen`.

---

## 🔍 Expected Results
- Password update flow strictly enforces security rules and updates the credential upon valid entry.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/profile/change_password_screen.dart`
- **Bloc**: `lib/src/blocs/user/user_account_bloc.dart` (`UserChangePasswordEvent`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_change_password @regression @both
Scenario Outline: Validate and change user password
  Given the user is on the Change Password screen
  When the user enters current password "<CurrentPassword>", new password "<NewPassword>", and confirm password "<ConfirmPassword>"
  And taps Save
  Then the result should be "<ExpectedResult>"

  Examples:
    | CurrentPassword | NewPassword   | ConfirmPassword | ExpectedResult               |
    |                 | NewPass123!   | NewPass123!     | Error: Current required      |
    | OldPass123!     | NewPass123!   | Mismatch123!    | Error: Password mismatch     |
    | OldPass123!     | weak          | weak            | Error: Complexity suggested  |
    | OldPass123!     | StrongP@ss123 | StrongP@ss123   | Success: Password changed    |
```
