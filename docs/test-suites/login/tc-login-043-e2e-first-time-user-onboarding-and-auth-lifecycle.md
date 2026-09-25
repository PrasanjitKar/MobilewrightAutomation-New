# TC-LOGIN-043: E2E First-Time User Onboarding & Complete Authentication Lifecycle

> **Suite**: `login` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/authentication/` & `lib/src/ui/screens/contiplus_form_template.dart`

---

## 🎯 Objective
Execute the complete end-to-end user authentication and onboarding lifecycle:
1. Launch app -> transition from `SplashScreen` to `WelcomeForm`.
2. Tap "Already have an account? Log In" -> enter temporary first-time credentials.
3. Handle forced password reset redirect (`AuthenticationRedirectChangePasswordState`).
4. Set new compliant password -> accept CMP privacy/consent terms.
5. Arrive on Dashboard `HomeScreen` with user session established (`AuthenitcationAuthorizedState`).
6. Simulate JWT token expiry and automatic background token refresh.
7. Perform manual Logout -> verify complete session cleanup and return to `WelcomeForm`.

---

## 📋 Preconditions
- User account exists in pending first-time password reset state.

---

## 🧪 Test Steps
1. Launch application -> verify splash screen and welcome screen.
2. Tap Log In -> enter email and temporary password -> tap Log In.
3. Verify backend flags first login requirement and emits `AuthenticationRedirectChangePasswordState`.
4. On Change Password screen, enter temporary password, new compliant password (≥10 chars, upper, lower, digit, special), and confirm password.
5. Tap Submit -> verify password updated successfully.
6. Verify CMP Privacy Consent modal opens -> tap "Accept All Cookies".
7. Verify authentication state transitions to `AuthenitcationAuthorizedState`.
8. Verify Dashboard `HomeScreen` loads with user profile and module cards.
9. Verify background API calls include `Authorization: Bearer <token>` and automatic refresh succeeds.
10. Navigate to Profile -> tap **Logout**.
11. Verify secure tokens, Hive caches, and background tasks are purged.
12. Verify return to `WelcomeForm` with `AuthenitcationUnauthorizedState`.

---

## 🔍 Expected Results
- Complete first-time user onboarding, credential update, session management, and logout workflow operate flawlessly.

---

## 📱 Flutter Source Reference
- `lib/src/blocs/authentication/authentication_bloc.dart`
- `lib/src/ui/screens/contiplus_form_template.dart`
- `lib/src/ui/screens/forms/change_password_form.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/logindata.csv @Key:login_e2e_lifecycle @e2e @both
Scenario: End-to-End First-Time User Onboarding and Complete Authentication Lifecycle
  Given the user logs in with first-time temporary credentials
  When the user is redirected to change password and sets a compliant new password
  And accepts the privacy consent terms
  Then the user should be authenticated and arrive on the Dashboard
  When the user logs out from the profile screen
  Then the session should be terminated and the Welcome screen displayed
```
