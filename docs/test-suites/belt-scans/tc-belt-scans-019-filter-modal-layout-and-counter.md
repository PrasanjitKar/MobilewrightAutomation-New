# TC-BELT-SCANS-019 — Filter Modal — modal layout and dynamic result counter

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-019 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_filter_modal_layout` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the Filter icon opens `BeltScanFilterModal` with Sort options (Last Modified, A-Z, Z-A), MultiSelect selectors (Site, Conveyor, Monitoring Device Type), and calculates live matched result count badge (`showAllResults ? count : null`).

---

## ✅ Preconditions

- User is on `BeltScanListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the Filter icon in the AppBar | `BeltScanFilterModal` bottom sheet slides up |
| 2 | Verify Sort section | Radio buttons for "Last Modified", "A-Z", and "Z-A" |
| 3 | Verify MultiSelect fields | MultiSelect dropdowns for "Site", "Conveyor", and "Monitoring Device Type" |
| 4 | Select a Site filter | Dynamic match count badge in top right of modal updates to show matching scans |
| 5 | Tap Cancel / Close | Modal dismisses without applying changes |

---

## 🏁 Expected Results

- Filter modal provides intuitive controls with real-time result count forecasting

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_filter_modal.dart
(siteOptions, conveyorOptions, deviceTypeOptions, count) = a.getFilteredBeltScanData();
FiltersTemplate(
  totalResultCount: showAllResults ? count : null,
  onSaveTap: () => _applyFilters(),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_filter_modal_layout @regression @both
Scenario: Verify Belt Scans filter modal layout and live counter
  Given the user is on the Belt Scans list screen
  When the user taps the filter icon
  Then the filter modal should open with sort radios and multiselect filters
  And selecting filter options should update the preview result counter
```

---

## 🔗 Related

- [TC-BELT-SCANS-026 — Combined filters](./tc-belt-scans-026-combined-multi-filters.md)
- [Suite index](./index.md)
