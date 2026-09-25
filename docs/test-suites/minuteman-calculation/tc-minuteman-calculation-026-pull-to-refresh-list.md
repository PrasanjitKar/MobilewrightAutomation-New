# TC-MINUTEMAN-026: Pull-to-Refresh List Data Reload

> **Suite**: `minuteman-calculation` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`RefreshIndicator`)

---

## 🎯 Objective
Verify that performing a pull-to-refresh swipe gesture on the calculation list triggers a `MinutemanListLoadEvent` to fetch the latest calculation records and sync timestamp from the server.

---

## 📋 Preconditions
- User is on the Minuteman calculation list screen with an active internet connection.

---

## 🧪 Test Steps
1. Navigate to the Minuteman calculation list screen.
2. Scroll to the top of the list and perform a downward pull gesture.
3. Verify that the native `RefreshIndicator` spinner appears at the top.
4. Verify that `minutemanListBloc.add(const MinutemanListLoadEvent())` is executed.
5. Verify that `getAllMinutemans()` stream is listened to, updating `minutemanFullList` and recalculating the last sync timestamp.
6. Verify that the spinner completes and disappears smoothly upon completion.
7. Verify that any updated or newly added calculations from the backend are rendered.

---

## 🔍 Expected Results
- Pull-to-refresh reliably re-syncs list data without crashing or duplicating records.

---

## 📱 Flutter Source Reference
- **List Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`RefreshIndicator(onRefresh: ...)`)
- **BLoC**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`_mapMinutemanListLoadEventToState`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_pull_to_refresh @regression @both
Scenario: Reload Minuteman calculation list using pull to refresh
  Given the user is on the Minuteman calculation list screen
  When the user performs a pull-to-refresh gesture on the calculation list
  Then the refresh spinner should be displayed
  And the calculation list should be reloaded with the latest data from server
  And the refresh spinner should disappear
```
