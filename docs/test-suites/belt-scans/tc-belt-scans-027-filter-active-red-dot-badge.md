# TC-BELT-SCANS-027 — Filter Badge — red dot indicator on AppBar filter icon

> Suite: [Belt Scans](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-027 |
| **Suite** | belt-scans |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_filter_red_dot` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when any filter property is active (`state.filters.hasFilters == true`), a small red circular badge dot (`CircleAvatar(backgroundColor: ContiplusColors.continentalLightRed)`) is displayed over the AppBar filter icon.

---

## ✅ Preconditions

- User is on `BeltScanListScreen` with default filters

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe Filter icon on AppBar with default state | No red dot badge is visible (`hasFilters == false`) |
| 2 | Open Filter modal, select a Site, and tap Save | Filter applies; `hasFilters` becomes `true` |
| 3 | Observe Filter icon on AppBar | Red dot badge appears at top-right of the filter icon |
| 4 | Open Filter modal, tap Clear Filters, and tap Save | Red dot badge disappears |

---

## 🏁 Expected Results

- Red badge provides visual feedback that active filtering is modifying the list view

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
state.filters.hasFilters
    ? const CircleAvatar(
        backgroundColor: ContiplusColors.continentalLightRed,
        radius: 5,
      )
    : const SizedBox.shrink()
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_filter_red_dot @regression @both
Scenario: Verify red dot indicator when filters are active
  Given no filters are applied on the Belt Scans screen
  When the user applies any filter criteria
  Then a red dot badge should appear on the AppBar filter icon
  When the user clears all filters
  Then the red dot badge should disappear
```

---

## 🔗 Related

- [TC-BELT-SCANS-028 — Clear filters](./tc-belt-scans-028-clear-filters-resets-to-default.md)
- [Suite index](./index.md)
