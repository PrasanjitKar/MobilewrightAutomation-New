# TC-MINUTEMAN-009: Search by Calculation Name

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` & `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart`

---

## 🎯 Objective
Verify that the search functionality in `MinutemanListScreen` accurately filters the calculation list in real time based on case-insensitive substring matches against calculation names (`element.name`).

---

## 📋 Preconditions
- User is logged in as a standard user with Minuteman view permissions.
- Calculation list contains varied calculation names (e.g., "North Slope Calc 1", "Main Conveyor Calculation", "Elevator East Primary").

---

## 🧪 Test Steps
1. Navigate to the Minuteman Calculation list screen.
2. Tap the search icon (`Icons.search`) in the AppBar.
3. Verify that the search bar overlay appears with an auto-focused `TextField` and hint text `Search`.
4. Enter search keyword "Slope".
5. Verify that `MinuteManSearchEvent(search: 'Slope')` is dispatched.
6. Verify that only calculations with names containing "Slope" (case-insensitive) remain in the list.
7. Change search query to lowercase "slope" and verify identical matching results.
8. Enter a partial word (e.g., "Elev") and verify matching elevator calculations are returned.

---

## 🔍 Expected Results
- Search bar appears with red search prefix icon and close suffix icon.
- List updates instantly to show matching items without network delay.

---

## 📱 Flutter Source Reference
- **List Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`searching`, `_searchCtrl`, `onSearch()`)
- **BLoC Method**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`search(List<MinutemanModel>, String)`)
- **Event**: `MinuteManSearchEvent`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_search_name @regression @both
Scenario Outline: Search Minuteman calculation list by name
  Given the user is on the Minuteman calculation list screen
  When the user taps the search icon
  And enters search query "<SearchQuery>"
  Then the list should display only calculations containing "<SearchQuery>" in their name

  Examples:
    | SearchQuery |
    | Slope       |
    | elevator    |
    | CALC        |
```
