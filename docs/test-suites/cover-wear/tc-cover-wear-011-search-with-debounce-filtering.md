# TC-COVER-WEAR-011: Search with 500ms Debounce Filtering

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_scheduleSearch`)

---

## 🎯 Objective
Verify that entering keywords in the search bar uses a 500ms debounce timer (`_searchDebounceDuration`) before dispatching `CoverWearListLoadEvent` with `searchText`, preventing excessive queries while typing.

---

## 📋 Preconditions
- User is on `CoverWearListPage`.

---

## 🧪 Test Steps
1. Tap the search icon (`ContiPlusIcon.searchIcon_24x24`) in the AppBar.
2. Verify the search bar overlay appears with an auto-focused `TextField`.
3. Type keyword "Overland" rapidly without pausing.
4. Verify that intermediate keystrokes do NOT dispatch queries immediately.
5. Pause typing for >= 500ms.
6. Verify that `_scheduleSearch` timer completes and dispatches `CoverWearListLoadEvent(query: CoverWearListQuery(searchText: 'Overland'))`.
7. Verify that the list updates to show only matching events (by site name, conveyor name, or event ID).

---

## 🔍 Expected Results
- Search debounce reduces redundant queries and returns filtered results accurately.

---

## 📱 Flutter Source Reference
- **Search Logic**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`_scheduleSearch`, `_searchDebounceDuration`)
- **BLoC Event**: `CoverWearListLoadEvent`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_search_debounce @regression @both
Scenario: Search Cover Wear list with debounced text input
  Given the user is on the Cover Wear list page
  When the user taps the search icon
  And enters search text "<SearchText>" with a 500ms pause
  Then the list should update to display only cover wear events matching "<SearchText>"
```
