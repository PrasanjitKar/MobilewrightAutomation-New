# TC-CONVEYORS-018 — Clear Filters resets all filter fields without applying

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-018 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_filter_clear` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-filters.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify tapping "Clear Filters" resets all in-progress modal selections back to defaults without dispatching a filter event until the user taps Apply/Save.

---

## ✅ Preconditions

- User has view permission for conveyors and has an active, non-default filter combination applied

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filters with an existing non-default combination pre-selected | All prior selections are shown |
| 2 | Change several fields (sort, criticality, territory, etc.) | New in-progress values reflected in the modal |
| 3 | Tap "Clear Filters" | All fields reset to defaults (`sortBy = lastModified`, empty lists); the underlying `ConveyorListBloc` filter state is **not yet** changed |
| 4 | Close the modal without tapping Apply (e.g. back button) | List remains filtered by the previously applied (pre-clear) filters |
| 5 | Reopen filters, tap Clear Filters, then tap Apply | List now shows the unfiltered (default) result set |

---

## 🏁 Expected Results

- Clear Filters only resets modal-local state (`_clearFiltersCounter` increments to force widget rebuild); it does not dispatch `ConveyorListFilterEvent` on its own
- Only tapping Apply persists the cleared state to the list

---

## 🔍 Flutter Source Reference

```dart
// conveyor_filters_modal.dart
void clearFilters() {
  setState(() {
    _sortBy = FilterSortBasedOn.lastModified;
    _territoryIds = [];
    _customerCorporateIds = [];
    _siteIds = [];
    _filterInspectionItems = [];
    _criticality = [];
    _clearFiltersCounter++;
  });
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_filter_clear @regression @both
Scenario: Clear Filters resets modal fields without immediately applying
  Given the user has applied a non-default filter combination on the conveyors list
  When the user opens filters and taps "Clear Filters"
  And the user taps Apply
  Then the conveyors list should show the unfiltered result set
```

---

## 🔗 Related

- [TC-CONVEYORS-019 — Cancel filter modal](./tc-conveyors-019-cancel-filter-modal-discards-changes.md)
- [Suite index](./index.md)
