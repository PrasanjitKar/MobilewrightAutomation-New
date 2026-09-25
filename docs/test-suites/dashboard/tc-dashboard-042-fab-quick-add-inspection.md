# TC-DASHBOARD-042: FAB Quick Add — Inspection Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_getFloatingButton`, `addInspection`, `AddInspectionEventScreen`)

---

## 🎯 Objective
Verify tapping the "Add Inspection" SpeedDial child option on the Dashboard FAB triggers `InspectionDetailsCubit.setHeader()` and `newInspection(null)` before opening `AddInspectionEventScreen`.

---

## 📋 Preconditions
- User is logged in with `InspectionModule.inspectionModule` (`Permission.add`).

---

## 🧪 Test Steps
1. On `HomeScreen`, tap the primary yellow **Add (+)** floating action button.
2. Locate and tap **Add Inspection** in the speed-dial menu.
3. Verify Firebase analytics logs: `'Clicked fab from home screen for add Inspection'`.
4. Verify `InspectionDetailsCubit.setHeader()` and `newInspection(null)` are executed.
5. Verify navigation to `AddInspectionEventScreen` (`RouteNameKeys.addInspectionEventScreen`).
6. Verify the Inspection form displays with Customer Site, Conveyor, Inspector, and Date fields.

---

## 🔍 Expected Results
- `AddInspectionEventScreen` opens initialized with an empty draft inspection event.

---

## 📱 Flutter Source Reference
- **FAB Implementation**: `lib/src/ui/app.dart` (`_getFloatingButton`)
- **Screen**: `lib/src/ui/screens/inspections/inspection_details/add_inspection_event_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_add_inspection @regression @both
Scenario: Open Add Inspection form via Dashboard FAB speed dial
  Given the user is on the Home dashboard with Inspection add permissions
  When the user opens the Add speed dial and selects "Add Inspection"
  Then the Add Inspection event screen should be displayed
```
