# TC-DASHBOARD-040: FAB Quick Add — Conveyor Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_getFloatingButton`, `addConveyor`, `ConveyorDetailsScreen`)

---

## 🎯 Objective
Verify tapping the "Add Conveyor" SpeedDial child option on the Dashboard FAB opens `ConveyorDetailsScreen` with an empty `ConveyorModel()` when the user has conveyor add permission and the device is online.

---

## 📋 Preconditions
- User is logged in with `BasicModule.conveyorsData` (`Permission.add`).
- Device is online.

---

## 🧪 Test Steps
1. On `HomeScreen`, tap the primary yellow **Add (+)** floating action button.
2. Locate and tap **Add Conveyor** (`addConveyor` semantics label).
3. Verify Firebase analytics logs: `'Clicked fab from home screen for add conveyor'`.
4. Verify navigation to `ConveyorDetailsScreen` with an empty conveyor model.
5. Verify Conveyor wizard/form displays step 1 (Basic Details: Company, Site, Conveyor Name, Code).

---

## 🔍 Expected Results
- Conveyor creation wizard opens directly.

---

## 📱 Flutter Source Reference
- **FAB Implementation**: `lib/src/ui/app.dart` (`_getFloatingButton`)
- **Screen**: `lib/src/ui/screens/conveyors/conveyor_details_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_add_conveyor @regression @both
Scenario: Open Add Conveyor form via Dashboard FAB speed dial
  Given the user is on the Home dashboard with Conveyor add permissions
  When the user opens the Add speed dial and selects "Add Conveyor"
  Then the Conveyor creation wizard should be displayed
```
