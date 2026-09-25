# TC-MINUTEMAN-025: Clear Filters Action & State Reset

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` (`_clearFilters`, `_clearProperties`)

---

## 🎯 Objective
Verify that tapping the "Clear Filters" action inside `MinutemanFilterModal` resets Sort By to `lastModified`, empties all selected sites and conveyors (preserving pre-supplied conveyor if applicable), and increments `_clearFiltersCounter` to redraw clean dropdown components.

---

## 📋 Preconditions
- User is in `MinutemanFilterModal` with custom sort and site/conveyor selections active.

---

## 🧪 Test Steps
1. In `MinutemanFilterModal`, select `Sort By: A-Z`, choose Site `Mine Site A`, and choose Conveyor `Conveyor 1`.
2. Tap the `Clear Filters` text button in the modal header.
3. Observe the internal state:
   - `_sortBy` resets to `FilterSortBasedOn.lastModified`.
   - `_siteIds` resets to `[]`.
   - `_conveyorIds` resets to `[]` (if not pre-supplied).
   - `showAllResults` resets to `false`.
   - `_clearFiltersCounter` increments by 1, forcing widget key reconstruction (`Key(_clearFiltersCounter.toString())`).
4. Tap Apply/Save.
5. Verify that `MinutemanListFilterEvent` is emitted with default `MinutemanFilters()`.
6. Verify the list restores to the default unconstrained view.

---

## 🔍 Expected Results
- All selections in the modal UI reset to initial defaults cleanly.
- Re-applying updates the list to the full, default-ordered state.

---

## 📱 Flutter Source Reference
- **Filter Modal**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` (`_clearFilters()`, `_clearProperties()`)
- **Key Refresh**: `SingleChildScrollView(key: Key(_clearFiltersCounter.toString()))`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_clear_filters @regression @both
Scenario: Clear applied filters in Minuteman filter modal
  Given the user has applied custom filters in the Minuteman filter modal
  When the user taps the "Clear Filters" button
  Then the Sort By selection should reset to "Last Modified"
  And all site and conveyor selections should be cleared
  When the user taps apply
  Then the Minuteman calculation list should reset to default state
```
