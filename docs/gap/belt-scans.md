# Gap Analysis — Belt Scans Test Coverage

> **Scope:** Belt Scans module (`BeltScanListScreen`, `BeltScanFilterModal`, `FilePreviewScreen`, `BeltScanListBloc`) — Conti+ Mobile (MobileWright automation)  
> **Sources compared:**  
> - `docs/test-suites/belt-scans/` — Flutter source-derived automation-ready TC documentation (36 TCs)  
> - `docs/test-link/belt-scans/` — TestLink export (`BeltScan.doc`, 17 TCs)  
> - Flutter codebase (`lib/src/ui/screens/belt_scan/`, `lib/src/blocs/belt_scan/`, `lib/src/models/belt_scan/`)  
> **Analysis date:** 2026-09-23  
> **Author:** Copilot QA Analysis Agent

---

## 📊 Executive Summary

| Metric | test-suites/belt-scans | test-link/belt-scans |
|---|---|---|
| Total TCs | 36 | 17 |
| TCs strictly in scope for Belt Scans | 36 (100%) | 17 (100%) |
| Misplaced / Out-of-scope TCs | 0 | 0 |
| Automation-ready (Gherkin + Semantic Labels + Data Keys) | 36 (100%) | 0 (0%) |
| Flutter source references & BLoC state coverage | ✅ All 36 | ❌ None |
| Suite types represented | Smoke (3), Regression (32), E2E (1) | Manual (17) |
| Device form-factor coverage (Phone vs Tablet) | ✅ Both (Mobile vs Tablet row layout) | ❌ Unspecified |
| Platform coverage | iOS + Android (`@both`) | Not specified |
| **Overall quality rating** | ⭐⭐⭐⭐⭐ High (Production-grade) | ⭐⭐⭐ Medium (Historical / Functional) |

**Verdict:** `test-suites/belt-scans/` has **substantially higher coverage depth, structural clarity, and automation readiness** than `test-link/belt-scans/`. Every single test case from `test-link/` is fully covered and expanded into granular, deterministic test cases in `test-suites/belt-scans/`. In addition, `test-suites/` covers critical technical edge cases (offline cache hydration, periodic timer sync, PDF streaming authentication, opacity states, null fallbacks, and multi-select filtering) that are absent from `test-link/`.

---

## 1. Quality & Coverage Assessment: Which Folder Has High Coverage?

### 1.1 `docs/test-suites/belt-scans/` — Rating: ⭐⭐⭐⭐⭐ (HIGH COVERAGE)

`test-suites/belt-scans/` provides complete, architecture-aligned test coverage:

1. **Granular Separation of Concerns:** Instead of bundling multiple validations into a single monolithic test (e.g., CTCP-4519 in TestLink bundles sorting, site filtering, conveyor cascading, device type filtering, and clear filters into 14 steps), `test-suites/` separates each into isolated, maintainable test cases (TC-019 through TC-029).
2. **Architecture & BLoC Coverage:** Directly tests `BeltScanListBloc` events and states:
   - `BeltScanListLoadEvent` (Hydrating cache, relation mapping, streaming updates)
   - `BeltScanListSearchEvent` (Site name keyword filtering)
   - `BeltScanListFilterEvent` (Multi-criteria combinations and sorting modes)
   - `BeltScanListTimerEvent` (Background periodic polling auto-refresh)
3. **UI & Viewport Adaptability:**
   - **Mobile Layout:** Single-column card row presentation (`TC-BELT-SCANS-014`).
   - **Tablet Layout:** Multi-column grid row presentation (`TC-BELT-SCANS-015`).
4. **PDF & Document Handling:** Authenticated HTTP streaming preview (`TC-030`), local download storage with system notifications (`TC-031`), and PDF report icon opacity based on file availability (`TC-016`).
5. **Resilience & Offline Handling:** Offline working banner & local Hive cache hydration (`TC-033`), network API error fallback (`TC-034`), and manual sync confirmation dialogs (`TC-012`).
6. **Role-Based Access Control (RBAC):** Tests permissions for `BasicModule.beltScan` / `Permission.view` and `Permission.download` across Free, Customer, Distributor, and Market Manager user roles (`TC-004`, `TC-007`, `TC-032`).
7. **End-to-End User Lifecycle:** `TC-BELT-SCANS-036` covers an end-to-end diagnostic workflow: opening list from Home card, filtering by severity/device, previewing PDF report, and downloading.

---

### 1.2 `docs/test-link/belt-scans/` — Rating: ⭐⭐⭐ (MEDIUM, HIGH-LEVEL MANUAL)

`test-link/belt-scans/` (17 TCs) contains good functional user journey descriptions but has significant automation limitations:

1. **Monolithic Multi-Step TCs:** Several test cases attempt to test 5+ features simultaneously. For example, `CTCP-4519` mixes Home-level list, Conveyor-level list, sorting (3 modes), site filter, conveyor filter, device type filter, and clear filter all in one test case.
2. **Lack of UI Locators & Semantics:** Does not specify Flutter widget names (`BeltScanListScreen`, `BeltScanFilterModal`), semantic labels (`beltScanCard`, `pdfIcon`), or data keys.
3. **Missing System & Edge Case Validations:** Completely omits offline cache persistence, timer-based background auto-refresh, PDF opacity handling for unavailable reports, date formatting null-safety (`-` fallback), and search bar dismiss behaviors.

---

## 2. Detailed Functional Area Coverage Matrix

| Functional Area | `test-suites/belt-scans` | `test-link/belt-scans` | Status & Coverage Gap |
|---|:---:|:---:|---|
| **Belt Scans List Page Load** | TC-001 (Smoke) | CTCP-4509, CTCP-4510 | ✅ Adequate in test-suites |
| **PDF Report Preview** | TC-002 (Smoke), TC-030 | CTCP-4510 | ✅ Adequate in test-suites |
| **Navigation from Home Card** | TC-003 (Smoke), TC-005 | CTCP-4506, CTCP-4515 | ✅ Adequate in test-suites |
| **Navigation from Conveyor Card** | TC-003 (Smoke), TC-006 | CTCP-4516 | ✅ Adequate in test-suites |
| **E2E Cord Damage Lifecycle** | TC-036 (E2E) | ❌ Missing as formal E2E | ✅ Adequate in test-suites |
| **View Permission Gating** | TC-004 | CTCP-4507 | ✅ Adequate in test-suites |
| **Download Permission Gating** | TC-004, TC-032 | CTCP-4508 | ✅ Adequate in test-suites |
| **User Roles (Customer/Distributor/MM)** | TC-004, TC-007 | CTCP-4512, 4513, 4514 | ✅ Adequate in test-suites |
| **Free User Account Restrictions** | TC-007 | ❌ Missing | ✅ Adequate in test-suites |
| **Search by Site Name** | TC-008 | CTCP-4536 | ✅ Adequate in test-suites |
| **Search Clear and Dismiss** | TC-009 | ❌ Missing | ✅ Adequate in test-suites |
| **Empty State Handling** | TC-010 | ❌ Missing | ✅ Adequate in test-suites |
| **Pull to Refresh** | TC-011 | CTCP-4520 (partial) | ✅ Adequate in test-suites |
| **Manual Sync Confirmation Dialog** | TC-012 | CTCP-4520 (partial) | ✅ Adequate in test-suites |
| **Last Updated Time & Count Widget** | TC-013 | ❌ Missing | ✅ Adequate in test-suites |
| **Mobile vs Tablet Row Layout** | TC-014, TC-015 | ❌ Missing | ✅ Adequate in test-suites |
| **PDF Icon Opacity / Availability** | TC-016 | ❌ Missing | ✅ Adequate in test-suites |
| **Device Types Display (CordProtect/MultiProtect/etc.)** | TC-017 | ❌ Missing | ✅ Adequate in test-suites |
| **Date Formatting & Null Fallbacks** | TC-018 | ❌ Missing | ✅ Adequate in test-suites |
| **Filter Modal & Dynamic Counter** | TC-019 | CTCP-4519 (partial) | ✅ Adequate in test-suites |
| **Sort by Last Modified** | TC-020 | CTCP-4519 (partial) | ✅ Adequate in test-suites |
| **Sort A to Z / Z to A** | TC-021, TC-022 | CTCP-4519 (partial) | ✅ Adequate in test-suites |
| **Filter by Site Multi-Select** | TC-023 | CTCP-4519 (partial) | ✅ Adequate in test-suites |
| **Filter by Conveyor Cascading Multi-Select** | TC-024 | CTCP-4519 (partial) | ✅ Adequate in test-suites |
| **Filter by Device Type Multi-Select** | TC-025 | CTCP-4519 (partial) | ✅ Adequate in test-suites |
| **Combined Multi-Criteria Filter** | TC-026 | CTCP-4519 (partial) | ✅ Adequate in test-suites |
| **Filter Active Red Dot Indicator** | TC-027 | ❌ Missing | ✅ Adequate in test-suites |
| **Clear Filters Action** | TC-028 | CTCP-4519 (partial) | ✅ Adequate in test-suites |
| **Pre-Supplied Conveyor Filter Mode** | TC-029 | CTCP-4519 (partial) | ✅ Adequate in test-suites |
| **Download PDF Report + Notification** | TC-031 | CTCP-4511 | ✅ Adequate in test-suites |
| **Offline Cache Hydration & Working Banner** | TC-033 | ❌ Missing | ✅ Adequate in test-suites |
| **Network Error Logging & Fallback** | TC-034 | ❌ Missing | ✅ Adequate in test-suites |
| **Periodic Background Auto-Refresh** | TC-035 | ❌ Missing | ✅ Adequate in test-suites |
| **Web Sync Reflection (Add/Edit on Web)** | TC-005, TC-006, TC-012 | CTCP-4517, 4518, 4521 | ✅ Adequate in test-suites |

---

## 3. Reconciliation of TestLink `belt-scans/` Test Cases

| TestLink TC | Title | Coverage in `test-suites/belt-scans/` |
|---|---|---|
| **CTCP-4506** | Verify User is able to View "Belt Scan" Card | `TC-BELT-SCANS-003`, `TC-BELT-SCANS-005` (Home level card & counter) |
| **CTCP-4507** | Verify Belt Scan Card hidden without view permission | `TC-BELT-SCANS-004` (Permission gating `BELT-INSPECTION-DEVICES`) |
| **CTCP-4508** | Verify download option hidden without download permission | `TC-BELT-SCANS-004`, `TC-BELT-SCANS-032` (Download permission gating) |
| **CTCP-4509** | Verify User is able to View Belt Scan list view | `TC-BELT-SCANS-001`, `TC-BELT-SCANS-014` (List load & mobile row layout) |
| **CTCP-4510** | Verify user View Belt Scan | `TC-BELT-SCANS-002`, `TC-BELT-SCANS-030` (Open & authenticated PDF stream) |
| **CTCP-4511** | Verify user Download Belt Scan pdf | `TC-BELT-SCANS-031` (Download PDF report with notification) |
| **CTCP-4512** | Verify view and download for Customer user | `TC-BELT-SCANS-004` (Role permission verification for Customer user) |
| **CTCP-4513** | Verify view and download for Distributor user | `TC-BELT-SCANS-004` (Role permission verification for Distributor user) |
| **CTCP-4514** | Verify view and download for Market Manager user | `TC-BELT-SCANS-004` (Role permission verification for MM user) |
| **CTCP-4515** | Verify Home level Belt Scan updated | `TC-BELT-SCANS-005`, `TC-BELT-SCANS-011`, `TC-BELT-SCANS-012` |
| **CTCP-4516** | Verify Conveyor level Belt Scan updated | `TC-BELT-SCANS-006` (Conveyor card auto-filter & sync) |
| **CTCP-4517** | Verify Home & Conveyor level updated when added in Site level from web | `TC-BELT-SCANS-005`, `TC-BELT-SCANS-006`, `TC-BELT-SCANS-012` |
| **CTCP-4518** | Verify Home & Conveyor level updated when added in Corporate level from web | `TC-BELT-SCANS-005`, `TC-BELT-SCANS-006`, `TC-BELT-SCANS-012` |
| **CTCP-4519** | Verify Filter functionality by site and conveyor | `TC-BELT-SCANS-019` to `TC-BELT-SCANS-029` (11 dedicated filter/sort TCs) |
| **CTCP-4520** | Verify hard refresh and pull to refresh functionality | `TC-BELT-SCANS-011` (Pull to refresh), `TC-BELT-SCANS-012` (Manual sync) |
| **CTCP-4521** | Verify Edit functionality from web is reflected in mobile | `TC-BELT-SCANS-011`, `TC-BELT-SCANS-012`, `TC-BELT-SCANS-030` |
| **CTCP-4536** | Verify search functionality for Belt scan from header | `TC-BELT-SCANS-008`, `TC-BELT-SCANS-009` (Search by site & clear/dismiss) |

---

## 4. Are Current Tests Adequate Enough for Good Coverage?

### Findings & Verdict: **YES — Comprehensive & Production-Ready**

The test cases in `docs/test-suites/belt-scans/` (36 TCs) provide **complete, high-coverage, and deterministic test specifications**:

1. **100% Reconciliation of TestLink:** All 17 TestLink test cases have been cleanly ingested, resolved, and expanded into distinct single-responsibility test cases.
2. **Full Technical Resilience Coverage:** Offline Hive local caching, working offline banners, background periodic timers, network API errors, and authenticated document streams are rigorously specified.
3. **Granular Multi-Filter Matrix:** Filter modal layout, result counter, sort options (Last Modified, A-Z, Z-A), multi-select site/conveyor/device-type filtering, active red dot indicator, clear filters, and pre-supplied conveyor mode are covered individually.
4. **Platform & Form Factor Readiness:** Mobile viewport single-column vs Tablet multi-column layouts, iOS & Android platform tags (`@both`), and test data keys are defined for all scenarios.

### Recommendations for Automation Implementation
- **Page Object Design (`src/pages/belt-scans.page.ts`):** Ensure locators encapsulate the `BeltScanListScreen`, `BeltScanFilterModal`, `FilePreviewScreen`, and dynamic row items with proper partial matching for Android accessibility nodes.
- **PDF File Preview Handling:** For native/WebView PDF rendering, verify download via Playwright download event interception (`page.waitForEvent('download')`) or API stream verification.

---

*Gap analysis completed. Master index `docs/gap/index.md` updated.*
