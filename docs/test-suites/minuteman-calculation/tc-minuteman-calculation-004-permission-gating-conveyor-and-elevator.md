# TC-MINUTEMAN-004: Permission Gating: Conveyor vs Elevator Scoping

> **Suite**: `minuteman-calculation` | **Priority**: `Critical` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`checkMinutemanElevatorOrConveyor`)

---

## 🎯 Objective
Verify granular permission gating between `BasicModule.minutemanConveyor` and `BasicModule.minutemanElevator`, ensuring users only see calculations corresponding to their authorized module scopes.

---

## 📋 Preconditions
- User roles configured for 4 testing matrix scenarios:
  1. Both `minutemanConveyor: view` and `minutemanElevator: view`.
  2. Only `minutemanConveyor: view`.
  3. Only `minutemanElevator: view`.
  4. Neither permission granted.

---

## 🧪 Test Steps
1. **Scenario 1 (Both Permissions Granted)**:
   - Login with User 1 and open Minuteman calculation list.
   - Verify all calculations (`MinutemanType.conveyor` and `MinutemanType.elevator`) are displayed.
2. **Scenario 2 (Only Conveyor Permission)**:
   - Login with User 2 and open Minuteman calculation list.
   - Verify only `MinutemanType.conveyor` calculations are displayed (`minuteman_conveyor.svg`).
   - Verify elevator calculations are filtered out.
3. **Scenario 3 (Only Elevator Permission)**:
   - Login with User 3 and open Minuteman calculation list.
   - Verify only `MinutemanType.elevator` calculations are displayed (`minuteman_elevator.svg`).
   - Verify conveyor calculations are filtered out.
4. **Scenario 4 (Neither Permission Granted)**:
   - Login with User 4 and check Home screen & direct route.
   - Verify Minuteman card is not visible on Home/Conveyor Hub.
   - Verify `MinutemanListScreen` returns blank `Container()`.

---

## 🔍 Expected Results
- Calculations are strictly filtered by the user's permission scope via `checkMinutemanElevatorOrConveyor()`.
- Unauthorized users cannot view or access the screen.

---

## 📱 Flutter Source Reference
- **BLoC Filter**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`checkMinutemanElevatorOrConveyor`)
- **Modules**: `BasicModule.minutemanConveyor`, `BasicModule.minutemanElevator`
- **Permission**: `Permission.view`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_permission_scoping @regression @both
Scenario Outline: Verify Minuteman list scoping based on user module permissions
  Given the user is logged in with "<UserRole>" permissions
  When the user accesses the Minuteman calculation list
  Then the list should contain calculations of type "<ExpectedType>"
  And calculations of type "<ExcludedType>" should be excluded

  Examples:
    | UserRole       | ExpectedType        | ExcludedType |
    | Full_Access    | Conveyor, Elevator  | None         |
    | Conveyor_Only  | Conveyor            | Elevator     |
    | Elevator_Only  | Elevator            | Conveyor     |
```
