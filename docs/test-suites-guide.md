# Test Suites — Workflow Guide

> `docs/test-suites/` is the **single source of truth** for all test case documentation in this project.
> This guide explains the folder structure, conventions, and how test cases flow from documentation to automation.

---

## What is `docs/test-suites/`?

`docs/test-suites/` is the **primary reference** for every test case in the Conti+ mobile automation project. Before writing a feature file or page object, **always read the TC spec here first**.

Each module has its own subfolder containing:
- An `index.md` with KPI summary, TC registry, automation roadmap, and status
- One `.md` file per test case with: objective, preconditions, test steps, Flutter source references, BLoC state names, semantic labels, i18n strings, suggested Gherkin, and links to related TCs

```
docs/test-suites/
└── login/                       ← Login module (42 TCs — source-backed from Flutter)
    ├── index.md                 KPI, TC table, roadmap, artefact paths
    ├── tc-login-001-*.md        Splash screen
    ├── tc-login-002-*.md        Welcome screen UI
    ├── tc-login-003-*.md        Continental Account button
    ├── ...                      (42 TC files total)
    └── tc-login-042-*.md        Account activation flow
```

---

## What is `docs/test-link/`?

`docs/test-link/` contains **TestLink XML exports converted to Markdown**. These are read-only historical archives used for cross-referencing original TC IDs. Do **not** implement automation from test-link files — always implement from `docs/test-suites/`.

```
docs/test-link/
├── index.md
└── login/
    ├── Login.testsuite.xml      ← Original TestLink XML (kept as archive)
    ├── index.md                 ← 82 TCs, 4 sub-suites
    ├── LoginPage/               ← 30 TCs (auth-related)
    ├── Home/                    ← 27 TCs (NOTE: misplaced — belongs in Home module)
    ├── Profile/                 ← 21 TCs (6 auth-adjacent; 15 belong in Profile module)
    └── Negative/                ← 4 TCs (device/network edge cases)
```

---

## What is `docs/gap/`?

`docs/gap/` contains gap analysis reports that compare `docs/test-suites/` coverage against `docs/test-link/` exports and the Flutter codebase. Each gap is actioned into a new TC in `docs/test-suites/` and marked addressed in the gap file.

```
docs/gap/
├── index.md         ← Master gap registry
└── login.md         ← Login gap analysis (12 gaps — all addressed)
```

---

## Workflow: Test Suites → Feature Files → Automation

```
1. docs/test-suites/<module>/tc-<id>-<title>.md    ← Read THE SPEC first
         ↓
2. features/<suite>/<module>.feature                ← Gherkin from TC spec
         ↓
3. src/pages/<module>.page.ts                      ← Page object with semantic locators
         ↓
4. src/steps/<module>.steps.ts                     ← Step definitions
         ↓
5. resources/data/<module>data.csv                 ← Test data rows
         ↓
6. Update docs/test-suites/<module>/index.md       ← Mark TC 🟢 Active — KPI update
```

---

## Suite Types and Data Files

| Suite | Feature Folder | Tags | npm script | Data File | Environment |
|---|---|---|---|---|---|
| Smoke | `features/smoke/` | `@smoke @both` | `test:smoke` | `smokedata.csv` | STG |
| Sanity | `features/sanity/` | `@sanity @both` | `test:sanity` | `sanitydata.csv` | PRD |
| Regression | `features/regression/` | `@regression @both/@android/@ios` | *(manual)* | `<module>data.csv` | STG |
| E2E | `features/e2e/` | `@e2e @both` | *(manual)* | `e2edata.csv` | STG |

---

## TC File Anatomy

Each TC file follows this structure:

```markdown
# TC-<ID> — <Title>

> Suite: [Module](./index.md) | Priority: Critical/High/Medium/Low | Status: 📋 Planned

## 📋 Metadata
| ID | Suite | Priority | Type | Tags | Data Key | Feature File | Page Objects | Status | Platform |

## 🎯 Objective
What the scenario must prove.

## ✅ Preconditions
What must be true before the test starts.

## 🔢 Test Steps
| # | Action | Expected Result |

## 🏁 Expected Results
Summarised pass criteria.

## 🔍 Flutter Source Reference
Exact file, class, code snippet, and semantic labels.

## 📝 Suggested Gherkin
Copy-paste ready scenario with @DataFile, @Key, and platform tags.

## 🔗 Related
Links to related TCs.
```

---

## TC Status Values

| Status | Meaning |
|--------|---------|
| `📋 Planned` | TC documented; no feature file / steps / page object yet |
| `🟢 Active — Automated` | Feature file, steps, and page object all exist and passing |
| `🔵 Active — In Progress` | Being automated (tagged `@inprogress`) |
| `⚠️ Failing` | Automated but currently failing in CI |
| `🚫 Deprecated` | No longer relevant; kept for reference |
| `🔴 Blocked` | Cannot be automated without external infra (email inbox, reversible account, device-level toggle) |

---

## KPI Update Rule

> **Any time a TC status changes, you MUST update:**
> 1. The TC file's Status field
> 2. `docs/test-suites/<module>/index.md` — KPI block and status table
> 3. `docs/gap/<module>.md` — if the TC addresses a gap, mark it `✅ ADDRESSED`

**KPI fields to update after automation:**
```markdown
| Automated | X (Y%) |   ← increment X, recalculate Y%
| 📋 Planned | Z |       ← decrement Z
```

---

## Flutter Semantic Labels — How to Find Locators

Locators for the Conti+ mobile app use Flutter's `SemanticsLabel` widget, not CSS selectors. Find them by searching the Flutter source:

```
repo:CT-CONTIPLUS/ctp-contiplus-flutter-app SemanticsLabel
```

Or look in each TC file's **Flutter Source Reference** section — all known labels are documented there.

**Login module semantic labels:**

| Label | Widget | Screen |
|---|---|---|
| `conti+Logo` | Conti+ logo image | Welcome / Login |
| `welcomeText` | "Welcome!" heading | Welcome / Login |
| `loginWithText` | "Login with:" text | Welcome |
| `continentalAccountButton` | Continental Account button | Welcome |
| `loginGuestButton` | Continue as Guest button | Welcome |
| `emailTextFieldBox` | Email input field | Login |
| `passwordTextFieldBox` | Password input field | Login |
| `loginButton` | Login submit button | Login |
| `forgotPasswordText` | Forgot password link | Login |

---

## Adding a New Module to docs/test-suites/

When documenting a new module:

1. Create `docs/test-suites/<module>/`
2. Create `docs/test-suites/<module>/index.md` — use `docs/test-suites/login/index.md` as a template
3. For each TC create `tc-<module>-<nnn>-<slug>.md` — use any login TC as a template
4. Research the Flutter source in `CT-CONTIPLUS/ctp-contiplus-flutter-app`
5. Run gap analysis against `docs/test-link/<module>/` if a TestLink export exists — document in `docs/gap/<module>.md`
