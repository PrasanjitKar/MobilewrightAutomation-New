# Copilot Instructions — Conti+ Mobile QA Automation (MobileWright)

## Build, Test & Lint

```bash
# Install dependencies (first-time setup)
npm install

# Run by platform tag
npm run test:android      # Android device/emulator
npm run test              # Default run (all)

# Run by suite
npm run test:smoke        # @smoke — fast critical paths (STG)
npm run test:sanity       # @sanity — production smoke (PRD, 25 cross-module scenarios)
npm run test:all          # All tests (tests/ folder)

# Run a single spec file
npm run test:welcome      # tests/sgalert.spec.ts
npm run test:navigation   # tests/sgalert-navigation.spec.ts
npm run test:complete     # tests/sgalert-complete-flow.spec.ts
npm run test:pom          # tests/sgalert-complete-flow-pom.spec.ts

# Device utilities
npm run device:check      # adb devices
npm run device:restart    # adb kill-server && adb start-server
npm run app:install       # adb install ./apk/android.apk/sgAlert_Android.apk
npm run app:uninstall     # adb uninstall com.senecaglobal.sgalert.internal
npm run app:clear         # adb shell pm clear com.senecaglobal.sgalert.internal

# Inspect UI element tree
npm run inspect-ui        # node inspect-ui.js

# Clean artefacts
npm run clean:results
npm run clean:screenshots
npm run clean:all

# Lint & format
npm run lint              # ESLint check
npm run lint:fix          # ESLint auto-fix
npm run format:check      # Prettier check
npm run format            # Prettier auto-fix
```

Pre-commit hooks (Husky + lint-staged) run `prettier --write` and `eslint --fix` on staged `.ts` files automatically.

## Architecture

This is a **MobileWright + Playwright-BDD (Cucumber)** test automation framework in TypeScript for the **Conti+** mobile application. MobileWright wraps Playwright to support iOS and Android native and WebView contexts.

The Conti+ Flutter app embeds the Conti+ **web application inside a WebView** (`app_web_view.dart`). Test automation uses Playwright-style DOM locators to interact with the web UI rendered inside the mobile WebView.

### Core flow

```
Feature file (.feature) → playwright-bdd generates (.features-gen) → MobileWright runner
       ↓
Step definitions → ScenarioContext (World) → Page objects → MobileWright / Playwright API
```

### Key components

- **`mobilewright.config.ts`** (`config/mobilewright.config.ts`) — Entry-point config. `testDir: '.features-gen'` (playwright-bdd generated). Two projects: `ios` (grep `@ios|@both`) and `android` (grep `@android|@both`). `workers: 2`, `fullyParallel: true`, retries: 2 in CI. Reporters: `list`, `allure-playwright` (→ `allure-results/`), `html` (→ `reports/`).
- **`androidConfig` / `iosConfig`** (`src/config/android.ts`, `src/config/ios.ts`) — Load required device env vars at startup. Android: `ANDROID_PACKAGE`, `ANDROID_APP`, `ANDROID_DEVICE_NAME`. iOS: `IOS_BUNDLE_ID`, `IOS_APP`, `IOS_DEVICE_NAME`. Throws if any required var is missing.
- **`env.ts`** (`src/config/env.ts`) — Loads the root `.env` file via `dotenv` on import. Both `android.ts` and `ios.ts` import this first.
- **`ScenarioContext`** (`src/utils/ScenarioContext.ts`) — Extends Cucumber's `World`. Holds all per-scenario state: browser page, logger, API context, test data, soft-assertion buckets, and a lazy cache of page objects. Every step definition types `this` as `ScenarioContext`. No global singletons.
- **`BasePage`** (`src/pages/base.page.ts`) — Base class all page objects extend. Provides `protected page: Page` and `protected subStepLogger?: HTMLSubStepLogger`. Exposes `waitForLoadingToComplete()` and protected logging helpers: `logInfo()`, `logSuccess()`, `logWarning()`, `logFailure()`.
- **Page Objects** (`src/pages/`) — Each page class **extends `BasePage`** with `constructor(page: Page, subStepLogger?: HTMLSubStepLogger)`. Locators are defined as **getter methods** returning `Locator` objects — no shared LocatorRepo.
- **`HTMLSubStepLogger`** (`src/utils/htmlSubStepLogger.ts`) — Attaches styled HTML badges to the Cucumber report. Methods: `success()`, `info()`, `warning()`, `logFailure()` (badge only), `failure()` (hard throw), `softFailure()` (collects and continues). Use protected `BasePage` helpers in page objects, not `this.subStepLogger` directly.
- **`Assert`** (`src/utils/assert.ts`) — Static utility class with hard (`assert*`) and soft (`softAssert*`) assertions. Imports `expect` from `@mobilewright/test`. Soft assertions log to `ISoftAssertState` and continue; the `After` hook throws if any accumulated.
- **`CSVParser`** (`src/utils/CSVParser.ts`) — Parses pipe-delimited CSV test data files. Supports multiple header blocks, skips `#`/`!` comment lines, strips BOM. Used by hooks to load test data rows matched by `@Key:` tag.
- **`PasswordResolver`** (`src/utils/passwordResolver.ts`) — Loads `resources/data/.env.passwords` once per process. Maps `*_ROLE` env vars to a password map (e.g. `ADMIN_ROLE=...` → `td.password.admin`).
- **`ApiFactory`** — Creates a Playwright `APIRequestContext` with `Authorization: Bearer <AUTH_TOKEN>` and `X-ORG-ID` headers. Available in steps as `this.api` and `this.apiFactory`.
- **Logger** (`src/utils/logger.ts`) — Winston logger. Console transport (colourised) + optional per-scenario file transport under `test-results/logs/<scenarioName>/log.log`.

### Environment configuration

- Root `.env` file — loaded at startup. Holds device-specific vars: `ANDROID_PACKAGE`, `ANDROID_APP`, `ANDROID_DEVICE_NAME`, `IOS_BUNDLE_ID`, `IOS_APP`, `IOS_DEVICE_NAME`, and optionally `ANDROID_DEVICE`, `ANDROID_PLATFORM_VERSION`, `IOS_UDID`, `IOS_PLATFORM_VERSION`.
- Per-environment web config files: `resources/.env.STG`, `resources/.env.DEV`, `resources/.env.SBX` — hold `BASEURL`, `AUTH_TOKEN`, `ORG_ID`, `ADMIN_USERNAME`, etc.
- Default environment: `STG` (`https://stage.contiplus.net/`).
- Select environment with the `ENV` env var.

### Reports

```
allure-results/           ← Allure source data
reports/                  ← Playwright HTML report
test-results/reports/     ← Multiple Cucumber HTML report
test-results/logs/        ← Per-scenario Winston log files
test-results/screenshots/ ← Failure screenshots
test-results/videos/      ← Scenario recordings
```

## Key Conventions

### Feature file folder structure

Feature files live under `features/` organised by suite type. The `mobilewright.config.ts` reads from `.features-gen` (playwright-bdd generated output).

| Folder | Tag | npm script | Data File | Environment |
|---|---|---|---|---|
| `features/sanity/` | `@sanity` | `test:sanity` | `sanitydata.csv` | PRD |
| `features/smoke/` | `@smoke` | `test:smoke` | `smokedata.csv` | STG |
| `features/regression/` | `@regression` | *(manual)* | `<module>data.csv` | STG |
| `features/e2e/` | `@e2e` | *(manual)* | `e2edata.csv` | STG |

### Platform tags (mobile-specific)

Every scenario or feature must also carry a platform tag so `mobilewright.config.ts` routes it to the correct project:

| Tag | Meaning |
|---|---|
| `@android` | Run on Android only |
| `@ios` | Run on iOS only |
| `@both` | Run on both Android and iOS |

```gherkin
@DataFile:resources/data/sanitydata.csv @Key:sanity_login @sanity @both
Scenario: Successful login on mobile
```

### Test Data Files — suite-scoped convention

| Data File | Suite | Module(s) |
|---|---|---|
| `resources/data/smokedata.csv` | Smoke | Login, core paths |
| `resources/data/sanitydata.csv` | Sanity (PRD) | All modules |
| `resources/data/e2edata.csv` | E2E | All modules |
| `resources/data/logindata.csv` | Regression | Login |
| `resources/data/sitedata.csv` | Regression | Sites |
| `resources/data/<module>data.csv` | Regression | One per module |
| `resources/data/testdata.csv` | Legacy only | Shared / legacy keys |

**Always specify `@DataFile:` explicitly** — never rely on the default fallback:

```gherkin
# Sanity (PRD)
@DataFile:resources/data/sanitydata.csv @Key:sanity_conveyor_create @sanity @both
Scenario: Create conveyor in sanity

# Smoke (STG)
@DataFile:resources/data/smokedata.csv @Key:valid_login @smoke @both
Scenario: Successful login

# Regression — module-specific file
@DataFile:resources/data/sitedata.csv @Key:site_delete @regression @android
Scenario: Delete a site
```

### `docs/test-suites/` — Single Source of Truth

> **`docs/test-suites/` is the SINGLE SOURCE OF TRUTH for all test case documentation.**
> Every TC has its own `.md` file with Flutter source references, exact BLoC state names, semantic labels,
> exact i18n strings, suggested Gherkin, test data keys, and current automation status.
> **Always start here before writing any automation — never implement from test-link/ or gap/ files.**

`docs/test-link/` contains TestLink XML exports converted to Markdown. These are **read-only historical archives** — cross-reference TC IDs only. Do NOT implement from test-link.

`docs/gap/` contains gap analysis reports comparing test-suites coverage against test-link exports. Gaps are actioned by creating new TCs in test-suites and marking them addressed in the gap file.

### Current docs/test-suites/ modules

| Module | TCs | Automated | File |
|---|---|---|---|
| login | 42 | 0 (0%) | `docs/test-suites/login/index.md` |

Each TC file includes: Objective, Preconditions, Test Steps, Flutter Source Reference (file, class, code snippet), Semantic Labels, i18n strings, and Suggested Gherkin with `@DataFile`/`@Key`/platform tags.

**Login TC structure** (`docs/test-suites/login/`):
- 33 📋 Planned (can be automated immediately)
- 9 🔴 Blocked (infrastructure required: email OTP, reversible accounts, device-level controls)
- Flutter BLoC states used: `AuthenitcationAuthorizedState`, `AuthenitcationUnauthorizedState`, `AuthenitcationLoginState`, `AuthenticationLoginErrorState`, `AuthenticationContinentalLoginState`, `AuthenticationRedirectChangePasswordState` — **note the intentional `Authenit` typo** in class names as defined in `authentication_state.dart`

### docs/test-link/ structure

TestLink XML exports converted to Markdown. Login module has 82 TCs across 4 sub-suites:

```
docs/test-link/
├── index.md
└── login/
    ├── Login.testsuite.xml     ← Original TestLink export (kept as archive)
    ├── index.md                ← 82 TCs overview
    ├── LoginPage/              ← 30 TCs (auth flows)
    ├── Home/                   ← 27 TCs (NOTE: misplaced — belongs in Home module)
    ├── Profile/                ← 21 TCs (6 auth-adjacent; 15 belong in Profile module)
    └── Negative/               ← 4 TCs (device/network edge cases)
```

### docs/gap/ structure

```
docs/gap/
├── index.md    ← Master gap registry
└── login.md    ← Login gap analysis (12 gaps — all addressed, TCs created in test-suites)
```

#### Workflow: docs/test-suites → feature file → automation

```
1. Read docs/test-suites/<module>/tc-<id>-<title>.md   ← THE SPEC (Flutter source-backed)
2. Create features/<suite>/<module>.feature             ← Gherkin from TC spec
3. Create/update src/pages/<module>.page.ts            ← Page object
4. Write src/steps/<module>.steps.ts                   ← Step definitions
5. Add rows to resources/data/<module>data.csv         ← Test data
6. Update docs/test-suites/<module>/index.md           ← Mark TC 🟢 Active + KPI
7. Update docs/test-suites/index.md                    ← Update global KPI row (when it exists)
```

### Gap analysis workflow

When new TCs are needed or test-link exports are available:
1. Read `docs/gap/<module>.md` for known gaps
2. Create missing TCs in `docs/test-suites/<module>/`
3. Mark gaps as `✅ ADDRESSED` in `docs/gap/<module>.md` with link to the new TC
4. Update `docs/gap/<module>.md` resolution status table

### Adding a new test scenario

1. Read the TC spec in `docs/test-suites/<module>/tc-<id>-<title>.md`
2. Choose the right feature file:
   - Fast/critical path → `features/smoke/<module>.feature` (`@smoke @both`)
   - Production smoke   → `features/sanity/sanity.feature` (`@sanity @both`)
   - Full acceptance    → `features/regression/<module>.feature` (`@regression @android` / `@ios` / `@both`)
   - End-to-end journey → `features/e2e/<module>.feature` (`@e2e @both`)
3. Define locators as **getter methods** directly on the page class (no LocatorRepo)
4. Create a page object in `src/pages/` extending `BasePage`
5. Register it in `src/utils/ScenarioContext.ts` as a private field + lazy getter
6. Write step definitions in `src/steps/` using `this.<pageName>`
7. Add test data rows to `resources/data/<module>data.csv`
8. Tag with `@inprogress` during development, remove when stable
9. **Always update `docs/test-suites/<module>/index.md`** — KPI + status table

### Test suite index — ALWAYS keep in sync

> **Rule:** Any time a test case status changes (planned → automated, automated → deprecated, etc.), you **must** update **both**:
> 1. `docs/test-suites/<module>/index.md` — the suite-level table and KPI block
> 2. `docs/test-suites/index.md` — the global suite registry row (when it exists)

Also update `docs/gap/<module>.md` if the TC addresses an identified gap — mark it `✅ ADDRESSED`.

**Status values:**

| Status | Meaning |
|--------|---------|
| `📋 Planned` | Test case documented but no feature file / step / page object yet |
| `🟢 Active — Automated` | Feature file, steps, and page object all exist and passing |
| `🔵 Active — In Progress` | Being automated (tagged `@inprogress`) |
| `⚠️ Failing` | Automated but currently failing in CI |
| `🚫 Deprecated` | No longer relevant; kept for reference |
| `🔴 Blocked` | Cannot be automated without external infra |

**KPI fields to update after automation:**

```markdown
| Automated | X (Y%) |   ← increment X, recalculate Y%
| 📋 Planned | Z |       ← decrement Z
```

**This update is not optional** — stale status in index files defeats the purpose of the documentation.

### Locator naming (as getter methods on the page class)

Locators are defined as `get` properties returning `Locator`. Use descriptive names with element-type suffix:

| Suffix | Element type | Example getter |
|--------|-------------|----------------|
| `Input` | Text box / input | `get usernameInput()` |
| `Button` | Button | `get loginButton()` |
| `Label` / `Header` | Label / text | `get pageHeader()` |
| `Dropdown` / `Select` | Dropdown | `get statusDropdown()` |
| `Checkbox` | Checkbox | `get rememberMeCheckbox()` |
| `Link` | Link | `get forgotPasswordLink()` |

Prefer Playwright's semantic locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`) over CSS/XPath. For WebView DOM elements, CSS ID selectors (`#email`, `p-password[formcontrolname="..."]`) are also valid when semantic locators aren't available.

### Step definitions

- Always type `this` as `ScenarioContext`
- Access page objects via lazy getters (`this.loginPage`, `this.homePage`, etc.) — never call `new XyzPage(...)`
- **Never use locators directly in step files** — all UI interaction goes through page object methods
- Keep steps thin: one or two page method calls, no business logic or logging

### Page objects

- **Extend `BasePage`** (`src/pages/base.page.ts`) — constructor signature is `constructor(page: Page, subStepLogger?: HTMLSubStepLogger)` (`subStepLogger` is optional)
- `BasePage` provides `this.page` and `this.subStepLogger` as `protected` fields — no need to redeclare them
- `BasePage` exposes protected helpers: **`this.logInfo()`**, **`this.logSuccess()`**, **`this.logWarning()`**, **`this.logFailure()`** — always use these, not `this.subStepLogger` directly
- Define locators as `get` properties returning `Locator`
- Methods should represent business actions (e.g., `login`, `handleCookiePopup`) not raw clicks
- Use native Playwright assertions (`expect(locator).toBeVisible()`, `expect(locator).toBeHidden()`)
- Wait for API responses using `page.waitForResponse(...)` in `Promise.all` where appropriate
- Use `await this.waitForLoadingToComplete()` when waiting for DOM to be ready
- **`page.goto()` MUST use a full URL** — no relative paths:
  ```ts
  const baseUrl = (process.env.BASEURL || 'https://stage.contiplus.net/').replace(/\/$/, '');
  await this.page.goto(`${baseUrl}/secure/your-route`);
  ```
- **Passing data between steps** — use `this.testData` (`Record<string, unknown>` on ScenarioContext) to store/retrieve values across steps within the same scenario.

### ScenarioContext — registering a new page object

```ts
// 1. Import
import { OrdersPage } from '../pages/orders.page';

// 2. Private field + lazy getter
private _ordersPage?: OrdersPage;

get ordersPage(): OrdersPage {
  if (!this._ordersPage) this._ordersPage = new OrdersPage(this.page, this.subStepLogger);
  return this._ordersPage;
}
```

### TypeScript path aliases

The `tsconfig.json` provides path aliases for clean imports:

| Alias | Resolves to |
|-------|------------|
| `@/*` | `src/*` |
| `@helpers/*` | `src/helper/*` |
| `@pages/*` | `src/pages/*` |
| `@steps/*` | `src/steps/*` |
| `@utils/*` | `src/utils/*` |

### ESLint rules to note

- `@typescript-eslint/no-floating-promises: error` — all async calls must be awaited
- `no-console: warn` — use `winston` logger instead of `console.log`
- `@typescript-eslint/no-explicit-any: warn` — avoid `any` where possible

### Formatting (Prettier)

Single quotes, semicolons, trailing commas (`all`), 120-char print width, 2-space indent, LF line endings.

## Login — Flutter Authentication Flows

The Conti+ app uses a BLoC-driven state machine for all auth flows. Key notes for writing login-related automation:

| Flow | BLoC Event | Resulting State |
|---|---|---|
| App load | `AuthenticationAppLoadedEvent` | Welcome / Authorized / Unauthorized |
| Login | `AuthenticationLogInEvent` | `AuthenitcationAuthorizedState` or error |
| Continental login | `AuthenticationShowContinentalEvent` | `AuthenticationContinentalLoginState` (clears Hive first) |
| Forgot password | `AuthenticationShowForgotPasswordEvent` | `AuthenitcationForgotPasswordState` |
| Reset password | `AuthenticationShowResetPasswordEvent` | `AuthenticationResetPasswordState` |
| First login | *(API indicator)* | `AuthenticationRedirectChangePasswordState` |
| Change password | `AuthenticationSaveChangePasswordEvent` | `AuthenitcationAuthorizedState` |
| Logout | `AuthenticationLogOutEvent` | `AuthenitcationUnauthorizedState` |

> **State name note:** Several states contain an intentional typo `Authenit` in the Flutter source (`authentication_state.dart`) — e.g., `AuthenitcationAuthorizedState`. Use these exact names in TC source references.

**Login error states** (distinct):
- `AuthenticationLoginErrorState(errorKey: 'authenticationError')` — wrong credentials
- `AuthenticationLoginErrorState(errorKey: 'offlineError')` — device offline

**Key login form behaviours** (from `login_form.dart`):
- Email: `LowerCaseTextFormatter` (auto-lowercase) + `.trim()` on submit
- Password: `.trim()` on submit; 500 ms delay before API call (iOS autofill commit)
- `TextInput.finishAutofillContext()` called before API (saves to Keychain/Autofill)

## Flutter Source Reference — ALWAYS Check This First

> **Rule:** Before guessing locators or widget keys, **always look up the Flutter source in `CT-CONTIPLUS/ctp-contiplus-flutter-app` first.**

The Flutter app (`ctp-contiplus-flutter-app`) is the Conti+ mobile application. It renders the Conti+ web app inside a WebView (`lib/src/ui/screens/app_web_view.dart`). For web-app locators within the WebView, refer to the Angular source. For native mobile UI (splash screens, permissions, deep-link handling, app lifecycle), refer to the Flutter source.

### Flutter source structure

```
lib/
├── src/
│   ├── blocs/           ← BLoC state management (authentication, etc.)
│   ├── models/          ← Data models
│   ├── repositories/    ← API / data layer
│   ├── ui/
│   │   ├── screens/     ← Screen widgets per feature
│   │   │   ├── login_screen.dart
│   │   │   ├── app_web_view.dart     ← WebView wrapper (where web tests run)
│   │   │   ├── home/
│   │   │   ├── conveyors/
│   │   │   ├── inspections/
│   │   │   ├── monitoring_device/
│   │   │   └── ...
│   │   └── widgets/     ← Reusable UI components
│   └── common/          ← Strings, constants, l10n keys
├── main.dart            ← App entry point
├── flavors.dart         ← dev / stage / prod flavour config
└── app.dart
```

### How to use it

Use GitHub code search scoped to the repo:

```
repo:CT-CONTIPLUS/ctp-contiplus-flutter-app <search term>
```

Or use the `github-mcp-server-get_file_contents` / `github-mcp-server-search_code` tools directly.

### Common lookups

| What you need | Where to look |
|---|---|
| Native screen structure | `lib/src/ui/screens/<feature>/<screen>.dart` |
| App flavour (env) config | `lib/flavors.dart` |
| Authentication flow | `lib/src/blocs/authentication/` |
| Routes / navigation | `lib/src/ui/app/` or screen navigator calls |
| Semantic labels / keys | `lib/src/common/` and screen widget `Key(...)` usages |
| API calls from mobile | `lib/src/repositories/` |
| WebView entry point | `lib/src/ui/screens/app_web_view.dart` |

**For web-app locators inside the WebView**, also check the Angular source (`CT-CONTIPLUS/ctp-contiplus-angular-app`):

| What you need | Where to look |
|---|---|
| Component templates / DOM | `src/app/components/**/<page>.component.html` |
| Route paths | `src/app/**/*-routing.module.ts` |
| Form field names | `src/app/components/**/<page>.component.ts` — `fb.group({...})` |
| Visible text | i18n assets or inline template text |

---

## Device Setup

### Android

Required `.env` variables:

```
ANDROID_PACKAGE=<app.package.name>
ANDROID_APP=<path/to/app.apk>
ANDROID_DEVICE_NAME=<emulator_or_device_name>
ANDROID_DEVICE=<device_serial>              # optional
ANDROID_PLATFORM_VERSION=<14>              # optional
```

Useful commands:

```bash
npm run device:check      # List connected devices (adb devices)
npm run device:restart    # Restart ADB server
npm run app:install       # Install APK
npm run app:clear         # Clear app data (reset state)
```

### iOS

Required `.env` variables:

```
IOS_BUNDLE_ID=<com.example.app>
IOS_APP=<path/to/app.ipa_or_app>
IOS_DEVICE_NAME=<simulator_or_device_name>
IOS_UDID=<device_udid>                     # optional
IOS_PLATFORM_VERSION=<17.0>               # optional
```

## Soft Assertions

Soft failures are collected into `this.softAssertErrors` / `this.softAssertStepFailures`. The `After` hook throws a summary error if any accumulated. Use `Assert.softAssert*()` static methods or `this.subStepLogger.softFailure()` in page objects for non-blocking assertion failures.

```ts
// Soft assertion via Assert utility
await Assert.softAssertEquals(actual, expected, 'Field value check', this.subStepLogger, this);

// Soft failure via HTMLSubStepLogger
await this.subStepLogger.softFailure('Expected banner to be visible');
```
