# TC-BELT-SCANS-024 — Filter Conveyor — cascading conveyor multi-select

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-024 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_filter_by_conveyor` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that the Conveyor MultiSelect filters belt scans by conveyor ID, and displays only conveyors that match the currently selected sites.

---

## ✅ Preconditions

- Multiple conveyors with associated belt scan records exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal | Conveyor multiselect is available |
| 2 | Open Conveyor selector and choose conveyor `CV-101` | `_conveyor` is set |
| 3 | Tap "Save" | Filter applies |
| 4 | Inspect list screen | Only belt scans associated with conveyor `CV-101` are rendered |

---

## 🏁 Expected Results

- Cascading conveyor filtering narrows scan records to selected conveyors

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_bloc.dart
if (state.filters.conveyor.isNotEmpty) {
  filtered = filtered.where((element) => state.filters.conveyor.contains(element.conveyor)).toList();
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_filter_by_conveyor @regression @both
Scenario: Filter belt scans by conveyor multi-select
  Given the user opens the Belt Scans filter modal
  When the user selects one or more conveyors and applies
  Then only belt scans belonging to the selected conveyors should be displayed
```

---

## 🔗 Related

- [TC-BELT-SCANS-023 — Filter by site](./tc-belt-scans-023-filter-by-site-multiselect.md)
- [Suite index](./index.md)
