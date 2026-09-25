# TC-MINUTEMAN-021: Filter by Site Multi-Select

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` (`ContiFilterMultiSelect(title: 'Site')`)

---

## 🎯 Objective
Verify filtering calculations by one or more Sites using the multi-select dropdown in `MinutemanFilterModal`, ensuring only calculations belonging to selected sites are displayed in the list.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen.
- Calculations belong to multiple distinct customer sites.

---

## 🧪 Test Steps
1. Open the Minuteman filter modal.
2. Tap the **Site** multi-select dropdown.
3. Verify that the dropdown list displays all sites that currently contain Minuteman calculations (`MinutemanFilterHelper.getSiteOptions`).
4. Select Site "Alpha Mine".
5. Verify dynamic result counter in the modal header updates.
6. Tap Save/Apply.
7. Verify that `MinutemanListFilterEvent` is dispatched with `siteIds: [alphaSiteId]`.
8. Verify that all displayed calculation rows belong to "Alpha Mine".
9. Reopen filter modal, select an additional site "Beta Quarry", and apply.
10. Verify that calculations from both "Alpha Mine" and "Beta Quarry" are displayed.

---

## 🔍 Expected Results
- Calculations are strictly filtered by selected site IDs.
- Multi-selection correctly matches any calculations belonging to the chosen sites.

---

## 📱 Flutter Source Reference
- **Filter Modal**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` (`_setSite`)
- **Helper**: `MinutemanFilterHelper.getSiteOptions`
- **BLoC Filter**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`filters.siteIds.contains(element.siteId)`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_filter_sites @regression @both
Scenario: Filter Minuteman calculations by multiple sites
  Given the user is on the Minuteman calculation list screen
  When the user opens the filter modal
  And selects sites "Alpha Mine, Beta Quarry"
  And taps the apply filter button
  Then only calculations from "Alpha Mine" or "Beta Quarry" should be displayed
```
