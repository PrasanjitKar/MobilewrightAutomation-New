# TC-MINUTEMAN-014: Type-Specific SVG Icons: Elevator vs Conveyor

> **Suite**: `minuteman-calculation` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`minutemanModel.type?.isElevator`)

---

## 🎯 Objective
Verify that `MinutemanRow` dynamically switches the leading SVG icon depending on whether the calculation is for an Elevator (`assets/svg/minuteman_elevator.svg`) or a Conveyor (`assets/svg/minuteman_conveyor.svg`).

---

## 📋 Preconditions
- User has permissions for both Conveyor and Elevator Minuteman modules.
- Calculation list contains at least one Conveyor calculation and at least one Elevator calculation.

---

## 🧪 Test Steps
1. Navigate to the Minuteman calculation list screen.
2. Locate a calculation item where `minutemanModel.type == MinutemanType.elevator`.
3. Inspect the leading icon asset.
4. Verify that `assets/svg/minuteman_elevator.svg` is rendered.
5. Locate a calculation item where `minutemanModel.type == MinutemanType.conveyor`.
6. Inspect the leading icon asset.
7. Verify that `assets/svg/minuteman_conveyor.svg` is rendered.

---

## 🔍 Expected Results
- Distinct visual SVG icons allow instant identification of calculation equipment domain.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart`
- **Icon Assets**: `assets/svg/minuteman_elevator.svg`, `assets/svg/minuteman_conveyor.svg`
- **Model Property**: `minutemanModel.type?.isElevator`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_type_icons @regression @both
Scenario Outline: Verify type-specific SVG icons for Conveyor and Elevator calculations
  Given the user is on the Minuteman calculation list screen
  When the user inspects calculation "<CalculationName>" of type "<CalculationType>"
  Then the leading icon should be rendered from asset "<ExpectedIconAsset>"

  Examples:
    | CalculationName     | CalculationType | ExpectedIconAsset                    |
    | North Elevator Calc | elevator        | assets/svg/minuteman_elevator.svg    |
    | Overland Conv Calc  | conveyor        | assets/svg/minuteman_conveyor.svg    |
```
