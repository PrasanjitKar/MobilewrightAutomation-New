# Minuteman Calculation Test Suite

> Suite: `minuteman-calculation` | Modules: `BasicModule.minutemanConveyor` (`MINUTEMAN-CONVEYOR`) & `BasicModule.minutemanElevator` (`MINUTEMAN-ELEVATOR`)  
> Target: Conti+ Mobile (iOS & Android) | Framework: MobileWright + Playwright-BDD  
> Flutter Source: `lib/src/ui/screens/minuteman/` & `lib/src/blocs/minuteman/`

---

## 📊 Suite KPI Summary

| Metric | Value |
|--------|-------|
| Total Test Cases | **35** |
| 🟢 Active — Automated | **0 (0%)** |
| 🔵 In Progress | **0** |
| 📋 Planned | **35** |
| 🔴 Blocked (infra) | **0** |
| 🟢 Smoke TCs | **2** |
| 🟡 Regression TCs | **32** |
| 🟣 E2E TCs | **1** |
| Platforms | iOS + Android (`@both`) |
| Environments | STG, PRD |

---

## 🏗️ Architecture & Flutter Implementation Notes

### 1. Permissions & Access Control
- Gated by two distinct module permissions in `UserInfoCubit` (`BasicModule`):
  - `BasicModule.minutemanConveyor` (`'MINUTEMAN-CONVEYOR'`)
  - `BasicModule.minutemanElevator` (`'MINUTEMAN-ELEVATOR'`)
- Access rules:
  - User must have `Permission.view` on at least one module to access `MinutemanListScreen` (`canView = canAccess(minutemanElevator, view) || canAccess(minutemanConveyor, view)`). If neither, an empty `Container()` is returned.
  - List filtering based on permissions:
    - Both permissions active: All calculation records (Conveyor + Elevator) are displayed.
    - Only `minutemanConveyor`: Only `MinutemanType.conveyor` calculations are displayed.
    - Only `minutemanElevator`: Only `MinutemanType.elevator` calculations are displayed.
    - Neither permission: Empty list is returned.
  - `Permission.download`: Gated per record based on type (`canDownloadMinutemanform = user.canAccess(element.type == MinutemanType.elevator ? BasicModule.minutemanElevator : BasicModule.minutemanConveyor, Permission.download)`). Download button in `FilePreviewScreen` is only enabled if true.
- Free users (`isFreeUser == true`):
  - AppBar actions (search, filter, sync, profile) are completely suppressed (`actions: widget.isFreeUser ?? false ? [] : [...]`).

### 2. Minuteman List Architecture
- **Screen**: `MinutemanListScreen` (`lib/src/ui/screens/minuteman/minuteman_list_screen.dart`).
- **BLoC**: `MinutemanListBloc` managing:
  - `MinutemanListLoadEvent(hardRefresh: bool, onlyLoading: bool)`: Emits cached list from Hive (`minutemansList` box) immediately, then initiates network stream fetch via `ctp.minutemanManager.get(hardLoadData: hardRefresh)`.
  - `MinuteManSearchEvent(search: String)`: In-memory real-time filtering matching `element.name`.
  - `MinutemanListFilterEvent(filters: MinutemanFilters)`: Cascading filter by `siteIds` and `conveyorIds`, with sorting by `lastModified`, `aToZ`, and `zToA`.
  - `MinuteManTimerEvent`: Periodic sync timer triggering list reload.
  - Conveyor stream listener: `conveyorBloc.stream.listen` triggers `MinutemanListLoadEvent(onlyLoading: true)` on `ConveyorDeleteSuccessState`.
- **Card/Row Presentation (`MinutemanRow`)**:
  - **Type Indicator**: Type-specific SVG icons:
    - Elevator: `assets/svg/minuteman_elevator.svg`
    - Conveyor: `assets/svg/minuteman_conveyor.svg`
  - **Phone View**: Stacked layout with calculation name (bold 16px font), site name (resolved via `CompanyDataCubit.state.siteList`), conveyor name (resolved via `ConveyorDataCubit.state.conveyorFullList`), creator full name (`minutemanModel.createdBy?.fullName`), and formatted creation date (`d MMM yyyy`).
  - **Tablet View**: Multi-column tabular layout (Type SVG, Name [1/5], Site [1/10], Conveyor [1/10], Created By [1/8], Created Date [1/10], Chevron right icon) with selection highlight background (`ContinentalColors.white2`).

### 3. PDF Report Viewer & Download
- **Screen**: `FilePreviewScreen` (`lib/src/ui/screens/filemanager/filemanager_preview_screen.dart`).
- **BLoC**: `FileDownloadCubit` & `FileManagerBloc`.
- **Preview Flow**:
  - Tapping a row with a valid `reportUrl` opens `FilePreviewScreen` with `appBarTitle: 'Minuteman Calc.'`, `moduleName: 'minuteman'`, and `useDownloadUrl2: true`.
  - `FileDownloadCubit.downloadFromUrl2` downloads the PDF to local sandbox and renders it using `PdfViewer.file` (`pdfrx` package).
  - Download action (`FileManagerDownloadEvent`) downloads the PDF to device storage and shows a success/failure `SnackBar`.
  - Returning from preview triggers `MinutemanListLoadEvent(onlyLoading: true)` to refresh state.

### 4. Filter Modal (`MinutemanFilterModal`)
- **Sort by**:
  - `FilterSortBasedOn.lastModified` (default, sorted by `updatedDate`)
  - `FilterSortBasedOn.aToZ` (ascending by calculation name)
  - `FilterSortBasedOn.zToA` (descending by calculation name)
- **Multi-Select Filters**:
  - **Site**: Multi-select dropdown populated from sites present in `minutemanFullList` (`MinutemanFilterHelper.getSiteOptions`).
  - **Conveyor**: Cascading multi-select dropdown populated from conveyors present in selected sites (`MinutemanFilterHelper.getConveyorOptions`).
  - When navigating from Conveyor Info screen, `isConveyorIdsPreSupplied: true` locks the conveyor selection.
- **Dynamic Counter**: Calculates matching result count in real time (`FiltersTemplate`).
- **Indicator Badge**: Red circle indicator (`CircleAvatar(backgroundColor: ContiplusColors.continentalLightRed, radius: 5)`) on app bar filter icon when filters are active.

### 5. Synchronization & Offline Resilience
- Pull-to-refresh (`RefreshIndicator`) for instant re-synchronization.
- Manual sync with confirmation dialog (`AlertDialog` with `syncConfirmation`).
- Status indicator for offline mode (`state.status.isOffline` → "Working Offline").
- Bottom bar widget (`LastUpdatedTimeAndTotalCountWidget`) displaying total calculation count and formatted sync timestamp.

---

## 🗂️ Test Case Registry

| ID | Title | Priority | Type | Smoke | Status |
|---|---|---|---|:---:|---|
| [**TC-MINUTEMAN-001**](./tc-minuteman-calculation-001-list-loads-with-permitted-view.md) | List Loads with Permitted View | Critical | Smoke | 🟢 | 📋 Planned |
| [**TC-MINUTEMAN-002**](./tc-minuteman-calculation-002-open-and-preview-pdf-report.md) | Open & Preview Calculation PDF Report | Critical | Smoke | 🟢 | 📋 Planned |
| [**TC-MINUTEMAN-003**](./tc-minuteman-calculation-003-navigation-from-dashboard-and-conveyor-info.md) | Navigation from Dashboard & Conveyor Info | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-004**](./tc-minuteman-calculation-004-permission-gating-conveyor-and-elevator.md) | Permission Gating: Conveyor vs Elevator Scoping | Critical | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-005**](./tc-minuteman-calculation-005-permission-gating-download-action.md) | Permission Gating: Download Action Enforcement | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-006**](./tc-minuteman-calculation-006-dashboard-card-counter-and-visibility.md) | Dashboard Card Counter & Visibility | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-007**](./tc-minuteman-calculation-007-conveyor-info-card-and-auto-filter.md) | Conveyor Info Screen Card & Pre-Supplied Filter | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-008**](./tc-minuteman-calculation-008-free-user-action-suppression.md) | Free User Action Suppression | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-009**](./tc-minuteman-calculation-009-search-by-calculation-name.md) | Search by Calculation Name | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-010**](./tc-minuteman-calculation-010-search-clear-and-dismiss.md) | Search Clear & Dismiss | Low | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-011**](./tc-minuteman-calculation-011-empty-state-no-results.md) | Empty State When No Calculations Found | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-012**](./tc-minuteman-calculation-012-row-presentation-phone-layout.md) | Row Presentation Phone Layout | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-013**](./tc-minuteman-calculation-013-row-presentation-tablet-layout.md) | Row Presentation Tablet Tabular Layout | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-014**](./tc-minuteman-calculation-014-type-specific-icons-elevator-vs-conveyor.md) | Type-Specific SVG Icons: Elevator vs Conveyor | Low | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-015**](./tc-minuteman-calculation-015-site-and-conveyor-name-resolution.md) | Dynamic Site & Conveyor Name Resolution | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-016**](./tc-minuteman-calculation-016-created-by-and-date-formatting.md) | Creator Name & Created Date Formatting | Low | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-017**](./tc-minuteman-calculation-017-filter-modal-layout-and-counter.md) | Filter Modal Layout & Real-Time Count | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-018**](./tc-minuteman-calculation-018-sort-by-last-modified.md) | Sort by Last Modified Date | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-019**](./tc-minuteman-calculation-019-sort-alphabetical-a-to-z.md) | Sort Alphabetical A-Z | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-020**](./tc-minuteman-calculation-020-sort-alphabetical-z-to-a.md) | Sort Alphabetical Z-A | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-021**](./tc-minuteman-calculation-021-filter-by-site-multiselect.md) | Filter by Site Multi-Select | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-022**](./tc-minuteman-calculation-022-filter-by-conveyor-cascading.md) | Filter by Conveyor Cascading Multi-Select | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-023**](./tc-minuteman-calculation-023-combined-site-conveyor-sort-filters.md) | Combined Site, Conveyor & Sort Filters | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-024**](./tc-minuteman-calculation-024-filter-active-red-dot-indicator.md) | Active Filter Red Dot Indicator Badge | Low | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-025**](./tc-minuteman-calculation-025-clear-filters-action.md) | Clear Filters Action & State Reset | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-026**](./tc-minuteman-calculation-026-pull-to-refresh-list.md) | Pull-to-Refresh List Data Reload | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-027**](./tc-minuteman-calculation-027-manual-sync-confirmation-dialog.md) | Manual Sync with Confirmation Dialog | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-028**](./tc-minuteman-calculation-028-last-updated-timestamp-widget.md) | Last Updated Timestamp & Total Count Widget | Low | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-029**](./tc-minuteman-calculation-029-pdf-preview-authenticated-stream.md) | PDF Report Preview Authenticated Streaming | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-030**](./tc-minuteman-calculation-030-download-pdf-report-with-notification.md) | Download PDF Report with Snackba Notification | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-031**](./tc-minuteman-calculation-031-offline-mode-working-banner-cache.md) | Offline Mode Cached Calculations & Working Banner | High | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-032**](./tc-minuteman-calculation-032-conveyor-deletion-stream-cascade.md) | Conveyor Deletion Event Cascade Auto-Refresh | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-033**](./tc-minuteman-calculation-033-network-api-error-resilience.md) | Network API Error Handling & Logging | Medium | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-034**](./tc-minuteman-calculation-034-periodic-timer-sync.md) | Periodic Background Timer Synchronization | Low | Regression | | 📋 Planned |
| [**TC-MINUTEMAN-035**](./tc-minuteman-calculation-035-e2e-engineering-minuteman-calculation-workflow.md) | E2E Minuteman Calculation Lifecycle & Report Export | Critical | E2E | 🟣 | 📋 Planned |
