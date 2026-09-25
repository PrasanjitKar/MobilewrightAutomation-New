# TC-DASHBOARD-037: Bottom Nav — Inspections Tab Navigation

> **Suite**: `dashboard` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `inspectionsTab`) & `lib/src/ui/screens/inspections/inspection_list_screen.dart`

---

## 🎯 Objective
Verify tapping the Inspections tab (`inspectionsTab`) in the bottom navigation bar switches `selectedPage` to index 4, renders `InspectionListScreen`, and triggers inspection list loading.

---

## 📋 Preconditions
- User is logged in with Inspection view permissions.

---

## 🧪 Test Steps
1. On `HomeScreen`, locate the bottom navigation bar.
2. Tap the **Inspections** icon (`inspectionsTab`).
3. Verify `AppBloc.add(AppLoadEvent(selectedPage: 4))` is dispatched.
4. Verify `InspectionListScreen` loads with inspection event rows and search/filter controls.
5. Verify the Inspections icon is highlighted as active in the bottom navigation bar.

---

## 🔍 Expected Results
- Inspections list screen opens directly with inspection records loaded.

---

## 📱 Flutter Source Reference
- **Bottom Navigation**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `inspectionsTab`)
- **Screen**: `lib/src/ui/screens/inspections/inspection_list_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_bottom_nav_inspections @smoke @both
Scenario: Navigate to Inspections tab via bottom navigation bar
  Given the user is on the Home dashboard screen
  When the user taps the Inspections icon in the bottom navigation bar
  Then the Inspections list screen should be displayed
  And the Inspections icon should be highlighted as active
```
