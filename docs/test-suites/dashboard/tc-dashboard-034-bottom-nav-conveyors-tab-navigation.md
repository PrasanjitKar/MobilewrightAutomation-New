# TC-DASHBOARD-034: Bottom Nav — Conveyors Tab Navigation

> **Suite**: `dashboard` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `conveyorTab`)

---

## 🎯 Objective
Verify tapping the Conveyors tab (`conveyorTab`) in the bottom navigation bar switches `selectedPage` to index 1, triggers `ConveyorListLoadEvent`, and renders `ConveyorListScreen`.

---

## 📋 Preconditions
- User is logged in and on the Home dashboard screen.

---

## 🧪 Test Steps
1. On `HomeScreen`, locate the bottom navigation bar.
2. Tap the **Conveyors** icon (`conveyorTab`).
3. Verify `AppBloc.add(AppLoadEvent(selectedPage: 1))` is dispatched.
4. Verify `ConveyorListBloc.add(ConveyorListLoadEvent(onlyLoading: true))` is triggered if not already loading.
5. Verify Firebase analytics logs: `'Selected conveyor icon from home screen for bottom nav'`.
6. Verify `ConveyorListScreen` loads with the conveyor list and search/filter controls.
7. Verify the Conveyors icon is highlighted as active in the bottom navigation bar.

---

## 🔍 Expected Results
- Conveyors list screen opens directly with data fetched and active tab state indicated.

---

## 📱 Flutter Source Reference
- **Bottom Navigation**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `conveyorTab`)
- **Screen**: `lib/src/ui/screens/conveyors/conveyor_list_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_bottom_nav_conveyors @smoke @both
Scenario: Navigate to Conveyors tab via bottom navigation bar
  Given the user is on the Home dashboard screen
  When the user taps the Conveyors icon in the bottom navigation bar
  Then the Conveyors list screen should be displayed
  And the Conveyors icon should be highlighted as active
```
