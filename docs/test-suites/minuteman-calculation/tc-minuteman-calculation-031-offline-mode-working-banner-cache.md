# TC-MINUTEMAN-031: Offline Mode Cached Calculations & Working Banner

> **Suite**: `minuteman-calculation` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`if (state.status.isOffline)`)

---

## 🎯 Objective
Verify that when the device lacks internet connectivity, `MinutemanListScreen` loads all previously cached calculation records from Hive storage (`minutemansList` box), sets `ListStatus.offline`, and displays the localized offline banner (`AppLocalizations.of(context)!.workingOffline`).

---

## 📋 Preconditions
- User has previously logged in and loaded Minuteman calculations (cached in Hive).
- Device is placed in Airplane / Offline mode (`connectivityHelper.isOnline == false`).

---

## 🧪 Test Steps
1. Put the mobile device in Airplane mode (disconnect Wi-Fi and Cellular).
2. Launch the Conti+ application.
3. Navigate to the Minuteman calculation list screen.
4. Verify that `MinutemanListLoadEvent` reads cache from `ctp.minutemanManager.getFromCache()`.
5. Verify that `MinutemanListState` emits `status: ListStatus.offline`.
6. Verify that all previously cached calculations are rendered in the list.
7. Verify that the offline banner text `AppLocalizations.of(context)!.workingOffline` ("Working Offline") is displayed at the top of the body.
8. Re-enable network connectivity, perform pull-to-refresh, and verify status transitions to `ListStatus.success` and the banner disappears.

---

## 🔍 Expected Results
- Calculations remain fully browseable offline from local Hive cache.
- "Working Offline" status clearly communicates offline mode to the user.

---

## 📱 Flutter Source Reference
- **List Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`if (state.status.isOffline) Text(AppLocalizations.of(context)!.workingOffline)`)
- **BLoC**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`ListStatus.offline`, `getFromCache()`)
- **Storage**: Hive box `minutemansList`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_offline_cache @regression @both
Scenario: Load and display cached Minuteman calculations in offline mode
  Given the device is in offline mode with cached calculations
  When the user navigates to the Minuteman calculation list
  Then the cached calculations should be displayed
  And the "Working Offline" banner should be visible
  When the device reconnects to the network and refreshes
  Then the "Working Offline" banner should be removed
```
