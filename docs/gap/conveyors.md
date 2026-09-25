# Gap Analysis — Conveyors Module Test Coverage

> **Scope:** Conveyors asset register module (`ConveyorListScreen`, `ConveyorInformationScreen`, `ConveyorDetailsScreen`, `ConveyorFiltersModal`, `ConveyorStations`, `ConveyorBloc`) — Conti+ Mobile (MobileWright automation)  
> **Sources compared:**  
> - `docs/test-suites/conveyors/` — Flutter source-derived automation-ready TC documentation (36 TCs)  
> - `docs/test-link/conveyors/` — TestLink export (`conveyors.doc`, 65 TCs across 3 sub-suites: Conveyor_List, Add_Conveyor, Conveyor_Details)  
> - Flutter codebase (`lib/src/ui/screens/conveyors/`, `lib/src/blocs/conveyor/`, `lib/src/models/conveyor/`)  
> **Analysis date:** 2026-09-23  
> **Author:** Copilot QA Analysis Agent

---

## 📊 Executive Summary

| Metric | test-suites/conveyors | test-link/conveyors |
|---|---|---|
| Total TCs | 36 | 65 |
| TCs strictly in scope for Conveyors | 36 (100%) | 65 (100%) |
| Redundant / Fragmented Field-by-Field TCs | 0 | ~25 (single-field clicks & duplicate filter checks) |
| Automation-ready (Gherkin + Semantic Labels + Data Keys) | 36 (100%) | 0 (0%) |
| Flutter source references & BLoC state coverage | ✅ All 36 | ❌ None |
| Suite types represented | Smoke (2), Regression (32), E2E (2) | Manual (50), Automated flag (15) |
| Complex Business Rules Coverage (Stations, Carcass, Thresholds) | ✅ Complete | ⚠️ Surface-level |
| Device form-factor coverage (Phone vs Tablet) | ✅ Both (Phone vs Tablet labels/layouts) | ❌ Unspecified |
| Platform coverage | iOS + Android (`@both`) | Not specified |
| **Overall quality rating** | ⭐⭐⭐⭐⭐ High (Production-grade) | ⭐⭐⭐ Medium (Historical / Fragmented) |

**Verdict:** `test-suites/conveyors/` has **substantially higher coverage quality, architectural precision, and automation readiness**. While `test-link/conveyors/` contains 65 legacy entries, many test cases isolate single static text fields or duplicate basic filter interactions (e.g. CTCP-3273 is a literal duplicate of CTCP-3266; CTCP-3278, 3279, 3280 verify one field at a time without business validation). `test-suites/conveyors/` unifies and rigorously documents all 65 TestLink requirements into 36 deterministic, production-grade test cases, adding vital coverage for complex Flutter widgets (`ConveyorStations` cascading logic), cover-wear condition threshold calculations, inspection tooltip breakdowns, "at risk" priority indicators, and end-to-end lifecycle journeys.

---

## 1. Quality & Coverage Assessment: Which Folder Has High Coverage?

### 1.1 `docs/test-suites/conveyors/` — Rating: ⭐⭐⭐⭐⭐ (HIGH COVERAGE)

`test-suites/conveyors/` provides complete, architecture-aligned test coverage across all conveyor workflows:

1. **3-Step Add/Edit/View Stepper Form (`ConveyorDetailsScreen`):**
   - **Step 1 (Details):** Mandatory name and site validation, distributor assignment, critical switch and tooltip, and head/tail GPS coordinates (`TC-CONVEYORS-002`, `021`, `022`, `023`).
   - **Step 2 (Conveyor-Lite):** Conveyor dynamics (belt width, speed, peak TPH, material density, idler angles, drive wrap) and the embedded `ConveyorStations` widget (`TC-CONVEYORS-025`, `026`).
   - **Step 3 (Installed Belt):** Belt specifications, dynamic carcass form switching (ST steel cord vs Fabric multi-ply fields), top/bottom cover compound, and thickness validation (`TC-CONVEYORS-027`, `028`).
2. **Complex Widget & Business Logic Verification:**
   - **`ConveyorStations` Logic (`TC-CONVEYORS-026`):** Numbered stations 1–6 cascading enable/disable rule (enabling station N auto-enables 1..N-1; disabling station N clears N+1..6) and mutually exclusive single Drive / single Take-up radio buttons.
   - **Cover Wear Thresholds (`TC-CONVEYORS-010`):** Precise percentage calculation (`0 < % ≤ 10` → Critical, `10 < % ≤ 30` → Poor, `30 < % ≤ 100` → Good, else N/A).
   - **Inspection Status Priority (`TC-CONVEYORS-011`, `012`):** "At risk" priority flag override, inspection gauge tooltip with color-coded breakdown (`flagRed`/`flagOrange`/`flagYellow`/`flagGreen`).
   - **Validation Rules (`TC-CONVEYORS-028`):** Top cover thickness ≥ bottom cover thickness constraint (`bottomBiggerThanTop` error) and duplicate name verification (`conveyorNameExist` error).
3. **Information Hub Navigation (`ConveyorInformationScreen`):**
   - Central asset hub testing permission-gated cards: Technical Data, File Manager, Cover Wear, Inspections, Conveyor Inspect, Belt Scans, Monitoring Devices, and Minuteman (`TC-CONVEYORS-033`, `034`).
4. **Resilience & State Management:**
   - Local Hive caching, "Working offline" banners, pending background sync queue (`uploadButtonConveyor_$index`), sync-failed indicator (`syncFailedBanner_$index`), and offline local saves (`TC-CONVEYORS-005`, `013`, `032`, `036`).
5. **Advanced Filter Modals (`ConveyorFiltersModal`):**
   - Sort orders (Last Modified default, A→Z, Z→A), criticality switch, cascading reset (Territory → Customer Corporate → Site), inspection items status, live result-count preview, and Clear/Cancel behaviors (`TC-CONVEYORS-014` through `019`).
6. **End-to-End User Lifecycles:**
   - `TC-CONVEYORS-035` (Full Conveyor Lifecycle: Create, Hub Navigation, Edit, Delete) and `TC-CONVEYORS-036` (Offline Conveyor Creation & Synchronization).

---

### 1.2 `docs/test-link/conveyors/` — Rating: ⭐⭐⭐ (MEDIUM, FRAGMENTED)

`test-link/conveyors/` (65 TCs across 3 sub-suites) provides broad historical requirements but suffers from excessive fragmentation:

1. **Sub-Suite Structure:**
   - **`Conveyor_List/` (23 TCs):** Navigation, search, sorting, multi-select filters, edit/delete conveyor, offline download, and refresh.
   - **`Add_Conveyor/` (30 TCs):** Header fields, individual field validations, image upload, stepper navigation, splice info, and conveyor lite stations.
   - **`Conveyor_Details/` (12 TCs):** Information hub cards, technical data read-only view, edit conveyor, and carcass compound logic.
2. **Fragmentation & Redundancy:**
   - Many test cases only check if a single UI label exists without submitting the form (e.g. CTCP-3278 for conveyor name, CTCP-3279 for distributor shop, CTCP-3280 for customer site, CTCP-3288 for belt manufacturer, CTCP-3289 for trade name).
   - CTCP-3273 is a literal copy/paste duplicate of CTCP-3266 ("Verify remove filter functionality").
   - CTCP-3308 has a duplicate title in the source ("Verify inspection card" instead of "Verify monitoring device card").
3. **Missing Automation Context:**
   - Lacks Flutter widget classes, semantic selectors (`conveyorListItem_$index`, `conveyorNameTextField`, `detailsStep_$_index`), BLoC states (`ConveyorSavingLocalState`, `ConveyorSyncState`), and Gherkin structures.

---

## 2. Detailed Functional Area Coverage Matrix

| Functional Area | `test-suites/conveyors` | `test-link/conveyors` | Status & Coverage Gap |
|---|:---:|:---:|---|
| **Conveyor List Page Load & RBAC** | TC-001, TC-003 | CTCP-3256, 3257, 3260, 3264 | ✅ Adequate in test-suites |
| **Search Conveyors by Name** | TC-006 | CTCP-3261 | ✅ Adequate in test-suites |
| **Pull to Refresh & Last Updated Widget** | TC-007 | CTCP-3262, CTCP-4109, CTCP-4657 | ✅ Adequate in test-suites |
| **Sort Options (Last Modified / A-Z / Z-A)** | TC-008, TC-014 | CTCP-4106 | ✅ Adequate in test-suites |
| **Empty State ("No results found")** | TC-004 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Row Presentation & Core Fields** | TC-009 | CTCP-3264 | ✅ Adequate in test-suites |
| **Cover Wear Condition Thresholds** | TC-010 | CTCP-3306 | ✅ Adequate in test-suites |
| **Inspection Status Gauge & Tooltip Breakdown** | TC-011 | CTCP-3307 | ✅ Adequate in test-suites |
| **"At Risk" Indicator Priority** | TC-012 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Pending Upload Button & Sync-Failed Banner** | TC-013 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Filter Modal: Criticality (Yes/No)** | TC-015 | CTCP-4881 | ✅ Adequate in test-suites |
| **Filter Modal: Cascading Territory → Corporate → Site** | TC-016 | CTCP-3265, 3267, 3272 | ✅ Adequate in test-suites |
| **Filter Modal: Inspection Items Status** | TC-017 | CTCP-3265 | ✅ Adequate in test-suites |
| **Filter Modal: Clear Filters & Cancel Modal** | TC-018, TC-019 | CTCP-3266, 3268, 3273 | ✅ Adequate in test-suites |
| **Add Conveyor Entry Points (Home FAB & List)** | TC-020 | CTCP-3258, 3259, 3274, 3275 | ✅ Adequate in test-suites |
| **Details Step: Mandatory Fields Validation** | TC-021 | CTCP-3276, 3278, 3279, 3280 | ✅ Adequate in test-suites |
| **Details Step: Head & Tail GPS Coordinates** | TC-022 | CTCP-3297, CTCP-3312 | ✅ Adequate in test-suites |
| **Details Step: Critical Switch & Tooltip** | TC-023 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Stepper Navigation (Next / Previous Controls)** | TC-024 | CTCP-3277, 3285, 3286, 3287 | ✅ Adequate in test-suites |
| **Image Upload (Camera & Gallery)** | TC-002, TC-020 | CTCP-3283, 3284, 3298 | ✅ Adequate in test-suites |
| **Unit of Measurement Selection** | TC-025 | CTCP-3282 | ✅ Adequate in test-suites |
| **Conveyor-Lite Step: Dynamics Fields** | TC-025 | CTCP-3296 | ✅ Adequate in test-suites |
| **Conveyor Stations: Cascading Selection & Drive/Take-up** | TC-026 | CTCP-4373 | ✅ Adequate in test-suites |
| **Installed Belt Step: Carcass Conditional Fields (ST vs Ply)** | TC-027 | CTCP-3290, 3291, 3292, 4840, 4810 | ✅ Adequate in test-suites |
| **Installed Belt Step: Splice Info & Installation Dates** | TC-027 | CTCP-3294, 3295, 3300, 3301 | ✅ Adequate in test-suites |
| **Save Validation: Thickness (Top ≥ Bottom) & Duplicate Name** | TC-028 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Technical Data Read-Only View** | TC-029 | CTCP-3305, CTCP-3310 | ✅ Adequate in test-suites |
| **Edit Existing Conveyor & Save** | TC-030 | CTCP-3269, 3299, 3311 | ✅ Adequate in test-suites |
| **Delete Conveyor Flow & Confirmation Dialog** | TC-031 | CTCP-3270, 3271 | ✅ Adequate in test-suites |
| **Offline Local Save & Pending Sync Queue** | TC-032, TC-005 | CTCP-4220 | ✅ Adequate in test-suites |
| **Information Hub: Permission-Gated Cards** | TC-033 | CTCP-3302, 3304, 3305–3309 | ✅ Adequate in test-suites |
| **Information Hub: Back Navigation & Deep Link Popping** | TC-034 | CTCP-3303 | ✅ Adequate in test-suites |
| **Recently Added Conveyor Visible under Site Details** | TC-035 (E2E) | CTCP-4013 | ✅ Adequate in test-suites |
| **E2E Full Conveyor Lifecycle** | TC-035 (E2E) | ❌ Missing as formal E2E | ✅ Adequate in test-suites |
| **E2E Offline Conveyor Creation & Background Sync** | TC-036 (E2E) | ❌ Missing as formal E2E | ✅ Adequate in test-suites |

---

## 3. Reconciliation of TestLink `conveyors/` Sub-Suites

### 3.1 `Conveyor_List/` (23 TCs)
- **Navigation & UI Header (CTCP-3256, 3257, 3260, 3263, 3264):** Covered in `TC-CONVEYORS-001`, `009`, and `docs/test-suites/dashboard/` (`TC-DASHBOARD-034`).
- **Add Conveyor Entry (CTCP-3258, 3259):** Covered in `TC-CONVEYORS-020`.
- **Search & Refresh (CTCP-3261, 3262, 4109, 4657):** Covered in `TC-CONVEYORS-006` and `TC-CONVEYORS-007`.
- **Filters & Sorting (CTCP-3265–3268, 3272, 3273, 4106, 4881):** Consolidated into `TC-CONVEYORS-008`, `014`, `015`, `016`, `017`, `018`, `019`.
- **Edit & Delete from List (CTCP-3269, 3270, 3271):** Covered in `TC-CONVEYORS-030` and `TC-CONVEYORS-031`.
- **Offline Download Action (CTCP-4220):** Covered in `TC-CONVEYORS-005` and `TC-CONVEYORS-032`.

### 3.2 `Add_Conveyor/` (30 TCs)
- **Form Entry & Stepper Header (CTCP-3274, 3275, 3276, 3277, 3285, 3286, 3287):** Covered in `TC-CONVEYORS-020` and `TC-CONVEYORS-024`.
- **Details Step Fields (CTCP-3278, 3279, 3280, 3297):** Consolidated into `TC-CONVEYORS-021` and `TC-CONVEYORS-022`.
- **Image Picker (CTCP-3283, 3284, 3298):** Covered in `TC-CONVEYORS-002` and `TC-CONVEYORS-020`.
- **Conveyor-Lite & Stations (CTCP-3282, 3296, 4373):** Covered in `TC-CONVEYORS-025` and `TC-CONVEYORS-026`.
- **Installed Belt Specifications (CTCP-3288–3295, 3300, 3301, 4840):** Consolidated into `TC-CONVEYORS-027` and `TC-CONVEYORS-028`.
- **Edit Conveyor & Site Details Reflection (CTCP-3299, 4013):** Covered in `TC-CONVEYORS-030` and `TC-CONVEYORS-035`.

### 3.3 `Conveyor_Details/` (12 TCs)
- **Hub Navigation & Back Button (CTCP-3302, 3303):** Covered in `TC-CONVEYORS-033` and `TC-CONVEYORS-034`.
- **Information Hub Cards (CTCP-3304, 3305, 3306, 3307, 3308, 3309):** Covered in `TC-CONVEYORS-033`.
- **Technical Data & Coordinates (CTCP-3310, 3312, 4810):** Covered in `TC-CONVEYORS-022`, `027`, `029`.
- **Edit from Details (CTCP-3311):** Covered in `TC-CONVEYORS-030`.

---

## 4. Are Current Tests Adequate Enough for Good Coverage?

### Findings & Verdict: **YES — Comprehensive & Production-Ready**

The test cases in `docs/test-suites/conveyors/` (36 TCs) provide **complete, rigorous, and deterministic coverage** across all conveyor components:

1. **Complete Stepper Lifecycle:** Step 1 (Details) + Step 2 (Conveyor-Lite) + Step 3 (Installed Belt) are fully exercised for creation, read-only inspection, editing, and deletion.
2. **Business Rules & Formula Validations:** `ConveyorStations` cascading dependencies, top/bottom cover thickness rules, duplicate name prevention, and cover-wear condition threshold formulas are rigorously tested.
3. **Information Hub Interception:** All 8 downstream module cards on `ConveyorInformationScreen` are validated for RBAC visibility and deep-link routing.
4. **State Machine & Offline Sync:** Local caching, offline saving, pending-sync button trigger, and sync-failed indicators are fully modeled on `ConveyorBloc` states.
5. **Form-Factor Adaptability:** Mobile single-column vs Tablet form labels/layouts are covered.

### Recommendations for Automation Implementation
- **Page Object Design (`src/pages/conveyor-list.page.ts` & `src/pages/conveyor-details.page.ts`):** Ensure the 3-step stepper controls (`nextButton`, `previousButton`, `bottomActionButton`) and the `ConveyorStations` checkbox/radio matrix are encapsulated cleanly.
- **Cascading Filter Testing:** Validate that applying Territory clears Corporate and Site dropdown selections as implemented in `ConveyorFiltersModal`.

---

*Gap analysis completed. Master index `docs/gap/index.md` updated.*
