# Gap Analysis — Minuteman Calculation Test Coverage

> **Scope:** Minuteman Calculation module (`MinutemanListScreen`, `MinutemanFilterModal`, `FilePreviewScreen`, `MinutemanListBloc`, `FileDownloadCubit`) — Conti+ Mobile (MobileWright automation)  
> **Sources compared:**  
> - `docs/test-suites/minuteman-calculation/` — Flutter source-derived automation-ready TC documentation (35 TCs)  
> - `docs/test-link/minuteman/` — TestLink export (`minuteman.doc`, 18 unique TCs)  
> - Flutter codebase (`lib/src/ui/screens/minuteman/`, `lib/src/blocs/minuteman/`, `lib/src/models/minuteman/`)  
> **Analysis date:** 2026-09-23  
> **Author:** Copilot QA Analysis Agent

---

## 📊 Executive Summary

| Metric | test-suites/minuteman-calculation | test-link/minuteman (minuteman.doc) |
|---|---|---|
| Total TCs | 35 | 18 |
| TCs strictly in scope for Minuteman | 35 (100%) | 18 (100%) |
| Misplaced / Out-of-scope TCs | 0 | 0 |
| Automation-ready (Gherkin + Semantic Labels + Data Keys) | 35 (100%) | 0 (0%) |
| Flutter source references & BLoC state coverage | ✅ All 35 | ❌ None |
| Suite types represented | Smoke (2), Regression (32), E2E (1) | Manual (18) |
| Device form-factor coverage (Phone vs Tablet) | ✅ Both (Phone stacked vs Tablet tabular layout) | ❌ Unspecified |
| Dual Permission Engine (`MINUTEMAN-CONVEYOR` & `MINUTEMAN-ELEVATOR`) | ✅ Explicitly covered across all combinations | ⚠️ Partial (coarse single tests) |
| Platform coverage | iOS + Android (`@both`) | Not specified |
| **Overall quality rating** | ⭐⭐⭐⭐⭐ High (Production-grade) | ⭐⭐⭐ Medium (Historical / Functional) |

**Verdict:** `test-suites/minuteman-calculation/` exhibits **significantly higher coverage depth, architectural alignment, and automation readiness** compared to `test-link/minuteman/`. All 18 TestLink test cases are completely accounted for and refined into 35 granular, deterministic, and modular test cases. In addition, `test-suites/` covers critical mobile architecture features (dual-permission filtering between Conveyor vs Elevator calculations, type-specific SVG icon rendering, dynamic site/conveyor name resolution, Hive local cache hydration, background timer polling, and cascading conveyor deletion listeners) that are entirely absent from `test-link/`.

---

## 1. Quality & Coverage Assessment: Which Folder Has High Coverage?

### 1.1 `docs/test-suites/minuteman-calculation/` — Rating: ⭐⭐⭐⭐⭐ (HIGH COVERAGE)

`test-suites/minuteman-calculation/` provides complete, production-ready test specifications derived directly from the Flutter application source code:

1. **Dual Permission Engine & Scoping:** Minuteman calculations are split into two distinct modules in Conti+ (`BasicModule.minutemanConveyor` and `BasicModule.minutemanElevator`). `test-suites/` comprehensively covers all matrix permutations (`TC-004`, `TC-005`):
   - User with both permissions views all records.
   - User with only conveyor permission views only conveyor calculations.
   - User with only elevator permission views only elevator calculations.
   - Download permissions are verified per calculation type (`TC-005`, `TC-030`).
2. **Architecture & BLoC Event Coverage:** Directly exercises `MinutemanListBloc` states and events:
   - `MinutemanListLoadEvent` (Immediate local Hive cache emission from `minutemansList` box followed by network API sync).
   - `MinuteManSearchEvent` (In-memory real-time search matching `element.name`).
   - `MinutemanListFilterEvent` (Multi-criteria combinations and sorting modes).
   - `MinuteManTimerEvent` (Periodic background polling sync).
   - Conveyor stream listener (`conveyorBloc.stream.listen` auto-reloading minuteman list on `ConveyorDeleteSuccessState` in `TC-032`).
3. **Responsive UI & Viewports:**
   - **Phone Layout:** Stacked layout with calculation name, site name, conveyor name, creator name, and creation date (`TC-012`).
   - **Tablet Layout:** Multi-column tabular grid with type SVG icon, name, site, conveyor, created by, created date, and row selection highlight (`TC-013`).
4. **Visual Asset & Type Indicators:**
   - Elevator calculations display `assets/svg/minuteman_elevator.svg` (`TC-014`).
   - Conveyor calculations display `assets/svg/minuteman_conveyor.svg` (`TC-014`).
5. **Entity Name Resolution & Null Safety:** Dynamic lookup of site names via `CompanyDataCubit.state.siteList` and conveyor names via `ConveyorDataCubit.state.conveyorFullList` with graceful fallback for unassigned or deleted entities (`TC-015`, `TC-016`).
6. **PDF Streaming & Download Engine:**
   - Authenticated PDF report preview using `FileDownloadCubit` and `pdfrx` (`TC-002`, `TC-029`).
   - Download action with system notification / snackbar verification (`TC-030`).
7. **Offline Resilience & Error Handling:**
   - Hive local cache hydration with "Working Offline" status banner (`TC-031`).
   - Manual sync confirmation dialog (`TC-027`).
   - Network API error resilience and logging (`TC-033`).
8. **End-to-End User Lifecycle:** `TC-MINUTEMAN-035` covers a complete engineering audit: navigating from Dashboard, searching and filtering calculations, opening technical PDF calculation sheets, and exporting reports.

---

### 1.2 `docs/test-link/minuteman/` — Rating: ⭐⭐⭐ (MEDIUM, HIGH-LEVEL MANUAL)

`test-link/minuteman/` contains 18 historical manual test cases that capture the basic user workflows but have significant automation limitations:

1. **Monolithic & Coarse Steps:** Test cases combine multiple features into single scenarios (e.g., `CTCP-4136` bundles site filter, conveyor filter, 3 sort modes, and clear filters into a single test case).
2. **Missing Locators & Semantics:** Does not specify semantic labels (`minutemanCard`, `searchField`, `filterButton`), Flutter widgets (`MinutemanListScreen`, `MinutemanFilterModal`, `FilePreviewScreen`), or BLoC state assertions.
3. **Omission of Complex Mobile Logic:**
   - Completely misses dual-permission scoping (Conveyor-only vs Elevator-only permission segregation).
   - Misses Free user account restrictions (AppBar action suppression).
   - Misses tablet multi-column layout rendering.
   - Misses dynamic entity name resolution from cubits and conveyor deletion cascade events.
   - Misses periodic background auto-refresh timers.

---

## 2. Detailed Functional Area Coverage Matrix

| Functional Area | `test-suites/minuteman-calculation` | `test-link/minuteman` | Status & Coverage Gap |
|---|:---:|:---:|---|
| **Minuteman List Load & Layout** | TC-001 (Smoke), TC-012, TC-013 | CTCP-4121, CTCP-4124 | ✅ Adequate in test-suites |
| **PDF Report Preview** | TC-002 (Smoke), TC-029 | CTCP-4125, CTCP-4126 | ✅ Adequate in test-suites |
| **Navigation from Dashboard & Conveyor Info** | TC-003, TC-006, TC-007 | CTCP-4121, CTCP-4132, 4133 | ✅ Adequate in test-suites |
| **Dual Permission Gating (Conveyor vs Elevator)** | TC-004 | CTCP-4122 (partial) | ✅ Adequate in test-suites |
| **Download Permission Gating** | TC-005, TC-030 | CTCP-4123, 4127, 4128 | ✅ Adequate in test-suites |
| **User Roles (Customer, Distributor, Market Manager)** | TC-004, TC-005 | CTCP-4129, 4130, 4131 | ✅ Adequate in test-suites |
| **Free User Mode (Action Suppression)** | TC-008 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Search by Calculation Name** | TC-009 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Search Clear & Dismiss** | TC-010 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Empty State Handling** | TC-011 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Phone Viewport Layout Presentation** | TC-012 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Tablet Viewport Tabular Presentation** | TC-013 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Type-Specific SVG Icons (Elevator vs Conveyor)** | TC-014 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Site & Conveyor Dynamic Name Resolution** | TC-015 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Created By & Date Formatting** | TC-016 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Filter Modal & Real-Time Count** | TC-017 | CTCP-4136 (partial) | ✅ Adequate in test-suites |
| **Sort by Last Modified Date** | TC-018 | CTCP-4136 (partial) | ✅ Adequate in test-suites |
| **Sort Alphabetical (A-Z / Z-A)** | TC-019, TC-020 | CTCP-4136 (partial) | ✅ Adequate in test-suites |
| **Filter by Site Multi-Select** | TC-021 | CTCP-4136 (partial) | ✅ Adequate in test-suites |
| **Filter by Conveyor Cascading Multi-Select** | TC-022 | CTCP-4136 (partial) | ✅ Adequate in test-suites |
| **Combined Multi-Criteria Filter** | TC-023 | CTCP-4136 (partial) | ✅ Adequate in test-suites |
| **Active Filter Red Dot Indicator** | TC-024 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Clear Filters Action** | TC-025 | CTCP-4136 (partial) | ✅ Adequate in test-suites |
| **Pull to Refresh Reload** | TC-026 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Manual Sync Confirmation Dialog** | TC-027 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Last Updated Timestamp & Total Count Widget** | TC-028 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Download PDF Report + Notification** | TC-030 | CTCP-4127, 4128 | ✅ Adequate in test-suites |
| **Offline Mode Cached Calculations & Working Banner**| TC-031 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Conveyor Deletion Cascade Stream Listener** | TC-032 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Network API Error Handling & Fallback** | TC-033 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Periodic Background Timer Auto-Refresh** | TC-034 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **E2E Engineering Calculation Workflow** | TC-035 (E2E) | ❌ Missing as formal E2E | ✅ Adequate in test-suites |
| **Web Sync Reflection (Add/Edit from Web)** | TC-006, TC-007, TC-026, TC-027 | CTCP-4134, 4135, 4137, 4138 | ✅ Adequate in test-suites |

---

## 3. Reconciliation of TestLink `minuteman/` Test Cases

| TestLink TC | Title | Coverage in `test-suites/minuteman-calculation/` |
|---|---|---|
| **CTCP-4121** | Verify User is able to View "Minuteman Calc." Card | `TC-MINUTEMAN-003`, `TC-MINUTEMAN-006` (Home navigation & card counter) |
| **CTCP-4122** | Verify Card not displayed when view permission not given | `TC-MINUTEMAN-004` (Permission gating `MINUTEMAN-CONVEYOR` & `MINUTEMAN-ELEVATOR`) |
| **CTCP-4123** | Verify download option hidden when download permission not given | `TC-MINUTEMAN-005`, `TC-MINUTEMAN-030` (Download permission gating) |
| **CTCP-4124** | Verify User is able to View Minuteman list view | `TC-MINUTEMAN-001`, `TC-MINUTEMAN-012` (List load & phone row layout) |
| **CTCP-4125** | Verify user View Conveyor Minuteman calculation | `TC-MINUTEMAN-002`, `TC-MINUTEMAN-029` (Open & authenticated PDF stream for conveyor calc) |
| **CTCP-4126** | Verify user View Bucket Elevator Minuteman calculation | `TC-MINUTEMAN-002`, `TC-MINUTEMAN-029` (Open & authenticated PDF stream for elevator calc) |
| **CTCP-4127** | Verify user Download Conveyor Minuteman calculation pdf | `TC-MINUTEMAN-030` (Download PDF report with notification) |
| **CTCP-4128** | Verify user Download Minuteman elevator calculation pdf | `TC-MINUTEMAN-030` (Download PDF report with notification) |
| **CTCP-4129** | Verify view and download for Customer user | `TC-MINUTEMAN-004`, `TC-MINUTEMAN-005` (Customer role permissions) |
| **CTCP-4130** | Verify view and download for Distributor user | `TC-MINUTEMAN-004`, `TC-MINUTEMAN-005` (Distributor role permissions) |
| **CTCP-4131** | Verify view and download for Market Manager user | `TC-MINUTEMAN-004`, `TC-MINUTEMAN-005` (Market Manager role permissions) |
| **CTCP-4132** | Verify Home level minuteman calculation updated | `TC-MINUTEMAN-006`, `TC-MINUTEMAN-026`, `TC-MINUTEMAN-027` |
| **CTCP-4133** | Verify Conveyor level minuteman calculation updated | `TC-MINUTEMAN-007` (Conveyor card auto-filter & sync) |
| **CTCP-4134** | Verify Home & Conveyor level updated when added in site level from web | `TC-MINUTEMAN-006`, `TC-MINUTEMAN-007`, `TC-MINUTEMAN-026`, `TC-MINUTEMAN-027` |
| **CTCP-4135** | Verify Home & Conveyor level updated when added in corporate level from web | `TC-MINUTEMAN-006`, `TC-MINUTEMAN-007`, `TC-MINUTEMAN-026`, `TC-MINUTEMAN-027` |
| **CTCP-4136** | Verify Filter functionality by site and conveyor | `TC-MINUTEMAN-017` to `TC-MINUTEMAN-025` (9 dedicated filter/sort TCs) |
| **CTCP-4137** | Verify Edit functionality from web is reflected in mobile | `TC-MINUTEMAN-026`, `TC-MINUTEMAN-027`, `TC-MINUTEMAN-029` |
| **CTCP-4138** | Verify user add calculation using duplicate functionality | `TC-MINUTEMAN-026`, `TC-MINUTEMAN-027`, `TC-MINUTEMAN-029` (Reflected in mobile list) |

---

## 4. Are Current Tests Adequate Enough for Good Coverage?

### Findings & Verdict: **YES — Comprehensive & Production-Ready**

The test cases in `docs/test-suites/minuteman-calculation/` (35 TCs) provide **complete, high-coverage, and deterministic test specifications**:

1. **100% Reconciliation of TestLink:** All 18 TestLink test cases have been cleanly ingested, resolved, and expanded into distinct single-responsibility test cases.
2. **Dual-Permission Precision:** Explicitly validates independent permission scopes for conveyor vs elevator calculations across view and download capabilities.
3. **Robust Technical & Offline Coverage:** Local Hive caching (`minutemansList` box), working offline status banners, background periodic timers, network API error logging, and conveyor deletion stream listeners are thoroughly covered.
4. **Granular Multi-Filter Matrix:** Filter modal layout, result counter, sort options (Last Modified, A-Z, Z-A), multi-select site/conveyor cascading filters, active red dot indicator, clear filters, and pre-supplied conveyor mode are covered individually.
5. **Platform & Form Factor Readiness:** Mobile viewport stacked layout vs Tablet multi-column tabular layouts, iOS & Android platform tags (`@both`), and test data keys are defined for all scenarios.

### Recommendations for Automation Implementation
- **Page Object Design (`src/pages/minuteman.page.ts`):** Model `MinutemanListScreen`, `MinutemanFilterModal`, and `FilePreviewScreen` with locator getters targeting type SVGs (`minuteman_conveyor.svg`, `minuteman_elevator.svg`), name headers, and metadata labels.
- **PDF File Preview Handling:** Verify authenticated report streaming and download via Playwright download event handlers or API stream verification.

---

*Gap analysis completed. Master index `docs/gap/index.md` updated.*
