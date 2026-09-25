# Conti+ Mobile QA — Test Suites Index

> Repository: `CT-CONTIPLUS/ctp-contiplus-web-qa-mobilewright-automation`  
> Framework: MobileWright + Playwright-BDD (Cucumber) | TypeScript  
> Last updated: 2026-09-28

---

## 📊 KPI Summary

| Metric | Value |
|--------|-------|
| Total Suites | 13 |
| Total Test Cases | 469 |
| 🟢 Active — Automated | 24 (5%) |
| 🔵 In Progress | 0 |
| 📋 Planned | 436 |
| 🔴 Blocked (infra) | 9 |
| 🟢 Smoke TCs | 38 |
| 🟡 Regression TCs | 415 |
| 🟣 E2E TCs | 16 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗂️ Test Suite Registry

| Suite | Flutter Source | Test Cases | Automated | 🟢 Smoke | 🟡 Regression | 🟣 E2E | Platforms | Status |
|-------|---------------|:----------:|:---------:|:--------:|:-------------:|:------:|:---------:|--------|
| [**login**](./login/index.md) | `lib/src/blocs/authentication/` + `lib/src/ui/screens/` | **43** | 24 (56%) | 4 | 38 | 1 | iOS + Android | 🔵 In Progress |
| [**dashboard**](./dashboard/index.md) | `lib/src/ui/screens/home/` + `lib/src/ui/app.dart` + `lib/src/ui/app/conti_app_bar.dart` | **46** | 0 (0%) | 4 | 41 | 1 | iOS + Android | 📋 Planned |
| [**conveyors**](./conveyors/index.md) | `lib/src/ui/screens/conveyors/` + `lib/src/blocs/conveyor/` | **36** | 0 (0%) | 2 | 32 | 2 | iOS + Android | 📋 Planned |
| [**sites**](./sites/index.md) | `lib/src/ui/screens/companies/` + `lib/src/blocs/company/` | **41** | 0 (0%) | 3 | 36 | 2 | iOS + Android | 📋 Planned |
| [**inspections**](./inspections/index.md) | `lib/src/ui/screens/inspections/` + `lib/src/blocs/inspection/` | **40** | 0 (0%) | 3 | 35 | 2 | iOS + Android | 📋 Planned |
| [**conveyor-inspect**](./conveyor-inspect/index.md) | `lib/src/ui/screens/conveyor_inspect/` + `lib/src/blocs/conveyor_inspect/` | **31** | 0 (0%) | 3 | 27 | 1 | iOS + Android | 📋 Planned |
| [**belt-scans**](./belt-scans/index.md) | `lib/src/ui/screens/belt_scan/` + `lib/src/blocs/belt_scan/` | **36** | 0 (0%) | 3 | 32 | 1 | iOS + Android | 📋 Planned |
| [**monitoring-devices**](./monitoring-devices/index.md) | `lib/src/ui/screens/monitoring_device/` + `lib/src/blocs/monitoring_device/` | **37** | 0 (0%) | 3 | 33 | 1 | iOS + Android | 📋 Planned |
| [**field-service**](./field-service/index.md) | `lib/src/ui/screens/field_service/` + `lib/src/blocs/field_service/` | **43** | 0 (0%) | 3 | 39 | 1 | iOS + Android | 📋 Planned |
| [**heavy-equipment**](./heavy-equipment/index.md) | `lib/src/ui/screens/heavy_equipment/` + `lib/src/blocs/heavy_equipment/` | **29** | 0 (0%) | 2 | 26 | 1 | iOS + Android | 📋 Planned |
| [**minuteman-calculation**](./minuteman-calculation/index.md) | `lib/src/ui/screens/minuteman/` + `lib/src/blocs/minuteman/` | **35** | 0 (0%) | 2 | 32 | 1 | iOS + Android | 📋 Planned |
| [**cover-wear**](./cover-wear/index.md) | `lib/src/features/coverwear/` | **39** | 0 (0%) | 3 | 35 | 1 | iOS + Android | 📋 Planned |
| [**profile**](./profile/index.md) | `lib/src/ui/screens/profile/` + `lib/src/blocs/user/` | **13** | 0 (0%) | 3 | 9 | 1 | iOS + Android | 📋 Planned |

---

## 📁 Repository Layout

```
docs/test-suites/
├── index.md                  ← this file (master registry)
├── login/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-login-001-splash-screen.md
│   ├── tc-login-002-welcome-screen-ui.md
│   └── ...                   (tc-login-001 … tc-login-043)
├── dashboard/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-dashboard-001-dashboard-loads-with-permitted-cards.md
│   ├── tc-dashboard-002-card-visibility-permission-based.md
│   └── ...                   (tc-dashboard-001 … tc-dashboard-046)
├── conveyors/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-conveyors-001-list-loads-with-permitted-view.md
│   ├── tc-conveyors-002-add-conveyor-happy-path.md
│   └── ...                   (tc-conveyors-001 … tc-conveyors-036)
├── sites/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-sites-001-sites-list-loads-with-permitted-view.md
│   ├── tc-sites-002-add-customer-site-happy-path.md
│   └── ...                   (tc-sites-001 … tc-sites-041)
├── inspections/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-inspections-001-inspection-list-loads-with-permitted-view.md
│   ├── tc-inspections-002-create-inspection-event-happy-path.md
│   └── ...                   (tc-inspections-001 … tc-inspections-040)
├── conveyor-inspect/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-conveyor-inspect-001-list-loads-with-permitted-view.md
│   ├── tc-conveyor-inspect-002-create-thermal-inspection-event.md
│   └── ...                   (tc-conveyor-inspect-001 … tc-conveyor-inspect-031)
├── belt-scans/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-belt-scans-001-list-loads-with-permitted-view.md
│   ├── tc-belt-scans-002-open-and-preview-pdf-report.md
│   └── ...                   (tc-belt-scans-001 … tc-belt-scans-036)
├── monitoring-devices/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-monitoring-devices-001-list-loads-with-permitted-view.md
│   ├── tc-monitoring-devices-002-add-monitoring-device-flow.md
│   └── ...                   (tc-monitoring-devices-001 … tc-monitoring-devices-037)
├── field-service/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-field-service-001-list-loads-with-permitted-view.md
│   ├── tc-field-service-002-create-form-modal-type-selection.md
│   └── ...                   (tc-field-service-001 … tc-field-service-043)
├── heavy-equipment/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-heavy-equipment-001-list-loads-with-permitted-view.md
│   ├── tc-heavy-equipment-002-details-screen-and-header-card.md
│   └── ...                   (tc-heavy-equipment-001 … tc-heavy-equipment-029)
├── minuteman-calculation/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-minuteman-calculation-001-list-loads-with-permitted-view.md
│   ├── tc-minuteman-calculation-002-open-and-preview-pdf-report.md
│   └── ...                   (tc-minuteman-calculation-001 … tc-minuteman-calculation-035)
├── cover-wear/
│   ├── index.md              ← suite KPI + TC table
│   ├── tc-cover-wear-001-list-loads-with-permitted-view.md
│   ├── tc-cover-wear-002-add-cover-wear-event-happy-path.md
│   └── ...                   (tc-cover-wear-001 … tc-cover-wear-039)
└── profile/
    ├── index.md              ← suite KPI + TC table
    ├── tc-profile-001-profile-screen-layout-and-header.md
    ├── tc-profile-002-profile-information-screen-fields.md
    └── ...                   (tc-profile-001 … tc-profile-013)

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
