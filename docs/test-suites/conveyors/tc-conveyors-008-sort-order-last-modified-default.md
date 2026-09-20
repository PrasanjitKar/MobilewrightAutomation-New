# TC-CONVEYORS-008 — Default sort order is Last Modified; A→Z / Z→A options reorder the list

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-008 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_sort_order` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the conveyors list defaults to Last Modified sort order, and that switching to A→Z or Z→A via the filter modal correctly reorders the list.

---

## ✅ Preconditions

- User has view permission for conveyors
- At least 3 conveyors exist with distinct names and different last-modified timestamps

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open the Conveyors list without changing filters | List is sorted by `updatedDate` descending (most recently modified first) — `FilterSortBasedOn.lastModified` is the default |
| 2 | Open filters, select "A to Z", apply | List is naturally sorted alphabetically ascending by name |
| 3 | Open filters, select "Z to A", apply | List is naturally sorted alphabetically descending by name |

---

## 🏁 Expected Results

- `ConveyorFilters.sortBy` defaults to `FilterSortBasedOn.lastModified`
- `lastModified` sorts by `updatedDate` descending (newest first)
- `aToZ`/`zToA` use natural (locale-aware) name sorting via `sortNaturalByName`

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_bloc.dart — filter()
switch (sortBy) {
  case FilterSortBasedOn.uploadPending:
    break;
  case FilterSortBasedOn.uploaded:
    break;
  case FilterSortBasedOn.lastModified:
    result.sort((b, a) => a.updatedDate != null ? a.updatedDate!.compareTo(b.updatedDate ?? -1) : 0);
  case FilterSortBasedOn.aToZ:
    sortNaturalByName(result, (c) => c.name);
  case FilterSortBasedOn.zToA:
    sortNaturalByName(result, (c) => c.name, ascending: false);
}
```

**Semantic labels:** `radioButtonLastModified`, `radioButtonAToZ`, `radioButtonZToA`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_sort_order @regression @both
Scenario Outline: Sort order changes list ordering
  Given the user is on the conveyors list
  When the user selects the "<sortOption>" sort filter and applies it
  Then the conveyor list order should match "<sortOption>"

  Examples:
    | sortOption    |
    | Last Modified |
    | A to Z        |
    | Z to A        |
```

---

## 🔗 Related

- [TC-CONVEYORS-014 — Filter modal sort by options](./tc-conveyors-014-filter-sort-by-options.md)
- [Suite index](./index.md)
