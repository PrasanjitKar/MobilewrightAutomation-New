# TC-BELT-SCANS-003 — Navigation — open Belt Scans from Home Card and Conveyor Information

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-003 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `belt_scans_navigation_sources` |
| **Feature File** | `features/smoke/belt_scans.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/conveyor-details.page.ts`, `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the Belt Scans card (`beltScanCard`) from the Dashboard navigates to full Belt Scans list, and tapping the Belt Scans card from the Conveyor Information screen navigates with pre-filtered conveyor criteria.

---

## ✅ Preconditions

- User is logged in and has access to Home dashboard and Conveyor details

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Home Dashboard, tap `HomeCard` labelled `beltScanCard` | On phone: navigates to `BeltScanListScreen` with all records; on tablet: switches split view to `ListType.beltScan` |
| 2 | Tap back to return to Home | Returns to Dashboard |
| 3 | Navigate to Conveyor details screen for a specific conveyor | Conveyor information hub opens |
| 4 | Tap `HomeCard` labelled `beltScanCard` on conveyor info screen | Navigates to `BeltScanListScreen` with `isConveyorIdsPreSupplied: true` filtering only scans for this conveyor |
| 5 | Verify displayed rows | Only records matching the selected conveyor ID are listed |

---

## 🏁 Expected Results

- Both entry points route correctly to Belt Scans with appropriate initial filter states

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart & conveyor_information_screen.dart
SemanticsLabel(
  label: 'beltScanCard',
  child: HomeCard(
    title: AppLocalizations.of(context)!.beltScans,
    counter: state.beltScans.where((element) => element.conveyor == widget.conveyorId).length.toString(),
  ),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:belt_scans_navigation_sources @smoke @both
Scenario: Navigate to Belt Scans from Dashboard and Conveyor Info
  Given the user is on the Dashboard
  When the user taps the Belt Scans card
  Then the Belt Scans list should display all accessible scans
  When the user navigates to Conveyor details and taps Belt Scans card
  Then the Belt Scans list should be filtered to that specific conveyor
```

---

## 🔗 Related

- [TC-BELT-SCANS-005 — Home card counter](./tc-belt-scans-005-home-dashboard-card-counter.md)
- [TC-BELT-SCANS-006 — Conveyor info card](./tc-belt-scans-006-conveyor-info-card-and-auto-filter.md)
- [Suite index](./index.md)
