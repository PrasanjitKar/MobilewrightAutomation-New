# TC-COVER-WEAR-008: Conveyor Hub Card & Auto-Scoped Filter

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/conveyors/conveyor_information_screen.dart` (`coverWearCard`)

---

## 🎯 Objective
Verify that navigating to Cover Wear from the Conveyor Information hub automatically scopes the list query to that specific conveyor (`CoverWearListQuery(conveyorId: widget.conveyorId)`), locks the conveyor filter in `CoverWearFilterModal`, and hides unassociated events.

---

## 📋 Preconditions
- Conveyor A has 2 Cover Wear events; Conveyor B has 0 events.

---

## 🧪 Test Steps
1. Navigate to Conveyor details screen for Conveyor A.
2. Locate the `Cover Wear` card (`label: 'coverWearCard'`).
3. Verify the card count displays `2`.
4. Tap the card.
5. Verify navigation to `CoverWearListPage` with `conveyorId: ConveyorA.id`.
6. Verify that only the 2 events belonging to Conveyor A are rendered in the list.
7. Open the filter modal (`_openFilter`).
8. Verify that `_isConveyorScopePreSupplied` is true and the conveyor filter is locked to Conveyor A.
9. Verify that clearing filters retains the pre-supplied conveyor scope.

---

## 🔍 Expected Results
- Conveyor hub integration automatically enforces conveyor scoping across list and filter views.

---

## 📱 Flutter Source Reference
- **Conveyor Hub**: `lib/src/ui/screens/conveyors/conveyor_information_screen.dart` (`coverWearCard`, `CoverWearListQuery`)
- **Filter Modal**: `lib/src/features/coverwear/presentation/widgets/coverwear_filter_modal.dart` (`_isConveyorScopePreSupplied`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_conveyor_hub_scope @regression @both
Scenario: Navigate to Cover Wear from Conveyor Hub with scoped filter
  Given the user is on the conveyor information screen for "<ConveyorName>"
  When the user taps the Cover Wear card
  Then the Cover Wear list should open filtered for "<ConveyorName>"
  When the user opens the filter modal
  Then the conveyor filter should remain locked to "<ConveyorName>"
```
