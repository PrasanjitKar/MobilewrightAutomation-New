# TC-MINUTEMAN-023: Combined Site, Conveyor & Sort Filters

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` & `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart`

---

## 🎯 Objective
Verify the combined application of multiple filter criteria (Site + Conveyor + Sort Order) simultaneously, ensuring all filter predicates are applied properly in `MinutemanListBloc.filter()`.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen with diverse calculations across multiple sites and conveyors.

---

## 🧪 Test Steps
1. Open the Minuteman filter modal.
2. Select Sort Order `A-Z` (`FilterSortBasedOn.aToZ`).
3. Select Site `Pacific Plant`.
4. Select Conveyor `Overland Conveyor 1`.
5. Observe the dynamic result counter in the modal header.
6. Tap Apply/Save.
7. Verify that `MinutemanListFilterEvent` is emitted with all three filter parameters populated.
8. Verify that the displayed calculations:
   - Belong exclusively to `Pacific Plant`.
   - Belong exclusively to `Overland Conveyor 1`.
   - Are ordered alphabetically from A to Z by calculation name.

---

## 🔍 Expected Results
- Multi-dimensional filter predicates combine with logical `AND` semantics without regression or conflicts.

---

## 📱 Flutter Source Reference
- **Filter Modal**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` (`_applyFilters`)
- **BLoC Filter**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`filter`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_combined_filters @regression @both
Scenario: Apply combined site, conveyor, and sort filters on Minuteman calculations
  Given the user is on the Minuteman calculation list screen
  When the user opens the filter modal
  And selects sort "A-Z", site "<SiteName>", and conveyor "<ConveyorName>"
  And taps the apply filter button
  Then only calculations for site "<SiteName>" and conveyor "<ConveyorName>" should be shown
  And the calculations should be sorted alphabetically from A to Z
```
