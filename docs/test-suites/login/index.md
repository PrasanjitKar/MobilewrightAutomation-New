# Login — Test Suite

> Module: `login` | Flutter source: `contiplus/lib/src/blocs/authentication/` + `contiplus/lib/src/ui/screens/`  
> Feature files: `features/smoke/login.feature`, `features/regression/login.feature`

---

## 📋 Overview

The **Login** suite covers the full authentication module of the Conti+ mobile application. The app uses a BLoC-driven state machine (`AuthenticationBloc`) with a shared `ContiplusFormTemplate` container that renders different forms based on `ContiplusFormTemplateType`.

### Authentication Screens & Flows

| Screen | Type | BLoC State |
|---|---|---|
| Splash | `SplashScreen` | `AuthenticationInitialState` |
| Welcome | `WelcomeForm` | `AuthenticationWelcomeState` |
| Login (Continental) | `LoginForm` | `AuthenitcationLoginState` |
| Continental Auth | `LoginForm` | `AuthenticationContinentalLoginState` |
| Account Activation | *(Activation form)* | `AuthenitcationActivateUserState` |
| Forgot Password | `ForgotPasswordForm` | `AuthenitcationForgotPasswordState` |
| Reset Password | `ResetPasswordForm` | `AuthenticationResetPasswordState` |
| Change Password | `ChangePasswordForm` | `AuthenticationRedirectChangePasswordState` |

> **State class name note:** Several state names contain an intentional typo `Authenit` in the source — e.g., `AuthenitcationAuthorizedState`, `AuthenitcationUnauthorizedState`. This matches `authentication_state.dart` exactly.

### Key Behaviours

- Email field auto-lowercases all input via `LowerCaseTextFormatter`; values are `.trim()`'d before validation and API submission
- Password fields use eye icon toggle (`eye_open.svg` / `eye.svg`) across all forms
- Autofill via `AutofillGroup` + `AutofillHints.email` / `AutofillHints.password`; `TextInput.finishAutofillContext()` called before API
- 500 ms delay before login API call (to let iOS commit autofill fields)
- Login button disabled during `AuthenticationLoadingState`; "Login..." snackbar shown
- First-time login → `AuthenticationRedirectChangePasswordState` (not directly to Authorized)
- **Continental Account button** clears all Hive data (`clearAllHiveData()`) before emitting `AuthenticationContinentalLoginState`
- Offline → `AuthenticationLoginErrorState(errorKey: 'offlineError')` (distinct from general `AuthenticationErrorState`)
- Invalid credentials → `AuthenticationLoginErrorState(errorKey: 'authenticationError')`
- Logout: calls `logoutUserDevice` API, clears secure storage + Hive + HTTP auth + all background tasks; emits `AuthenitcationUnauthorizedState`
- Session expiry: token refresh failure → `AuthenitcationUnauthorizedState`

### Password Policy

Regex: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#/$%&*~+"=',-.:;?{}|_` + "`" + `<>^()\[\]]).{10,}$`

| Rule | Requirement |
|---|---|
| Minimum length | 10 characters |
| Uppercase | ≥ 1 |
| Lowercase | ≥ 1 |
| Digit | ≥ 1 |
| Special character | ≥ 1 from `!@#/$%&*~+"=',-.:;?{}|_` |

---

## 📊 KPI

| Metric | Value |
|--------|-------|
| Total Test Cases | 42 |
| 📋 Planned | 33 |
| 🔴 Blocked (infra) | 9 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |
| 🟢 Smoke TCs | 4 |
| 🟡 Regression TCs | 38 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗒️ Test Cases

### 🟢 Smoke

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-001](./tc-login-001-splash-screen.md) | Splash screen displays correct branding | High | 📋 Planned |
| [TC-LOGIN-002](./tc-login-002-welcome-screen-ui.md) | Welcome screen displays correct UI elements | Critical | 📋 Planned |
| [TC-LOGIN-005](./tc-login-005-login-screen-ui.md) | Login screen displays correct UI elements | Critical | 📋 Planned |
| [TC-LOGIN-006](./tc-login-006-successful-login.md) | Successful login with valid credentials | Critical | 📋 Planned |

### 🟡 Regression — Welcome & Navigation

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-003](./tc-login-003-continental-account-button.md) | Continental Account clears Hive and launches Continental login flow | High | 📋 Planned |
| [TC-LOGIN-004](./tc-login-004-continue-as-guest.md) | Continue as Guest navigates to Onboarding screen | Medium | 📋 Planned |
| [TC-LOGIN-036](./tc-login-036-legal-privacy-link.md) | Legal & Privacy link opens in-app / platform browser | Medium | 📋 Planned |
| [TC-LOGIN-037](./tc-login-037-app-reinstall.md) | App reinstall clears credentials and starts at Welcome | Medium | 📋 Planned |

### 🟡 Regression — Login Form

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-007](./tc-login-007-email-auto-lowercase.md) | Email field auto-converts input to lowercase | Medium | 📋 Planned |
| [TC-LOGIN-008](./tc-login-008-password-visibility-toggle.md) | Password field visibility toggle (eye icon) | Medium | 📋 Planned |
| [TC-LOGIN-009](./tc-login-009-login-form-empty-fields.md) | Login form validation — empty fields _(Outline × 3)_ | Critical | 📋 Planned |
| [TC-LOGIN-010](./tc-login-010-login-form-invalid-email.md) | Login form validation — invalid email format _(Outline × 4)_ | High | 📋 Planned |
| [TC-LOGIN-011](./tc-login-011-login-form-invalid-password.md) | Login form validation — password not meeting policy _(Outline × 4)_ | High | 📋 Planned |
| [TC-LOGIN-012](./tc-login-012-invalid-credentials.md) | Login with invalid credentials → AuthenticationLoginErrorState | Critical | 📋 Planned |
| [TC-LOGIN-013](./tc-login-013-login-offline-error.md) | Login while offline → offlineError state | High | 🔴 Blocked |
| [TC-LOGIN-014](./tc-login-014-login-loading-state.md) | Login button disabled + snackbar during authentication | Medium | 📋 Planned |
| [TC-LOGIN-015](./tc-login-015-autofill-support.md) | Autofill support (iOS Keychain / Android Autofill) | Low | 📋 Planned |
| [TC-LOGIN-016](./tc-login-016-back-button-login.md) | Back button on Login screen returns to Welcome | Medium | 📋 Planned |
| [TC-LOGIN-034](./tc-login-034-paste-password.md) | Paste text into password field | Medium | 📋 Planned |
| [TC-LOGIN-035](./tc-login-035-email-password-spaces-trim.md) | Leading/trailing spaces trimmed on email and password _(Outline × 3)_ | Medium | 📋 Planned |

### 🟡 Regression — Forgot Password

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-017](./tc-login-017-forgot-password-navigation.md) | Forgot Password link navigates with email pre-fill | High | 📋 Planned |
| [TC-LOGIN-018](./tc-login-018-forgot-password-screen-ui.md) | Forgot Password screen displays correct UI elements | High | 📋 Planned |
| [TC-LOGIN-019](./tc-login-019-forgot-password-valid-email.md) | Forgot password with valid email sends verification code | High | 🔴 Blocked |
| [TC-LOGIN-020](./tc-login-020-forgot-password-validation.md) | Forgot password form validation _(Outline × 2)_ | High | 📋 Planned |
| [TC-LOGIN-021](./tc-login-021-verification-code-already-received.md) | "Verification Code already received" skips API | Medium | 📋 Planned |
| [TC-LOGIN-022](./tc-login-022-back-button-forgot-password.md) | Back button and Login link on Forgot Password _(Outline × 2)_ | Medium | 📋 Planned |

### 🟡 Regression — Reset Password

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-023](./tc-login-023-reset-password-screen-ui.md) | Reset Password screen — fields, eye icons, Submit | High | 📋 Planned |
| [TC-LOGIN-024](./tc-login-024-reset-password-success.md) | Reset password — successful with valid OTP | High | 🔴 Blocked |
| [TC-LOGIN-025](./tc-login-025-reset-password-validation.md) | Reset password form validation errors _(Outline × 5)_ | High | 📋 Planned |

### 🟡 Regression — Change Password

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-026](./tc-login-026-first-login-change-password.md) | First-time login → AuthenticationRedirectChangePasswordState | High | 📋 Planned |
| [TC-LOGIN-027](./tc-login-027-change-password-success.md) | Change password — successful | High | 🔴 Blocked |
| [TC-LOGIN-028](./tc-login-028-change-password-validation.md) | Change password form validation _(Outline × 4)_ | High | 📋 Planned |
| [TC-LOGIN-041](./tc-login-041-old-password-rejected.md) | Old password rejected after successful change | High | 🔴 Blocked |

### 🟡 Regression — Session & Auth Lifecycle

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-029](./tc-login-029-session-expiry.md) | Session expiry → AuthenitcationUnauthorizedState + message | High | 📋 Planned |
| [TC-LOGIN-031](./tc-login-031-logout-flow.md) | Logout clears all data and returns to Welcome | High | 📋 Planned |
| [TC-LOGIN-033](./tc-login-033-multi-user-session-isolation.md) | Multi-user session isolation — no data bleed | High | 📋 Planned |

### 🟡 Regression — Account Activation

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-042](./tc-login-042-account-activation.md) | Account activation via email verification code | High | 🔴 Blocked |

### 🟡 Regression — Profile Actions (Auth-related)

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-032](./tc-login-032-delete-account.md) | Delete account — typed confirmation + permanent removal | High | 📋 Planned |

### 📖 Reference & Device Edge Cases

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-LOGIN-030](./tc-login-030-password-policy.md) | Password policy reference and validation matrix | High | 📋 Planned |
| [TC-LOGIN-038](./tc-login-038-app-backgrounding.md) | App backgrounding / foreground resume during login | Medium | 🔴 Blocked |
| [TC-LOGIN-039](./tc-login-039-network-switch.md) | Network switch (WiFi ↔ mobile data) mid-login | Low | 🔴 Blocked |
| [TC-LOGIN-040](./tc-login-040-incoming-call.md) | Incoming call interruption during login | Low | 🔴 Blocked |

---

## 🔴 Blocked (Infrastructure Required)

| ID | Title | Blocker |
|----|-------|---------|
| [TC-LOGIN-013](./tc-login-013-login-offline-error.md) | Offline login error | Device-level network toggle |
| [TC-LOGIN-019](./tc-login-019-forgot-password-valid-email.md) | Forgot password — send code | Email inbox for OTP |
| [TC-LOGIN-024](./tc-login-024-reset-password-success.md) | Reset password — success | Email inbox for OTP |
| [TC-LOGIN-027](./tc-login-027-change-password-success.md) | Change password — success | Reversible test account |
| [TC-LOGIN-038](./tc-login-038-app-backgrounding.md) | App backgrounding | Native OS app switching |
| [TC-LOGIN-039](./tc-login-039-network-switch.md) | Network switch | Physical network toggle |
| [TC-LOGIN-040](./tc-login-040-incoming-call.md) | Incoming call | Real incoming call |
| [TC-LOGIN-041](./tc-login-041-old-password-rejected.md) | Old password rejected | Reversible test account |
| [TC-LOGIN-042](./tc-login-042-account-activation.md) | Account activation | New unactivated account + email inbox |

---

## 📂 Automation Artefacts

| Artefact | Path |
|----------|------|
| Feature file — smoke | `features/smoke/login.feature` |
| Feature file — regression | `features/regression/login.feature` |
| Step definitions | `src/steps/login.steps.ts` |
| Page object — Login | `src/pages/login.page.ts` |
| Page object — Profile | `src/pages/profile.page.ts` *(to create)* |
| Page object — Forgot Password | `src/pages/forgot-password.page.ts` *(to create)* |
| Page object — Reset Password | `src/pages/reset-password.page.ts` *(to create)* |
| Page object — Change Password | `src/pages/change-password.page.ts` *(to create)* |
| Test data | `resources/data/smokedata.csv`, `resources/data/logindata.csv` |
| Passwords | `resources/data/.env.passwords` |

---

## 🔍 Flutter Source Reference

| File | Purpose |
|------|---------|
| `lib/src/ui/screens/splash_screen.dart` | Splash screen branding |
| `lib/src/ui/screens/contiplus_form_template.dart` | Shared auth template — all form types |
| `lib/src/ui/screens/forms/login_form.dart` | Login form: email lowercase, trim, autofill, 500ms delay, eye icon |
| `lib/src/ui/screens/forms/forgot_password_form.dart` | Forgot password form |
| `lib/src/ui/screens/forms/reset_password_form.dart` | Reset password form |
| `lib/src/ui/screens/forms/change_password_form.dart` | Change password form |
| `lib/src/ui/screens/profile/profile_screen.dart` | Profile: logout button, delete account dialog |
| `lib/src/blocs/authentication/authentication_bloc.dart` | All state transitions, validation methods, Continental clears Hive |
| `lib/src/blocs/authentication/authentication_event.dart` | All authentication events |
| `lib/src/blocs/authentication/authentication_state.dart` | All states (note `Authenit` typo is in source) |
| `lib/src/l10n/app_en.arb` | All English i18n strings |

---

## ⏳ Automation Roadmap

| Sprint | TCs | Focus |
|--------|-----|-------|
| **Sprint 1** | TC-001, TC-002, TC-005, TC-006 | Smoke — splash, welcome, login UI, successful login |
| **Sprint 2** | TC-009, TC-010, TC-011, TC-007, TC-008, TC-014 | Login form validations + email lowercase + eye icon + loading |
| **Sprint 3** | TC-012, TC-016, TC-017, TC-018, TC-034, TC-035 | Invalid credentials, navigation, paste, trim |
| **Sprint 4** | TC-003, TC-004, TC-020, TC-021, TC-022, TC-023, TC-025 | Continental/Guest, forgot/reset password flows |
| **Sprint 5** | TC-026, TC-028, TC-029, TC-030, TC-031, TC-032, TC-033 | Change pw, session, logout, delete account, session isolation |
| **Sprint 6** | TC-036, TC-037, TC-015 | Legal link, reinstall, autofill |
| **Sprint 7** | TC-013, TC-019, TC-024, TC-027, TC-038–042 | Infrastructure-dependent TCs |
