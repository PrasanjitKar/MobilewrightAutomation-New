# Conveyors — Test Suite

> Module: `conveyors` | Flutter source: `lib/src/ui/screens/conveyors/` + `lib/src/blocs/conveyor/`
> Feature files: `features/regression/conveyors.feature` *(to create)*

---

## 📋 Overview

The **Conveyors** suite covers the tracked-conveyor asset register — the "Conveyors" card on the Dashboard/Home screen (`ConveyorCard`, documented in `TC-DASHBOARD-008`) leads here. This suite documents everything **downstream** of that card:

1. **`ConveyorListScreen`** (`conveyor_list_screen.dart`) — the searchable/filterable list of tracked conveyors, gated by `BasicModule.conveyorsData` + `Permission.view`.
2. **`ConveyorFiltersModal`** (`conveyor_filters_modal.dart`) — sort/filter modal for the list (sort by, criticality, territory, customer corporate, site, inspection-item status).
3. **`ConveyorRow`** (`widgets/conveyor_row.dart`) — the list item widget: name, image, site, cover-wear condition, inspection-status icon + tooltip, pending-upload button, sync-failed banner.
4. **`ConveyorInformationScreen`** (`conveyor_information_screen.dart`) — the per-conveyor hub screen opened on row tap; shows permission-gated cards that deep-link into Technical Data, File Manager, Cover Wear, Inspections, Conveyor Inspect, Belt Scans, Monitoring Devices, and Minuteman Calc.
5. **`ConveyorDetailsScreen`** (`conveyor_details_screen.dart`) — the 3-step **Add/Edit/View Conveyor** stepper form (`Details` → `Conveyor-Lite` → `Installed Belt`), reached from the "Technical Data" card (read-only or edit mode) or from the Home screen's "Add Conveyor" FAB (create mode).
6. **`ConveyorBloc` / `ConveyorListBloc` / `ConveyorDataCubit`** (`lib/src/blocs/conveyor/`) — validation, local-save/offline-sync, delete, and cached-data logic backing the above screens.

> **Out of scope:** **Conveyor Inspect** (`lib/src/blocs/conveyor_inspect/`, `lib/src/ui/screens/conveyor_inspect/`) is a *separate* module/permission (`ConveyorInspectModule.conveyorInspectModule`) reached via its own card on both Dashboard and the Conveyor Information hub — it is documented separately and **not** included here. The `conveyor_tracker` bloc namespace (`lib/src/blocs/conveyor_tracker/`) is **unrelated** to this module — it backs a GPX track-recording tool under `lib/src/ui/screens/tools/gpx/` and is out of scope.

### Screen Flow

```
Home ("Conveyors" card)
  └─▶ ConveyorListScreen (list + search + filters)
        └─▶ tap row ▶ ConveyorInformationScreen (per-conveyor hub)
              ├─▶ "Technical Data" card ▶ ConveyorDetailsScreen (isReadOnly / edit)
              ├─▶ "File Manager" card ▶ FileManagerScreen
              ├─▶ "Cover Wear" card ▶ CoverWearListPage
              ├─▶ "Inspections" card ▶ InspectionListScreen
              ├─▶ "Conveyor Inspect" card ▶ ConveyorInspectListScreen (out of scope)
              ├─▶ "Belt Scans" card ▶ BeltScanListScreen
              ├─▶ "Monitoring Devices" card ▶ MonitoringDeviceListScreen
              └─▶ "Minuteman" card ▶ MinutemanListScreen

Home ("Add" FAB, selected card = Conveyors/Site) ▶ ConveyorDetailsScreen (new ConveyorModel(), create mode)
```

### Conveyor List Screen (`conveyor_list_screen.dart`)

| Element | Semantics Label | Behaviour |
|---|---|---|
| App bar title (guest/free-user push-mode only) | `conveyorListAppbarTitle` | "Conveyors" |
| Back arrow (guest/free-user push-mode only) | `backArrowFromConveyor` | `Navigator.pop()` |
| Offline banner | `offlineTextForConveyor` | Shown when `ListStatus.isOffline`; text = `workingOffline` ("Working offline") |
| Empty/refresh state | `refreshingList` / `noResultsFound` | "Refreshing the list" while loading with 0 items, else "No results found" |
| Last-updated + count widget | `listCountAndLastUpdatedTimeForConveyorList` | `LastUpdatedTimeAndTotalCountWidget(module: 'Conveyor')` |
| List row | `conveyorListItem_$index` | Wraps each `ConveyorRow` |
| Pull-to-refresh | *(no label — `RefreshIndicator`)* | Dispatches `ConveyorListLoadEvent()` |

- Access gated by `BasicModule.conveyorsData` + `Permission.view` — screen renders an empty `Container()` if not permitted (`_ConveyorListScreenState.loadScreen`).
- Search text is passed in via `widget.search` and re-applied on `didUpdateWidget`; the search box itself lives in the shared `ContiAppBar`/search screen, not in this file.
- `dispose()` clears the search (`ConveyorListSearchEvent(search: '')`) and, unless pushed from the search bar, resets filters to defaults (`ConveyorListFilterEvent(filter: const ConveyorFilters())`).
- List data comes from local cache first (`ctp.conveyorManager.getFromCache()`), then refreshed from network when online; falls back to cache with `ListStatus.offline` on failure.

### List Row (`widgets/conveyor_row.dart`)

| Element | Semantics Label |
|---|---|
| Conveyor name | `conveyorName_$index` |
| Conveyor image/avatar | `conveyorImage_$index` |
| Site/company name | `conveyorSiteName_$index` |
| Last update text | `lastUpdateText_$index` |
| Inspection status gauge | `inspectionGauge_$index` (tablet: `inspectionGaugeTab_$index`) |
| "At risk" indicator | `conveyorAtRisk_$index` (tablet: `conveyorAtRiskTab_$index`) |
| Completed check icon | `completedCheck_$index` (tablet: `completedCheckTab_$index`) |
| Upload (pending sync) button | `uploadButtonConveyor_$index` |
| Sync-failed banner | `syncFailedBanner_$index` |
| Cover-wear condition text | `coverWearConditionForConveyor_$index` |

- **Cover-wear condition thresholds** (from latest Cover Wear entity, or the conveyor's own cached `coverWearInfo`): `0 < percentage ≤ 10` → `critical`; `10 < percentage ≤ 30` → `poor`; `30 < percentage ≤ 100` → `good`; otherwise `N/A`.
- **Status icon priority**: if the conveyor id appears in any inspection item's `conveyorAtRisk` list → "at risk" icon takes priority over completed/to-be-completed icons. Otherwise: `completed > 0 && toBeCompleted == 0` → completed check icon; `toBeCompleted != 0` → caution icon + badge; else a dash placeholder.
- Tapping the inspection gauge shows a tooltip (`onTapToolTip`) listing `critical`/`poor`/`fault`/`good` counts with colour-coded flag icons (`flagRed`/`flagOrange`/`flagYellow`/`flagGreen`).
- The pending-upload button dispatches `ConveyorSyncInitiateEvent(conveyor: conveyor)`; it is visible only when `conveyor.isPending == true`. The sync-failed banner is a visual-only indicator shown when `conveyor.isSyncFailed == true`.
- Row tap navigates to `ConveyorInformationScreen(conveyorId: conveyorId, isFreeUser: ...)` (route `RouteNameKeys.conveyorInformationScreen`, internally named `'company_information_screen'`), then reloads the list in the background (`ConveyorListLoadEvent(onlyLoading: true)`) on return.

### Filters Modal (`conveyor_filters_modal.dart`)

Backed by `ConveyorFilters` (`conveyor_list_event.dart`):

| Filter | Semantics Label(s) | Options |
|---|---|---|
| Sort by | `radioButtonLastModified` / `radioButtonAToZ` / `radioButtonZToA` | Last Modified (default), A→Z, Z→A |
| Critical | `criticalDropdown` | Yes (`id: '1'`), No (`id: '0'`) |
| Territory | `territoryDropdown` (tablet: `territoryDropdownForTab`) | Populated from `MarketCubit`; disabled until markets are loaded |
| Customer Corporate | `customerCorporateDropdown` (tablet: `customerCorporateDropdownForTab`) | Derived from company data |
| Site | `siteDropdown` (tablet: `siteDropdownForTab`) | Derived from company data |
| Inspection Items | `inspectionItemsDropdown` (tablet: `inspectionItemsDropdownForTab`) | Complete (`'1'`), To be completed (`'0'`), NA (`'2'`) |

- **Cascading reset**: selecting a Territory clears Customer Corporate + Site; selecting Customer Corporate clears Site; selecting Criticality clears Territory/Customer Corporate/Site.
- **Apply** dispatches `ConveyorListFilterEvent(filter: ConveyorFilters(sortBy, territoryIds, customerCorporateIds, siteIds, filterInspectionItems, criticality))` then closes the modal.
- **Clear** resets all fields locally (increments an internal `_clearFiltersCounter` to force-rebuild the subtree) without dispatching until Apply is pressed.
- **Cancel** discards in-progress modal changes and closes without dispatching.
- A live result-count preview is computed via `ConveyorFilterHelper.getFilteredConveyorData()` while the modal is open.
- A related but distinct modal, `site_conveyors_filters_modal.dart`, is the **site-scoped** variant used from a company/site's own conveyor sub-list (it always applies `siteIds: [site.companyId]` and offers only sort/inspection-items/cover-wear filters) — out of scope for this suite's TCs but noted for reference.

### Conveyor Information Screen (`conveyor_information_screen.dart`)

Opened on row tap; loads `LoadConveyorDetailsEvent(conveyorId: ...)` in `initState()`. App bar title semantic `conveyorInformationTitle`, back arrow `backArrowFromConveyorInfo`.

| Card | Semantics Label | Permission Gate | Navigates To |
|---|---|---|---|
| Technical Data | `technicalDataCard` | `BasicModule.conveyorsData` / `Permission.view` | `ConveyorDetailsScreen(isReadOnly: true)` (route `conveyorDetailsScreen`) |
| File Manager | `fileManagerCard` | `BasicModule.uploadDownloadFiles` / `Permission.view` | `FileManagerScreen` |
| Cover Wear | `coverWearCard` | `BasicModule.coverWear` / `Permission.view` | `CoverWearListPage(conveyorId: ...)` |
| Inspections | `inspectionCard` | `InspectionModule.inspectionModule` / `Permission.view` | `InspectionListScreen` (or `AppLoadEvent(selectedPage: 4, ...)` for full users) |
| Conveyor Inspect *(out of scope)* | `conveyorInspectLabel` | `ConveyorInspectModule.conveyorInspectModule` / `Permission.view` | `ConveyorInspectListScreen` |
| Belt Scans | `beltScanCard` | `BasicModule.beltScan` / `Permission.view` | `BeltScanListScreen(conveyorId: ...)` |
| Monitoring Devices | `monitoringDeviceCard` | `IOTModule.beltMonitoring` / `Permission.view` | `MonitoringDeviceListScreen` |
| Minuteman Calc. | `minutemanCard` | `BasicModule.minutemanConveyor` **or** `BasicModule.minutemanElevator` / `Permission.view` | `MinutemanListScreen(conveyorId: ...)` |

- On load failure, shows a `somethingWentWrong` snackbar and pops back automatically.
- Back navigation clears the file-manager list (`FileManagerListLoadEvent(relatedType: 'conveyor', clearBlocData: true)`); if not opened from Company Résumé, it also dispatches `AppLoadEvent(selectedPage: 1, conveyorsList: ...)` and pops all the way to Home (`popUntil((route) => route.isFirst)`).

### Conveyor Details Screen — Add/Edit/View Stepper (`conveyor_details_screen.dart`)

A 3-step `EnhanceStepper` (icons via `ConveyorStepIcon`, nav via `ConveyorStepperControls`):

1. **Details** (`details_step.dart`) — `AppLocalizations.details`
2. **Conveyor-Lite** (`conveyor_lite_step.dart`) — `AppLocalizations.conveyorLite`
3. **Installed Belt** (`installed_belt_step.dart`) — `AppLocalizations.installedBelt`

| Mode | Bottom action button | Trigger |
|---|---|---|
| New conveyor | `create` | `widget.conveyor.conveyorId == null` |
| Existing, read-only | `edit` | `isReadOnly == true` |
| Existing, editing | `save` | `isReadOnly == false` (after tapping `edit`) |

- **Permission gating** (`BasicModule.conveyorsData`): `Permission.add` shows/enables `create`; `Permission.edit` shows/enables `edit`/`save`; `Permission.delete` shows the delete icon (visible only when `isReadOnly == true`, i.e. viewing an existing conveyor, and not a free/guest user).
- **Delete flow**: tapping delete opens a confirmation dialog (`confirmation` / `deleteConveyors` — "Are you sure you want to delete the following conveyor(s)?") then dispatches `ConveyorDeleteEvent(conveyor, isFreeUser)`.
- **Save flow**: dispatches `ConveyorValidateAndSaveToLocalEvent(conveyor, isFreeUser)`. `ConveyorBloc` validates before saving:
  - Conveyor **name is required** → `ConveyorFailState(error: name)` → snackbar `conveyorNameError` ("Conveyor Name is required")
  - **Customer site is required** → `error: customer` → `conveyorCustomerError` ("Customer Site Field is required")
  - **Top cover thickness must be ≥ bottom cover thickness** → `error: bottomBiggerThanTop` → `conveyorBottomBiggerThanError` ("Top Cover Thickness is lower than Bottom Cover Thickness")
  - **Duplicate name** → `error: exist` → `conveyorNameExist` ("Conveyor name is already exist")
  - Any other failure → generic `somethingWentWrong`
  - On success: `ConveyorSavingLocalState` → snackbar `conveyorSavedLocally` ("Conveyor Saved Locally"); free users instead update the cache directly and get `ConveyorUpdateState`.
  - After successful local save, `Navigator.pop(context, conveyor)` returns to the caller (Information screen refreshes; Home FAB flow returns to Home).
- **Offline/sync behaviour**: non-free-user saves are queued as pending and trigger `ConveyorSyncState`; the row's pending-upload button / sync-failed banner (see List Row above) reflect this until the background sync succeeds or fails.
- Semantics: `conveyorDetailsAppbarTitle`, `appbarBackButton`, `deletePopupButton`, `detailsStep_$_index`, `conveyorLiteStep_$_index`, `installedBeltStep_$_index`, `bottomActionButton` (tablet: `bottomActionButtonTab`), `cancelButton`/`cancelButtonTab`, `previousButton`/`previousButtonTab`, `nextButton`/`nextButtonTab`.

#### Step 1 — Details (`details_step.dart`)

| Field | Semantics Label | Notes |
|---|---|---|
| Conveyor image picker | `conveyorImageAvatar` | Optional |
| Conveyor name | `conveyorNameTextField` (tablet: `conveyorNameTextFieldTab`) | Required |
| Distributor/shop | *(dropdown, label only)* | `distributor` |
| Customer site | *(dropdown, label only)* | `customerSite` — required |
| Critical switch | *(switch, label only)* | `critical` / tooltip `critical_tooltip` |
| Head latitude/longitude | `headLatitudeField` / `headLongitudeField` | `coordinatesHead` |
| Tail latitude/longitude | `tailLatitudeField` / `tailLongitudeField` | `coordinatesTail` |

#### Step 2 — Conveyor-Lite (`conveyor_lite_step.dart`)

Conveyor dynamics fields: belt width dropdown (`beltWidthDropdown`), belt speed (`beltSpeedTextField`), tons per hour peak (`tonsPerHourPeakTextField`), pick-material-name autocomplete, material density, angle of idlers (`angleOfIdlersTextField`, tablet `angleOfIdlersTextFieldTab`), carry-side idler selector, drive wrap (`driveWrapDropdown`) + drive wrap angle (`driveWrapAngleDropdown`), takeup tension selector, friction factor radio (`frictionFactorRadioButton`, label `frictionFactorLabel`) with derived disabled fields (`frictionFactorDisabledField`, `lengthFactorDisabledField`), surcharge angle, idler offset, take-up details, and the embedded **`ConveyorStations`** widget (see below).

#### `ConveyorStations` widget (`widgets/conveyor_stations.dart`)

Represents up to 6 numbered stations along the conveyor route, each with a checkbox (`checkboxForStations_$index`) plus mutually-exclusive **Drive** (`driveRadioButton_$index`) and **Take-up** (`takeUpRadioButton_$index`) radio selections.

- Enabling a station auto-enables all **preceding** stations.
- Disabling a station clears all **following** stations, and moves the Drive/Take-up selection back one station if it was on a now-disabled station.
- Only one station can be Drive and only one can be Take-up at any time.

#### Step 3 — Installed Belt (`installed_belt_step.dart`)

Belt specification fields (`beltSpecifications`): manufacturer, construction, rating/breaking strength, width, carcass type (switches the form between **number of plies** — `noOfPilesTextField`/`noOfPilesTextFieldTab` — and **number of cords + cord pitch/diameter** — `noOfCordsTextField`/`noOfCordsTextFieldTab`, `cordPitch`, `cordDiameter` — depending on carcass type "ST"), top/bottom cover compound, top/bottom cover thickness (validated top ≥ bottom, see above), top/bottom reinforcement breaker; installation details (`installationDateField`/`installationDate`, `splicesQty`); drive details; and the same `ConveyorStations` table repeated for the installed-belt context.

### Add Conveyor Entry Point (Home FAB)

The "Add Conveyor" speed-dial option (semantic `addConveyor`, label `AppLocalizations.addConveyor` — "Add Conveyor") on the Home screen's FAB (documented in `TC-DASHBOARD-029`/`030`) opens `ConveyorDetailsScreen(conveyor: ConveyorModel())` (route `RouteNameKeys.conveyorDetailsScreen`) directly in create mode, bypassing the list/information screens.

---

## 📊 KPI

| Metric | Value |
|--------|-------|
| Total Test Cases | 34 |
| 📋 Planned | 34 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |
| 🔴 Blocked (infra) | 0 |
| 🟢 Smoke TCs | 2 |
| 🟡 Regression TCs | 32 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗒️ Test Cases

### 🟢 Smoke

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-CONVEYORS-001](./tc-conveyors-001-list-loads-with-permitted-view.md) | Conveyors list loads with tracked conveyors for a permitted user | Critical | 📋 Planned |
| [TC-CONVEYORS-002](./tc-conveyors-002-add-conveyor-happy-path.md) | Add Conveyor — create a new conveyor with required fields (happy path) | Critical | 📋 Planned |

### 🟡 Regression — List & RBAC

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-CONVEYORS-003](./tc-conveyors-003-list-hidden-without-view-permission.md) | Conveyors list is hidden for users without view permission | High | 📋 Planned |
| [TC-CONVEYORS-004](./tc-conveyors-004-empty-state-no-results-found.md) | Empty state shows "No results found" when the list is empty | Medium | 📋 Planned |
| [TC-CONVEYORS-005](./tc-conveyors-005-offline-banner-and-cached-list.md) | Offline banner is shown and list loads from cache when offline | High | 📋 Planned |
| [TC-CONVEYORS-006](./tc-conveyors-006-search-filters-list-by-name.md) | Search filters the conveyor list by name | High | 📋 Planned |
| [TC-CONVEYORS-007](./tc-conveyors-007-pull-to-refresh-reloads-list.md) | Pull-to-refresh reloads the list and updates the last-updated/count widget | High | 📋 Planned |
| [TC-CONVEYORS-008](./tc-conveyors-008-sort-order-last-modified-default.md) | Default sort order is Last Modified; A→Z / Z→A options reorder the list | Medium | 📋 Planned |

### 🟡 Regression — List Row & Status

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-CONVEYORS-009](./tc-conveyors-009-row-displays-core-fields.md) | Conveyor row displays name, image, site, and last-updated text | Medium | 📋 Planned |
| [TC-CONVEYORS-010](./tc-conveyors-010-row-cover-wear-condition-thresholds.md) | Row cover-wear condition reflects critical/poor/good/N-A thresholds | Medium | 📋 Planned |
| [TC-CONVEYORS-011](./tc-conveyors-011-row-inspection-tooltip-breakdown.md) | Row inspection-status tooltip shows critical/poor/fault/good breakdown | Medium | 📋 Planned |
| [TC-CONVEYORS-012](./tc-conveyors-012-row-at-risk-indicator-priority.md) | "At risk" indicator takes priority over completed/to-be-completed icons | Medium | 📋 Planned |
| [TC-CONVEYORS-013](./tc-conveyors-013-row-pending-upload-and-sync-failed.md) | Pending-upload button triggers sync; sync-failed banner shown on failure | High | 📋 Planned |

### 🟡 Regression — Filters

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-CONVEYORS-014](./tc-conveyors-014-filter-sort-by-options.md) | Filter modal — Sort By options (Last Modified / A→Z / Z→A) | Medium | 📋 Planned |
| [TC-CONVEYORS-015](./tc-conveyors-015-filter-by-criticality.md) | Filter by Critical (Yes/No) | Medium | 📋 Planned |
| [TC-CONVEYORS-016](./tc-conveyors-016-filter-territory-corporate-site-cascade.md) | Filter Territory → Customer Corporate → Site cascading reset | Medium | 📋 Planned |
| [TC-CONVEYORS-017](./tc-conveyors-017-filter-by-inspection-items-status.md) | Filter by Inspection Items status (Complete / To be completed / NA) | Medium | 📋 Planned |
| [TC-CONVEYORS-018](./tc-conveyors-018-clear-filters-resets-all-fields.md) | Clear Filters resets all filter fields without applying | Medium | 📋 Planned |
| [TC-CONVEYORS-019](./tc-conveyors-019-cancel-filter-modal-discards-changes.md) | Cancel closes the filter modal and discards unsaved changes | Low | 📋 Planned |

### 🟡 Regression — Add Conveyor / Details Step

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-CONVEYORS-020](./tc-conveyors-020-fab-opens-add-conveyor-stepper.md) | "Add Conveyor" FAB opens the 3-step form on the Details step | High | 📋 Planned |
| [TC-CONVEYORS-021](./tc-conveyors-021-details-step-required-field-validation.md) | Details step — required-field validation (name, customer site) | Critical | 📋 Planned |
| [TC-CONVEYORS-022](./tc-conveyors-022-details-step-coordinates-fields.md) | Details step — head/tail latitude/longitude coordinate fields | Low | 📋 Planned |
| [TC-CONVEYORS-023](./tc-conveyors-023-details-step-critical-switch.md) | Details step — Critical switch toggles and shows tooltip | Medium | 📋 Planned |
| [TC-CONVEYORS-024](./tc-conveyors-024-stepper-next-previous-navigation.md) | Stepper Next/Previous navigation across Details/Conveyor-Lite/Installed Belt | High | 📋 Planned |

### 🟡 Regression — Conveyor-Lite Step

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-CONVEYORS-025](./tc-conveyors-025-conveyor-lite-dynamics-fields.md) | Conveyor-Lite step — conveyor dynamics fields accept and persist values | Medium | 📋 Planned |
| [TC-CONVEYORS-026](./tc-conveyors-026-conveyor-stations-cascading-selection.md) | Conveyor Stations — cascading enable/disable + single Drive/Take-up selection | Medium | 📋 Planned |

### 🟡 Regression — Installed Belt Step

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-CONVEYORS-027](./tc-conveyors-027-installed-belt-carcass-conditional-fields.md) | Installed Belt step — carcass type toggles plies vs. cords/pitch/diameter fields | Medium | 📋 Planned |
| [TC-CONVEYORS-028](./tc-conveyors-028-save-validation-thickness-and-duplicate-name.md) | Save validation — top/bottom cover thickness rule and duplicate-name check | High | 📋 Planned |

### 🟡 Regression — Edit / Delete / Read-only / Offline Save

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-CONVEYORS-029](./tc-conveyors-029-technical-data-read-only-view.md) | Technical Data opens read-only for users without edit permission | High | 📋 Planned |
| [TC-CONVEYORS-030](./tc-conveyors-030-edit-existing-conveyor-and-save.md) | Edit an existing conveyor and save changes | High | 📋 Planned |
| [TC-CONVEYORS-031](./tc-conveyors-031-delete-conveyor-confirmation-and-flow.md) | Delete conveyor — permission gating, confirmation dialog, delete flow | High | 📋 Planned |
| [TC-CONVEYORS-032](./tc-conveyors-032-save-offline-pending-sync.md) | Saving a conveyor while offline stores it locally and queues a pending sync | Medium | 📋 Planned |

### 🟡 Regression — Conveyor Information Hub

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-CONVEYORS-033](./tc-conveyors-033-information-hub-permission-gated-cards.md) | Conveyor Information hub shows permission-gated navigation cards | High | 📋 Planned |
| [TC-CONVEYORS-034](./tc-conveyors-034-information-hub-back-navigation.md) | Back navigation from Conveyor Information hub returns to Home/list correctly | Medium | 📋 Planned |

---

## 📂 Automation Artefacts

| Artefact | Path |
|----------|------|
| Feature file — regression | `features/regression/conveyors.feature` *(to create)* |
| Step definitions | `src/steps/conveyors.steps.ts` *(to create)* |
| Page object — Conveyors List | `src/pages/conveyor-list.page.ts` *(to create; existing `conveyor.page.ts` covers Home-card pieces and can be reused/extended)* |
| Page object — Conveyor Information Hub | `src/pages/conveyor-information.page.ts` *(to create)* |
| Page object — Conveyor Details Stepper | `src/pages/conveyor-details.page.ts` *(to create)* |
| Test data | `resources/data/testdata.csv`, `resources/data/conveyorsdata.csv` *(to create)* |

---

## 🔍 Flutter Source Reference

| File | Purpose |
|------|---------|
| `lib/src/ui/screens/conveyors/conveyor_list_screen.dart` | `ConveyorListScreen` — list, search, offline banner, empty state, RBAC gate |
| `lib/src/ui/screens/conveyors/widgets/conveyor_row.dart` | `ConveyorRow` — list item content, status icons, tooltip, upload/sync-failed |
| `lib/src/ui/screens/conveyors/conveyor_filters_modal.dart` | `ConveyorFiltersModal` — sort/filter UI, cascading resets |
| `lib/src/ui/screens/conveyors/conveyor_information_screen.dart` | `ConveyorInformationScreen` — per-conveyor hub with permission-gated cards |
| `lib/src/ui/screens/conveyors/conveyor_details_screen.dart` | `ConveyorDetailsScreen` — 3-step Add/Edit/View stepper, validation, delete |
| `lib/src/ui/screens/conveyors/widgets/conveyor_step/details_step.dart` | Step 1 — name, distributor, customer site, critical switch, coordinates |
| `lib/src/ui/screens/conveyors/widgets/conveyor_step/conveyor_lite_step.dart` | Step 2 — conveyor dynamics fields + embedded `ConveyorStations` |
| `lib/src/ui/screens/conveyors/widgets/conveyor_step/installed_belt_step.dart` | Step 3 — belt specification + installation details |
| `lib/src/ui/screens/conveyors/widgets/conveyor_stations.dart` | `ConveyorStations` — station/drive/take-up cascading selection widget |
| `lib/src/ui/screens/conveyors/widgets/conveyor_step_icon.dart` / `conveyor_step/conveyor_stepper_controls.dart` | Stepper icon + Previous/Next controls |
| `lib/src/ui/screens/conveyors/widgets/conveyor_input_date_field.dart` / `conveyor_input_dropdown_field.dart` / `conveyor_input_time_field.dart` | Shared form input wrappers used across the stepper |
| `lib/src/blocs/conveyor/list/conveyor_list_bloc.dart` (+ `_event.dart`, `_state.dart`) | `ConveyorListBloc` — load/filter/search, `ConveyorFilters` |
| `lib/src/blocs/conveyor/detail/conveyor_bloc.dart` (+ `_event.dart`, `_state.dart`) | `ConveyorBloc` — validate/save/delete/sync + `LoadConveyorDetailsEvent` |
| `lib/src/blocs/conveyor/cubit/conveyor_data_cubit.dart` | `ConveyorDataCubit` — cached/sorted conveyor lookups by site |
| `lib/src/ui/app.dart` | Home "Add Conveyor" FAB entry point → `ConveyorDetailsScreen(conveyor: ConveyorModel())` |
| `lib/src/common/strings/log_event_keys.dart` | `RouteNameKeys` — `conveyorListScreen`, `conveyorDetailsScreen`, `conveyorInformationScreen` |
| `lib/src/l10n/app_en.arb` | All English i18n strings (field labels, validation errors, `addConveyor`, `deleteConveyors`) |

---

## ⏳ Automation Roadmap

| Sprint | TCs | Focus |
|--------|-----|-------|
| **Sprint 1** | TC-001, TC-002, TC-003, TC-006, TC-021 | Smoke — list load, add happy path, RBAC, search, required-field validation |
| **Sprint 2** | TC-004, TC-005, TC-007, TC-008 | List states — empty, offline, refresh, sort |
| **Sprint 3** | TC-009 – TC-013 | List row content + status icons + sync/upload |
| **Sprint 4** | TC-014 – TC-019 | Filters modal (all fields + clear/cancel) |
| **Sprint 5** | TC-020, TC-022, TC-023, TC-024 | Details step remaining fields + stepper navigation |
| **Sprint 6** | TC-025 – TC-028 | Conveyor-Lite + Installed Belt steps + save validation |
| **Sprint 7** | TC-029 – TC-032 | Read-only / edit / delete / offline save |
| **Sprint 8** | TC-033, TC-034 | Conveyor Information hub cards + back navigation |
