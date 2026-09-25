# Heavy Equipment Test Suite

> Suite: `heavy-equipment` | Module: `BasicModule.heavyEquipmentData` (`HEAVY-EQUIPMENT`)  
> Target: Conti+ Mobile (iOS & Android) | Framework: MobileWright + Playwright-BDD  
> Flutter Source: `lib/src/ui/screens/heavy_equipment/` & `lib/src/blocs/heavy_equipment/`

---

## 📊 Suite KPI Summary

| Metric | Value |
|--------|-------|
| Total Test Cases | **29** |
| 🟢 Active — Automated | **0 (0%)** |
| 🔵 In Progress | **0** |
| 📋 Planned | **29** |
| 🔴 Blocked (infra) | **0** |
| 🟢 Smoke TCs | **2** |
| 🟡 Regression TCs | **26** |
| 🟣 E2E TCs | **1** |
| Platforms | iOS + Android (`@both`) |
| Environments | STG, PRD |

---

## 🏗️ Architecture & Flutter Implementation Notes

### 1. Permissions & Access Control
- Gated by `BasicModule.heavyEquipmentData` (`'HEAVY-EQUIPMENT'`).
- Permissions: `view`, `download`.
- Free users (`isFreeUser == true`):
  - AppBar actions (search, filter, sync, profile) are completely suppressed (`actions: widget.isFreeUser ?? false ? [] : [...]`).
  - Read-only viewing without search/filter/sync access.

### 2. Heavy Equipment List Architecture
- **Screen**: `HeavyEquipmentListScreen` (`lib/src/ui/screens/heavy_equipment/heavy_equipment_list_screen.dart`).
- **BLoC**: `HeavyEquipmentListBloc` managing:
  - `HeavyEquipmentListLoadEvent(hardRefresh: bool, onlyLoading: bool)`: Fetches equipment data from local Hive cache first, then syncs with network API `ctp.heavyEquipmentManager.get()`.
  - `HeavyEquipmentSearchEvent(search: String)`: In-memory real-time filtering matching `equipment.name`.
  - `HeavyEquipmentFilterEvent(filters: HeavyEquipmentFilters)`: Filters by `distributorShop` and `category`, with sorting by `lastModified`, `aToZ`, and `zToA`.
  - `HeavyEquipmentTimerEvent`: Periodic sync timer.
- **Card/Row Presentation (`HeavyEquipmentRow`)**:
  - **Phone View**: Stacked layout with circular thumbnail (`CachedNetworkImage` with authenticated Cognito header), Equipment Name (bold 16px), Category, Model, Year of Manufacture, Serial Number, and Distributor Shop.
  - **Tablet View**: Multi-column tabular layout (Thumbnail, Name, Category, Model, Year, Serial Number, Distributor Shop, Chevron icon).

### 3. Heavy Equipment Details & File Manager
- **Screen**: `HeavyEquipmentScreen` (`lib/src/ui/screens/heavy_equipment/heavy_equipment_screen.dart`).
- **BLoC**: `HeavyEquipmentBloc` & `FileManagerListBloc`.
- **Header Card**:
  - Displays equipment thumbnail, name, distributor shop, category, model, year of manufacture, and serial number.
- **Related Files List (`HeavyEquipmentFileRow`)**:
  - Lists associated documents/manuals (`relatedType: FileManager.heavyEquipmentType`, `relatedID: equipmentId`).
  - In-page search for associated files.
  - File row renders Document Name, Updated Date (`d MMM yyyy`), and File Type (`PDF`, `DOCX`, etc.).
  - Tapping a file opens `FilePreviewScreen` with authenticated Cognito session and permission-gated download.

### 4. Filter Modal (`HeavyEquipmentFilterModal`)
- **Sort by**:
  - `FilterSortBasedOn.lastModified` (default)
  - `FilterSortBasedOn.aToZ`
  - `FilterSortBasedOn.zToA`
- **Multi-Select Filters**:
  - **Distributor Shop**: Cascading filter populated from distributor shops assigned to heavy equipment.
  - **Category**: Equipment category catalog options.
- **Dynamic Counter**: Calculates matching result count in real time (`FiltersTemplate`).
- **Indicator Badge**: Red circle indicator (`CircleAvatar(backgroundColor: ContiplusColors.continentalLightRed, radius: 5)`) on app bar filter icon when filters are active.

### 5. Deep Linking & Offline Resilience
- Supports deep link routing via `DeepLinkBloc` (`module == BasicModule.heavyEquipmentData` with `contentId == equipmentId`).
- Offline indicator banner (`state.status.isOffline` → "Working Offline").
- Manual sync with confirmation dialog (`AlertDialog` with `syncConfirmation`).

---

## 🗂️ Test Case Registry

| ID | Title | Priority | Type | Smoke | Status |
|---|---|---|---|:---:|---|
| [**TC-HEAVY-EQUIPMENT-001**](./tc-heavy-equipment-001-list-loads-with-permitted-view.md) | List Loads with Permitted View | Critical | Smoke | 🟢 | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-002**](./tc-heavy-equipment-002-details-screen-and-header-card.md) | Details Screen & Header Metadata Card | Critical | Smoke | 🟢 | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-003**](./tc-heavy-equipment-003-navigation-sources.md) | Navigation from Dashboard & Drawer | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-004**](./tc-heavy-equipment-004-permission-gating-view-download.md) | Permission Gating (View & Download) | Critical | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-005**](./tc-heavy-equipment-005-dashboard-card-counter.md) | Dashboard Card Counter & Sync | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-006**](./tc-heavy-equipment-006-free-user-action-suppression.md) | Free User Mode (Actions Suppressed) | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-007**](./tc-heavy-equipment-007-pull-to-refresh.md) | Pull to Refresh List Reload | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-008**](./tc-heavy-equipment-008-manual-sync-confirmation.md) | Manual Sync with Confirmation Dialog | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-009**](./tc-heavy-equipment-009-last-updated-timestamp-widget.md) | Last Updated Timestamp & Counter Footer | Low | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-010**](./tc-heavy-equipment-010-search-by-equipment-name.md) | Search by Equipment Name in List | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-011**](./tc-heavy-equipment-011-search-clear-and-dismiss.md) | Search Clear & Keyboard Dismiss | Low | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-012**](./tc-heavy-equipment-012-empty-state-no-results.md) | Empty State on Zero Search Results | Low | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-013**](./tc-heavy-equipment-013-row-presentation-phone-layout.md) | Row Presentation (Phone Viewport) | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-014**](./tc-heavy-equipment-014-row-presentation-tablet-layout.md) | Row Presentation (Tablet Viewport) | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-015**](./tc-heavy-equipment-015-thumbnail-authenticated-image.md) | Equipment Thumbnail Authenticated Header | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-016**](./tc-heavy-equipment-016-filter-modal-layout-and-counter.md) | Filter Modal Layout & Dynamic Record Counter | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-017**](./tc-heavy-equipment-017-sort-last-modified.md) | Sort by Last Modified (Default) | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-018**](./tc-heavy-equipment-018-sort-alphabetical-a-to-z.md) | Sort Alphabetical (A to Z) | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-019**](./tc-heavy-equipment-019-sort-alphabetical-z-to-a.md) | Sort Alphabetical (Z to A) | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-020**](./tc-heavy-equipment-020-filter-by-distributor-shop.md) | Filter by Distributor Shop Multi-Select | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-021**](./tc-heavy-equipment-021-filter-by-category.md) | Filter by Category Multi-Select | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-022**](./tc-heavy-equipment-022-clear-filters-action.md) | Clear Filters Action & Indicator Dot | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-023**](./tc-heavy-equipment-023-details-associated-files-list.md) | Associated Document Files List | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-024**](./tc-heavy-equipment-024-details-file-search.md) | In-Details Document File Search | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-025**](./tc-heavy-equipment-025-file-preview-and-download.md) | File Preview & Download Authorization | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-026**](./tc-heavy-equipment-026-deep-link-navigation.md) | Deep Link Direct Navigation | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-027**](./tc-heavy-equipment-027-offline-mode-cached-records.md) | Offline Mode & Cached Record Rendering | High | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-028**](./tc-heavy-equipment-028-error-handling-and-cache-invalidation.md) | Network Error & Cache Invalidation Handling | Medium | Regression | | 📋 Planned |
| [**TC-HEAVY-EQUIPMENT-029**](./tc-heavy-equipment-029-e2e-heavy-equipment-asset-lifecycle.md) | E2E Heavy Equipment Asset Lifecycle & Manual Preview | Critical | E2E | 🟣 | 📋 Planned |
