# TC-MINUTEMAN-007: Conveyor Info Screen Card & Pre-Supplied Filter

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/conveyors/conveyor_information_screen.dart` (`minutemanCard`)

---

## 🎯 Objective
Verify that the Minuteman card on the Conveyor Information hub displays the calculation count scoped specifically for that conveyor, and navigating from this card sets `isConveyorIdsPreSupplied: true` on `MinutemanFilters`, preventing filter tampering.

---

## 📋 Preconditions
- User is logged in with Minuteman view permissions.
- Test Conveyor A has 3 calculations; Test Conveyor B has 0 calculations.

---

## 🧪 Test Steps
1. Navigate to Conveyor details screen for Conveyor A.
2. Locate the Minuteman card (`label: 'minutemanCard'`).
3. Verify that the card counter shows `3`.
4. Tap the card.
5. Verify navigation to `MinutemanListScreen` with `conveyorId: ConveyorA.id`.
6. Verify that only the 3 calculations associated with Conveyor A are rendered.
7. Open the filter modal and verify that the conveyor selector is locked / pre-supplied (`isConveyorIdsPreSupplied == true`).
8. Navigate to Conveyor B hub screen and verify its Minuteman card displays `0`.

---

## 🔍 Expected Results
- Conveyor hub displays scoped calculation count.
- Navigation auto-applies `MinutemanFilters(conveyorIds: [conveyorId], isConveyorIdsPreSupplied: true)`.
- Filter modal respects pre-supplied constraint.

---

## 📱 Flutter Source Reference
- **Conveyor Hub**: `lib/src/ui/screens/conveyors/conveyor_information_screen.dart` (`minutemanCard`, `MinutemanListFilterEvent`)
- **Filter State**: `MinutemanFilters.isConveyorIdsPreSupplied`
- **Icon**: `assets/svg/minuteman.svg`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_conveyor_hub_filter @regression @both
Scenario: Navigate to Minuteman list from Conveyor Hub with pre-supplied filter
  Given the user is on the conveyor information screen for "<ConveyorName>"
  When the user taps the Minuteman card
  Then the Minuteman calculation list should open
  And only calculations for conveyor "<ConveyorName>" should be displayed
  When the user opens the filter modal
  Then the conveyor filter should be locked to "<ConveyorName>"
```
