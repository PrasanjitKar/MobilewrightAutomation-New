# TC-CONVEYORS-014 — Filter modal — Sort By options (Last Modified / A→Z / Z→A)

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-014 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_filter_sort_by` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-filters.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the filter modal's Sort By radio options correctly set `ConveyorFilters.sortBy` on Apply.

---

## ✅ Preconditions

- User has view permission for conveyors and multiple conveyors exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open the filter modal | `radioButtonLastModified` pre-selected (default) |
| 2 | Select `radioButtonAToZ`, tap Apply | List reorders A→Z; modal closes |
| 3 | Reopen filters, select `radioButtonZToA`, tap Apply | List reorders Z→A |
| 4 | Reopen filters, select `radioButtonLastModified`, tap Apply | List reorders by last-modified descending |

---

## 🏁 Expected Results

- Selected sort option is dispatched via `ConveyorListFilterEvent(filter: ConveyorFilters(sortBy: ...))`
- List order updates immediately after Apply

---

## 🔍 Flutter Source Reference

```dart
// conveyor_filters_modal.dart — _applyFilters()
BlocProvider.of<ConveyorListBloc>(context).add(
  ConveyorListFilterEvent(
    filter: ConveyorFilters(
      sortBy: _sortBy,
      territoryIds: _territoryIds,
      customerCorporateIds: _customerCorporateIds,
      siteIds: _siteIds,
      filterInspectionItems: _filterInspectionItems,
      criticality: _criticality,
    ),
  ),
);
```

**Semantic labels:** `radioButtonLastModified`, `radioButtonAToZ`, `radioButtonZToA`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_filter_sort_by @regression @both
Scenario Outline: Sort By filter reorders the conveyors list
  Given the user opens the conveyors filter modal
  When the user selects "<sortOption>" and applies filters
  Then the conveyors list should be ordered by "<sortOption>"

  Examples:
    | sortOption    |
    | Last Modified |
    | A to Z        |
    | Z to A        |
```

---

## 🔗 Related

- [TC-CONVEYORS-008 — Sort order default](./tc-conveyors-008-sort-order-last-modified-default.md)
- [Suite index](./index.md)
