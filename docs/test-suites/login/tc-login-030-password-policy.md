# TC-LOGIN-030 — Password policy reference

> Suite: [Login](./index.md) | Priority: Reference | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-030 |
| **Suite** | login |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | *(none)* |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/login.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |

---

## 🎯 Objective

Verify that the app enforces the Conti+ password policy consistently across all password entry points (Login validation, Change Password, Reset Password), and that the policy hint is displayed when a weak password is entered.

---

## ✅ Preconditions

- App has a password entry field visible (any screen: Login, Reset Password, Change Password)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Attempt to use passwords that violate one rule at a time | Each invalid password triggers `pleaseEnterValidPassword` error |
| 2 | Verify a password with exactly 10 chars + all required chars is accepted | No error shown |
| 3 | Verify the policy hint text is displayed when shown | "Enter a valid password of minimum 10 character having 1 special character, 1 lower case, 1 upper case and a number." |

---

## 🏁 Expected Results

The password policy is enforced by the regex: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#/$%&*~+"=',-.:;?{}|_\`<>^()\[\]]).{10,}$`

### Policy requirements

| Rule | Requirement |
|---|---|
| Minimum length | **10 characters** |
| Uppercase letter | **At least 1** (`[A-Z]`) |
| Lowercase letter | **At least 1** (`[a-z]`) |
| Digit | **At least 1** (`[0-9]`) |
| Special character | **At least 1** from: `!@#/$%&*~+"=',-.:;?{}|_\`<>^()[]` |

### Valid password examples

| Password | Valid | Reason |
|---|---|---|
| `ValidP@ss1word` | ✅ | All rules met, 14 chars |
| `Secure#Pass1` | ✅ | All rules met, 12 chars |
| `Admin!Pass0` | ✅ | All rules met, 11 chars |

### Invalid password examples

| Password | Invalid | Missing rule |
|---|---|---|
| `password` | ❌ | No uppercase, digit, or special char; < 10 chars |
| `Password1` | ❌ | No special character |
| `P@ssw0rd` | ❌ | Only 8 characters |
| `1234567890` | ❌ | No letters or special char |
| `ValidPassword` | ❌ | No digit or special char |
| `VALID@PASS1` | ❌ | No lowercase letter |

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart
bool isValidPassword(String password) {
  final passwordRegex = RegExp(
    r'''^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#/$%&*~+"=',-.:;?{}|_`<>^()\[\]]).{10,}$'''
  );
  return passwordRegex.hasMatch(password);
}

// Policy hint string (en)
AppLocalizations.of(context)!.passwordSuggest
// → "Enter a valid password of minimum 10 character having 1 special character,
//    1 lower case, 1 upper case and a number."
```

**Policy enforced at:**
- `login_form.dart` → `_validatePassword()`
- `change_password_form.dart` → `_isValidForm()`
- `reset_password_form.dart` → `_isValidForm()`

---

## 📝 Suggested Gherkin

```gherkin
@regression @both
Scenario Outline: Password policy is enforced on all password fields
  Given A password entry screen is active
  When User enters password "<password>"
  Then The result is "<outcome>"

  Examples:
    | password         | outcome                        |
    | ValidP@ss1word   | Accepted — no error            |
    | password         | Error: Please enter valid password |
    | Password1        | Error: Please enter valid password |
    | P@ssw0rd         | Error: Please enter valid password |
    | 1234567890       | Error: Please enter valid password |
```

---

## 🔗 Related

- [TC-LOGIN-011 — Login invalid password](./tc-login-011-login-form-invalid-password.md)
- [TC-LOGIN-025 — Reset password validation](./tc-login-025-reset-password-validation.md)
- [TC-LOGIN-028 — Change password validation](./tc-login-028-change-password-validation.md)
- [Suite index](./index.md)
