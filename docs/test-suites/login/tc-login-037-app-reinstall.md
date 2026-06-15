# TC-LOGIN-037 — App reinstall clears saved credentials and starts fresh

> Suite: [Login](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-LOGIN-037 |
| **Suite** | login |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `login_valid` |
| **Feature File** | `features/regression/login.feature` |
| **Page Objects** | `src/pages/splash.page.ts`, `src/pages/welcome.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that uninstalling and reinstalling the Conti+ app clears all saved authentication data (tokens, login flag, Hive data) so that the user is presented with the Welcome screen on first launch after reinstall and must log in again.

---

## ✅ Preconditions

- User is logged in (or has previously logged in) on the device
- Device has the Conti+ app installed

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Verify the app is installed with an existing session | App opens to Home screen or logs in automatically |
| 2 | Uninstall the Conti+ app from the device | App is removed; all app data cleared by OS |
| 3 | Reinstall the Conti+ app using ADB: `npm run app:install` | App is installed fresh |
| 4 | Launch the app | Splash screen displays Continental and Conti+ logos |
| 5 | Wait for app initialisation | `AuthenticationAppLoadedEvent` fires; `isLoginFlagFound` returns `false` |
| 6 | Observe landing screen | **Welcome screen** is displayed (not Home screen) |
| 7 | Verify no auto-login | App does not attempt to authenticate automatically |
| 8 | Log in with valid credentials | Login succeeds normally |

---

## 🏁 Expected Results

- After reinstall, all Hive data, secure storage, and login flags are cleared (OS-level app uninstall clears data)
- `AuthenticationAppLoadedEvent` detects `isLoginFlagFound = false`
- App starts at Welcome screen — not directly at Home
- No stale tokens or cached user data from the previous install

---

## 🔍 Flutter Source Reference

```dart
// authentication_bloc.dart — AuthenticationAppLoadedEvent handler
final bool isLoginFlagFound = await getFlag();

if (!isLoginFlagFound) {
  loggingService.logAuthenticationInfo('Login flag not found');
  emit(AuthenticationWelcomeState());  // → Welcome screen
  return;
}
// else → try to use existing auth data
```

**Device commands:**

```bash
npm run app:uninstall   # adb uninstall com.senecaglobal.sgalert.internal (or Conti+ package)
npm run app:install     # adb install ./apk/android.apk/...
npm run app:clear       # adb shell pm clear <package> — clears data without reinstall
```

> **Note:** `npm run app:clear` can be used to simulate a fresh install without full uninstall/reinstall — it clears all app data including Hive, secure storage, and shared preferences.

---

## 📝 Suggested Gherkin

```gherkin
@regression @android
Scenario: Reinstalling the app presents Welcome screen on first launch
  Given The Conti+ app is reinstalled fresh on the device
  When The app is launched for the first time after reinstall
  Then The Splash screen is displayed
  And The Welcome screen is shown (not the Home screen)
  And No auto-login is attempted
```

---

## 🔗 Related

- [TC-LOGIN-001 — Splash screen](./tc-login-001-splash-screen.md)
- [TC-LOGIN-002 — Welcome screen UI](./tc-login-002-welcome-screen-ui.md)
- [TC-LOGIN-029 — Session expiry](./tc-login-029-session-expiry.md)
- [Suite index](./index.md)
