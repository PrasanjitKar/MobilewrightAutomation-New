# TC-MINUTEMAN-034: Periodic Background Timer Synchronization

> **Suite**: `minuteman-calculation` | **Priority**: `Low` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`MinuteManTimerEvent`) & `lib/src/common/helpers/data_sync_helper.dart`

---

## 🎯 Objective
Verify that periodic sync events triggered by `DataSyncHelper` dispatch `MinuteManTimerEvent` to `MinutemanListBloc`, triggering an automatic background refresh when the list is not actively loading.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen.
- Background periodic sync timer is running in `DataSyncHelper`.

---

## 🧪 Test Steps
1. Navigate to the Minuteman calculation list screen and remain on the screen.
2. Allow `DataSyncHelper` periodic timer to fire (`blocManager.minutemanListBloc.add(const MinuteManTimerEvent())`).
3. Verify that if `!state.status.isLoading`, `MinutemanListLoadEvent` is automatically dispatched.
4. Verify that the list checks for updated records and updates `lastUpdatedTime` in the background.
5. Verify that if a user is actively searching or filtering, the active query and filters are preserved during the timer sync.

---

## 🔍 Expected Results
- Background sync keeps calculation data fresh without disrupting active user interactions.

---

## 📱 Flutter Source Reference
- **BLoC Event Handler**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`_minutemanTimerEvent`)
- **Sync Helper**: `lib/src/common/helpers/data_sync_helper.dart` (`blocManager.minutemanListBloc.add(const MinuteManTimerEvent())`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_timer_sync @regression @both
Scenario: Refresh Minuteman calculations via periodic timer synchronization
  Given the user is on the Minuteman calculation list screen
  When the background data sync timer triggers
  Then a background refresh of Minuteman calculations should be performed
  And any active search or filter state should be preserved
```
