# Conti+ Mobile QA — Test Suites Index

> Repository: `CT-CONTIPLUS/ctp-contiplus-web-qa-mobilewright-automation`  
> Framework: MobileWright + Playwright-BDD (Cucumber) | TypeScript  
> Last updated: 2026-06-15

---

## 📊 KPI Summary

| Metric | Value |
|--------|-------|
| Total Suites | 1 |
| Total Test Cases | 42 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |
| 📋 Planned | 33 |
| 🔴 Blocked (infra) | 9 |
| 🟢 Smoke TCs | 4 |
| 🟡 Regression TCs | 38 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗂️ Test Suite Registry

| Suite | Flutter Source | Test Cases | Automated | 🟢 Smoke | 🟡 Regression | Platforms | Status |
|-------|---------------|:----------:|:---------:|:--------:|:-------------:|:---------:|--------|
| [**login**](./login/index.md) | `lib/src/blocs/authentication/` + `lib/src/ui/screens/` | **42** | 0 (0%) | 4 | 38 | iOS + Android | 📋 Planned |

---

## 📁 Repository Layout

```
docs/test-suites/
├── index.md                  ← this file (master registry)
└── login/
    ├── index.md              ← suite KPI + TC table
    ├── tc-login-001-splash-screen.md
    ├── tc-login-002-welcome-screen-ui.md
    └── ...                   (tc-login-001 … tc-login-042)

features/
├── smoke/                    → @smoke @both (fast critical paths, STG)
├── sanity/                   → @sanity @both (production smoke, PRD)
├── regression/               → @regression @android|@ios|@both (full acceptance)
└── e2e/                      → @e2e @both (end-to-end journeys)

src/
├── pages/                    → Page objects (extend BasePage)
├── steps/                    → Step definitions (ScenarioContext)
└── utils/                    → ScenarioContext, Assert, CSVParser, etc.

resources/data/
├── smokedata.csv             → Smoke test data (@smoke)
├── sanitydata.csv            → Sanity test data (@sanity)
├── logindata.csv             → Login regression data
└── .env.passwords            → Password map (ROLE → password)
```

---

## 🔖 Status Legend

| Icon | Meaning |
|------|---------|
| 🟢 Active — Automated | Feature file, steps, and page object all exist and passing |
| 🔵 Active — In Progress | Being automated (`@inprogress` tag) |
| 📋 Planned | TC documented; no feature file / steps / page object yet |
| ⚠️ Failing | Automated but currently failing in CI |
| 🔴 Blocked | Cannot be automated without external infra (email OTP, device-level controls, reversible accounts) |
| 🚫 Deprecated | No longer relevant; kept for reference |
| ⚪ Not Started | Module identified; no TCs documented yet |

---

## 🏷️ Platform Tags

| Tag | Meaning |
|-----|---------|
| `@android` | Run on Android only |
| `@ios` | Run on iOS only |
| `@both` | Run on both Android and iOS |

---

## 🔗 Related Docs

| Document | Path |
|----------|------|
| Add Scenario Guide | [`docs/add-scenario.md`](../add-scenario.md) |
| Test Suites Authoring Guide | [`docs/test-suites-guide.md`](../test-suites-guide.md) |
| Gap Analysis — Login | [`docs/gap/login.md`](../gap/login.md) |
| Gap Analysis Index | [`docs/gap/index.md`](../gap/index.md) |
| TestLink Archive — Login | [`docs/test-link/login/index.md`](../test-link/login/index.md) |
