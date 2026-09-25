# TC-CONVEYOR-INSPECT-002 — Add Inspection — create thermal camera inspection event happy path

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-002 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `create_thermal_inspection_happy_path` |
| **Feature File** | `features/smoke/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that a user with `Permission.add` can open `AddEditConveyorInspectEvent`, select Inspection Type "Thermal Camera", choose Site and Conveyor, select LHS and RHS thermal files from gallery or phone, and successfully create the inspection event.

---

## ✅ Preconditions

- User has `CONVEYOR-INSPECT-MODULE` `Permission.add`
- Conveyors exist in the selected customer site

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `ConveyorInspectListScreen`, tap the `+` Floating Action Button | `AddEditConveyorInspectEvent` screen opens |
| 2 | Under "Inspection Type", select "Thermal Camera" | Thermal camera workflow is selected |
| 3 | Select Site and Conveyor from autocomplete dropdowns | Conveyor details load |
| 4 | Confirm Inspection Date, Time, and Inspector Name | Fields populated with defaults |
| 5 | Under "LHS", tap Upload and select thermal images | LHS image file is attached |
| 6 | Under "RHS", tap Upload and select thermal images | RHS image file is attached |
| 7 | Tap "Create" button (`saveButton`) | Event creates; snackbar displays "Successfully Created" |
| 8 | Verify list screen | New inspection appears in `ConveyorInspectListScreen` |

---

## 🏁 Expected Results

- Thermal inspection event is created with attached LHS/RHS imagery and listed on the main screen

---

## 🔍 Flutter Source Reference

```dart
// add_edit_conveyor_inspect_event.dart
context.read<ConveyorFindingFileUploadCubit>().createConveyorInspect(
  conveyorInspect: conveyorInspect,
  lhsFiles: lhsFiles,
  rhsFiles: rhsFiles,
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:create_thermal_inspection_happy_path @smoke @both
Scenario: Create thermal conveyor inspection
  Given the user has conveyor inspect add permission
  When the user opens the Add Conveyor Inspect screen
  And the user selects type "Thermal Camera", site "td.SiteName", and conveyor "td.ConveyorName"
  And the user attaches LHS and RHS thermal photos
  And the user taps Create
  Then a success message "Successfully Created" should be displayed
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
