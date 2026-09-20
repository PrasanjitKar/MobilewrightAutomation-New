# TC-CONVEYORS-006 — Search filters the conveyor list by name

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-006 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_search_by_name` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the Conveyors list filters case-insensitively by conveyor name as the user types in the search box, and re-applies existing filters together with the search term.

---

## ✅ Preconditions

- User has view permission for conveyors
- At least 2 conveyors exist with distinct names, one containing a known test substring

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open the Conveyors list | Full list is shown |
| 2 | Enter a substring of one conveyor's name (any case) into search | `ConveyorListSearchEvent(search: <term>)` dispatched |
| 3 | Observe list | Only conveyors whose `name` contains the term (case-insensitive) remain |
| 4 | Apply an existing filter (e.g. Critical = Yes), then search | Both the filter and the search term are applied together |
| 5 | Clear the search term | Full (filtered) list is restored |

---

## 🏁 Expected Results

- Search is case-insensitive substring match on `ConveyorModel.name`
- Search composes with active filters (`ConveyorListBloc.search()` runs on the already-`filter()`-ed list per `_onConveyorSearchEvent`)
- Clearing search restores the previously filtered list, not the unfiltered full list

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_bloc.dart
Future<void> _onConveyorSearchEvent(
  ConveyorListSearchEvent event,
  Emitter<ConveyorListState> emit,
) async {
  List<ConveyorModel> filteredDevices = List.of(state.conveyorFullList);
  if (state.filters.hasFilters) {
    filteredDevices = filter(filteredDevices, state.filters);
  }
  emit(state.copyWith(conveyors: search(filteredDevices, event.search), search: event.search));
}

List<ConveyorModel> search(List<ConveyorModel> conveyors, String search) {
  return conveyors
      .where((element) => element.name!.toLowerCase().contains(search.toLowerCase()))
      .toList();
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_search_by_name @regression @both
Scenario: Search filters conveyors list by name
  Given the user is on the conveyors list
  When the user searches for "td.SearchTerm"
  Then only conveyors whose name contains "td.SearchTerm" should be displayed
```

---

## 🔗 Related

- [TC-CONVEYORS-004 — Empty state](./tc-conveyors-004-empty-state-no-results-found.md)
- [Suite index](./index.md)
