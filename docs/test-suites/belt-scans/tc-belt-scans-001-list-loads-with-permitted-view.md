# TC-BELT-SCANS-001 — List Loads — display belt scans list with permitted access

> Suite: [Belt Scans](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-001 |
| **Suite** | belt-scans |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `belt_scans_list_load` |
| **Feature File** | `features/smoke/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when a user with `BasicModule.beltScan` view permission navigates to the Belt Scans screen, `BeltScanListBloc` dispatches `BeltScanListLoadEvent`, hydrates cached records, streams network data, and displays belt scan rows with site names, conveyor names, scan dates, and device types.

---

## ✅ Preconditions

- User is authenticated with `BasicModule.beltScan` view permission
- Belt scan records exist for the user's assigned organization/sites

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to the Belt Scans screen | `BeltScanListScreen` opens |
| 2 | Observe AppBar | Title displays "Belt Scans" (`AppLocalizations.of(context)!.beltScans`), back button, search icon, filter icon, sync icon, and user profile avatar |
| 3 | Observe loading state | `LinearProgressIndicator` displays while `state.status.isLoading` is true |
| 4 | Observe list content | List of `BeltScanRow` widgets renders displaying site, conveyor, scan date, device type, and CCM name |
| 5 | Verify bottom sync/counter widget | `LastUpdatedTimeAndTotalCountWidget` displays total scan count and formatted sync timestamp |

---

## 🏁 Expected Results

- Belt Scans list screen loads smoothly with complete metadata and active navigation actions

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
final bool canViewBeltScan = user?.canAccess(BasicModule.beltScan, Permission.view) ?? false;
// AppBar title:
AppLocalizations.of(context)!.beltScans
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:belt_scans_list_load @smoke @both
Scenario: Belt Scans list loads successfully for permitted user
  Given the user is logged in with belt scan view permission
  When the user navigates to the Belt Scans screen
  Then the Belt Scans list should load with title "Belt Scans"
  And the list should display scan rows with site and conveyor metadata
  And the bottom counter should display the total records count
```

---

## 🔗 Related

- [TC-BELT-SCANS-004 — Permission gating](./tc-belt-scans-004-permission-gating-view-and-download.md)
- [Suite index](./index.md)
