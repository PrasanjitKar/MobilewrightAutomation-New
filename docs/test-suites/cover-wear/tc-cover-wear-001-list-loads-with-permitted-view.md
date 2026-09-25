# TC-COVER-WEAR-001: List Loads with Permitted View

> **Suite**: `cover-wear` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` | **BLoC**: `CoverWearListBloc`

---

## 🎯 Objective
Verify that a user with `Permission.view` for `BasicModule.coverWear` successfully loads the Cover Wear list screen, renders cached event records immediately from local storage, and loads initial page data with total count and last synchronized timestamp.

---

## 📋 Preconditions
- User is logged into the Conti+ mobile application.
- User account has `Permission.view` on `BasicModule.coverWear` (`'COVER-WEAR'`).
- Device has an active network connection.

---

## 🧪 Test Steps
1. Authenticate and open the Conti+ mobile application.
2. From the Home / Dashboard screen, locate and tap the **Cover Wear** card (`label: 'coverWearCard'`).
3. Verify navigation to `CoverWearListPage` with route `cover_wear_list_screen`.
4. Observe the AppBar title, back button, search, filter, sync, and profile avatar actions.
5. Verify that `CoverWearListBloc` dispatches `CoverWearListLoadEvent(query: CoverWearListQuery())`.
6. Verify that each list item (`CoverWearRow`) displays the date span (`installedDate - lastRecordingDate`), company name, conveyor name, measured cover (`Top Cover` / `Bottom Cover`), status badge, and condition gauge/PDF icon.
7. Verify that the bottom bar widget (`LastUpdatedTimeAndTotalCountWidget`) displays the total record count and formatted sync timestamp.

---

## 🔍 Expected Results
- AppBar displays title `AppLocalizations.of(context)!.coverWear` ("Cover Wear") with `ContiPlusIcon.back`.
- List renders all authorized cover wear events.
- Bottom metadata widget shows valid item count and date/time format.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/features/coverwear/presentation/pages/coverwear_list_page.dart` (`CoverWearListPage`)
- **Row Widget**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`CoverWearRow`)
- **BLoC**: `lib/src/features/coverwear/presentation/bloc/coverwear_list/coverwear_list_bloc.dart` (`CoverWearListBloc`)
- **Module**: `BasicModule.coverWear`, `Permission.view`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_list_load @smoke @both
Scenario: Verify Cover Wear list loads successfully with view permissions
  Given the user is logged in with cover wear view permissions
  When the user navigates to "Cover Wear" from the dashboard
  Then the Cover Wear list screen should be displayed
  And the AppBar title should be "Cover Wear"
  And the list should display all authorized cover wear events
  And the bottom count widget should reflect the total event records
```
