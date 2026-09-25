# TC-MINUTEMAN-019: Sort Alphabetical A-Z

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`filter`)

---

## 🎯 Objective
Verify that selecting `FilterSortBasedOn.aToZ` sorts the calculation list in case-insensitive ascending alphabetical order by calculation name (`element.name`).

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen with multiple named calculations.

---

## 🧪 Test Steps
1. Open the Minuteman filter modal.
2. Select the `A-Z` radio button (`FilterSortBasedOn.aToZ`).
3. Tap Save/Apply.
4. Verify that `MinutemanListFilterEvent` is dispatched with `sortBy: FilterSortBasedOn.aToZ`.
5. Verify that the calculations in the list are arranged alphabetically from A to Z (`a.name!.toLowerCase().compareTo(b.name!.toLowerCase())`).

---

## 🔍 Expected Results
- Calculations are correctly sorted alphabetically in ascending order (A-Z).

---

## 📱 Flutter Source Reference
- **BLoC Sort**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`filtered.sort((a, b) => a.name!.toLowerCase().compareTo(b.name!.toLowerCase()))`)
- **Enum**: `FilterSortBasedOn.aToZ`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_sort_a_to_z @regression @both
Scenario: Sort Minuteman calculations alphabetically A to Z
  Given the user is on the Minuteman calculation list screen
  When the user opens the filter modal and selects sort by "A-Z"
  And taps the apply filter button
  Then the calculations should be ordered alphabetically from A to Z
```
