# TC-CONVEYOR-INSPECT-008 — Filter Modal — filter list by Site, Conveyor, and Sort order

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-008 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_filter_modal` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-filter-modal.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that opening `ConveyorInspectFilterModal` allows multi-selecting Sites, multi-selecting Conveyors, choosing Sort options (Last Modified, A-Z, Z-A), and dispatches `ConveyorInspectFilterEvent`.

---

## ✅ Preconditions

- User is on `ConveyorInspectListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the filter icon in the app bar | `ConveyorInspectFilterModal` bottom sheet opens |
| 2 | Select Site in multi-select dropdown | Conveyor multi-select updates to conveyors under that site |
| 3 | Select Conveyor | Conveyor filter configured |
| 4 | Select Sort order "A to Z" | Sort configured |
| 5 | Tap "Apply" | Modal closes; list updates to matching records ordered alphabetically |
| 6 | Reopen filter modal and tap "Reset" | All filters clear; full list is restored |

---

## 🏁 Expected Results

- Filter modal accurately restricts and sorts inspection records

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_filter_modal.dart
void _applyFilters() {
  final currentFilters = ConveyorInspectFilters(
    conveyorIds: _conveyorIds,
    siteIds: _siteIds,
    sortBy: _sortBy,
  );
  context.read<ConveyorInspectListBloc>().add(ConveyorInspectFilterEvent(filters: currentFilters));
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_filter_modal @regression @both
Scenario: Filter and sort conveyor inspect records
  Given the user is on the Conveyor Inspect screen
  When the user opens the filter modal and selects site "td.SiteName" and sort "A to Z"
  And the user applies filters
  Then the list should only display matching records sorted from A to Z
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
