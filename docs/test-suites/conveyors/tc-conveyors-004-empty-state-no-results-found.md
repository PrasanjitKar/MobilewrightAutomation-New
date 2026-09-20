# TC-CONVEYORS-004 — Empty state shows "No results found" when the list is empty

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-004 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_empty_state` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the list shows the correct placeholder text depending on loading state when there are zero conveyors to display (e.g. after a search/filter with no matches).

---

## ✅ Preconditions

- User has view permission for conveyors
- A search term or filter combination exists that yields zero results

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open the Conveyors list | List renders normally |
| 2 | Enter a search term that matches no conveyor | List becomes empty |
| 3 | Observe placeholder while a background reload is in progress | `refreshingList` — "Refreshing the list" |
| 4 | Observe placeholder once loading completes | `noResultsFound` — "No results found" |

---

## 🏁 Expected Results

- While `ListStatus.isLoading` and the list is empty, "Refreshing the list" is shown
- Once loading finishes and the list remains empty, "No results found" is shown
- The last-updated/count widget is **not** shown while the list is empty

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_screen.dart
if (listItems.isEmpty)
  if (state.status.isLoading)
    const Center(
      child: SemanticsLabel(label: 'refreshingList', child: Text('Refreshing the list')),
    )
  else
    Center(
      child: SemanticsLabel(
        label: 'noResultsFound',
        child: Text(AppLocalizations.of(context)!.noResultsFound), // "No results found"
      ),
    )
else
  SemanticsLabel(
    label: 'listCountAndLastUpdatedTimeForConveyorList',
    child: LastUpdatedTimeAndTotalCountWidget(...),
  ),
```

**Semantic labels / locators:** `refreshingList`, `noResultsFound`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_empty_state @regression @both
Scenario: Empty state message when search yields no conveyors
  Given the user is on the conveyors list
  When the user searches for "td.NonMatchingSearchTerm"
  Then the "No results found" message should be displayed
```

---

## 🔗 Related

- [TC-CONVEYORS-006 — Search filters list by name](./tc-conveyors-006-search-filters-list-by-name.md)
- [Suite index](./index.md)
