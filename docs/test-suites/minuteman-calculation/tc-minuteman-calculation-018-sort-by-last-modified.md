# TC-MINUTEMAN-018: Sort by Last Modified Date

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`filter`)

---

## 🎯 Objective
Verify that selecting `FilterSortBasedOn.lastModified` in the filter modal sorts calculation items in descending chronological order by `updatedDate`.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen with calculations having distinct `updatedDate` timestamps.

---

## 🧪 Test Steps
1. Open the Minuteman filter modal.
2. Ensure the `Last Modified` radio button is selected (`FilterSortBasedOn.lastModified`).
3. Tap Save/Apply.
4. Verify that `MinutemanListFilterEvent` is dispatched with `sortBy: FilterSortBasedOn.lastModified`.
5. Verify that the calculations in the list are arranged such that each item's `updatedDate` is newer or equal to the subsequent item (`b.updatedDate!.compareTo(a.updatedDate!)`).

---

## 🔍 Expected Results
- Calculations are correctly sorted in descending order by last modified date.

---

## 📱 Flutter Source Reference
- **BLoC Sort**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`filtered.sort((b, a) => a.updatedDate!.compareTo(b.updatedDate!))`)
- **Enum**: `FilterSortBasedOn.lastModified`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_sort_last_modified @regression @both
Scenario: Sort Minuteman calculations by Last Modified
  Given the user is on the Minuteman calculation list screen
  When the user opens the filter modal and selects sort by "Last Modified"
  And taps the apply filter button
  Then the calculations should be ordered by last modified date descending
```
