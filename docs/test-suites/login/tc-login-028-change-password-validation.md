# TC-LOGIN-028 — Change password form validation errors

> Suite: [Login](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-028 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/change-password.page.ts` *(to create)* |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the Change Password form shows correct inline validation errors for: blank fields, passwords that do not meet the policy, and mismatched new/confirm passwords.

---

## ✅ Preconditions

- App is on the Change Password screen (navigated from first-time login or profile)

---

## 🔢 Test Steps — Scenario Outline (multiple variants)

| Variant | Condition | Expected Error |
|---|---|---|
| A | Blank current password | "Please enter password" |
| B | Current password not meeting policy | "Please enter valid password" |
| C | Blank new password | "Please enter password" |
| D | New password not meeting policy | "Please enter valid password" |
| E | Blank confirm password | "Please confirm password" |
| F | Confirm ≠ new password | "Entered password doesn't match" |

For each variant:

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Set field values per scenario | Fields populated as described |
| 2 | Tap "Save" | `_isValidForm()` returns `false` |
| 3 | Observe error labels | Correct error text shown below the relevant field(s) |
| 4 | Verify no API call | No `AuthenticationSaveChangePasswordEvent` dispatched |

---

## 🏁 Expected Results

- Validation runs on all three fields simultaneously
- Each field shows its own error independently
- Fields with errors show error border decoration and red text
- "Save" button remains enabled for retry

---

## 🔍 Flutter Source Reference

```dart
// change_password_form.dart — _isValidForm
if (currentPassword.isEmpty)        → 'pleaseEnterPassword'
else if (!isValidPassword(cp))      → 'pleaseEnterValidPassword'
if (newPassword.isEmpty)            → 'pleaseEnterPassword'
else if (!isValidPassword(np))      → 'pleaseEnterValidPassword'
if (confirmPassword.isEmpty)        → 'pleaseConfirmPassword'
else if (!isValidPassword(cofp))    → 'pleaseEnterValidPassword'
else if (cofp != newPassword)       → 'enteredPasswordDoesntMatch'  // "Entered password doesn't match"

// Error messages (en)
'pleaseEnterPassword'          → "Please enter password"
'pleaseEnterValidPassword'     → "Please enter valid password"
'pleaseConfirmPassword'        → "Please confirm password"
'enteredPasswordDoesntMatch'   → "Entered password doesn't match"
```

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario Outline: Change password form validation shows correct errors
  Given The app is on the Change Password screen
  When User enters current password "<current>" and new password "<new_pw>" and confirm "<confirm>"
  And User taps Save
  Then The error "<expected_error>" is shown

  Examples:
    | current         | new_pw           | confirm          | expected_error                    |
    |                 | ValidP@ss1word   | ValidP@ss1word   | Please enter password             |
    | ValidP@ss1word  | weak             | weak             | Please enter valid password       |
    | ValidP@ss1word  | ValidP@ss1word   |                  | Please confirm password           |
    | ValidP@ss1word  | ValidP@ss1word   | Different1!pass  | Entered password doesn't match    |
```

---

## 🔗 Related

- [TC-LOGIN-027 — Change password success](./tc-login-027-change-password-success.md)
- [TC-LOGIN-030 — Password policy](./tc-login-030-password-policy.md)
- [Suite index](./index.md)
