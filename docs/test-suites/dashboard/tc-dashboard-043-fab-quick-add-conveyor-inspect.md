# TC-DASHBOARD-043: FAB Quick Add — Conveyor Inspect Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_getFloatingButton`, `addConveyorInspect`, `AddEditConveyorInspectEvent`)

---

## 🎯 Objective
Verify tapping the "Add Conveyor Inspect" SpeedDial child option on the Dashboard FAB opens `AddEditConveyorInspectEvent` when the user has Conveyor Inspect add permission.

---

## 📋 Preconditions
- User is logged in with `ConveyorInspectModule.conveyorInspectModule` (`Permission.add`).

---

## 🧪 Test Steps
1. On `HomeScreen`, tap the primary yellow **Add (+)** floating action button.
2. Locate and tap **Add Conveyor Inspect** (drone icon) in the speed-dial menu.
3. Verify navigation to `AddEditConveyorInspectEvent` (`RouteNameKeys.conveyorInspectAddScreen`).
4. Verify Conveyor Inspect event creation form displays with Site, Conveyor, Inspection Type, and Flight/Thermal details.

---

## 🔍 Expected Results
- `AddEditConveyorInspectEvent` opens directly for creating a drone/thermal inspection event.

---

## 📱 Flutter Source Reference
- **FAB Implementation**: `lib/src/ui/app.dart` (`_getFloatingButton`)
- **Screen**: `lib/src/ui/screens/conveyor_inspect/add_edit_conveyor_inspect_event.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_add_conveyor_inspect @regression @both
Scenario: Open Add Conveyor Inspect form via Dashboard FAB speed dial
  Given the user is on the Home dashboard with Conveyor Inspect add permissions
  When the user opens the Add speed dial and selects "Add Conveyor Inspect"
  Then the Add Conveyor Inspect screen should be displayed
```
