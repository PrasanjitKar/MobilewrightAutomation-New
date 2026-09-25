# TC-PROFILE-006: Privacy Settings Consent Modal

> **Suite**: `profile` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/profile/profile_screen.dart` (`privacySettings`) & `ConsentBloc`

---

## 🎯 Objective
Verify tapping the "Privacy Settings" card in `ProfileScreen` dispatches `InitializeCMPEvent(forceOpen: true)` to open the OneTrust / CMP consent management preferences modal, and handles offline/error notifications gracefully.

---

## 📋 Preconditions
- User is on `ProfileScreen`.
- Consent state is not `ConsentNotRequired`.

---

## 🧪 Test Steps
1. On `ProfileScreen`, locate the **Privacy Settings** card (`privacySettings_24x24`).
2. Tap **Privacy Settings**.
3. Verify `ConsentBloc.add(InitializeCMPEvent(forceOpen: true))` is dispatched.
4. Verify OneTrust / CMP consent preferences banner or web modal opens.
5. Verify user can toggle consent categories (Strictly Necessary, Performance, Functional, Targeting Cookies) and save preferences.
6. **Negative Scenario (Offline)**:
   - Disconnect network and tap Privacy Settings.
   - Verify snackbar notification displays: "Please check your internet connection".

---

## 🔍 Expected Results
- Privacy consent management dialog opens and allows adjusting privacy preferences.

---

## 📱 Flutter Source Reference
- **Consent BLoC**: `lib/src/blocs/authentication/consent/consent_bloc.dart`
- **Profile Screen**: `lib/src/ui/screens/profile/profile_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/profiledata.csv @Key:profile_privacy_settings @regression @both
Scenario: Open Privacy Settings consent modal
  Given the user is on the Profile screen
  When the user taps Privacy Settings
  Then the consent management modal should open
  And the user should be able to update and save cookie preferences
```
