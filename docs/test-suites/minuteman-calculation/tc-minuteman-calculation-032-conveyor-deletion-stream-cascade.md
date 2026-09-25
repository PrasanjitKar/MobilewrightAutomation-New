# TC-MINUTEMAN-032: Conveyor Deletion Event Cascade Auto-Refresh

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`conveyorBloc.stream.listen`)

---

## 🎯 Objective
Verify that when a conveyor is deleted within the application (`ConveyorDeleteSuccessState` emitted by `ConveyorBloc`), the `MinutemanListBloc` stream subscription captures the event and automatically triggers `MinutemanListLoadEvent(onlyLoading: true)` to purge stale calculations associated with the deleted conveyor.

---

## 📋 Preconditions
- User is logged in with access to Conveyors and Minuteman calculations.
- Conveyor X has associated Minuteman calculations.

---

## 🧪 Test Steps
1. Navigate to Conveyor details for Conveyor X.
2. Initiate and confirm deletion of Conveyor X.
3. Verify `ConveyorBloc` emits `ConveyorDeleteSuccessState`.
4. Navigate to or inspect `MinutemanListBloc` stream listener.
5. Verify that `MinutemanListBloc` receives the event and dispatches `MinutemanListLoadEvent(onlyLoading: true)`.
6. Open the Minuteman calculation list screen.
7. Verify that calculations previously tied to deleted Conveyor X are no longer present in `minutemanFullList` or `minutemanList`.

---

## 🔍 Expected Results
- Inter-BLoC stream synchronization maintains referential integrity between Conveyors and Minuteman calculation records.

---

## 📱 Flutter Source Reference
- **BLoC Listener**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`streamSubscription = conveyorBloc.stream.listen(...)`)
- **Conveyor State**: `ConveyorDeleteSuccessState`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_conveyor_delete_cascade @regression @both
Scenario: Auto-refresh Minuteman calculation list upon conveyor deletion
  Given conveyor "<ConveyorName>" has associated Minuteman calculations
  When the user deletes conveyor "<ConveyorName>"
  And the deletion completes successfully
  When the user navigates to the Minuteman calculation list
  Then calculations associated with "<ConveyorName>" should no longer be displayed
```
