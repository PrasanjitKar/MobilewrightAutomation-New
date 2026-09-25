# Profile — Test Suite

> Module: `profile` | Flutter source: `lib/src/ui/screens/profile/` + `lib/src/blocs/user/` + `lib/src/blocs/authentication/`
> Feature files: `features/regression/profile.feature` *(to create)*

---

## 📋 Overview

The **Profile** suite covers user identity management, account settings, personal information, legal & privacy consent, in-app error reporting, password updates, and session termination (logout & account deletion) accessed via the top-right Profile/Avatar button in `ContiAppBar`.

The entry point is `ProfileScreen` (`lib/src/ui/screens/profile/profile_screen.dart`), which is presented upon tapping `profileIcon` from the top app bar across any tab.

### Profile Sub-Features

| Feature / Screen | Flutter Source | Description |
|---|---|---|
| **Profile Header Card** | `ProfileScreen.profileHeader` | User avatar, Full Name, Profile Type (e.g., Master / Admin / Standard), and arrow button to navigate to `ProfileInformationScreen`. |
| **Settings (Units)** | `SettingsScreen` | Unit of measure selection (Metric vs Imperial) and profile settings persistence via `UserAccountBloc`. |
| **Report Issue** | `ReportIssueView` / `ReportIssueDialog` | In-app feedback dialog with comments field, automated device log zipping (`.zip`), device metadata collection, and email dispatch / file sharing. |
| **Privacy Settings** | `ConsentBloc` | OneTrust / CMP consent management preferences initialization (`InitializeCMPEvent(forceOpen: true)`). |
| **Legal & Privacy** | `launchUrl(legalUrl)` | Terms of service and privacy policy opened in in-app WebView (Android) or browser (iOS). |
| **App Version Badge** | `ProfileScreen.appVersionWidget` | App version and build number (`V.11.0.0 (464)`) queried via `PackageInfo.fromPlatform()`. |
| **Logout** | `ProfileScreen.logoutButton` | Session termination via `AuthenticationLogOutEvent()`, clearing tokens, Hive data, and navigating to Welcome/Login. |
| **My Information** | `ProfileInformationScreen` | View detailed personal information, company name, profile type, unit of measure, subscription dates, and avatar update/crop. |
| **Change Password** | `ChangePasswordScreen` | Password change form with current password, new password, confirm password, visibility toggles, and complexity validation. |
| **Delete Account** | `ConfirmationDialogTemplate` | Two-factor confirmation modal requiring typing exact text (`DELETE ACCOUNT`) before invoking `UserDeleteEvent`. |
| **Guest / Free User View** | `OnboardingScreen` | Free market user view displaying "View Intro" onboarding card instead of settings grid. |

---

## 📊 KPI

| Metric | Value |
|--------|-------|
| Total Test Cases | 13 |
| 📋 Planned | 13 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |
| 🔴 Blocked (infra) | 0 |
| 🟢 Smoke TCs | 3 |
| 🟡 Regression TCs | 9 |
| 🟣 E2E TCs | 1 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗒️ Test Cases

### 🟢 Smoke

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-PROFILE-001](./tc-profile-001-profile-screen-layout-and-header.md) | Profile screen loads with title "Profile", user avatar, full name, and role | Critical | 📋 Planned |
| [TC-PROFILE-002](./tc-profile-002-profile-information-screen-fields.md) | My Information screen displays all personal, company, and subscription fields | Critical | 📋 Planned |
| [TC-PROFILE-009](./tc-profile-009-logout-action-and-session-clearance.md) | Logout action terminates session, logs analytics, and returns to Welcome screen | Critical | 📋 Planned |

### 🟣 End-to-End (E2E)

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-PROFILE-013](./tc-profile-013-e2e-user-profile-and-security-lifecycle.md) | E2E User Profile Information, Settings, Password Change & Session Logout Lifecycle | Critical | 📋 Planned |

### 🟡 Regression — Settings & Preferences

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-PROFILE-003](./tc-profile-003-profile-avatar-upload-and-crop.md) | Profile avatar photo capture/upload, circular crop, and header update | High | 📋 Planned |
| [TC-PROFILE-004](./tc-profile-004-settings-unit-of-measure-toggle-and-save.md) | Settings screen — toggle Metric vs Imperial unit of measure and save | High | 📋 Planned |
| [TC-PROFILE-005](./tc-profile-005-report-issue-dialog-and-log-export.md) | Report Issue dialog — comment entry, log zip export, metadata injection, and share | Medium | 📋 Planned |
| [TC-PROFILE-006](./tc-profile-006-privacy-settings-consent-modal.md) | Privacy Settings card triggers OneTrust CMP consent modal | Medium | 📋 Planned |
| [TC-PROFILE-007](./tc-profile-007-legal-privacy-in-app-webview.md) | Legal & Privacy card launches legal URL in in-app WebView or browser | Low | 📋 Planned |
| [TC-PROFILE-008](./tc-profile-008-app-version-and-build-number-display.md) | App version and build number dynamically rendered in version box | Low | 📋 Planned |

### 🟡 Regression — Security & Account Lifecycle

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-PROFILE-010](./tc-profile-010-change-password-screen-validation-and-save.md) | Change Password screen — visibility toggles, policy validation, and password update | High | 📋 Planned |
| [TC-PROFILE-011](./tc-profile-011-delete-account-flow-and-typed-confirmation.md) | Delete Account flow — popup menu option, modal warning, typed text confirmation | High | 📋 Planned |
| [TC-PROFILE-012](./tc-profile-012-guest-free-user-profile-view-intro.md) | Guest/Free user profile — displays "View Intro" card and hides full user grid | Medium | 📋 Planned |

---

## 📂 Automation Artefacts

| Artefact | Path |
|----------|------|
| Feature file — regression | `features/regression/profile.feature` *(to create)* |
| Step definitions | `src/steps/profile.steps.ts` *(to create)* |
| Page object — Profile | `src/pages/profile.page.ts` *(to create)* |
| Test data | `resources/data/profiledata.csv` *(to create)* |

---

## 🔍 Flutter Source Reference

| File | Purpose |
|------|---------|
| `lib/src/ui/screens/profile/profile_screen.dart` | `ProfileScreen` widget — header, 4-grid options, version box, logout button |
| `lib/src/ui/screens/profile/profile_information_screen.dart` | `ProfileInformationScreen` — user information, avatar picker, delete account |
| `lib/src/ui/screens/profile/settings_screen.dart` | `SettingsScreen` — unit of measure radio buttons and save |
| `lib/src/ui/screens/profile/change_password_screen.dart` | `ChangePasswordScreen` — password change form and validations |
| `lib/src/ui/widgets/report_issue_dialog.dart` | `ReportIssueDialog` / `ReportIssueView` — log export & email |
| `lib/src/blocs/user/cubit/user_info_cubit.dart` | `UserInfoCubit` — cached user state machine |
| `lib/src/blocs/user/user_account_bloc.dart` | `UserAccountBloc` — update profile, change password, delete user |
| `lib/src/blocs/authentication/authentication_bloc.dart` | `AuthenticationBloc` — logout event handling |
| `lib/src/blocs/authentication/consent/consent_bloc.dart` | `ConsentBloc` — CMP consent management |
| `lib/src/l10n/app_en.arb` | English i18n translation keys |
