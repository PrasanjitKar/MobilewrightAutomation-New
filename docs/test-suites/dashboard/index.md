# Dashboard — Test Suite

> Module: `dashboard` | Flutter source: `lib/src/ui/screens/home/` + `lib/src/ui/app.dart` + `lib/src/ui/app/conti_app_bar.dart`
> Feature files: `features/regression/dashboard.feature` *(to create)*

---

## 📋 Overview

The **Dashboard** suite covers the app's Home screen (`HomeScreen`) — the landing screen after login and the persistent "Home" tab in the bottom navigation. There is no screen or class literally named "Dashboard" in the Flutter source; `HomeScreen` **is** the dashboard. (The strings `companySiteDashboard` / `conveyorDashboard` exist only as unused translation keys in the `.arb` files — they are not referenced anywhere in `lib/src/ui/**/*.dart` and are out of scope.)

The Home screen shows one card per module the signed-in user has **view** permission for (`UserInfoCubit.state.user.canAccess(module, Permission.view)`), a synced-time indicator, and (on tablets) an inline split-view list panel. It also drives the shared `ContiAppBar` (title/search/filter/sync/profile icons) and the shared bottom navigation + context-aware "Add" speed-dial FAB defined in `app.dart`, since both are rendered by the same persistent Scaffold shell that hosts `HomeScreen` at tab index 0.

### Dashboard Cards

| Card (SemanticsLabel) | Title (`AppLocalizations`) | Permission Module | Count Source | Status Chips |
|---|---|---|---|---|
| `siteCard` | `managedsites` → "Sites" | `BasicModule.customerSiteMap` | `CompanyListState.customerSite.length` | — |
| `conveyorCard` | `trackedconveyors` → "Conveyors" | `BasicModule.conveyorsData` | `ConveyorListState.conveyorFullList.length` | — |
| `coverWearCard` | `coverWear` → "Cover Wear" | `BasicModule.coverWear` | `CoverWearListState.totalCount` | — |
| `inspectionCard` | `inspections` → "Inspections" | `InspectionModule.inspectionModule` | `ItemSummary.count` (from `getInspectionSummaryFromList`) | good/fault/poor/critical |
| `conveyorInspectCard` | `conveyorInspect` → "Conveyor Inspect" | `ConveyorInspectModule.conveyorInspectModule` | `ItemSummary.count` | good/fault/poor/critical |
| `beltScanCard` | `beltScans` → "Belt Scans" | `BasicModule.beltScan` | `BeltScanListState.beltScans.length` | — |
| *(no card-level label)* | `fieldService` → "Field Service" | `InternalToolsModule.fieldService` | `FieldServiceListState.allDeviceList.length` | — |
| `heavyEquipmentCard` | `heavyEquipment` → "Heavy Equipment" | `BasicModule.heavyEquipmentData` | `HeavyEquipmentListState.heavyEquipmentsFullList.length` | — |
| `minutemanCalculationCard` | `minuteman` → "Minuteman Calc." | `BasicModule.minutemanConveyor` **or** `BasicModule.minutemanElevator` | `MinutemanListState.minutemanFullList.length` | — |

> **Automation gap note:** the Field Service card is the only one **not** wrapped in an outer `SemanticsLabel` in `_getHomeCards()` (`home_screen.dart`). It must be located via its inner title label (`'Field Service'`) or count label (`'Field Service-count'`) instead of a dedicated card-level locator — flag this in the page object rather than "fixing" the source.

Every card is a `HomeCard` (`home_screen/widgets/home_card.dart`) with:
- Title text, itself wrapped `SemanticsLabel(label: title)`
- Count text wrapped `SemanticsLabel(label: '$title-count', value: counter)` — **Android renders this as one accessibility node whose label is `"<counter>, <title>-count"`** (value + label concatenated), so automation locators must use a partial/`exact: false` match, not an exact string match
- Optional status chips (`goodCount`, `faultCount`, `poorCount`, `criticalCount`), each individually `Visibility`-gated on `count.isNotEmpty && int.parse(count) > 0`

### Layout Modes (`DeviceHelper.isPhone()`)

| Device | Orientation forced | Layout |
|---|---|---|
| Phone | Portrait (`DeviceHelper.setPortrait()`) | `GridView.count(crossAxisCount: 2)` — 2-column card grid; tapping a card **navigates** to that module's full list screen (or switches the bottom-nav tab for logged-in, non-guest users) |
| Tablet | Landscape (`DeviceHelper.setLandscape()`) | Horizontal scrollable card strip (`CustomScrollView`) **+ an inline split-view list panel below** (`getSelectedList(selectedListType)`) — tapping a card only swaps the inline list and highlights the card (red 2 px border via `HomeCardContainer.isSelected`); it does **not** navigate away from Home |

### Top App Bar (`ContiAppBar`, shared across all tabs)

| Element | Label | Behaviour on Home tab (`selectedPage == 0`) |
|---|---|---|
| Title | `appbarTitle` | Shows "Home" |
| Search icon | `searchIcon` | Always shown for non-guest users; opens `SearchPage` with **no preset tab** (`tab` stays `null` since Home's index isn't mapped to a `SearchTab`) |
| Filter icon | `filterIcon` | **Hidden** — only rendered when `selectedPage` is 1 (Conveyors), 2 (Companies), or 4 (Inspections) |
| Sync icon | `syncIcon` | Shown; tapping opens a confirm dialog (`syncPopupContent` / `syncPopupOkButton` / `syncPopupCancelButton`) before dispatching `SummaryRefreshModulesEvent(Sync(hardRefresh: true))`; icon greys out while `SummaryStatus.loading` |
| Profile icon | `profileIcon` | Navigates to `ProfileScreen` |

### Bottom Navigation & FAB (`app.dart`)

- Bottom tabs differ for guest/free users (`homeTab`, `productInfoTab`, `toolsTab`, `contactUsTab` — 4 tabs) vs. authenticated users (`homeTab`, `conveyorTab`, `corporatesTab`, `toolsTab`, `inspectionsTab` — 5 tabs).
- Hardware back button (`_onWillPop`): on Home tab (`selectedPage == 0`) it exits the app (`SystemNavigator.pop()`); on any other tab it returns to Home instead of exiting.
- The "Add" speed-dial FAB (`homeFloatingActionButton`) is fully hidden for guest/free users and whenever the currently selected card is Belt Scan, Minuteman, or Heavy Equipment (`_getFloatingButton` returns `null`).
- Otherwise, the FAB's child options are **filtered by the currently selected dashboard card** (`state.selectedCard`) **and** by the signed-in user's `Permission.add` for that module:

| Speed-dial child | Label | Shown when selected card is | Requires `isOnline` |
|---|---|---|---|
| Add Corporate | — | `site` | ✅ |
| Add Site | — | `site` | ✅ |
| Add Conveyor | `addConveyor` | `conveyor` or `site` | ✅ |
| Add Cover Wear | — | `site` or `coverWear` | ❌ |
| Add Inspection | — | `site` or `inspection` | ❌ |
| Add Conveyor Inspect | — | `site` or `conveyorInspect` | ❌ |
| Add Monitoring Device | — | `site` or `monitoringDevice` | ❌ |
| Add Field Service Form | — | `site` or `fieldService` | ❌ |

### Deep Links

`DeepLinkBloc` deep links for Inspection, Belt Monitoring (Monitoring Device), and Heavy Equipment modules first pop the navigator back to Home (`Navigator.of(context).popUntil((route) => route.isFirst)`), then push the target module's screen — regardless of which tab the app was on when the link was received. If the user lacks view permission for the linked module (checked for Heavy Equipment), an "Access denied" (`accessDenied`) snackbar is shown instead of navigating.

### Pull-to-Refresh / Sync

- Swipe-down `RefreshIndicator` on the Home screen dispatches `SummaryRefreshModulesEvent(refreshSource: PullToRefresh())`, refreshing all module counts.
- A `LinearProgressIndicator` appears at the top of the screen while `SummaryState.newStatus == SummaryStatus.loading`.
- The Home screen also shows `LastUpdatedTimeAndTotalCountWidget(module: 'Home')` (`lastUpdatedTimeHomeScreen` label) formatted `dd MMM yyyy hh:mm a`, only when `state.lastUpdate` is non-zero.

---

## 📊 KPI

| Metric | Value |
|--------|-------|
| Total Test Cases | 32 |
| 📋 Planned | 32 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |
| 🔴 Blocked (infra) | 0 |
| 🟢 Smoke TCs | 1 |
| 🟡 Regression TCs | 31 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗒️ Test Cases

### 🟢 Smoke

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-DASHBOARD-001](./tc-dashboard-001-dashboard-loads-with-permitted-cards.md) | Dashboard loads with app bar title "Home" and all permission-eligible cards | Critical | 📋 Planned |

### 🟡 Regression — Layout & Permissions

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-DASHBOARD-002](./tc-dashboard-002-card-visibility-permission-based.md) | Card visibility is permission-based (RBAC) — cards hidden for unauthorized modules | High | 📋 Planned |
| [TC-DASHBOARD-003](./tc-dashboard-003-phone-layout-two-column-grid-navigation.md) | Phone layout — 2-column card grid; tapping a card navigates to its list screen | Critical | 📋 Planned |
| [TC-DASHBOARD-004](./tc-dashboard-004-tablet-layout-split-view.md) | Tablet layout — horizontal card strip + inline split-view list panel | High | 📋 Planned |
| [TC-DASHBOARD-005](./tc-dashboard-005-orientation-lock-phone-portrait-tablet-landscape.md) | Phone forces portrait / tablet forces landscape orientation on Home | Medium | 📋 Planned |
| [TC-DASHBOARD-006](./tc-dashboard-006-last-updated-sync-time-format.md) | Last-updated sync time is displayed in `dd MMM yyyy hh:mm a` format | Medium | 📋 Planned |

### 🟡 Regression — Card Content

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-DASHBOARD-007](./tc-dashboard-007-sites-card-count-and-navigation.md) | Sites card shows correct count and navigates correctly | High | 📋 Planned |
| [TC-DASHBOARD-008](./tc-dashboard-008-conveyors-card-count-and-navigation.md) | Conveyors card shows correct count and navigates correctly | High | 📋 Planned |
| [TC-DASHBOARD-009](./tc-dashboard-009-cover-wear-card-count-and-navigation.md) | Cover Wear card shows correct count and navigates correctly | Medium | 📋 Planned |
| [TC-DASHBOARD-010](./tc-dashboard-010-inspections-card-count-chips-and-navigation.md) | Inspections card shows count + good/fault/poor/critical chips | High | 📋 Planned |
| [TC-DASHBOARD-011](./tc-dashboard-011-conveyor-inspect-card-count-chips-and-navigation.md) | Conveyor Inspect card shows count + status chips | Medium | 📋 Planned |
| [TC-DASHBOARD-012](./tc-dashboard-012-belt-scans-card-count-and-navigation.md) | Belt Scans card shows correct count and navigates correctly | Medium | 📋 Planned |
| [TC-DASHBOARD-013](./tc-dashboard-013-monitoring-device-card-count-chips-and-navigation.md) | Monitoring Devices card shows count + status chips | Medium | 📋 Planned |
| [TC-DASHBOARD-014](./tc-dashboard-014-field-service-card-count-and-navigation.md) | Field Service card shows correct count and navigates correctly (no card-level locator) | Medium | 📋 Planned |
| [TC-DASHBOARD-015](./tc-dashboard-015-heavy-equipment-card-count-and-navigation.md) | Heavy Equipment card shows correct count and navigates correctly | Medium | 📋 Planned |
| [TC-DASHBOARD-016](./tc-dashboard-016-minuteman-card-count-and-navigation.md) | Minuteman Calc. card shows correct count and navigates correctly | Medium | 📋 Planned |
| [TC-DASHBOARD-017](./tc-dashboard-017-status-chips-hidden-when-zero.md) | Good/Fault/Poor/Critical chips are hidden when their count is zero | Medium | 📋 Planned |

### 🟡 Regression — Tablet Split View

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-DASHBOARD-018](./tc-dashboard-018-tablet-card-selection-highlight-and-list-swap.md) | Tablet — selecting a card highlights it and swaps the inline list panel | Medium | 📋 Planned |
| [TC-DASHBOARD-019](./tc-dashboard-019-tablet-inline-row-tap-and-tooltip.md) | Tablet — tapping an inline conveyor row navigates with pre-selection + inspection tooltip | Low | 📋 Planned |

### 🟡 Regression — Refresh & Sync

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-DASHBOARD-020](./tc-dashboard-020-pull-to-refresh.md) | Pull-to-refresh reloads all module summary counts | High | 📋 Planned |
| [TC-DASHBOARD-021](./tc-dashboard-021-sync-icon-confirmation-dialog.md) | Sync icon shows confirmation dialog before hard refresh | Medium | 📋 Planned |
| [TC-DASHBOARD-022](./tc-dashboard-022-sync-loading-indicator.md) | Sync icon/progress bar reflect loading state during refresh | Medium | 📋 Planned |

### 🟡 Regression — App Bar

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-DASHBOARD-023](./tc-dashboard-023-filter-icon-visibility.md) | Filter icon is hidden on the Home tab | Medium | 📋 Planned |
| [TC-DASHBOARD-024](./tc-dashboard-024-search-icon-navigation.md) | Search icon opens Search screen with no preset tab from Home | Medium | 📋 Planned |
| [TC-DASHBOARD-025](./tc-dashboard-025-profile-icon-navigation.md) | Profile icon navigates to Profile screen | Medium | 📋 Planned |

### 🟡 Regression — Bottom Navigation & Back Button

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-DASHBOARD-026](./tc-dashboard-026-bottom-nav-active-state-and-user-type.md) | Home tab active state + 4-tab (guest) vs 5-tab (full user) bottom nav | High | 📋 Planned |
| [TC-DASHBOARD-027](./tc-dashboard-027-back-button-behavior.md) | Hardware back button exits app on Home, returns to Home on other tabs | Medium | 📋 Planned |

### 🟡 Regression — Add (Speed Dial) FAB

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-DASHBOARD-028](./tc-dashboard-028-fab-visibility-and-scoping.md) | FAB is hidden for guests and for Belt Scan / Minuteman / Heavy Equipment cards | High | 📋 Planned |
| [TC-DASHBOARD-029](./tc-dashboard-029-fab-speed-dial-options-per-card.md) | FAB speed-dial options are scoped to the currently selected card | High | 📋 Planned |
| [TC-DASHBOARD-030](./tc-dashboard-030-fab-connectivity-gating.md) | Add Corporate / Add Site / Add Conveyor speed-dial options require connectivity | Medium | 📋 Planned |

### 🟡 Regression — Deep Links

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-DASHBOARD-031](./tc-dashboard-031-deep-link-routing-to-home-then-target-module.md) | Deep link returns to Home first, then pushes the target module screen | Medium | 📋 Planned |
| [TC-DASHBOARD-032](./tc-dashboard-032-deep-link-access-denied-snackbar.md) | Deep link to a module without view permission shows "Access denied" | Medium | 📋 Planned |

---

## 📂 Automation Artefacts

| Artefact | Path |
|----------|------|
| Feature file — regression | `features/regression/dashboard.feature` *(to create)* |
| Step definitions | `src/steps/dashboard.steps.ts` *(to create)* |
| Page object — Dashboard/Home | `src/pages/dashboard.page.ts` *(to create; existing `conveyor.page.ts` already covers the `conveyorCard`/`conveyorCountOnHome` pieces and can be reused)* |
| Page object — App Bar | `src/pages/app-bar.page.ts` *(to create — shared across all tabs)* |
| Test data | `resources/data/testdata.csv`, `resources/data/dashboarddata.csv` *(to create)* |

---

## 🔍 Flutter Source Reference

| File | Purpose |
|------|---------|
| `lib/src/ui/screens/home/home_screen.dart` | `HomeScreen` widget — layout, cards, pull-to-refresh, deep-link handling, orientation lock |
| `lib/src/ui/screens/home/widgets/home_card.dart` | `HomeCard` — title/count/status-chip semantics labels |
| `lib/src/ui/screens/home/widgets/home_card_container.dart` | Card container — selection border styling |
| `lib/src/ui/app.dart` | Persistent Scaffold shell — bottom nav, back-button handling, context-aware Add speed-dial FAB |
| `lib/src/ui/app/conti_app_bar.dart` | `ContiAppBar` — title/search/filter/sync/profile icons, sync confirmation dialog |
| `lib/src/ui/constants.dart` | `ListType` enum (site, corporate, conveyor, inspection, coverWear, conveyorInspect, monitoringDevice, fieldService, heavyEquipment, minuteman, beltScan) |
| `lib/src/ui/widgets/last_updated_time_and_total_count_widget.dart` | Shared last-updated-time / results-found widget (`lastUpdatedTime$module`, `listCount$module`) |
| `lib/src/models/item_summary.dart` | `ItemSummary` model — count/good/fault/poor/critical breakdown used by Inspection/Conveyor Inspect/Monitoring Device cards |
| `lib/src/blocs/summary/summary_bloc.dart` / `summary_state.dart` / `summary_event.dart` | `SummaryBloc` — refresh/sync status machine (`initial`, `loading`, `offline`, `success`) |
| `lib/src/ui/screens/search/search_page.dart` | `SearchPage` + `SearchTab` constants (conveyor=0, company=1, inspection=2, site=3) |
| `lib/src/l10n/app_en.arb` | All English i18n strings (card titles, FAB labels, `accessDenied`, `syncConfirmation`) |

---

## ⏳ Automation Roadmap

| Sprint | TCs | Focus |
|--------|-----|-------|
| **Sprint 1** | TC-001, TC-002, TC-003, TC-007, TC-008 | Smoke — dashboard load, RBAC visibility, phone navigation, Sites/Conveyors cards |
| **Sprint 2** | TC-009 – TC-017 | Remaining card content + status-chip zero-state |
| **Sprint 3** | TC-020, TC-021, TC-022, TC-006 | Refresh/sync + last-updated time |
| **Sprint 4** | TC-023, TC-024, TC-025, TC-026, TC-027 | App bar + bottom nav + back button |
| **Sprint 5** | TC-028, TC-029, TC-030 | Add speed-dial FAB scoping & connectivity gating |
| **Sprint 6** | TC-004, TC-005, TC-018, TC-019 | Tablet split-view layout (requires tablet/emulator device) |
| **Sprint 7** | TC-031, TC-032 | Deep-link routing (requires deep-link test harness) |
