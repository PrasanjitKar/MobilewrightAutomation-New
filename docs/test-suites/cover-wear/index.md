# Cover Wear Test Suite

> Suite: `cover-wear` | Module: `BasicModule.coverWear` (`COVER-WEAR` / `ULTRASONICS - LIFETIME`)  
> Target: Conti+ Mobile (iOS & Android) | Framework: MobileWright + Playwright-BDD  
> Flutter Source: `lib/src/features/coverwear/` & `lib/src/ui/screens/home/` & `lib/src/ui/screens/conveyors/`

---

## 📊 Suite KPI Summary

| Metric | Value |
|--------|-------|
| Total Test Cases | **39** |
| 🟢 Active — Automated | **0 (0%)** |
| 🔵 In Progress | **0** |
| 📋 Planned | **39** |
| 🔴 Blocked (infra) | **0** |
| 🟢 Smoke TCs | **3** |
| 🟡 Regression TCs | **35** |
| 🟣 E2E TCs | **1** |
| Platforms | iOS + Android (`@both`) |
| Environments | STG, PRD |

---

## 🏗️ Architecture & Flutter Implementation Notes

### 1. Permissions & Access Control
- Gated by `BasicModule.coverWear` (`'COVER-WEAR'`).
- Supported permissions in `UserInfoCubit`:
  - `Permission.view`: Controls list access, dashboard card visibility, and event details viewing.
  - `Permission.add`: Controls FAB button visibility on list page (`_canAddModule`) and access to `CoverWearAddScreen`.
  - `Permission.edit`: Controls edit specification button (`CoverWearMode.edit` / `CoverWearEditScreen`) and measurement edit capabilities.
  - `Permission.delete`: Controls popup menu "Delete" action on `CoverWearViewScreen` and individual measurement deletion.
  - `Permission.download`: Controls report download action in `FilePreviewScreen` (`canDownloadCoverWearReport`).

### 2. Cover Wear List & Pagination
- **Screen**: `CoverWearListPage` (`lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart`).
- **BLoC**: `CoverWearListBloc` managing:
  - `CoverWearListLoadEvent`: Loads initial page using `CoverWearListQuery` (with optional `conveyorId`, `searchText`, `filters`, `sortBy`).
  - `CoverWearListLoadNextPageEvent`: Infinite scrolling pagination triggered when scroll remaining <= 220px.
  - `CoverWearDataLoadEvent`: Soft/hard data sync triggering remote refresh.
  - `CoverWearDataSyncEvent`: Sequential sync of pending or failed cover wear records (`sequential()` transformer).
  - `CoverWearLocalNamesBackfillEvent`: Post-frame callback backfilling company and conveyor names in local SQLite/Hive storage.
- **Card/Row Presentation (`CoverWearRow`)**:
  - **Phone View**: Date span (`installedDate - lastRecordingDate`), company/conveyor names, measured cover type (`Top Cover` / `Bottom Cover`), status badge, and trailing widget.
  - **Tablet View**: Multi-column tabular row (Date span [flex 4], Site [flex 3], Conveyor [flex 3], Cover [flex 2], Trailing Gauge/PDF [flex 3], Status badge [flex 2], Right arrow icon).
  - **Trailing Widget States**:
    - Processing: `CircularProgressIndicator(width: 24, height: 24)`.
    - Upload Failed: Tinted red background (`ContinentalColors.uploadFailedRed`) + refresh retry icon (`ContiPlusIcon.refresh_24x24`).
    - Upload Pending: Cream background + upload icon (`ContiPlusIcon.uploadIcon_24x24`).
    - Uploaded/Synced: `Gauge` showing remaining cover percentage + PDF report icon (`ContiPlusIcon.pdf_20x20` / `ContiPlusIcon.pdfGrey_20x20`).

### 3. Add & Edit Cover Wear Events
- **Screens**: `CoverWearAddScreen`, `CoverWearEditScreen`, `CoverWearViewScreen`.
- **BLoC/Cubit**: `CoverWearCubit` (`lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart`).
- **Conveyor Belt Specification Auto-population**:
  - Selecting a conveyor loads top/bottom nominal thicknesses, compounds, carcass, belt width, belt length, and installation date directly into the specification entity.
  - Interactive belt diagram (`CoverWearBeltDiagram`) with toggle for Top vs Bottom cover.
- **Data Points Configuration**:
  - Standard mode: 7 measurement columns.
  - Custom mode: 1 to 40 columns (validated dynamically via `maxNumberOfColumnsAllowed` based on metric/imperial width factors).
- **Event Lifecycle**:
  - `save(true)` invokes `CreateEventUseCase`, initializes an auto-generated Installation Reading, emits `ModelStatus.eventCreated`, and navigates to edit/measurements.
  - Specifications can be edited until more than 1 user measurement is added (`readingCount <= 1`).

### 4. Measurements & Readings (Ultrasonic Data Entry)
- **Screen**: `CoverWearAddMeasurementScreen` (`lib/src/features/coverwear/presentation/pages/cover_wear_add_measurement_screen.dart`).
- **Cubit**: `CoverWearMeasurementCubit`.
- **Measurement Fields**:
  - Inspector Name: Defaulted from logged-in user profile (`defaultInspectorName`).
  - Date Measured: Date picker with epoch timestamp.
  - Surface Temperature: Stored in Celsius, dynamically converted to Fahrenheit if imperial unit is active.
  - Total Tons Conveyed: Stored in Metric Tons (mt), converted to Short Tons (st) for imperial users. Must be >= previous measurement tonnage.
  - Durometer (Shore A): Shore durometer hardness reading.
  - Observations / Comments: Text notes.
  - Photos: Multi-photo attachment via Camera or Gallery with interactive photo viewer modal.
  - Readings Grid: Points 1..N across belt width with `DecimalInputFormatter`. Flagged warning indicators for values exceeding original thickness or zero.
- **Installation Reading Auto-Generation**:
  - Automatically synthesizes an installation reading row using initial nominal thickness, installation date, and durometer.

### 5. Analytics, Gauges & Trend Visualizations
- **Screen/Section**: `CoverWearMeasurementsSection` (`lib/src/features/coverwear/presentation/widgets/cover_wear_measurements_section.dart`).
- **Visual Components**:
  - Remaining Cover Gauge: Semi-circular gauge showing remaining percentage with color-coded condition thresholds.
  - Profile Graph: Cross-sectional wear curve across points 1..N.
  - Degradation Trend Chart (`ContiEchart`): Multi-point linear regression showing projected wear line, Critical Wear Limit date, and Poor condition threshold date.
  - Statistics Breakdown: Tons Conveyed, Number of Years, Wear Rate (tons/mm or tons/mil), Projected Future Tons, Projected Future Life, Estimated Total Life, Estimated Cost Per Ton, Estimated Cost Per Year.

### 6. Filter Modal & Search
- **Filter Modal**: `CoverWearFilterModal` supporting Sort By (`lastModified`, `aToZ`, `zToA`), Company multi-select, and cascading Conveyor multi-select (locked if pre-supplied).
- **Search**: 500ms debounce text search querying site, conveyor, and event metadata.
- **Offline Mode**: Local SQLite/Hive persistence with "Working Offline" banner and automatic post-reconnection sync.

---

## 🗂️ Test Case Registry

| ID | Title | Priority | Type | Smoke | Status |
|---|---|---|---|:---:|---|
| [**TC-COVER-WEAR-001**](./tc-cover-wear-001-list-loads-with-permitted-view.md) | List Loads with Permitted View | Critical | Smoke | 🟢 | 📋 Planned |
| [**TC-COVER-WEAR-002**](./tc-cover-wear-002-add-cover-wear-event-happy-path.md) | Add Cover Wear Event Happy Path | Critical | Smoke | 🟢 | 📋 Planned |
| [**TC-COVER-WEAR-003**](./tc-cover-wear-003-add-measurement-reading-happy-path.md) | Add Ultrasonic Measurement Reading | Critical | Smoke | 🟢 | 📋 Planned |
| [**TC-COVER-WEAR-004**](./tc-cover-wear-004-view-cover-wear-details-and-trend-chart.md) | View Cover Wear Event & Trend Regression Chart | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-005**](./tc-cover-wear-005-navigation-from-dashboard-and-conveyor-hub.md) | Navigation from Dashboard & Conveyor Hub | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-006**](./tc-cover-wear-006-permission-gating-view-add-edit-delete-download.md) | Granular Permission Gating (CRUD + Download) | Critical | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-007**](./tc-cover-wear-007-dashboard-card-counter-and-tablet-split-view.md) | Dashboard Card Counter & Tablet Split View | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-008**](./tc-cover-wear-008-conveyor-hub-card-and-auto-scoped-filter.md) | Conveyor Hub Card & Auto-Scoped Filter | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-009**](./tc-cover-wear-009-fab-button-visibility-and-navigation.md) | Floating Action Button (FAB) Visibility & Action | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-010**](./tc-cover-wear-010-infinite-scroll-pagination.md) | Infinite Scroll Pagination & Threshold Trigger | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-011**](./tc-cover-wear-011-search-with-debounce-filtering.md) | Search with 500ms Debounce Filtering | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-012**](./tc-cover-wear-012-search-clear-and-dismiss.md) | Search Clear & Dismissal | Low | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-013**](./tc-cover-wear-013-empty-state-no-results.md) | Empty State When No Records Found | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-014**](./tc-cover-wear-014-row-presentation-phone-vs-tablet.md) | Responsive Row Presentation (Phone vs Tablet) | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-015**](./tc-cover-wear-015-row-gauge-and-condition-color-thresholds.md) | Row Gauge & Condition Threshold Indicators | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-016**](./tc-cover-wear-016-row-status-badges-uploaded-pending-failed.md) | Status Badges (Uploaded, Pending, Failed) | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-017**](./tc-cover-wear-017-row-failed-upload-tint-and-direct-retry.md) | Failed Upload Row Tint & Direct Retry Tap | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-018**](./tc-cover-wear-018-row-pending-upload-direct-sync.md) | Pending Upload Row & Direct Sync Action | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-019**](./tc-cover-wear-019-local-company-conveyor-name-backfill.md) | Company & Conveyor Name Local Backfilling | Low | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-020**](./tc-cover-wear-020-pdf-report-preview-authenticated-stream.md) | PDF Report Preview & Authenticated Streaming | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-021**](./tc-cover-wear-021-pdf-report-missing-snackbar-notification.md) | Missing PDF Report SnackBar Notification | Low | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-022**](./tc-cover-wear-022-filter-modal-layout-and-counter.md) | Filter Modal Layout & Real-Time Result Counter | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-023**](./tc-cover-wear-023-filter-by-company-multiselect.md) | Filter by Company / Site Multi-Select | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-024**](./tc-cover-wear-024-filter-by-conveyor-cascading-multiselect.md) | Filter by Conveyor Cascading Multi-Select | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-025**](./tc-cover-wear-025-filter-sort-last-modified-a-to-z-z-to-a.md) | Filter Sorting (Last Modified, A-Z, Z-A) | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-026**](./tc-cover-wear-026-filter-active-red-dot-indicator-and-clear.md) | Filter Red Dot Indicator Badge & Clear Reset | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-027**](./tc-cover-wear-027-add-event-conveyor-spec-auto-population.md) | Add Event Conveyor Specification Auto-Population | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-028**](./tc-cover-wear-028-add-event-belt-diagram-top-bottom-switch.md) | Belt Diagram & Interactive Top/Bottom Switch | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-029**](./tc-cover-wear-029-add-event-data-points-standard-vs-custom-range.md) | Data Points Selection (Standard 7 vs Custom Range) | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-030**](./tc-cover-wear-030-add-event-mandatory-validation.md) | Add Event Mandatory Field Validations | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-031**](./tc-cover-wear-031-edit-event-specification-rules.md) | Edit Event Specification Rules & Locking | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-032**](./tc-cover-wear-032-delete-event-confirmation-flow.md) | Delete Cover Wear Event Confirmation Flow | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-033**](./tc-cover-wear-033-measurement-temperature-tonnage-unit-conversion.md) | Measurement Temperature & Tonnage Unit Conversion | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-034**](./tc-cover-wear-034-measurement-grid-entry-and-warning-flags.md) | Measurement Grid Entry & Warning Flag Validation | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-035**](./tc-cover-wear-035-measurement-photo-attachments-and-modal.md) | Measurement Photo Attachments & Viewer Modal | Medium | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-036**](./tc-cover-wear-036-measurement-installation-reading-auto-generation.md) | Installation Reading Auto-Generation & Comparison | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-037**](./tc-cover-wear-037-wear-rate-and-remaining-life-statistics.md) | Wear Rate, Life Projections & Financial Statistics | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-038**](./tc-cover-wear-038-offline-creation-and-auto-sync-on-reconnect.md) | Offline Event Creation & Auto-Sync on Reconnection | High | Regression | | 📋 Planned |
| [**TC-COVER-WEAR-039**](./tc-cover-wear-039-e2e-complete-cover-wear-degradation-lifecycle.md) | E2E Complete Cover Wear Lifecycle | Critical | E2E | 🟣 | 📋 Planned |
