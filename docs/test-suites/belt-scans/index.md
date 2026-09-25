# Belt Scans — Test Suite

> Module: `BasicModule.beltScan` (`BELT-INSPECTION-DEVICES`)  
> Flutter Source: `lib/src/ui/screens/belt_scan/` + `lib/src/blocs/belt_scan/`  
> Last updated: 2026-09-21

---

## 📊 Suite KPI Summary

| Metric | Value |
|---|---|
| Total Test Cases | **36** |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |
| 📋 Planned | 36 |
| 🔴 Blocked (infra) | 0 |
| 🟢 Smoke TCs | 3 |
| 🟡 Regression TCs | 32 |
| 🟣 E2E TCs | 1 |
| Platforms | iOS + Android (`@both`) |
| Environments | STG / PRD |

---

## 🏛️ Architecture & Flutter Implementation

The **Belt Scans** module displays diagnostic scan records generated from belt inspection and monitoring hardware (such as CordProtect, MultiProtect, Ultrasonic lifetime scanners, and Minuteman systems).

### BLoC State Machine

- **`BeltScanListBloc`** (`lib/src/blocs/belt_scan/list/belt_scan_list_bloc.dart`)
  - `BeltScanListLoadEvent`: Loads cached scan records from `ctp.beltScanManager.getFromCache()`, hydrates relations (`CompanyModel` site and `ConveyorModel` conveyor), retrieves last sync timestamp, and streams network updates.
  - `BeltScanListSearchEvent`: In-memory keyword search across site names.
  - `BeltScanListFilterEvent`: Multi-criteria filtering by site, conveyor, device type, and sorting (`lastModified`, `aToZ`, `zToA`).
  - `BeltScanListTimerEvent`: Background periodic sync when list is idle and unfiltered.

### Screen & Navigation Map

```
Dashboard (HomeCard 'beltScanCard')  ──┐
                                       ├──► BeltScanListScreen ──► FilePreviewScreen (PDF Report)
Conveyor Info ('beltScanCard' pre-filtered) ──┘        │
                                                       └──► BeltScanFilterModal
```

### Module Permissions

| Permission | Constant | Description |
|---|---|---|
| View Belt Scans | `BasicModule.beltScan` / `Permission.view` | Access Belt Scans list and view metadata |
| Download Reports | `BasicModule.beltScan` / `Permission.download` | Download PDF scan reports to local device storage |

---

## 📊 KPI Summary

| Metric | Value |
|---|---|
| Total Test Cases | **36** |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 Active — In Progress | 0 |
| 📋 Planned | 36 |
| 🔴 Blocked (infra) | 0 |
| 🟢 Smoke | 3 |
| 🟡 Regression | 32 |
| 🟣 E2E | 1 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗂️ Test Case Master Registry

| ID | Title | Priority | Type | Tags | Platform | Status |
|---|---|:---:|:---:|---|:---:|:---:|
| [TC-BELT-SCANS-001](./tc-belt-scans-001-list-loads-with-permitted-view.md) | Belt Scans List Loads Successfully | Critical | Smoke | `@smoke @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-002](./tc-belt-scans-002-open-and-preview-pdf-report.md) | Open and Preview Belt Scan PDF Report | High | Smoke | `@smoke @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-003](./tc-belt-scans-003-navigation-from-home-and-conveyor.md) | Navigate from Home Card and Conveyor Info | High | Smoke | `@smoke @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-036](./tc-belt-scans-036-e2e-cord-damage-belt-scan-lifecycle.md) | E2E Cord Damage Belt Scan Lifecycle (Analyze, Severity Filter, PDF Report) | Critical | E2E | `@e2e @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-004](./tc-belt-scans-004-permission-gating-view-and-download.md) | Permission Gating (`BELT-INSPECTION-DEVICES`) | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-005](./tc-belt-scans-005-home-dashboard-card-counter.md) | Home Screen Card Counter & Navigation | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-006](./tc-belt-scans-006-conveyor-info-card-and-auto-filter.md) | Conveyor Info Belt Scans Card & Auto-Filter | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-007](./tc-belt-scans-007-free-user-restrictions.md) | Free User Account Restrictions | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-008](./tc-belt-scans-008-search-by-site-name.md) | Search Belt Scans by Site Name | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-009](./tc-belt-scans-009-search-clear-and-dismiss.md) | Search Bar Clear and Close Behavior | Low | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-010](./tc-belt-scans-010-empty-state-no-results.md) | Empty State When Search or Filters Match Nothing | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-011](./tc-belt-scans-011-pull-to-refresh-list.md) | Pull to Refresh Belt Scans List | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-012](./tc-belt-scans-012-manual-sync-with-confirmation-dialog.md) | Manual Sync Action with Confirmation Dialog | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-013](./tc-belt-scans-013-last-updated-sync-time-widget.md) | Last Updated Sync Time and Count Widget | Low | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-014](./tc-belt-scans-014-row-presentation-mobile-layout.md) | Row Presentation on Mobile Viewport | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-015](./tc-belt-scans-015-row-presentation-tablet-layout.md) | Row Presentation on Tablet Multi-Column View | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-016](./tc-belt-scans-016-pdf-icon-opacity-availability.md) | PDF Report Icon Opacity (Available vs Unavailable) | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-017](./tc-belt-scans-017-device-types-display.md) | Monitoring Device Types Rendering | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-018](./tc-belt-scans-018-scan-date-formatting-and-null-fallbacks.md) | Date Formatting (`d MMM yyyy`) & Null Fallbacks (`-`) | Low | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-019](./tc-belt-scans-019-filter-modal-layout-and-counter.md) | Filter Modal Layout and Dynamic Result Counter | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-020](./tc-belt-scans-020-sort-by-last-modified.md) | Sort by Last Modified Date (Descending) | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-021](./tc-belt-scans-021-sort-alphabetical-a-to-z.md) | Sort Alphabetically A to Z by Site Name | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-022](./tc-belt-scans-022-sort-alphabetical-z-to-a.md) | Sort Alphabetically Z to A by Site Name | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-023](./tc-belt-scans-023-filter-by-site-multiselect.md) | Filter by Site Multi-Select | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-024](./tc-belt-scans-024-filter-by-conveyor-multiselect.md) | Filter by Conveyor Cascading Multi-Select | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-025](./tc-belt-scans-025-filter-by-device-type-multiselect.md) | Filter by Monitoring Device Type Multi-Select | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-026](./tc-belt-scans-026-combined-multi-filters.md) | Combined Multi-Filter and Sorting | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-027](./tc-belt-scans-027-filter-active-red-dot-badge.md) | Filter Active Red Dot Indicator on AppBar | Low | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-028](./tc-belt-scans-028-clear-filters-resets-to-default.md) | Clear Filters Action Resets Modal & List | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-029](./tc-belt-scans-029-pre-supplied-conveyor-filter-mode.md) | Pre-Supplied Conveyor Filter Mode (Locked Site/Conveyor) | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-030](./tc-belt-scans-030-pdf-preview-authenticated-stream.md) | Authenticated PDF Document Preview | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-031](./tc-belt-scans-031-download-pdf-report-with-notification.md) | Download Belt Scan PDF Report with Notification | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-032](./tc-belt-scans-032-download-disabled-without-permission.md) | Download Button Hidden Without Download Permission | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-033](./tc-belt-scans-033-offline-mode-working-banner-cache.md) | Offline Mode Working Banner & Local Cache Hydration | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-034](./tc-belt-scans-034-network-api-error-handling.md) | Network API Error Logging and Fallback to Cache | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-BELT-SCANS-035](./tc-belt-scans-035-periodic-timer-refresh.md) | Background Periodic Timer Auto-Refresh | Low | Regression | `@regression @both` | iOS + Android | 📋 Planned |
