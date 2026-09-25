# TC-MINUTEMAN-020: Sort Alphabetical Z-A

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`filter`)

---

## 🎯 Objective
Verify that selecting `FilterSortBasedOn.zToA` sorts the calculation list in case-insensitive descending alphabetical order by calculation name (`element.name`).

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen with multiple named calculations.

---

## 🧪 Test Steps
1. Open the Minuteman filter modal.
2. Select the `Z-A` radio button (`FilterSortBasedOn.zToA`).
3. Tap Save/Apply.
4. Verify that `MinutemanListFilterEvent` is dispatched with `sortBy: FilterSortBasedOn.zToA`.
5. Verify that the calculations in the list are arranged in reverse alphabetical order from Z to A (`b.name!.toLowerCase().compareTo(a.name!.toLowerCase())`).

---

## 🔍 Expected Results
- Calculations are correctly sorted in descending alphabetical order (Z-A).

---

## 📱 Flutter Source Reference
- **BLoC Sort**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`filtered.sort((b, a) => a.name!.toLowerCase().compareTo(b.name!.toLowerCase()))`)
- **Enum**: `FilterSortBasedOn.zToA`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_sort_z_to_a @regression @both
Scenario: Sort Minuteman calculations alphabetically Z to A
  Given the user is on the Minuteman calculation list screen
  When the user opens the filter modal and selects sort by "Z-A"
  And taps the apply filter button
  Then the calculations should be ordered alphabetically from Z to A
```
