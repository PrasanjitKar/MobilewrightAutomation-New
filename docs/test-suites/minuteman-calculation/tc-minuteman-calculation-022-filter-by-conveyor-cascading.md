# TC-MINUTEMAN-022: Filter by Conveyor Cascading Multi-Select

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` (`_buildConveyorDropdown`)

---

## 🎯 Objective
Verify that the Conveyor multi-select dropdown in `MinutemanFilterModal` dynamically cascades and filters based on the currently selected Site(s), showing only conveyors present in those sites with associated calculations.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen.
- Site 1 has Conveyors C1, C2 (with calculations). Site 2 has Conveyor C3 (with calculation).

---

## 🧪 Test Steps
1. Open the Minuteman filter modal.
2. Observe Conveyor options before selecting any site: all conveyors from all sites with calculations are listed.
3. Select Site 1 in the Site dropdown.
4. Open the Conveyor multi-select dropdown.
5. Verify via `MinutemanFilterHelper.getConveyorOptions` that only conveyors associated with Site 1 (C1 and C2) are available in the options.
6. Select Conveyor C1.
7. Tap Save/Apply.
8. Verify that only calculations for Conveyor C1 at Site 1 are rendered in the list.

---

## 🔍 Expected Results
- Conveyor multi-select options cascade reactively based on active site selections.
- Final filtered calculation list strictly honors the selected conveyor filter.

---

## 📱 Flutter Source Reference
- **Modal Widget**: `lib/src/ui/screens/minuteman/minuteman_filter_modal.dart` (`_buildConveyorDropdown`, `setConveyorIds`)
- **Helper**: `MinutemanFilterHelper.getConveyorOptions`
- **BLoC Filter**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`filters.conveyorIds.contains(element.conveyorId)`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_filter_conveyors @regression @both
Scenario: Filter Minuteman calculations by cascading conveyor options
  Given the user is in the Minuteman filter modal
  When the user selects site "<SiteName>"
  Then the conveyor dropdown options should be restricted to conveyors of "<SiteName>"
  When the user selects conveyor "<ConveyorName>" and applies the filter
  Then only calculations belonging to conveyor "<ConveyorName>" should be displayed
```
