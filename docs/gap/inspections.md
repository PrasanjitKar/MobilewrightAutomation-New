# Gap Analysis — Inspections Test Coverage

> **Scope:** Inspections module (`InspectionListScreen`, `AddInspectionEventScreen`, `InspectionDetailsScreen`, `InspectionItemDetails`, `InspectionViewScreen`, `InspectionListBloc`, `InspectionDetailsCubit`) — Conti+ Mobile (MobileWright automation)  
> **Sources compared:**  
> - `docs/test-suites/inspections/` — Flutter source-derived automation-ready TC documentation (40 TCs)  
> - `docs/test-link/inspections/` — TestLink export (`inspections.doc`, 91 TCs across 6 sub-suites)  
> - Flutter codebase (`lib/src/ui/screens/inspections/`, `lib/src/blocs/inspections/`, `lib/src/models/inspections/`)  
> **Analysis date:** 2026-09-23  
> **Author:** Copilot QA Analysis Agent

---

## 📊 Executive Summary

| Metric | test-suites/inspections | test-link/inspections |
|---|---|---|
| Total TCs | 40 | 91 |
| Sub-Suites / Sub-Categories | Clean modular registry (Smoke, Regression, E2E) | 6 sub-suites (`Card_Logic`, `Default_Template`, `Vulcan_Template`, `Corporate_List`, `Map`, `Total_Conveyance_Template`) |
| In-Scope TCs | 40 (100%) | 91 (with ~50 redundant cross-template duplicates) |
| Automation-ready (Gherkin + Semantic Labels + Data Keys) | 40 (100%) | 0 (0%) |
| Flutter source references & BLoC state coverage | ✅ All 40 | ❌ None |
| Suite types represented | Smoke (3), Regression (35), E2E (2) | Manual (91) |
| Device form-factor coverage (Phone vs Tablet) | ✅ Both (Phone list/accordion vs Tablet split-view) | ❌ Unspecified |
| Offline & Sync Lifecycle Coverage | ✅ Comprehensive (Draft, Pending badge, Background Sync, Retry) | ⚠️ Partial (save as draft mentioned only) |
| Platform coverage | iOS + Android (`@both`) | Not specified |
| **Overall quality rating** | ⭐⭐⭐⭐⭐ High (Production-grade) | ⭐⭐⭐ Medium (Historical / Redundant) |

**Verdict:** `test-suites/inspections/` provides **vastly superior architectural fidelity, structural organization, and automation readiness** compared to `test-link/inspections/`. While TestLink records 91 test cases, more than 50% are repetitive copy-paste duplicates across three inspection template types (`Default_Template`, `Vulcan_Template`, and `Total_Conveyance_Template`) or manual multi-step journeys. `test-suites/inspections/` consolidates the template redundancies into 40 clean, deterministic, and modular test cases covering the entire inspection lifecycle: multi-step event creation, asset condition scoring, photo capture with on-device annotation, interactive GPS map pinning, historical inspection import ("Load Last Inspection"), splice condition measurement, offline queue persistence, and authenticated PDF report streaming.

---

## 1. Quality & Coverage Assessment: Which Folder Has High Coverage?

### 1.1 `docs/test-suites/inspections/` — Rating: ⭐⭐⭐⭐⭐ (HIGH COVERAGE)

`test-suites/inspections/` provides an exhaustive, production-grade test specification structured directly around the mobile app architecture:

1. **Clean Separation of Concerns:** Consolidates repetitive template permutations into unified, parameterized component validations (e.g. template selection and auto-naming in `TC-020`, condition scoring in `TC-024`, and sequence validations).
2. **Architecture & BLoC Coverage:** Directly tests Flutter BLoC events and Cubit methods:
   - `InspectionListLoadEvent` (Hydrating Hive cache, streaming API updates, loading indicators)
   - `InspectionListFilterEvent` (Multi-criteria combinations for corporate, site, conveyor, condition, and status)
   - `InspectionListSearchEvent` (Real-time keyword filtering)
   - `InspectionListSyncAllEvent` (Offline sync queue dispatch and image upload)
   - `InspectionDetailsCubit` (`newInspection`, `setSiteForInspection`, `createInspectionEvent`, `addItem`, `addHistoryItem`, `saveInspection`)
3. **Template Engine & Dynamic Findings:**
   - Validates template-driven item forms across Default, Vulcan, and Total Conveyance templates (`TC-020`, `TC-024`).
   - Supports historical finding replication via the "Load Last Inspection" feature (`TC-027`).
   - Covers specialized splice condition inspection with measurement and hardness parameters (`TC-028`).
4. **Photo Capture & On-Device Image Annotation:**
   - Multi-photo attachment (up to 3 images per finding) with native camera/gallery picker (`TC-025`).
   - Image cropping and drawing/annotation editor verification before saving.
5. **Interactive Geolocation & Mapping:**
   - Google Maps widget integration with conveyor head/tail markers (`TC-022`).
   - GPS coordinate auto-pinning for individual inspection items (`TC-026`).
6. **Robust Offline Lifecycle & Sync Engine:**
   - Offline creation and local Hive storage with "Upload Pending" status badge (`TC-030`).
   - Automatic reconnect background sync queue for data and media (`TC-031`).
   - "Sync Failed" error badge handling with manual retry capability (`TC-032`).
7. **Responsive Layouts:**
   - **Phone Viewport:** Expandable accordion row with horizontal finding preview slider (`TC-018`).
   - **Tablet Viewport:** Master-detail split-view with sticky list and detailed card highlights (`TC-019`).
8. **PDF Report Streaming & Unit Conversion:**
   - Server-side PDF report rendering, preview, and download (`TC-036`).
   - Offline access blocking with warning snackbar when reports are unsynced (`TC-037`).
9. **End-to-End User Journeys:**
   - `TC-INSPECTIONS-039`: Complete end-to-end inspection workflow (Event creation $\rightarrow$ Multi-asset evaluation $\rightarrow$ Photo annotation $\rightarrow$ Summary verification $\rightarrow$ PDF generation).
   - `TC-INSPECTIONS-040`: Complete offline execution with local photo storage and automated cloud synchronization on reconnect.

---

### 1.2 `docs/test-link/inspections/` — Rating: ⭐⭐⭐ (MEDIUM, HEAVY REDUNDANCY)

`test-link/inspections/` contains 91 test cases exported from historical TestLink suites across 6 sub-suites:

1. **Massive Cross-Template Duplication:**
   - 22 TCs in `Default_Template` and 39 TCs in `Vulcan_Template` replicate the exact same list navigation, search, filter, sync, card count, download, delete event, duplicate event, save as draft, view details, and PDF logo tests.
   - 15 TCs in `Total_Conveyance_Template` repeat basic UI and sync validations again.
2. **Monolithic & Coarse Manual Steps:** Several test cases combine 10+ steps (e.g. creating events, adding multiple items across assets, changing statuses, generating PDFs, and checking web reflection in one manual test case).
3. **Lack of Modern UI Locators:** Does not contain semantic labels (`inspectionListItem_$index`, `goodFlag`, `conveyorAtRisk_$index`), widget keys, or BLoC state assertions.
4. **Omission of Critical Mobile Edge Cases:** Completely misses tablet split-view layouts, on-device image annotation/cropping, background sync retry handling (`Sync Failed` badge), conveyor-at-risk warning indicators, and offline PDF blocking.

---

## 2. Detailed Functional Area Coverage Matrix

| Functional Area | `test-suites/inspections` | `test-link/inspections` | Status & Coverage Gap |
|---|:---:|:---:|---|
| **Inspection List Page Load** | TC-001 (Smoke) | CTCP-4358, 4410, 4377 | ✅ Adequate in test-suites |
| **Add Inspection Happy Path** | TC-002 (Smoke), TC-020 | CTCP-4418, 4385, 4793 | ✅ Adequate in test-suites |
| **Inspection View Details & 3 Tabs** | TC-003 (Smoke) | CTCP-4424, 4391 | ✅ Adequate in test-suites |
| **E2E Full Inspection Workflow** | TC-039 (E2E) | CTCP-4413, 4380 (partial) | ✅ Adequate in test-suites |
| **E2E Offline Inspection & Sync** | TC-040 (E2E) | ❌ Missing as formal E2E | ✅ Adequate in test-suites |
| **Home Dashboard Card & Counter** | TC-004 | CTCP-4359, 4360, 4361 | ✅ Adequate in test-suites |
| **View Permission Gating** | TC-005 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Bottom Navigation Bar Tab** | TC-006 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **FAB Speed Dial Quick Add** | TC-007 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Empty State ("No results found")** | TC-008 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Offline Banner & Hive Cache** | TC-009 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Pull to Refresh Sync** | TC-010 | CTCP-4415, 4382, 4800 | ✅ Adequate in test-suites |
| **Search by Inspection Name** | TC-011 | CTCP-4414, 4381 | ✅ Adequate in test-suites |
| **Filter by Corporate, Site & Conveyor** | TC-012 | CTCP-4412, 4379 | ✅ Adequate in test-suites |
| **Filter by Condition & Status** | TC-013 | CTCP-4412, 4379 | ✅ Adequate in test-suites |
| **Filter Sort Options (Last Mod, A-Z, Z-A, Pending)** | TC-014 | CTCP-4412, 4379 | ✅ Adequate in test-suites |
| **Row Metadata & Condition Badges** | TC-015 | CTCP-4411, 4378 | ✅ Adequate in test-suites |
| **Conveyor Count Pill & Tooltip** | TC-016 | CTCP-4361, 4411, 4378 | ✅ Adequate in test-suites |
| **Conveyor at Risk Warning Icon** | TC-017 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Expandable Accordion Row Slider** | TC-018 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Tablet Split View Presentation** | TC-019 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Site Selection & Auto-Naming** | TC-020 | CTCP-4567 | ✅ Adequate in test-suites |
| **Mandatory Fields Validation** | TC-021 | CTCP-4399, 4400 | ✅ Adequate in test-suites |
| **Interactive Map Markers & Coordinates** | TC-022 | CTCP-4568, 4569, 4570 | ✅ Adequate in test-suites |
| **Productivity & Uptime Fields** | TC-023 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Item Condition & Status Selection** | TC-024 | CTCP-4364, 4422, 4389 | ✅ Adequate in test-suites |
| **Photo Upload & On-Device Annotation** | TC-025 | ❌ Missing annotation in TL | ✅ Adequate in test-suites |
| **Item GPS Geolocation Pinning** | TC-026 | CTCP-4569 | ✅ Adequate in test-suites |
| **Load Last Inspection History Dialog** | TC-027 | CTCP-4761, 4762, 4763 | ✅ Adequate in test-suites |
| **Splice Condition Inspection Flow** | TC-028 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Summary Step Statistics & Notes** | TC-029 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Offline Save & "Upload Pending" Badge** | TC-030 | CTCP-4423, 4390 | ✅ Adequate in test-suites |
| **Auto-Sync Queue on Reconnection** | TC-031 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **"Sync Failed" Badge & Retry Action** | TC-032 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Edit Inspection Event & Findings** | TC-033 | CTCP-4401 | ✅ Adequate in test-suites |
| **Delete Individual Inspection Item** | TC-034 | CTCP-4365, 4419, 4386 | ✅ Adequate in test-suites |
| **Delete Full Inspection via Popup Menu** | TC-035 | CTCP-4362, 4420, 4387 | ✅ Adequate in test-suites |
| **PDF Report Generation & Preview** | TC-036 | CTCP-4417, 4426, 4404 | ✅ Adequate in test-suites |
| **PDF Report Blocked When Offline** | TC-037 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Conveyor Details Pre-Filtered Navigation** | TC-038 | CTCP-4363, 4431, 4409 | ✅ Adequate in test-suites |

---

## 3. Reconciliation of TestLink Sub-Suites to `test-suites/inspections/`

### 3.1 `Card_Logic` Sub-Suite (10 TCs)
| TestLink TC | Title | Coverage in `test-suites/inspections/` |
|---|---|---|
| **CTCP-4358** | Navigation to inspection list page | `TC-INSPECTIONS-001`, `TC-INSPECTIONS-004`, `TC-INSPECTIONS-006` |
| **CTCP-4359** | Verify elements displayed in inspection card | `TC-INSPECTIONS-004` (Dashboard summary card) |
| **CTCP-4360** | Verify count logic at home level (single event) | `TC-INSPECTIONS-004` |
| **CTCP-4361** | Verify count logic at home level (multi-event) | `TC-INSPECTIONS-004`, `TC-INSPECTIONS-016` |
| **CTCP-4362** | Verify count update after deleting inspection | `TC-INSPECTIONS-004`, `TC-INSPECTIONS-035` |
| **CTCP-4363** | Verify inspection card count at conveyor level | `TC-INSPECTIONS-038` |
| **CTCP-4364** | Verify count update when status changed to Completed | `TC-INSPECTIONS-024`, `TC-INSPECTIONS-029` |
| **CTCP-4365** | Verify count update after deleting item | `TC-INSPECTIONS-034` |
| **CTCP-4366** | Verify distributor corporate logo behavior | `TC-INSPECTIONS-036` |
| **CTCP-4643** | Verify good condition flag functionality with status | `TC-INSPECTIONS-024` |

---

### 3.2 `Default_Template` (22 TCs) & `Vulcan_Template` (39 TCs)
The 61 test cases across these two sub-suites contain heavy redundancy:
- **Navigation & Listing (CTCP-4410, 4411, 4377, 4378):** Consolidated into `TC-INSPECTIONS-001`, `TC-INSPECTIONS-015`, and `TC-INSPECTIONS-016`.
- **Search & Filters (CTCP-4412, 4413, 4414, 4379, 4380, 4381):** Consolidated into `TC-INSPECTIONS-011`, `TC-INSPECTIONS-012`, `TC-INSPECTIONS-013`, and `TC-INSPECTIONS-014`.
- **Sync & Refresh (CTCP-4415, 4382):** Consolidated into `TC-INSPECTIONS-010` and `TC-INSPECTIONS-031`.
- **Add Inspection & Item Creation (CTCP-4418, 4422, 4385, 4389, 4760):** Consolidated into `TC-INSPECTIONS-002`, `TC-INSPECTIONS-020`, `TC-INSPECTIONS-021`, and `TC-INSPECTIONS-024`.
- **Template Item Sequences & Asset Conditions (CTCP-4393–4398):** Consolidated into `TC-INSPECTIONS-024`.
- **Observation Mandatory Rules (CTCP-4399, 4400):** Addressed in `TC-INSPECTIONS-021` and `TC-INSPECTIONS-024`.
- **Draft & Offline Handling (CTCP-4423, 4390):** Consolidated into `TC-INSPECTIONS-030`.
- **View Details (CTCP-4424, 4391):** Consolidated into `TC-INSPECTIONS-003`.
- **History Import / Load Button (CTCP-4761, 4762, 4763):** Consolidated into `TC-INSPECTIONS-027`.
- **Edit & Delete Operations (CTCP-4419, 4420, 4386, 4387, 4401):** Consolidated into `TC-INSPECTIONS-033`, `TC-INSPECTIONS-034`, and `TC-INSPECTIONS-035`.
- **PDF Generation, Logos & Unit Conversion (CTCP-4417, 4426, 4427, 4428, 4429, 4404, 4405, 4407, 4408, 4566):** Consolidated into `TC-INSPECTIONS-036`.
- **Conveyor Association (CTCP-4431, 4409, 4567):** Consolidated into `TC-INSPECTIONS-020` and `TC-INSPECTIONS-038`.

---

### 3.3 `Total_Conveyance_Template` (15 TCs)
- **Add Flow & Sequences (CTCP-4793–4798):** Consolidated into `TC-INSPECTIONS-020` and `TC-INSPECTIONS-024`.
- **Swipe to Refresh & Status Tick (CTCP-4799, 4800, 4801):** Consolidated into `TC-INSPECTIONS-010`, `TC-INSPECTIONS-015`, and `TC-INSPECTIONS-024`.
- **PDF Download (CTCP-4802):** Consolidated into `TC-INSPECTIONS-036`.
- **Web Verification Checks (CTCP-4803–4807):** Mobile-side validation captured in `TC-INSPECTIONS-024` and `TC-INSPECTIONS-029`.

---

### 3.4 `Map` (3 TCs) & `Corporate_List` (2 TCs)
- **Map Functionality (CTCP-4568, 4569, 4570):** Consolidated into `TC-INSPECTIONS-022` (interactive map markers) and `TC-INSPECTIONS-026` (GPS location pinning).
- **Corporate Level Templates (CTCP-4432, 4433):** Covered in `TC-INSPECTIONS-020` (site/corporate selection triggers appropriate template model).

---

## 4. Are Current Tests Adequate Enough for Good Coverage?

### Findings & Verdict: **YES — Comprehensive & Production-Ready**

The test cases in `docs/test-suites/inspections/` (40 TCs) provide **complete, high-coverage, and deterministic test specifications**:

1. **100% Functional Ingestion of TestLink:** All 91 TestLink test cases across 6 sub-suites have been cleanly reconciled and synthesized into 40 distinct, high-value, single-responsibility test cases.
2. **Template Architecture Optimization:** Rather than bloating the test suite with 60+ duplicate test cases per template variant, `test-suites/` uses dynamic data-driven assertions on the unified Flutter inspection engine.
3. **Advanced Mobile-Specific Validations:**
   - On-device photo annotation and image cropping editor (`TC-025`).
   - "Load Last Inspection" finding history replication (`TC-027`).
   - Conveyor-at-risk warning indicators and expandable accordion row sliders (`TC-017`, `TC-018`).
   - Tablet master-detail split-view rendering (`TC-019`).
   - Offline queue persistence, "Upload Pending" badges, background sync auto-recovery, and "Sync Failed" retry handling (`TC-030`, `TC-031`, `TC-032`).
4. **Complete E2E Coverage:** Both online (`TC-INSPECTIONS-039`) and offline-to-online synchronized (`TC-INSPECTIONS-040`) end-to-end user lifecycles are fully documented with Gherkin scenarios.

### Recommendations for Automation Implementation
- **Page Object Design (`src/pages/inspections.page.ts`):** Ensure locators encapsulate the 3-step wizard (`AddInspectionEventScreen`, `InspectionDetailsScreen`, `SummaryStep`), the 3-tab read-only view (`InspectionViewScreen`), and the Google Maps GPS pinning widgets.
- **Media & Photo Mocking:** Implement camera/file picker mock fixtures for automated photo attachment in MobileWright test runners.
- **PDF Report Verification:** Use Playwright download handlers or API response validation to verify generated inspection report integrity.

---

*Gap analysis completed. Master index `docs/gap/index.md` updated.*
