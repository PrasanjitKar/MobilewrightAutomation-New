# TC-MINUTEMAN-001: List Loads with Permitted View

> **Suite**: `minuteman-calculation` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` | **BLoC**: `MinutemanListBloc`

---

## 🎯 Objective
Verify that a user with `Permission.view` for `BasicModule.minutemanConveyor` and/or `BasicModule.minutemanElevator` successfully loads the Minuteman Calculation list screen, sees cached calculations immediately from Hive, and receives network updates without UI freezing.

---

## 📋 Preconditions
- User is logged into the Conti+ mobile application with valid credentials.
- User account has `Permission.view` enabled for `BasicModule.minutemanConveyor` (`MINUTEMAN-CONVEYOR`) and/or `BasicModule.minutemanElevator` (`MINUTEMAN-ELEVATOR`).
- Device has an active internet connection.

---

## 🧪 Test Steps
1. Launch Conti+ mobile app and authenticate.
2. From the Home / Dashboard screen, locate and tap the **Minuteman Calc.** module card (`label: 'minutemanCalculationCard'`).
3. Observe the AppBar title, back button, actions (search, filter, sync, profile avatar), and list content.
4. Verify that the cached calculations are rendered immediately while `LinearProgressIndicator` displays during background SDK sync.
5. Verify that each list item (`MinutemanRow`) displays calculation name, type SVG icon, site name, conveyor name, creator name, and formatted creation date.
6. Verify that the bottom bar widget (`LastUpdatedTimeAndTotalCountWidget`) displays the total item count and formatted last sync time.

---

## 🔍 Expected Results
- AppBar displays title `AppLocalizations.of(context)!.minuteman` ("Minuteman Calc.") with `ContiPlusIcon.back` leading icon.
- `MinutemanListBloc` transitions from `ListStatus.initial` → `ListStatus.loading` → `ListStatus.success`.
- Calculation records are populated in `ListView.builder`.
- Bottom widget displays correct count and timestamp format (`Last synchronized d MMM yyyy, hh:mm a`).

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/ui/screens/minuteman/minuteman_list_screen.dart` (`MinutemanListScreen`)
- **Widget**: `lib/src/ui/screens/minuteman/widgets/minuteman_row.dart` (`MinutemanRow`)
- **BLoC**: `lib/src/blocs/minuteman/list/minuteman_list_bloc.dart` (`MinutemanListBloc`, `MinutemanListLoadEvent`)
- **State**: `MinutemanListState` (`status: ListStatus.success`, `minutemanList`, `lastUpdatedTime`)
- **i18n Keys**: `AppLocalizations.of(context)!.minuteman`, `AppLocalizations.of(context)!.lastUpdatedTimeAndTotalCount`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_list_load @smoke @both
Scenario: Verify Minuteman calculation list loads successfully with view permissions
  Given the user is logged in with minuteman view permissions
  When the user navigates to "Minuteman Calc." from the dashboard
  Then the Minuteman calculation list screen should be displayed
  And the AppBar title should be "Minuteman Calc."
  And the calculation list should display all authorized calculations
  And the bottom count widget should reflect the total calculation items
```
