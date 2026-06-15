# TC-LOGIN-032 — Delete account requires typed confirmation then clears data

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-032 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_delete_account` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/profile.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that the delete account flow requires the user to type the exact phrase "Delete Account" before the Delete button is enabled, and upon confirmation the account is deleted, all data is cleared, and the user is logged out.

---

## ✅ Preconditions

- User is authenticated on the Profile screen
- Test account `login_delete_account` is a **disposable** account in STG — it will be permanently deleted

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to the Profile screen | Profile screen displayed |
| 2 | Tap the **Delete account** icon/button in profile header area | Confirmation dialog opens |
| 3 | Observe the dialog | Confirmation dialog shows: user's full name, warning about permanent data loss (profile, actions, documents) |
| 4 | Observe the input field | Text field with placeholder "Type Delete Account to confirm" is shown |
| 5 | Observe the Delete button | Delete button is **disabled** (`onSecondButtonTap: null`) |
| 6 | Type the exact phrase **"Delete Account"** | Input matches `deleteAccountText` string |
| 7 | Observe the Delete button | Delete button becomes **enabled** (`_isValidDeleteTextController()` returns `true`) |
| 8 | Tap the Delete button | `_deleteUser()` is called; dialog is dismissed |
| 9 | Observe result | Snackbar shown: success message; user is logged out |
| 10 | Verify navigation | App returns to Welcome screen |

### Negative scenario — Cancel without deleting

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open delete account dialog | Dialog shown |
| 2 | Type "Delete Account" | Delete button enables |
| 3 | Tap **Cancel** | Dialog closed; `_deleteAccountController.text` cleared; account NOT deleted |
| 4 | Verify account intact | User remains logged in on Profile screen |

---

## 🏁 Expected Results

- Delete button only enables when field text exactly equals `"Delete Account"` (case-sensitive)
- Successful deletion: account removed, data cleared, user logged out to Welcome
- Cancel: dialog dismissed, no deletion, field cleared
- Partial text (e.g., "delete account", "Delete account") keeps button disabled

---

## 🔍 Flutter Source Reference

```dart
// profile_screen.dart — delete account dialog
String deleteAccountConfirmText =
  AppLocalizations.of(context)!.deleteAccountText;  // "Delete Account"

bool _isValidDeleteTextController() {
  return _deleteAccountController.text ==
      AppLocalizations.of(context)!.deleteAccountText;  // exact match required
}

// Dialog content
title: AppLocalizations.of(context)!.deleteAccount,  // "Delete account"
// Confirmation warning text:
AppLocalizations.of(context)!
  .areYouSureYouWantToDeleteTheAccountUnderTheName(userFullname)
// "Are you sure you want to delete the account under the name {username}?
//  You will permanently lose: 1. Profile  2. Actions  3. Documents"

// Input field placeholder
AppLocalizations.of(context)!.typeDeleteAccountToConfirm
// "Type Delete Account to confirm"

// On Delete tap (only if _isValidDeleteTextController())
onSecondButtonTap: !_isValidDeleteTextController() ? null : () {
  _deleteUser();
  Navigator.pop(context);
}
```

**Delete Account strings (en):**

| Key | Value |
|---|---|
| `deleteAccount` | "Delete account" |
| `deleteAccountText` | "Delete Account" |
| `typeDeleteAccountToConfirm` | "Type Delete Account to confirm" |

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:login_delete_account @regression @both
Scenario: Delete account requires exact typed confirmation
  Given The user is on the Profile screen
  When User taps the Delete account option
  Then The confirmation dialog is displayed with the user's name
  And The Delete button is disabled
  When User types "wrong text" in the confirmation field
  Then The Delete button remains disabled
  When User types "Delete Account" in the confirmation field
  Then The Delete button is enabled
  When User taps Cancel
  Then The dialog is dismissed without deleting the account

@DataFile:resources/data/logindata.csv @Key:login_delete_account @regression @both
Scenario: Delete account successfully removes account on confirmation
  Given The user is on the Profile screen
  When User opens the delete account dialog and types "Delete Account"
  And User taps the Delete button
  Then The account is deleted and user is returned to the Welcome screen
```

---

## 🔗 Related

- [TC-LOGIN-031 — Logout flow](./tc-login-031-logout-flow.md)
- [TC-LOGIN-033 — Multi-user session isolation](./tc-login-033-multi-user-session-isolation.md)
- [Suite index](./index.md)
