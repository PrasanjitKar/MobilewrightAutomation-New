# Gap Analysis — Dashboard (Home Screen) Test Coverage

> **Scope:** Dashboard & Home Screen module (`HomeScreen`, `ContiAppBar`, Bottom Navigation, Add FAB) — Conti+ Mobile (MobileWright automation)  
> **Sources compared:**  
> - `docs/test-suites/dashboard/` — Flutter source-derived automation-ready TC documentation (46 TCs)  
> - `docs/test-link/login/Home/` — TestLink export under Login suite (27 TCs)  
> - `docs/test-link/` (cross-module Home cards: Belt Scans, Conveyors, Heavy Equipment, Inspections, Monitoring Devices)  
> - Flutter codebase (`lib/src/ui/screens/home/`, `lib/src/ui/app.dart`, `lib/src/ui/app/conti_app_bar.dart`)  
> **Analysis date:** 2026-09-23  
> **Author:** Copilot QA Analysis Agent

---

## 📊 Executive Summary

| Metric | test-suites/dashboard | test-link/login/Home | Cross-Module test-link Home TCs |
|---|---|---|---|
| Total TCs | 46 | 27 | 18 |
| TCs strictly in scope for Dashboard/Home | 46 (100%) | 17 (63%) | 18 |
| Misplaced / Out-of-scope TCs | 0 | 10 (37%) | 0 |
| Automation-ready (Gherkin + Semantic Labels) | 46 (100%) | 0 (0%) | 0 (0%) |
| Flutter source references & BLoC states | ✅ All 46 | ❌ None | ❌ None |
| Suite types represented | Smoke (4), Regression (41), E2E (1) | Manual (26), Automated flag (1) | Manual (18) |
| Device form-factor coverage (Phone vs Tablet) | ✅ Both (Grid vs Split-view) | ❌ Phone only | ❌ Phone only |
| Platform coverage | iOS + Android (`@both`) | Not specified | Not specified |
| **Overall quality rating** | ⭐⭐⭐⭐⭐ High (Production-grade) | ⭐⭐ Low–Medium (Legacy) | ⭐⭐⭐ Medium (Feature-specific) |

**Verdict:** `test-suites/dashboard/` has **substantially higher coverage quality, architectural precision, and automation readiness** compared to `test-link/`. All 46 test cases in `test-suites/dashboard/` are fully actionable, backed by exact Flutter widgets, semantics labels, BLoC events/states, and Gherkin definitions.

---

## 1. Quality & Coverage Assessment: Which Folder Has High Coverage?

### 1.1 `docs/test-suites/dashboard/` — Rating: ⭐⭐⭐⭐⭐ (HIGH COVERAGE)

`test-suites/dashboard/` provides comprehensive, modern, architecture-aligned test coverage:

1. **Role-Based Access Control (RBAC):** Tests card rendering based on `UserInfoCubit.state.user.canAccess(module, Permission.view)` across 9 distinct modules.
2. **Device Form-Factor Matrix:** Full coverage for **Phone** (portrait lock, 2-column `GridView.count` navigation) and **Tablet** (landscape lock, horizontal card strip, inline split-view list panel swap via `HomeCardContainer.isSelected`).
3. **Card-Level Detail & Chip States:** Validates card title, count semantics (`"$title-count"`), and dynamic status chips (`goodCount`, `faultCount`, `poorCount`, `criticalCount`) with zero-state suppression.
4. **Scaffold & Shell Controls:**
   - **Top App Bar (`ContiAppBar`):** Title, search icon (unpreset tab), filter icon suppression on Home tab (`selectedPage == 0`), sync dialog confirmation, sync loading indicator, and profile navigation.
   - **Bottom Navigation Bar:** 4-tab (guest/free) vs 5-tab (authenticated) layouts, active indicator state, back button navigation (exit app on Home vs return to Home on other tabs).
   - **Context-Aware Add Speed-Dial FAB:** Dynamic scoping based on `state.selectedCard`, module permissions, suppression for Belt Scan / Minuteman / Heavy Equipment, and connectivity requirements (`isOnline`).
5. **Deep Link Lifecycle:** Navigation interception returning to Home first (`popUntil((route) => route.isFirst)`), permission validation, and "Access denied" snackbars.
6. **Data Synchronisation:** Pull-to-refresh (`RefreshIndicator`), hard refresh sync dialog machine (`SummaryBloc`), and formatted last-updated timestamp (`dd MMM yyyy hh:mm a`).
7. **End-to-End User Journey:** TC-DASHBOARD-046 provides cross-module hub verification connecting login, summary validation, quick-add FAB, and tab switching.

---

### 1.2 `docs/test-link/login/Home/` — Rating: ⭐⭐ (LOW–MEDIUM, LEGACY & MISPLACED)

`test-link/login/Home/` was exported from historical TestLink suites with significant shortcomings:

1. **Scope Pollution & Misplaced TCs (10 of 27 TCs):**
   - **Conveyor Filters (6 TCs):** TC-2077, TC-2078, TC-2079, TC-2081, TC-2083, TC-2084 describe conveyor filter popups (Territory, Site, Conveyor dropdowns). On the mobile Home screen, the filter icon is **explicitly hidden**; these belong in `docs/test-link/conveyors/Conveyor_List/`.
   - **Unit Conversion / Settings (1 TC):** TC-4372 tests changing metric/imperial units in settings and verifying persistence across web and mobile. Belongs in `docs/test-suites/profile/` or settings.
   - **Obsolete Legacy Features (3 TCs):**
     - TC-2091 & TC-2096 test a "File manager category" and "storage indicator" on the home page (no longer present on modern Home dashboard).
     - TC-2095 tests a "Pie diagram in Inspection category" (replaced by 4 status chips).
2. **Shallow Test Steps:** Most test cases contain only 2 to 4 high-level steps (often starting with generic step `1 | Precondition | User is in home page`).
3. **No Automation Metadata:** Completely lacks Flutter semantic keys, i18n resource references, BDD Gherkin definitions, or environment/platform tags.

---

## 2. Detailed Functional Area Coverage Matrix

| Functional Area | `test-suites/dashboard` | `test-link/login/Home` | Status & Coverage Gap |
|---|:---:|:---:|---|
| **Home Dashboard Load & Title** | TC-001 | TC-2068, TC-2069 | ✅ Adequate in test-suites |
| **RBAC Card Visibility** | TC-002 | ❌ Missing | ✅ Adequate in test-suites |
| **Phone Layout (2-Col Grid & Nav)** | TC-003 | TC-2071, 2072, 2073, 2074 | ✅ Adequate in test-suites |
| **Tablet Split View (Strip & Panel)** | TC-004, TC-018, TC-019 | ❌ Missing | ✅ Adequate in test-suites |
| **Orientation Locking** | TC-005 | ❌ Missing | ✅ Adequate in test-suites |
| **Last Updated Timestamp Format** | TC-006 | TC-2098 | ✅ Adequate in test-suites |
| **Sites Card & Count** | TC-007 | TC-2087 | ✅ Adequate in test-suites |
| **Conveyors Card & Count** | TC-008 | TC-2088 | ✅ Adequate in test-suites |
| **Cover Wear Card & Count** | TC-009 | TC-2089, TC-2094 | ✅ Adequate in test-suites |
| **Inspections Card & Chips** | TC-010 | TC-2090 (TC-2095 pie legacy) | ✅ Adequate in test-suites |
| **Conveyor Inspect Card & Chips** | TC-011 | ❌ Missing in Home (in module) | ✅ Adequate in test-suites |
| **Belt Scans Card & Count** | TC-012 | ❌ (in belt-scans TC-4506) | ✅ Adequate in test-suites |
| **Monitoring Devices Card & Chips** | TC-013 | ❌ (in MD TC-2971–2973) | ✅ Adequate in test-suites |
| **Field Service Card & Count** | TC-014 | ❌ Missing | ✅ Adequate in test-suites |
| **Heavy Equipment Card & Count** | TC-015 | ❌ (in HE TC-4098) | ✅ Adequate in test-suites |
| **Minuteman Calc Card & Count** | TC-016 | ❌ Missing | ✅ Adequate in test-suites |
| **Status Chips Zero-Count Suppression** | TC-017 | ❌ Missing | ✅ Adequate in test-suites |
| **Pull-To-Refresh** | TC-020 | TC-2086 (partial) | ✅ Adequate in test-suites |
| **Sync Dialog Confirmation** | TC-021 | ❌ Missing | ✅ Adequate in test-suites |
| **Sync Loading Indicator State** | TC-022 | ❌ Missing | ✅ Adequate in test-suites |
| **App Bar: Filter Hidden on Home** | TC-023 | ❌ (misidentified as active) | ✅ Adequate in test-suites |
| **App Bar: Search Navigation** | TC-024 | TC-2075 | ✅ Adequate in test-suites |
| **App Bar: Profile Navigation** | TC-025 | TC-2085 | ✅ Adequate in test-suites |
| **Bottom Nav: Guest (4) vs Full (5) Tabs** | TC-026 | ❌ Missing | ✅ Adequate in test-suites |
| **Hardware Back Button Behavior** | TC-027 | ❌ Missing | ✅ Adequate in test-suites |
| **Add FAB: Card Scoping & Suppression** | TC-028, TC-029 | TC-2070 (partial) | ✅ Adequate in test-suites |
| **Add FAB: Offline / Online Gating** | TC-030 | ❌ Missing | ✅ Adequate in test-suites |
| **Bottom Nav Tabs Navigation (5 TCs)** | TC-033 – TC-037 | ❌ Missing | ✅ Adequate in test-suites |
| **Quick Add Speed Dial Targets (8 TCs)** | TC-038 – TC-045 | TC-2070 (partial) | ✅ Adequate in test-suites |
| **Deep Link Hub Interception & Routing** | TC-031 | ❌ Missing | ✅ Adequate in test-suites |
| **Deep Link Access Denied Handling** | TC-032 | ❌ Missing | ✅ Adequate in test-suites |
| **E2E Multi-Module Dashboard Journey** | TC-046 | ❌ Missing | ✅ Adequate in test-suites |
| **Cross-Browser Color Rendering** | ❌ OOS (Web only) | TC-2097 | ℹ️ Out of scope for Flutter app |
| **Unit of Conversion Profile/Settings** | ❌ (in Profile/Conveyor) | TC-4372 | ℹ️ Tracked under Profile module |

---

## 3. Reconciliation of TestLink `login/Home/` Test Cases

| TestLink TC | Title | Resolution / Mapping in Automation |
|---|---|---|
| **TC-2068** | Home page validation | Covered by `TC-DASHBOARD-001` (Dashboard loads with app bar title & cards) |
| **TC-2069** | Validating the fields on home page | Covered by `TC-DASHBOARD-001`, `TC-DASHBOARD-006` |
| **TC-2070** | Verify + button functionality | Covered by `TC-DASHBOARD-028`, `029`, `038`–`045` (8 quick-add flows) |
| **TC-2071** | Verify Navigation to corporate list page | Covered by `TC-DASHBOARD-035` (Corporates tab navigation) |
| **TC-2072** | Verify Navigation to Site list page | Covered by `TC-DASHBOARD-007` (Sites card tap) |
| **TC-2073** | Verify Navigation to conveyor list page | Covered by `TC-DASHBOARD-008`, `TC-DASHBOARD-034` (Card tap & Bottom tab) |
| **TC-2074** | Verify Navigation to inspection list page | Covered by `TC-DASHBOARD-010`, `TC-DASHBOARD-037` (Card tap & Bottom tab) |
| **TC-2075** | Validate Search functionality | Covered by `TC-DASHBOARD-024` (Search icon opens SearchPage with no tab) |
| **TC-2077** | Validating Territory dropdown | ⚠️ **Misplaced:** Conveyor filter. Covered in `test-suites/conveyors/` |
| **TC-2078** | Validating cancel and apply button in Territory | ⚠️ **Misplaced:** Conveyor filter. Covered in `test-suites/conveyors/` |
| **TC-2079** | Validating Sitename dropdown | ⚠️ **Misplaced:** Conveyor filter. Covered in `test-suites/conveyors/` |
| **TC-2081** | Validating Conveyor dropdown | ⚠️ **Misplaced:** Conveyor filter. Covered in `test-suites/conveyors/` |
| **TC-2083** | Validating Cancel button in filter functionality | ⚠️ **Misplaced:** Conveyor filter. Covered in `test-suites/conveyors/` |
| **TC-2084** | Validating Save button in filter functionality | ⚠️ **Misplaced:** Conveyor filter. Covered in `test-suites/conveyors/` |
| **TC-2085** | Validating Profile button in home page | Covered by `TC-DASHBOARD-025` (Profile icon navigates to ProfileScreen) |
| **TC-2086** | Validating Refresh button in home page | Covered by `TC-DASHBOARD-020`, `TC-DASHBOARD-021`, `022` (Pull-to-refresh + sync) |
| **TC-2087** | Validating the Count showing in site category | Covered by `TC-DASHBOARD-007` (Sites card count) |
| **TC-2088** | Validating the Count showing in conveyors category | Covered by `TC-DASHBOARD-008` (Conveyors card count) |
| **TC-2089** | Validating the Count showing in cover wear category | Covered by `TC-DASHBOARD-009` (Cover wear card count) |
| **TC-2090** | Validating the Count showing in Inspections category | Covered by `TC-DASHBOARD-010` (Inspections card count & status chips) |
| **TC-2091** | Validating Count in File manager category | 🚫 **Obsolete:** File manager is no longer a Home dashboard card |
| **TC-2094** | Validating colour code & number count in Cover wear | Covered by `TC-DASHBOARD-009` & `test-suites/cover-wear/` |
| **TC-2095** | Validating Pie diagram in Inspection category | 🚫 **Obsolete UI:** Pie chart replaced by Good/Fault/Poor/Critical chips |
| **TC-2096** | Validating storage indicator in file manager | 🚫 **Obsolete:** Legacy storage gauge removed from mobile Home screen |
| **TC-2097** | Checking count and colour codes in cross browser | 🚫 **Out of Scope:** Mobile application is Flutter native / single WebView |
| **TC-2098** | Verify user will get date and time when last update | Covered by `TC-DASHBOARD-006` (`lastUpdatedTimeHomeScreen` format) |
| **TC-4372** | Verify unit of conversion feature for mobile | ⚠️ **Misplaced:** Covered in `test-suites/profile/` and module specs |

---

## 4. Are Current Tests Adequate Enough for Good Coverage?

### Findings & Verdict: **YES — Comprehensive & Production-Ready**

The test cases authored in `docs/test-suites/dashboard/` (46 TCs) provide **complete and rigorous coverage** across all critical functional dimensions:

1. **Card Matrix (9 Modules):** Every card rendered on the Home dashboard is verified for presence, count accuracy against state, status chips, and destination navigation.
2. **Device Matrix (Phone & Tablet):** Phone 2-column grid vs Tablet landscape horizontal strip + split-view list panel are explicitly documented.
3. **App Shell Integration:** Complete verification of `ContiAppBar`, 4-tab vs 5-tab bottom navigation, back button interceptor, and context-aware speed-dial FAB options.
4. **Resilience & State Management:** Offline/online network gating, sync confirmation dialogs, loading indicators, pull-to-refresh, and deep-link access-denied snackbars.
5. **E2E Integration:** Full lifecycle journey from authentication through card interactions to quick-action workflows.

### Recommended Minor Action Items for Automation Implementation
- **Page Object Design (`src/pages/dashboard.page.ts`):** Ensure the Field Service card locator handles the absence of an outer `SemanticsLabel` by querying its inner title or count text label.
- **Android Accessibility Node Matching:** Ensure count locators use substring matching (`exact: false`) to handle Android's concatenated `"<counter>, <title>-count"` accessibility label format.
- **TestLink Alignment:** Keep TestLink `login/Home/` documented as historical reference; do not backport obsolete File Manager or Pie Chart test cases.

---

*Gap analysis completed. Master index `docs/gap/index.md` updated.*
