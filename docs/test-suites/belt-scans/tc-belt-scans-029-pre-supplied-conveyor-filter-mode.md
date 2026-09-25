# TC-BELT-SCANS-029 — Pre-Supplied Conveyor — locked filter mode from Conveyor Info

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-029 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_pre_supplied_conveyor_mode` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when `BeltScanListScreen` is opened with `isConveyorIdsPreSupplied: true` (navigated from Conveyor Information), `BeltScanFilterModal` disables the Site and Conveyor selectors, preventing users from changing conveyor context while allowing device type and sort changes.

---

## ✅ Preconditions

- Navigated to Belt Scans from a Conveyor Information screen

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From Conveyor Information screen, tap Belt Scans card | `BeltScanListScreen` opens in pre-supplied mode |
| 2 | Tap Filter icon on AppBar | `BeltScanFilterModal` opens |
| 3 | Inspect Site and Conveyor selectors | Both selectors are disabled (`isEnabled: !isConveyorIdsPreSupplied`) |
| 4 | Change Sort to "A-Z" and change Device Type filter | Sort and Device Type selectors are active and functional |
| 5 | Tap "Clear Filters" | Pre-supplied conveyor ID is preserved; only sort resets |

---

## 🏁 Expected Results

- Contextual conveyor lock is enforced and cannot be overridden accidentally in filter modal

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_filter_modal.dart
ContiFilterMultiSelect(
  title: AppLocalizations.of(context)!.site,
  isEnabled: !isConveyorIdsPreSupplied,
  ...
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_pre_supplied_conveyor_mode @regression @both
Scenario: Verify locked Site and Conveyor filters in pre-supplied mode
  Given the user navigates to Belt Scans from Conveyor Information
  When the user opens the filter modal
  Then the Site and Conveyor multiselect filters should be disabled
  And only Sort and Device Type options should be editable
```

---

## 🔗 Related

- [TC-BELT-SCANS-006 — Conveyor info card](./tc-belt-scans-006-conveyor-info-card-and-auto-filter.md)
- [Suite index](./index.md)
