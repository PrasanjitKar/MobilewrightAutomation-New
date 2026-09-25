# TC-BELT-SCANS-028 — Clear Filters — reset filters to default state

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-028 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_clear_filters` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping "Clear Filters" in `BeltScanFilterModal` resets sort to `lastModified`, empties `site`, `conveyor`, and `deviceType` selections, and restoring the full list when saved.

---

## ✅ Preconditions

- Filters are currently applied

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal | Filter modal shows active selections |
| 2 | Tap "Clear Filters" button in modal header | All selections are cleared; sort resets to "Last Modified" |
| 3 | Tap "Save" button | `BeltScanListFilterEvent(beltScanFilters: BeltScanFilters())` fires |
| 4 | Verify list screen | Full unfiltered scan list is restored; red badge dot is removed |

---

## 🏁 Expected Results

- Filters reset cleanly back to system defaults

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_filter_modal.dart
void _clearProperties() {
  if (!isConveyorIdsPreSupplied) {
    _conveyor = [];
    _site = [];
    _deviceType = [];
    showAllResults = false;
  }
  _sortBy = FilterSortBasedOn.lastModified;
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_clear_filters @regression @both
Scenario: Clear applied filters in Belt Scans filter modal
  Given active filters are applied on the Belt Scans screen
  When the user opens the filter modal and taps "Clear Filters"
  And saves the modal
  Then all filter criteria should be reset and the full list restored
```

---

## 🔗 Related

- [TC-BELT-SCANS-027 — Filter badge](./tc-belt-scans-027-filter-active-red-dot-badge.md)
- [Suite index](./index.md)
