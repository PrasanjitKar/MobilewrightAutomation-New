# TC-PROFILE-011: Delete Account Flow & Typed Confirmation

> **Suite**: `profile` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/profile_information_screen.dart` (`_onDeleteAccountTap`, `_deleteUser`)

---

## 🎯 Objective
Verify the account deletion flow from the top-right popup menu on `ProfileInformationScreen`, ensuring two-factor confirmation requiring typing the exact confirmation phrase ("DELETE ACCOUNT") before enabling the destructive delete action, invoking `UserDeleteEvent`, and logging out.

---

## 📋 Preconditions
- User is on `ProfileInformationScreen`.

---

## 🧪 Test Steps
1. On `ProfileInformationScreen`, tap the top-right 3-dots popup menu (`rightSideMenu`).
2. Verify popup menu displays **Delete Account** with a trash icon.
3. Tap **Delete Account**.
4. Verify `ConfirmationDialogTemplate` opens with warning:
   - "Are you sure you want to delete the account under the name <FullName>?"
   - "You will permanently lose access to: 1. Profile, 2. Actions, 3. Documents"
   - Mandatory input field: "Type DELETE ACCOUNT to confirm".
   - Disabled Delete button and enabled Cancel button.
5. Tap **Cancel** -> verify dialog closes and account is unchanged.
6. Reopen dialog and type incorrect phrase (e.g., "delete") -> verify Delete button remains disabled.
7. Type exact required text: `"DELETE ACCOUNT"`.
8. Verify Delete button becomes enabled.
9. Tap **Delete**.
10. Verify `UserAccountBloc.add(UserDeleteEvent(userId))` is dispatched.
11. Verify snackbar: "User deleted!".
12. Verify `AuthenticationBloc.add(AuthenticationLogOutEvent())` is triggered and user is returned to the Welcome screen.

---

## 🔍 Expected Results
- Account deletion is protected by strict typed confirmation to prevent accidental data loss.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/profile/profile_information_screen.dart` (`_onDeleteAccountTap`, `_deleteUser`)
- **Dialog**: `lib/src/ui/widgets/confirmation_dialog_template.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_delete_account @regression @both
Scenario: Delete user account with typed confirmation
  Given the user is on the My Information screen
  When the user selects Delete Account from the options menu
  Then the delete confirmation dialog should require typing "DELETE ACCOUNT"
  When the user types "DELETE ACCOUNT" and confirms delete
  Then the user account should be deleted and session logged out
```
