# TC-DASHBOARD-045: FAB Quick Add — Field Service Form Modal & Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_getFloatingButton`, `addFieldServiceForm`, `showCreateFormModal`)

---

## 🎯 Objective
Verify tapping the "Add Field Service Form" SpeedDial child option on the Dashboard FAB triggers `FieldServiceDetailsCubit.getFieldServiceDetails()`, opens `showCreateFormModal`, and routes to either `FieldServiceDetailsScreen` (for Conveyor Belt forms) or `SteelCordAndFabricConveyorBeltDetailsScreen` upon modal confirmation.

---

## 📋 Preconditions
- User is logged in with `InternalToolsModule.fieldService` (`Permission.add`).

---

## 🧪 Test Steps
1. On `HomeScreen`, tap the primary yellow **Add (+)** floating action button.
2. Locate and tap **Add Field Service Form** (technician hard hat icon) in the speed-dial menu.
3. Verify `showCreateFormModal` dialog appears prompting for Customer Site, Conveyor, and Form Type.
4. Select a Conveyor Belt form type and tap Proceed.
5. Verify navigation to `FieldServiceDetailsScreen` (`RouteNameKeys.fieldServiceListScreen`).
6. Alternatively, select a Steel Cord form type and tap Proceed.
7. Verify navigation to `SteelCordAndFabricConveyorBeltDetailsScreen`.

---

## 🔍 Expected Results
- Form type selection modal opens and routes to the appropriate Field Service inspection form.

---

## 📱 Flutter Source Reference
- **FAB Implementation**: `lib/src/ui/app.dart` (`_getFloatingButton`)
- **Modal Widget**: `lib/src/ui/widgets/create_form_dialog.dart`
- **Screens**: `lib/src/ui/screens/field_service/field_service_details/conveyor_belt_length_measurement/field_service_details_screen.dart` & `steel_cord_conveyor_belt_details_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_add_field_service @regression @both
Scenario: Open Field Service Form modal and navigate via Dashboard FAB speed dial
  Given the user is on the Home dashboard with Field Service add permissions
  When the user opens the Add speed dial and selects "Add Field Service Form"
  Then the Create Form modal dialog should be displayed
  When the user selects a form type and confirms
  Then the corresponding Field Service form details screen should open
```
