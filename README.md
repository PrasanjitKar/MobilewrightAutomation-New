# MobileWright + Playwright-BDD — Conti+ Mobile QA Automation

Behaviour-driven test automation framework for the **Conti+** Flutter mobile application using **MobileWright** (iOS + Android) and **playwright-bdd** (Gherkin/BDD scenarios). TypeScript provides static typing across the entire codebase.

---

## Features

1. **BDD (Gherkin)** feature files via `playwright-bdd` — scenarios readable by all stakeholders
2. **Dual platform** — iOS and Android in a single framework (`@ios` / `@android` / `@both` tags)
3. **Playwright-style locators** — semantic labels from Flutter's `SemanticsLabel` widget
4. Rich **HTML report** (multiple-cucumber-html-reporter) + **Allure** report
5. **HTML sub-step logging** via `HTMLSubStepLogger` — styled pass/fail badges in Cucumber report
6. **Soft assertions** — collect failures across steps, report at end of scenario
7. **Page Object Model** — all pages extend `BasePage`; lazy-cached per scenario via `ScenarioContext`
8. **Suite-scoped CSV test data** — one data file per suite/module (`smokedata.csv`, `logindata.csv`, etc.)
9. Multi-environment support: **STG / DEV / SBX**
10. **ESLint + Prettier** enforced via pre-commit hooks (Husky + lint-staged)
11. **`docs/test-suites/`** is the single source of truth for all TC documentation — backed by Flutter source code

---

## Architecture

```
features/*.feature
       ↓
playwright-bdd (generates .features-gen/)
       ↓
MobileWright runner (mobilewright.config.ts)
       ↓  projects: ios (@ios|@both), android (@android|@both)
Step definitions (src/steps/)
       ↓
ScenarioContext (World — per-scenario state)
       ↓
Page objects (src/pages/ — all extend BasePage)
       ↓
MobileWright + Playwright API
       ↓
Conti+ Flutter app (iOS Simulator / Android Emulator / Physical Device)
  └── WebView (app_web_view.dart) → Conti+ web app
```

---

## Project Structure

```
features/
├── smoke/           → @smoke @both    — fast critical paths (STG)
├── regression/      → @regression     — full acceptance (STG, per-module)
├── e2e/             → @e2e @both      — complete user journeys (STG)
└── sanity/          → @sanity @both   — production smoke (PRD)
    └── sanity.feature                 (@DataFile: sanitydata.csv)

src/
├── pages/                       Page Object Models
│   ├── base.page.ts             BasePage — all pages extend this
│   └── login.page.ts            Login / Welcome / ForgotPw / ResetPw / ChangePw
├── steps/                       Cucumber step definitions
│   └── login.steps.ts
├── config/
│   ├── android.ts               ANDROID_PACKAGE, ANDROID_APP, ANDROID_DEVICE_NAME
│   ├── ios.ts                   IOS_BUNDLE_ID, IOS_APP, IOS_DEVICE_NAME
│   └── env.ts                   Loads root .env via dotenv
└── utils/
    ├── ScenarioContext.ts        World — per-scenario state + lazy page cache
    ├── htmlSubStepLogger.ts      Styled HTML badges in Cucumber report
    ├── assert.ts                 Hard and soft assertion helpers
    ├── CSVParser.ts              Pipe-delimited CSV parser for test data
    ├── passwordResolver.ts       Loads *_ROLE env vars → td.password.* map
    └── logger.ts                 Winston logger (console + per-scenario file)

config/
└── mobilewright.config.ts       MobileWright runner config (ios + android projects)

resources/
├── .env                         Device env vars (ANDROID_*, IOS_*)
├── .env.STG / .env.DEV / .env.SBX   Per-environment web config (BASEURL, AUTH_TOKEN)
└── data/
    ├── smokedata.csv            Smoke — Login, critical paths
    ├── sanitydata.csv           Sanity (PRD) — all modules
    ├── e2edata.csv              E2E — full journeys
    ├── logindata.csv            Regression — Login module
    ├── <module>data.csv         Regression — one per module
    └── .env.passwords           Password map (ADMIN_ROLE=..., etc.) — not committed

docs/
├── test-suites/                 ← SINGLE SOURCE OF TRUTH for all TC documentation
│   └── login/                   Login module (42 TCs — source-backed from Flutter)
│       ├── index.md             KPI, TC table, roadmap
│       └── tc-login-001-*.md … tc-login-042-*.md
├── test-link/                   TestLink XML exports converted to Markdown (read-only archive)
│   ├── index.md
│   └── login/
│       ├── Login.testsuite.xml  Original TestLink export
│       ├── index.md             82 TCs overview
│       ├── LoginPage/           30 TCs
│       ├── Home/                27 TCs
│       ├── Profile/             21 TCs
│       └── Negative/            4 TCs
├── gap/                         Gap analysis reports (test-suites vs test-link)
│   ├── index.md
│   └── login.md                 Login gap analysis (all 12 gaps addressed)
├── add-scenario.md              Step-by-step guide to add a new scenario
├── page-object.md               Page object conventions and patterns
├── locators.md                  Locator strategy reference
├── pr-hygiene.md                PR quality checklist agent
└── test-suites-guide.md         Test suites workflow and documentation conventions
```

---

## Test Suites — Single Source of Truth

> **`docs/test-suites/`** is the **single source of truth** for all TC documentation.
> Every TC has its own `.md` file with Flutter source references, semantic labels, BLoC states,
> exact i18n strings, Gherkin templates, and automation status.
> **Always start here before writing any automation.**

### Workflow: TC Spec → Feature File → Automation

```
1. docs/test-suites/<module>/tc-<id>-<title>.md   ← Read the TC spec first
         ↓
2. features/<suite>/<module>.feature               ← Write Gherkin from the TC
         ↓
3. src/pages/<module>.page.ts                     ← Create / update page object
         ↓
4. src/steps/<module>.steps.ts                    ← Write step definitions
         ↓
5. resources/data/<module>data.csv                ← Add test data rows
         ↓
6. Update docs/test-suites/<module>/index.md      ← Mark TC 🟢 Active
         ↓
7. Update docs/test-suites/index.md               ← Update global KPI row
```

### Current Test Suite Coverage

| Module | TC Count | Automated | Status |
|---|---|---|---|
| [Login](./docs/test-suites/login/index.md) | 42 | 0 (0%) | 📋 Planned — Sprint 1 ready |

### Suite Types and Data Files

| Suite | Feature Folder | Tag | Data File | Env |
|---|---|---|---|---|
| Smoke | `features/smoke/` | `@smoke @both` | `smokedata.csv` | STG |
| Sanity | `features/sanity/` | `@sanity @both` | `sanitydata.csv` | PRD |
| Regression | `features/regression/` | `@regression @android/@ios/@both` | `<module>data.csv` | STG |
| E2E | `features/e2e/` | `@e2e @both` | `e2edata.csv` | STG |

### Feature File Tag Convention

```gherkin
# Smoke — always use @both unless platform-specific
@DataFile:resources/data/smokedata.csv @Key:login_valid @smoke @both
Scenario: Successful login

# Regression — platform-specific when needed
@DataFile:resources/data/logindata.csv @Key:login_invalid @regression @both
Scenario: Login with invalid credentials

# Sanity — PRD production smoke
@DataFile:resources/data/sanitydata.csv @Key:sanity_login @sanity @both
Scenario: Sanity login check on production
```

---

## Get Started

### Prerequisites

- Node.js ≥ 18 / npm ≥ 9
- Android: ADB installed, device/emulator connected
- iOS: Xcode + Simulator, or physical device with UDID

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure device environment
cp .env.example .env
# Edit .env with ANDROID_* / IOS_* values

# 3. Copy and configure web environment
cp resources/.env.STG.example resources/.env.STG
# Edit resources/.env.STG with BASEURL, AUTH_TOKEN, ORG_ID
```

---

## Running Tests

### BDD feature scenarios

```bash
npm run test:smoke      # @smoke — fast critical paths (STG)
npm run test:sanity     # @sanity — 25 cross-module production scenarios (PRD)
npm run test:android    # All Android scenarios
npm run test            # All scenarios (default)
```

### Device utilities

```bash
npm run device:check    # adb devices — list connected devices
npm run device:restart  # Restart ADB server
npm run app:install     # Install APK via ADB
npm run app:uninstall   # Uninstall app
npm run app:clear       # Clear app data (reset state without reinstall)
npm run inspect-ui      # Inspect UI element tree
```

### Clean artefacts

```bash
npm run clean:results
npm run clean:screenshots
npm run clean:all
```

---

## Code Quality

```bash
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier auto-fix
npm run format:check  # Prettier check only
```

Pre-commit hooks (Husky + lint-staged) automatically run `eslint --fix` and `prettier --write` on staged `.ts` files.

---

## Reports

```
allure-results/               ← Allure source (open with: allure serve allure-results/)
reports/                      ← MobileWright HTML report
test-results/reports/         ← Multiple Cucumber HTML report
test-results/logs/            ← Per-scenario Winston logs
test-results/screenshots/     ← Failure screenshots
test-results/videos/          ← Scenario recordings
```

---

## Test Data Strategy

Test data is split into **suite-scoped CSV files** — one file per suite type, and one per module for regression:

| File | Suite | Notes |
|------|-------|-------|
| `resources/data/smokedata.csv` | Smoke | Login, critical paths |
| `resources/data/sanitydata.csv` | Sanity (PRD) | All modules |
| `resources/data/e2edata.csv` | E2E | Placeholder |
| `resources/data/logindata.csv` | Regression — Login | Active |
| `resources/data/<module>data.csv` | Regression — per module | Add as needed |
| `resources/data/.env.passwords` | Passwords | Not committed to git |

> **Convention:** Always specify `@DataFile:resources/data/<file>.csv` explicitly on each scenario — never rely on the `testdata.csv` fallback.

---

## Key Design Decisions

| Decision | Detail |
|---|---|
| **`docs/test-suites/` = single source of truth** | Every TC has its own `.md` file with Flutter source refs, BLoC state names, semantic labels, exact i18n strings, and Gherkin. Implement from here. |
| **`docs/test-link/` = read-only archive** | TestLink XML exports converted to Markdown. Cross-reference only — never implement from test-link directly. |
| **`docs/gap/` = gap analysis** | Compares test-suites vs test-link coverage per module. Gaps are actioned into test-suites. |
| **ScenarioContext** | Extends Cucumber `World` — all per-scenario state (page, api, logger, test data, soft-assert) lives here. No global singletons. |
| **Lazy page cache** | Page objects created once per scenario via `ScenarioContext` getters. Never call `new XyzPage(...)` in steps. |
| **BasePage** | All page classes extend `src/pages/base.page.ts`. Provides `logInfo/logSuccess/logWarning/logFailure()` via `HTMLSubStepLogger`. |
| **Platform tags** | `@ios` / `@android` / `@both` route scenarios to the correct MobileWright project in `mobilewright.config.ts`. |
| **Flutter semantic labels** | Locators use `SemanticsLabel` widget labels (e.g. `emailTextFieldBox`, `loginButton`) — documented in each TC file. |
| **BLoC state awareness** | TC docs include the exact BLoC state class names — note several contain an intentional `Authenit` typo in the source (e.g. `AuthenitcationAuthorizedState`). |

---

## Flutter Source Reference

The Conti+ Flutter app (`CT-CONTIPLUS/ctp-contiplus-flutter-app`) renders the Conti+ web app inside a WebView (`app_web_view.dart`). All authentication flows run via native Flutter BLoC + form widgets.

| What you need | Where to look |
|---|---|
| Authentication flows | `lib/src/blocs/authentication/authentication_bloc.dart` |
| Login form / validation | `lib/src/ui/screens/forms/login_form.dart` |
| Forgot/Reset/Change password | `lib/src/ui/screens/forms/` |
| Splash / Welcome / Profile | `lib/src/ui/screens/` |
| i18n strings (English) | `lib/src/l10n/app_en.arb` |
| App flavours | `lib/flavors.dart` |

