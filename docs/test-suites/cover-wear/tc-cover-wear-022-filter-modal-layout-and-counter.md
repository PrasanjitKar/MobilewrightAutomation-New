# TC-COVER-WEAR-022: Filter Modal Layout & Real-Time Result Counter

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart` (`CoverWearFilterModal`)

---

## 🎯 Objective
Verify the layout of `CoverWearFilterModal`, including Sort By options (`Last Modified`, `A-Z`, `Z-A`), Company multi-select, Conveyor cascading multi-select, Clear Filters, Cancel, and Save buttons with dynamic real-time result count (`_recalculateResultCount`).

---

## 📋 Preconditions
- User is on `CoverWearListPage`.

---

## 🧪 Test Steps
1. Tap the filter icon (`ContiPlusIcon.mobileFilter_24x24`) in the AppBar.
2. Verify that `CoverWearFilterModal` slides up as a bottom sheet with rounded corners.
3. Verify controls:
   - Sort By radios: `Last Modified` (default selected), `A-Z`, `Z-A`.
   - Site dropdown: `ContiFilterMultiSelect(title: 'Site')`.
   - Conveyor dropdown: `ContiFilterMultiSelect(title: 'Conveyor')`.
   - Header actions: `Clear Filters`, `Cancel`, and `Apply/Save`.
4. Select a site and observe the Apply button updating to show the exact matching result count (`_resultCount`).
5. Tap Cancel and verify modal dismisses without modifying active filters.

---

## 🔍 Expected Results
- Filter modal opens smoothly with accurate options and reactive matching count.

---

## 📱 Flutter Source Reference
- **Filter Modal**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart` (`CoverWearFilterModal`)
- **Template**: `lib/src/ui/widgets/filters_template.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_filter_modal @regression @both
Scenario: Verify Cover Wear filter modal layout and dynamic result count
  Given the user is on the Cover Wear list page
  When the user taps the filter icon in the AppBar
  Then the Cover Wear filter modal should open
  And Sort By, Site, and Conveyor filters should be displayed
  When the user selects a site option
  Then the apply button should display the live matching count
```
