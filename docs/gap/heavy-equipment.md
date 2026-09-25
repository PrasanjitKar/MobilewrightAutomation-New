# Gap Analysis — Heavy Equipment Test Coverage

> **Scope:** Heavy Equipment module (`HeavyEquipmentListScreen`, `HeavyEquipmentScreen`, `HeavyEquipmentFilterModal`, `HeavyEquipmentListBloc`, `FileManagerListBloc`) — Conti+ Mobile (MobileWright automation)  
> **Sources compared:**  
> - `docs/test-suites/heavy-equipment/` — Flutter source-derived automation-ready TC documentation (29 TCs)  
> - `docs/test-link/heavy-equipment/` — TestLink export (`HeavyEquipment.doc`, 12 TCs)  
> - Flutter codebase (`lib/src/ui/screens/heavy_equipment/`, `lib/src/blocs/heavy_equipment/`, `lib/src/models/heavy_equipment/`)  
> **Analysis date:** 2026-09-23  
> **Author:** Copilot QA Analysis Agent

---

## 📊 Executive Summary

| Metric | test-suites/heavy-equipment | test-link/heavy-equipment |
|---|---|---|
| Total TCs | 29 | 12 |
| TCs strictly in scope for Heavy Equipment | 29 (100%) | 12 (100%) |
| Misplaced / Out-of-scope TCs | 0 | 0 (2 OS/browser universal link cases) |
| Automation-ready (Gherkin + Semantic Labels + Data Keys) | 29 (100%) | 0 (0%) |
| Flutter source references & BLoC state coverage | ✅ All 29 | ❌ None |
| Suite types represented | Smoke (2), Regression (26), E2E (1) | Manual (12) |
| Device form-factor coverage (Phone vs Tablet) | ✅ Both (Phone vs Tablet layout) | ❌ Unspecified |
| Platform coverage | iOS + Android (`@both`) | Not specified |
| **Overall quality rating** | ⭐⭐⭐⭐⭐ High (Production-grade) | ⭐⭐⭐ Medium (Historical / Functional) |

**Verdict:** `test-suites/heavy-equipment/` provides **significantly higher coverage depth, technical precision, and automation readiness** compared to `test-link/heavy-equipment/`. All functional requirements from TestLink (view permissions, list navigation, in-memory search, manual sync, filter modal, document preview/download, and QR deep link redirection) have been fully absorbed and expanded from 12 coarse manual test cases into 29 modular, deterministic, and automated test cases. Crucial mobile-specific behaviors (offline Hive cache hydration, Free user mode action suppression, Cognito-authenticated image thumbnails, dynamic filter counters, and error banners) are comprehensively covered in `test-suites/`.

---

## 1. Quality & Coverage Assessment: Which Folder Has High Coverage?

### 1.1 `docs/test-suites/heavy-equipment/` — Rating: ⭐⭐⭐⭐⭐ (HIGH COVERAGE)

`test-suites/heavy-equipment/` provides a comprehensive, production-ready test specification based directly on the Flutter application architecture:

1. **Granular Single-Responsibility Scenarios:** Rather than combining multiple distinct features (e.g. `CTCP-4102` which combined navigating, observing PDF/images, opening file preview, downloading, and searching into a single 5-step test), `test-suites/` breaks down document management into isolated, maintainable tests (`TC-023` for document list, `TC-024` for file search, and `TC-025` for preview and download).
2. **Architecture & BLoC Event Coverage:** Tests align directly with Flutter BLoC events:
   - `HeavyEquipmentListLoadEvent` (Hydrating Hive cache, streaming API updates, loading indicators)
   - `HeavyEquipmentSearchEvent` (In-memory real-time search matching `equipment.name`)
   - `HeavyEquipmentFilterEvent` (Multi-criteria combinations and sorting modes)
   - `HeavyEquipmentTimerEvent` (Background periodic sync)
3. **Read-Only Mobile Constraint Enforcement:** Validates that mobile acts as a read-only viewer for heavy equipment assets (no add, edit, or delete controls in mobile UI) across standard (`TC-001`, `TC-002`) and Free user (`TC-006`) accounts.
4. **Responsive Viewports:**
   - **Phone Layout:** Single-column card row with circular thumbnail, name, category, model, year, serial number, and distributor shop (`TC-HEAVY-EQUIPMENT-013`).
   - **Tablet Layout:** Multi-column tabular layout (`TC-HEAVY-EQUIPMENT-014`).
5. **Authenticated Media & Document Handling:** Validates `CachedNetworkImage` thumbnail rendering with Cognito authentication tokens (`TC-015`) and `FileManagerListBloc` integration for equipment manuals and PDFs (`TC-023`, `TC-025`).
6. **Resilience & Offline Handling:** Offline banner display and local Hive cache hydration (`TC-027`), manual sync confirmation dialogs (`TC-008`), and network error fallbacks (`TC-028`).
7. **Deep Linking / QR Code Routing:** Verifies direct navigation from external QR codes / deep links (`TC-026`) with parameter validation and permission checks.
8. **End-to-End Asset Lifecycle:** `TC-HEAVY-EQUIPMENT-029` validates a full asset audit workflow: opening from Dashboard, searching and filtering, viewing metadata and specifications, inspecting associated documents, previewing, and downloading.

---

### 1.2 `docs/test-link/heavy-equipment/` — Rating: ⭐⭐⭐ (MEDIUM, HIGH-LEVEL MANUAL)

`test-link/heavy-equipment/` contains 12 historical manual test cases that capture the primary user journeys but have clear limitations:

1. **Monolithic & Coarse Steps:** Test cases group multiple independent assertions together (e.g., `CTCP-4105` covers distributor shop filter, category filter, sorting, and clearing all in one test case).
2. **Missing Locators & Semantic Keys:** Does not specify semantic labels (`heavyEquipmentCard`, `searchField`, `filterButton`), Flutter widgets (`HeavyEquipmentListScreen`, `HeavyEquipmentFilterModal`), or BLoC state transitions.
3. **OS-Level Out-of-Scope Scenarios:** `CTCP-4113` and `CTCP-4114` attempt to test device OS behavior when the Conti+ app is not installed (redirecting to default mobile browser), which is outside the scope of mobile app automation.
4. **Omission of Critical Mobile States:** Misses offline cache loading, Free user UI suppression, last updated timestamp widgets, tablet responsive layouts, authenticated image headers, and error handling.

---

## 2. Detailed Functional Area Coverage Matrix

| Functional Area | `test-suites/heavy-equipment` | `test-link/heavy-equipment` | Status & Coverage Gap |
|---|:---:|:---:|---|
| **Heavy Equipment List Load & Layout** | TC-001 (Smoke), TC-013, TC-014 | CTCP-4098, CTCP-4110 | ✅ Adequate in test-suites |
| **Details Screen & Header Metadata Card** | TC-002 (Smoke) | CTCP-4102 (partial) | ✅ Adequate in test-suites |
| **Navigation from Dashboard & Drawer** | TC-003, TC-005 | CTCP-4098 | ✅ Adequate in test-suites |
| **View Permission Gating (`HEAVY-EQUIPMENT`)** | TC-004 | CTCP-4110 | ✅ Adequate in test-suites |
| **Download Permission Gating** | TC-004, TC-025 | CTCP-4102 | ✅ Adequate in test-suites |
| **Read-Only Mobile Constraints (No Add/Edit)** | TC-001, TC-002, TC-006 | CTCP-4100, CTCP-4101 | ✅ Adequate in test-suites |
| **Free User Account Restrictions (App Bar Suppression)** | TC-006 | ❌ Missing | ✅ Adequate in test-suites |
| **Pull to Refresh Reload** | TC-007 | ❌ Missing | ✅ Adequate in test-suites |
| **Manual Sync Confirmation Dialog** | TC-008 | CTCP-4104 | ✅ Adequate in test-suites |
| **Last Updated Timestamp & Record Counter** | TC-009 | ❌ Missing | ✅ Adequate in test-suites |
| **Search by Equipment Name** | TC-010 | CTCP-4103 | ✅ Adequate in test-suites |
| **Search Clear and Keyboard Dismiss** | TC-011 | ❌ Missing | ✅ Adequate in test-suites |
| **Empty State on Zero Search Results** | TC-012 | ❌ Missing | ✅ Adequate in test-suites |
| **Phone Viewport Layout Presentation** | TC-013 | ❌ Missing | ✅ Adequate in test-suites |
| **Tablet Viewport Tabular Presentation** | TC-014 | ❌ Missing | ✅ Adequate in test-suites |
| **Authenticated Image Thumbnail Header** | TC-015 | ❌ Missing | ✅ Adequate in test-suites |
| **Filter Modal & Dynamic Record Counter** | TC-016 | CTCP-4105 (partial) | ✅ Adequate in test-suites |
| **Sort by Last Modified (Default)** | TC-017 | CTCP-4105 (partial) | ✅ Adequate in test-suites |
| **Sort Alphabetical (A to Z / Z to A)** | TC-018, TC-019 | CTCP-4105 (partial) | ✅ Adequate in test-suites |
| **Filter by Distributor Shop Multi-Select** | TC-020 | CTCP-4105 (partial) | ✅ Adequate in test-suites |
| **Filter by Category Multi-Select** | TC-021 | CTCP-4105 (partial) | ✅ Adequate in test-suites |
| **Clear Filters Action & Red Dot Indicator** | TC-022 | CTCP-4105 (partial) | ✅ Adequate in test-suites |
| **Associated Document Files List** | TC-023 | CTCP-4102 (partial) | ✅ Adequate in test-suites |
| **In-Details Document Search** | TC-024 | CTCP-4102 (partial) | ✅ Adequate in test-suites |
| **File Preview & Download Authorization** | TC-025 | CTCP-4102 (partial) | ✅ Adequate in test-suites |
| **QR Code / Deep Link Navigation (In-App)** | TC-026 | CTCP-4111, CTCP-4112 | ✅ Adequate in test-suites |
| **QR Code (App Not Installed / Browser Redirect)** | ❌ Out of app scope | CTCP-4113, CTCP-4114 | ℹ️ OS/Browser routing |
| **Offline Mode & Cached Record Rendering** | TC-027 | ❌ Missing | ✅ Adequate in test-suites |
| **Error Handling & Cache Invalidation** | TC-028 | ❌ Missing | ✅ Adequate in test-suites |
| **E2E Asset Inspection & Manual Review** | TC-029 (E2E) | ❌ Missing as formal E2E | ✅ Adequate in test-suites |

---

## 3. Reconciliation of TestLink `heavy-equipment/` Test Cases

| TestLink TC | Title | Coverage in `test-suites/heavy-equipment/` |
|---|---|---|
| **CTCP-4098** | Verify Heavy equipment card shown on home page | `TC-HEAVY-EQUIPMENT-003`, `TC-HEAVY-EQUIPMENT-005` (Home navigation & card counter) |
| **CTCP-4100** | Verify user is not able to add or update heavy equipment data | `TC-HEAVY-EQUIPMENT-001`, `TC-HEAVY-EQUIPMENT-006` (Read-only UI verification) |
| **CTCP-4101** | Verify user should not be able to edit HE details | `TC-HEAVY-EQUIPMENT-002`, `TC-HEAVY-EQUIPMENT-006` (Details screen read-only verification) |
| **CTCP-4102** | Verify user is able to view and download image and pdf in HE | `TC-HEAVY-EQUIPMENT-023`, `TC-HEAVY-EQUIPMENT-024`, `TC-HEAVY-EQUIPMENT-025` |
| **CTCP-4103** | Verify user is able to search HE in listing screen | `TC-HEAVY-EQUIPMENT-010`, `TC-HEAVY-EQUIPMENT-011` (Search by name & clear) |
| **CTCP-4104** | Verify click on Sync button on listing screen | `TC-HEAVY-EQUIPMENT-008` (Manual sync confirmation dialog) |
| **CTCP-4105** | Verify filter functionality for HE | `TC-HEAVY-EQUIPMENT-016` to `TC-HEAVY-EQUIPMENT-022` (7 dedicated filter/sort TCs) |
| **CTCP-4110** | Verify if user have the view permission for HE module then will see data in mobile | `TC-HEAVY-EQUIPMENT-001`, `TC-HEAVY-EQUIPMENT-004` (Permission gating `HEAVY-EQUIPMENT`) |
| **CTCP-4111** | Verify QR code scanning functionality in case Conti+ app is installed in mobile device | `TC-HEAVY-EQUIPMENT-026` (Deep link / QR direct navigation) |
| **CTCP-4112** | Verify QR code scanning in case Conti+ app is installed but user not have access of HE | `TC-HEAVY-EQUIPMENT-004`, `TC-HEAVY-EQUIPMENT-026` (Unauthorized deep link error banner) |
| **CTCP-4113** | Verify if Conti+ app is not installed then user redirect to default browser | ℹ️ Out of mobile test automation scope (handled by OS universal link fallback) |
| **CTCP-4114** | Verify QR scan in case Conti+ app is not installed and user don't have permission | ℹ️ Out of mobile test automation scope (handled by web authentication portal) |

---

## 4. Are Current Tests Adequate Enough for Good Coverage?

### Findings & Verdict: **YES — Comprehensive & Production-Ready**

The test cases in `docs/test-suites/heavy-equipment/` (29 TCs) provide **complete, high-coverage, and deterministic test specifications**:

1. **100% Reconciliation of In-Scope TestLink TCs:** All 10 in-scope TestLink test cases are completely covered and expanded into granular, deterministic test cases. The remaining 2 TestLink cases (`CTCP-4113`, `CTCP-4114`) pertain to external OS browser behavior when the app is uninstalled.
2. **Architecture & BLoC Precision:** Full coverage of `HeavyEquipmentListBloc`, `HeavyEquipmentBloc`, `FileManagerListBloc`, and `DeepLinkBloc` states and events.
3. **Responsive UI & Media Authenticity:** Explicit validation for phone vs. tablet rendering and Cognito-authenticated image/file streams.
4. **Offline Resilience:** Local Hive caching, offline working status banners, and manual sync confirmation dialogs are comprehensively verified.
5. **Complete E2E Workflow:** `TC-HEAVY-EQUIPMENT-029` provides an end-to-end integration journey combining navigation, search/filter, metadata inspection, and document preview/download.

### Recommendations for Automation Implementation
- **Page Object Design (`src/pages/heavy-equipment.page.ts`):** Model `HeavyEquipmentListScreen`, `HeavyEquipmentScreen` (Details), `HeavyEquipmentFilterModal`, and `FilePreviewScreen` with locator getters using semantic attributes.
- **Deep Link Navigation:** Test deep link URL dispatching (`contiplus://heavy-equipment/<id>`) via MobileWright/Appium or ADB intent commands.
- **File Download Verification:** Intercept download events or verify file persistence in the app's local cache sandbox.

---

*Gap analysis completed. Master index `docs/gap/index.md` updated.*
