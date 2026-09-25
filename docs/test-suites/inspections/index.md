# Inspections Test Suite

> Suite: `inspections` | Total TCs: **40** | 🟢 Smoke: **3** | 🟡 Regression: **35** | 🟣 E2E: **2** | Status: 📋 Planned

---

## 📋 Overview

The **Inspections** module in Conti+ provides mobile capabilities for conveyor system health inspections, asset defect tracking, condition scoring (Good, Fault, Poor, Critical), GPS geolocation pinning, photo evidence capture with on-device annotation, historical inspection comparison, and PDF report generation.

Testing covers Flutter BLoC state management (`InspectionListBloc`, `InspectionDetailsCubit`), Hive local persistence, offline inspection capture, background photo sync, template-driven dynamic forms, and responsive mobile/tablet layouts.

---

## 🏗️ Architecture & BLoC Flow

```
HomeScreen / AppBottomNav / ConveyorDetails
       │
       ▼
InspectionListScreen  ◄──►  InspectionListBloc
 (Offline banner, Search, Filters, Badges)
       │
       ├─► AddInspectionEventScreen  ◄──►  InspectionDetailsCubit
       │    (Event info: Site, Conveyor, Date, Name, Map)
       │         │
       │         ▼
       ├─► InspectionDetailsScreen  ◄──►  InspectionDetailsCubit
       │    ├─ Step 1: InspectionEventStep
       │    ├─ Step 2: InspectionItemStep ──► InspectionItemDetails / SpliceConditionItemScreen
       │    └─ Step 3: SummaryStep
       │
       └─► InspectionViewScreen (Read-only / Tabs: Info, Items, Summary, PDF Report)
```

### Key BLoC Events & States

| BLoC / Cubit | Event / Action | Resulting State / UI Effect |
|---|---|---|
| `InspectionListBloc` | `InspectionListLoadEvent(hardLoad: false)` | Emits cached inspections, then loads network data |
| `InspectionListBloc` | `InspectionListFilterEvent(inspectionFilters)` | Filters list by corporate, site, conveyor, condition, status, sort |
| `InspectionListBloc` | `InspectionListSearchEvent(search)` | Filters inspections by name (case-insensitive) |
| `InspectionListBloc` | `InspectionListSyncAllEvent()` | Uploads offline pending inspections & images, generates reports |
| `InspectionListBloc` | `InspectionListDeleteEvent(inspection)` | Deletes local pending record or triggers remote deletion API |
| `InspectionDetailsCubit` | `newInspection(conveyorModel)` | Initializes fresh `InspectionModel` with default name and inspector |
| `InspectionDetailsCubit` | `setSiteForInspection(company)` | Links site, territory, customer corporate, and loads inspection template |
| `InspectionDetailsCubit` | `createInspectionEvent()` | Creates event on backend or saves locally if offline |
| `InspectionDetailsCubit` | `addItem(item)` / `addHistoryItem()` | Adds new finding or copies previous inspection items |
| `InspectionDetailsCubit` | `saveInspection()` | Saves full inspection object to Hive cache with `isPending: true` |

---

## 🏷️ Semantic Labels & Locators

| Component | Semantic Label / Key | Description |
|---|---|---|
| **Inspection List** | `inspectionListAppbarTitle` | App bar title "Inspections" |
| | `offlineTextForInspection` | "Working offline" status banner |
| | `noResultsFound` | Empty state text |
| | `listCountAndLastUpdatedTimeForInspectionList` | Total list count and last sync timestamp |
| | `inspectionListItem_$index` | Row item container at index `$index` |
| | `inspectionName_$index` | Inspection name text |
| | `siteName_$index` | Site name label |
| | `inspectorName_$index` | Inspector name label |
| | `inspectionDate_$index` | Inspection date display |
| | `inspectioncount_$index` | Pill showing conveyor count with tooltip trigger |
| | `status_$index` | "Uploaded" / "Upload Pending" status badge |
| | `syncFailed_$index` | "Sync Failed" error badge |
| | `conveyorAtRisk_$index` | Warning triangle icon for conveyors at risk |
| | `expandItem_$index` | Accordion arrow to expand/collapse item preview |
| | `inspectionItem_$index` | Individual preview card inside expanded row |
| **Filters Modal** | `lastModified`, `aToZ`, `zToA`, `uploaded`, `uploadPending` | Sort options |
| | `applyFiltersButton`, `clearFiltersButton` | Filter modal actions |
| **Add / Edit Event** | `addInspectionEventAppbarTitle` | Add inspection screen header |
| | `editInspectionEventAppbarTitle` | Edit inspection screen header |
| | `nextButton`, `cancelButton`, `saveButton` | Form step buttons |
| | `inspectionName`, `inspectorName`, `productivityInputField`, `uptimeInputField` | Form fields |
| | `siteMap`, `inspectionMap` | Interactive Google Map widget |
| **Inspection Details**| `inspectionEventDetailsTile`, `inspectionItemDetailsTile`, `summaryTile` | Step accordion headers |
| | `addItemButton` | Add item button for asset section |
| **Item Details** | `goodFlag`, `faultFlag`, `poorFlag`, `criticalFlag` | Condition radio buttons |
| | `itemStatusRadioButton`, `itemStatusRadioGroup` | Status (To be completed vs Completed) |
| | `uploadImagesButton`, `addInspectionImage`, `deleteImageIconButton` | Photo management |
| **View Screen** | `tabBar`, `inspectionInfoStep`, `inspectionItemStep`, `summaryStep` | 3 Tab views |
| | `inspectionPopupMenu`, `previewPdfText`, `deleteText` | Popup menu items |

---

## 📊 KPI Summary

| Metric | Value |
|---|---|
| Total Test Cases | **40** |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 Active — In Progress | 0 |
| 📋 Planned | 40 |
| 🔴 Blocked (infra) | 0 |
| 🟢 Smoke | 3 |
| 🟡 Regression | 35 |
| 🟣 E2E | 2 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗂️ Test Case Registry

| ID | Title | Priority | Type | Tags | Status |
|---|---|:---:|:---:|---|:---:|
| [**TC-INSPECTIONS-001**](./tc-inspections-001-inspection-list-loads-with-permitted-view.md) | Inspection List — loads inspection records with permitted view | High | Smoke | `@smoke @both` | 📋 Planned |
| [**TC-INSPECTIONS-002**](./tc-inspections-002-create-inspection-event-happy-path.md) | Add Inspection — create new inspection event happy path | High | Smoke | `@smoke @both` | 📋 Planned |
| [**TC-INSPECTIONS-003**](./tc-inspections-003-inspection-view-details-and-pdf-preview.md) | Inspection View — view details across 3 tabs and preview PDF report | High | Smoke | `@smoke @both` | 📋 Planned |
| [**TC-INSPECTIONS-039**](./tc-inspections-039-e2e-full-inspection-workflow.md) | Full Inspection Workflow — create, evaluate items, media, and PDF report | Critical | E2E | `@e2e @both` | 📋 Planned |
| [**TC-INSPECTIONS-040**](./tc-inspections-040-e2e-offline-inspection-execution-and-sync.md) | Offline Inspection — offline execution with photos and auto cloud sync | High | E2E | `@e2e @both` | 📋 Planned |
| [**TC-INSPECTIONS-004**](./tc-inspections-004-home-inspection-card-count-and-navigation.md) | Home Dashboard — Inspection card displays summary counters and navigates | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-005**](./tc-inspections-005-inspection-list-hidden-without-view-permission.md) | Permissions — Inspection list hidden when view permission is revoked | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-006**](./tc-inspections-006-bottom-nav-inspections-tab-navigation.md) | Navigation — Bottom navigation bar Inspections tab opens list | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-007**](./tc-inspections-007-home-fab-speed-dial-add-inspection.md) | Floating Action Button — Speed Dial adds inspection from Home/List | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-008**](./tc-inspections-008-empty-state-no-results-found.md) | Empty State — displays "No results found" when inspection list is empty | Low | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-009**](./tc-inspections-009-offline-banner-and-cached-inspection-list.md) | Offline Mode — displays "Working offline" and serves cached records | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-010**](./tc-inspections-010-pull-to-refresh-syncs-inspections.md) | Pull to Refresh — triggers background sync and reloads list | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-011**](./tc-inspections-011-search-filters-inspections-by-name.md) | Search — real-time query filters inspections by name | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-012**](./tc-inspections-012-filter-modal-by-corporate-site-and-conveyor.md) | Filter Modal — filter inspections by Corporate, Site, and Conveyor | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-013**](./tc-inspections-013-filter-modal-by-condition-and-status.md) | Filter Modal — filter inspections by Item Condition and Item Status | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-014**](./tc-inspections-014-filter-modal-sort-options.md) | Filter Modal — sort inspections by Last Modified, A-Z, Z-A, Upload Pending, Uploaded | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-015**](./tc-inspections-015-inspection-row-metadata-and-condition-badges.md) | Inspection Row — verifies date, inspector, site, and condition flag badges | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-016**](./tc-inspections-016-conveyor-count-pill-and-tooltip.md) | Conveyor Count Pill — displays distinct conveyor count and shows popup tooltip | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-017**](./tc-inspections-017-conveyor-at-risk-warning-indicator.md) | Conveyor at Risk — warning icon displayed when inspection flags risk | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-018**](./tc-inspections-018-expandable-accordion-row-item-slider.md) | Expandable Row — accordion expands to display horizontal inspection item slider | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-019**](./tc-inspections-019-tablet-split-view-inspection-selection.md) | Tablet Layout — tablet split view with sticky list and detailed card highlights | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-020**](./tc-inspections-020-add-inspection-event-site-selection-auto-naming.md) | Add Event — site selection auto-generates name and populates template | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-021**](./tc-inspections-021-add-inspection-event-mandatory-validation.md) | Add Event — mandatory fields validation disables Next button | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-022**](./tc-inspections-022-add-inspection-event-interactive-map-markers.md) | Add Event — interactive map renders site/conveyor GPS pins | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-023**](./tc-inspections-023-add-inspection-event-productivity-uptime-fields.md) | Add Event — productivity and uptime percentage fields validation | Low | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-024**](./tc-inspections-024-add-inspection-item-condition-and-status.md) | Add Item — select asset condition (Good/Fault/Poor/Critical) and status | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-025**](./tc-inspections-025-add-inspection-item-photo-upload-and-editor.md) | Add Item — capture/upload up to 3 photos with on-device annotation/crop | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-026**](./tc-inspections-026-add-inspection-item-gps-location-pinning.md) | Add Item — automatic GPS location capture and map pinpointing | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-027**](./tc-inspections-027-load-last-inspection-history-dialog.md) | Load Last Inspection — import previous findings and condition history | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-028**](./tc-inspections-028-splice-condition-inspection-flow.md) | Splice Inspection — record splice measurements, hardness, and photos | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-029**](./tc-inspections-029-summary-step-statistics-and-notes.md) | Summary Step — condition summary counters and inspector notes | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-030**](./tc-inspections-030-save-inspection-offline-pending-badge.md) | Offline Save — saving while offline marks inspection "Upload Pending" | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-031**](./tc-inspections-031-sync-pending-inspections-on-reconnect.md) | Sync Queue — reconnecting triggers auto-sync of pending records and photos | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-032**](./tc-inspections-032-sync-failed-badge-and-retry.md) | Sync Failure — failed upload marks row with "Sync Failed" badge | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-033**](./tc-inspections-033-edit-inspection-event-and-items.md) | Edit Inspection — modify event metadata, update findings, and save | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-034**](./tc-inspections-034-delete-inspection-item-confirmation.md) | Delete Item — delete individual inspection finding with confirmation modal | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-035**](./tc-inspections-035-delete-inspection-from-view-popup-menu.md) | Delete Inspection — delete full inspection via popup menu with modal | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-036**](./tc-inspections-036-pdf-report-generation-and-preview.md) | PDF Report — generate and view inspection report in FilePreviewScreen | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-037**](./tc-inspections-037-pdf-report-blocked-when-offline-or-unsynced.md) | PDF Report — displays error snackbar when offline or unsynced | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-INSPECTIONS-038**](./tc-inspections-038-conveyor-details-navigates-to-filtered-inspections.md) | Conveyor Details — navigate to pre-filtered inspection list for conveyor | Medium | Regression | `@regression @both` | 📋 Planned |

---

## 🔗 Related Documentation

- [Test Suites Guide](../../test-suites-guide.md)
- [Master Test Suites Index](../index.md)
- [Conveyors Test Suite](../conveyors/index.md)
- [Sites Test Suite](../sites/index.md)
