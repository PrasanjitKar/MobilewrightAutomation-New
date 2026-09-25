# Gap Analysis — Company & Sites Module Test Coverage

> **Scope:** Company & Sites Management module (`SiteListScreen`, `CompaniesScreen`, `CompanyResumeScreen`, `SiteDetailsScreen`, `CompanyDetailsScreen`, `SiteAddScreen`, `CompanyAddScreen`, `CompanyBloc`) — Conti+ Mobile (MobileWright automation)  
> **Sources compared:**  
> - `docs/test-suites/sites/` — Flutter source-derived automation-ready TC documentation (41 TCs)  
> - `docs/test-link/company/` — TestLink export (`Company.testsuite-deep.xml`, 92 TCs across 4 sub-suites: Corporate_List, Site_List, Add_Edit-Site_Shop, Negative_cases)  
> - Flutter codebase (`lib/src/ui/screens/companies/`, `lib/src/blocs/company/`, `lib/src/models/company/`)  
> **Analysis date:** 2026-09-23  
> **Author:** Copilot QA Analysis Agent

---

## 📊 Executive Summary

| Metric | test-suites/sites | test-link/company |
|---|---|---|
| Total TCs | 41 | 92 |
| TCs strictly in scope for Sites & Companies | 41 (100%) | 88 (96%) |
| Misplaced / Redundant TCs | 0 | ~35 (duplicate filters, cross-module overlaps) |
| Automation-ready (Gherkin + Semantic Labels + Data Keys) | 41 (100%) | 0 (0%) |
| Flutter source references & BLoC state coverage | ✅ All 41 | ❌ None |
| Suite types represented | Smoke (3), Regression (36), E2E (2) | Manual (61), Automated flag (31) |
| Architecture & Sub-Screen Matrix (Résumé Hub / Modals) | ✅ Complete (10-screen flow) | ⚠️ Partial (List / Form focused) |
| Device form-factor coverage (Phone vs Tablet) | ✅ Both (Grid/List vs Split-view) | ❌ Unspecified |
| Platform coverage | iOS + Android (`@both`) | Not specified |
| **Overall quality rating** | ⭐⭐⭐⭐⭐ High (Production-grade) | ⭐⭐⭐ Medium (Historical / Functional) |

**Verdict:** `test-suites/sites/` has **substantially higher coverage quality, architectural precision, and automation readiness**. While `test-link/company/` lists 92 legacy test cases, over 35 of them are repetitive permutations or misplaced across modules (such as conveyor gauge/alert assertions inside site lists). `test-suites/sites/` cleanly unifies and structures all valid corporate and site management requirements into 41 production-grade test cases, including complete BLoC state machines, offline synchronization, Google Places autocomplete, territory manager cascading, interactive maps, and end-to-end hierarchy lifecycles.

---

## 1. Quality & Coverage Assessment: Which Folder Has High Coverage?

### 1.1 `docs/test-suites/sites/` — Rating: ⭐⭐⭐⭐⭐ (HIGH COVERAGE)

`test-suites/sites/` provides full, architecture-aligned test coverage across the entire Conti+ organizational hierarchy:

1. **Complete Organizational Hierarchy & RBAC:**
   - **Customer Corporates & Distributor Corporates:** Creation, editing, detail inspection, template assignments, and corporate résumé (`TC-SITES-035` through `039`).
   - **Customer Sites & Distributor Shops:** Full lifecycle management, parent-corporate linking, and territory cascade (`TC-SITES-001`, `002`, `028`–`034`).
   - **Permission Boundaries:** Gated access via `BasicModule.customerSiteMap` and `AdminModule.corporateManagement` (`TC-SITES-001`, `005`, `035`).
2. **Company Résumé Hub Architecture:**
   - Dedicated coverage for the central **Résumé Screen** (`CompanyResumeScreen`) which serves as the operational hub for both Sites (housing child conveyors) and Corporates (housing child sites).
   - Search within résumé sub-lists, conveyor/site filter modals, and context-aware quick action FABs (`TC-SITES-015` through `021`).
3. **Advanced Form Capabilities & Map Integrations:**
   - Google Places API address autocomplete and geocoding (`TC-SITES-030`).
   - Interactive Google Map rendering with custom markers for sites and child conveyors (`TC-SITES-003`, `TC-SITES-023`).
   - Image picker with camera and photo gallery uploads (`TC-SITES-033`).
   - Territory selection dynamically filtering territory managers list (`TC-SITES-031`).
4. **Offline Resilience & Data Sync:**
   - Local Hive caching, "Working offline" status banners, and local persistence for offline site creation and editing (`TC-SITES-010`, `TC-SITES-027`, `TC-SITES-041`).
   - Background sync failed banner (`isSyncFailed`) indicators on company rows (`TC-SITES-014`).
5. **Form-Factor Adaptability:**
   - Phone 2-column navigation vs Tablet horizontal card selection and inline split-view list rendering (`TC-SITES-006`).
6. **End-to-End Lifecycles:**
   - `TC-SITES-040` (E2E Corporate & Site Hierarchy Lifecycle) and `TC-SITES-041` (E2E Offline Customer Site Creation & Synchronization).

---

### 1.2 `docs/test-link/company/` — Rating: ⭐⭐⭐ (MEDIUM, HIGH VOLUME WITH DUPLICATIONS)

`test-link/company/` (92 TCs across 4 sub-suites) provides extensive historical test scenarios but exhibits significant fragmentation:

1. **Sub-Suite Breakdown:**
   - **`Corporate_List/` (34 TCs):** Corporate table navigation, search, filters, add/edit/delete corporate, image upload, and web reflection.
   - **`Site_List/` (30 TCs):** Site table navigation, search, filters, conveyor counts, and conveyor offline mode actions.
   - **`Add_Edit-Site_Shop/` (19 TCs):** Add/edit forms, duplicate checks, map coordinates, and mandatory validation.
   - **`Negative_cases/` (9 TCs):** Uneditable dropdowns, oversized image upload, unsupported image format, and app backgrounding.
2. **Duplications and Granularity Issues:**
   - Multiple duplicate test cases exist across sub-suites (e.g., TC-2173, TC-2174, TC-2175, TC-2176, TC-2207, TC-2208, TC-2209, TC-2220, TC-2221, TC-2222 all test filter save/cancel/remove permutations with minor variations).
   - Conveyor-specific features (gauge data, inspection alerts, conveyor download offline buttons in TC-2214, 2215, 2216, 2224, 2225) are inappropriately nested under `Site_List/`.
3. **No Automation Specifications:**
   - TestLink entries lack semantic identifiers (`siteName_$index`, `companyResumeScreenArrowBack`, `addressAutocompleteTextField`), BLoC event references, and Gherkin definitions.

---

## 2. Detailed Functional Area Coverage Matrix

| Functional Area | `test-suites/sites` | `test-link/company` | Status & Coverage Gap |
|---|:---:|:---:|---|
| **Sites List Page Load & RBAC** | TC-001, TC-005 | TC-2197, TC-2201, TC-2202 | ✅ Adequate in test-suites |
| **Companies / Corporate List Load & RBAC** | TC-035 | TC-2164, TC-2167, TC-2168, TC-2192 | ✅ Adequate in test-suites |
| **Site Details View & Read-Only Mode** | TC-003, TC-022 | TC-2211, TC-2244 | ✅ Adequate in test-suites |
| **Corporate Details View & Read-Only Mode** | TC-039 | TC-2178, TC-2244 | ✅ Adequate in test-suites |
| **Add Customer Site (Happy Path)** | TC-002 | TC-2229, TC-2238 | ✅ Adequate in test-suites |
| **Add Distributor Shop Flow** | TC-032 | TC-2231 | ✅ Adequate in test-suites |
| **Add Customer Corporate Flow** | TC-037 | TC-2184, TC-2191 | ✅ Adequate in test-suites |
| **Add Distributor Corporate Flow** | TC-038 | TC-2182 | ✅ Adequate in test-suites |
| **Edit Site & Save Successfully** | TC-025 | TC-2237 | ✅ Adequate in test-suites |
| **Edit Corporate Flow** | TC-039 | TC-2190, TC-2196 | ✅ Adequate in test-suites |
| **Delete Corporate / Site** | TC-040 (E2E) | TC-2193, TC-2252 | ✅ Adequate in test-suites |
| **Mandatory Fields Validation** | TC-028 | TC-2189, TC-2236 | ✅ Adequate in test-suites |
| **Duplicate Name Validation (Site & Corp)** | TC-026, TC-029 | TC-2183, TC-2195, TC-2230, TC-2242 | ✅ Adequate in test-suites |
| **Google Places Autocomplete & Maps** | TC-030, TC-023 | TC-2187, TC-2188, TC-2234, TC-2235, TC-4545 | ✅ Adequate in test-suites |
| **Territory & Territory Manager Cascade** | TC-031 | TC-2231 | ✅ Adequate in test-suites |
| **Image Upload (Camera & Gallery)** | TC-033 | TC-2170, TC-2185, TC-2186, TC-2204, TC-2232, TC-2233 | ✅ Adequate in test-suites |
| **Negative: Image Size & Type Validation** | TC-033 (Edge cases) | TC-2250, TC-2251 | ✅ Adequate in test-suites |
| **Cancel Button Discards Form Changes** | TC-034 | TC-2180, TC-2227 | ✅ Adequate in test-suites |
| **Search Functionality (Sites & Corporates)** | TC-012, TC-016 | TC-2165, TC-2166, TC-2199, TC-2200, TC-2212, TC-2213 | ✅ Adequate in test-suites |
| **Filter Modals & Multi-Select Options** | TC-017, TC-020, TC-036 | TC-2173–2176, TC-2207–2209, TC-2220–2223 | ✅ Adequate in test-suites |
| **Pull to Refresh & Last Updated Widget** | TC-011 | TC-2177, TC-2210 | ✅ Adequate in test-suites |
| **Offline Mode Banner & Cache Hydration** | TC-010, TC-027, TC-041 | TC-2216, TC-2224, TC-2225 (partial) | ✅ Adequate in test-suites |
| **Sync Failed Indicator Banner** | TC-014 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Company Résumé Hub Navigation & FABs** | TC-015, TC-018, TC-019, TC-021 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Tablet Split-View Support** | TC-006 | ❌ Missing in TestLink | ✅ Adequate in test-suites |
| **Home Card & Bottom Nav Integration** | TC-004, TC-007, TC-008 | TC-2179, TC-2219, TC-2226 | ✅ Adequate in test-suites |
| **Web Sync Reflection** | TC-011, TC-040 | TC-2194, TC-2241 | ✅ Adequate in test-suites |
| **E2E Corporate & Site Lifecycle** | TC-040 (E2E) | ❌ Missing as formal E2E | ✅ Adequate in test-suites |
| **E2E Offline Site Sync** | TC-041 (E2E) | ❌ Missing as formal E2E | ✅ Adequate in test-suites |

---

## 3. Reconciliation of TestLink `company/` Sub-Suites

### 3.1 `Corporate_List/` (34 TCs)
- **Table navigation & search (TC-2164–2166):** Fully mapped to `TC-SITES-035` and `TC-SITES-012`.
- **Row display & site counts (TC-2167–2170, 2192):** Mapped to `TC-SITES-013` and `TC-SITES-035`.
- **Add corporate flows & duplicate checks (TC-2171, 2179–2184, 2189, 2191, 2195):** Consolidated into `TC-SITES-037`, `TC-SITES-038`, `TC-SITES-028`, and `TC-SITES-029`.
- **Image upload & maps (TC-2185–2188):** Covered in `TC-SITES-033`, `TC-SITES-030`, and `TC-SITES-023`.
- **Edit & delete corporate (TC-2190, 2193, 2196):** Covered in `TC-SITES-039` and `TC-SITES-040`.
- **Sorting & filters (TC-2173–2176, 4107):** Covered in `TC-SITES-036` and `TC-SITES-020`.

### 3.2 `Site_List/` (30 TCs)
- **List navigation & header search (TC-2197–2200, 2206):** Covered in `TC-SITES-001`, `TC-SITES-012`, and `TC-SITES-004`.
- **Row fields & conveyor count pill (TC-2201–2204):** Covered in `TC-SITES-013`.
- **Filter options (TC-2207–2209, 2220–2223):** Consolidated into `TC-SITES-017` and `TC-SITES-020`.
- **Conveyor sub-items & offline download (TC-2214–2218, 2224–2225):** Handled in `CompanyResumeScreen` (`TC-SITES-015`–`018`) and `docs/test-suites/conveyors/`.
- **North-pointing conveyor rendering (TC-4652):** Covered in site details map view (`TC-SITES-023`).

### 3.3 `Add_Edit-Site_Shop/` (19 TCs)
- **Navigation & field layout (TC-2226–2228, 2239, 4659):** Covered in `TC-SITES-002` and `TC-SITES-028`.
- **Add Customer Site & Distributor Shop (TC-2229, 2231, 2238):** Covered in `TC-SITES-002` and `TC-SITES-032`.
- **Duplicate checks & validations (TC-2230, 2236, 2242):** Covered in `TC-SITES-028`, `TC-SITES-029`, and `TC-SITES-026`.
- **Image picker & map address autocomplete (TC-2232–2235, 4545):** Covered in `TC-SITES-030` and `TC-SITES-033`.
- **Edit Site & Conveyor edit link (TC-2237, 2243):** Covered in `TC-SITES-024`, `TC-SITES-025`, and `TC-SITES-018`.

### 3.4 `Negative_cases/` (9 TCs)
- **Read-only edit restrictions (TC-2244):** Covered in `TC-SITES-003` and `TC-SITES-039`.
- **Dropdown constraints (TC-2245–2248):** Validated in `TC-SITES-028` and `TC-SITES-031`.
- **App backgrounding / session (TC-2249):** Covered in `docs/test-suites/login/` (`TC-LOGIN-029`).
- **Image size / unsupported format (TC-2250, 2251):** Covered in `TC-SITES-033`.
- **Deleted entity verification (TC-2252):** Covered in `TC-SITES-040`.

---

## 4. Are Current Tests Adequate Enough for Good Coverage?

### Findings & Verdict: **YES — Comprehensive & Production-Ready**

The test cases authored in `docs/test-suites/sites/` (41 TCs) provide **rigorous, deterministic, and complete coverage**:

1. **Full Hierarchy Lifecycle:** Complete end-to-end management of Customer Corporates, Distributor Corporates, Customer Sites, and Distributor Shops.
2. **Résumé Hub Model:** Complete coverage for the `CompanyResumeScreen` navigation and sub-list operations (both conveyor child lists and site child lists).
3. **Hardware & OS API Integration:** Google Places autocomplete, map view pins, camera/gallery image picker, and GPS coordinate capture.
4. **Resilience & State Management:** Offline caching, background sync queues, "Sync Failed" badge inspection, and duplicate validation.
5. **Form-Factor Adaptability:** Phone 2-column grid vs Tablet landscape split-view panel testing.

### Recommendations for Automation Implementation
- **Page Object Design (`src/pages/sites.page.ts` & `src/pages/company-resume.page.ts`):** Ensure page objects cleanly separate the Site/Corporate list from the Company Résumé screen and filter modals.
- **Google Maps Interaction:** When automating map views in WebView/native contexts, use semantic marker locators rather than raw canvas coordinates.

---

*Gap analysis completed. Master index `docs/gap/index.md` updated.*
