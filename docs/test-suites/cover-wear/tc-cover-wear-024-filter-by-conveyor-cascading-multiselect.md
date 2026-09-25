# TC-COVER-WEAR-024: Filter by Conveyor Cascading Multi-Select

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart` (`_setConveyor`)

---

## 🎯 Objective
Verify that selecting Site(s) in `CoverWearFilterModal` cascades and dynamically filters the Conveyor multi-select dropdown options, showing only conveyors located within those selected sites.

---

## 📋 Preconditions
- Site 1 has Conveyors CV-1, CV-2; Site 2 has Conveyor CV-3.

---

## 🧪 Test Steps
1. Open `CoverWearFilterModal`.
2. Select Site 1 in the Site dropdown.
3. Open the Conveyor multi-select dropdown.
4. Verify that only Conveyors CV-1 and CV-2 are available as selectable options.
5. Select Conveyor CV-1 and tap Apply.
6. Verify that the Cover Wear list displays only events for CV-1.

---

## 🔍 Expected Results
- Conveyor options cascade reactively based on active site selections.

---

## 📱 Flutter Source Reference
- **Modal Logic**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart` (`_buildConveyorOptions`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_filter_conveyor @regression @both
Scenario: Filter Cover Wear events by cascading conveyor options
  Given the user is in the Cover Wear filter modal
  When the user selects site "<SiteName>"
  Then the conveyor options should be restricted to conveyors of "<SiteName>"
  When the user selects conveyor "<ConveyorName>" and applies the filter
  Then only events for conveyor "<ConveyorName>" should be displayed
```
