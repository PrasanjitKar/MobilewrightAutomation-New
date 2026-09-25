# TC-DASHBOARD-033: Bottom Nav — Home Tab Navigation

> **Suite**: `dashboard` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `homeTab`)

---

## 🎯 Objective
Verify tapping the Home tab (`homeTab`) in the bottom navigation bar switches `selectedPage` to index 0, highlights the Home icon as active (Continental yellow/gold tint), and displays the dashboard `HomeScreen`.

---

## 📋 Preconditions
- User is logged in and currently on another bottom-nav tab (e.g., Conveyors, Corporates, Tools, or Inspections).

---

## 🧪 Test Steps
1. From any secondary tab screen, locate the bottom navigation bar.
2. Tap the **Home** icon (`homeTab`).
3. Verify `AppBloc.add(AppLoadEvent(selectedPage: 0))` is dispatched.
4. Verify Firebase analytics logs event: `'Selected home icon from home screen for bottom nav'`.
5. Verify `HomeScreen` is rendered with the title "Home" in `ContiAppBar`.
6. Verify the Home tab icon is highlighted active in the bottom navigation bar.

---

## 🔍 Expected Results
- Direct navigation back to the Dashboard/Home screen occurs immediately with active tab state indication.

---

## 📱 Flutter Source Reference
- **Bottom Navigation**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `homeTab`, `onScreenChange`)
- **App Bar**: `lib/src/ui/app/conti_app_bar.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_bottom_nav_home @smoke @both
Scenario: Navigate to Home tab via bottom navigation bar
  Given the user is on the Conveyors screen
  When the user taps the Home icon in the bottom navigation bar
  Then the Home dashboard screen should be displayed
  And the Home icon should be highlighted as active
```
