# TC-CONVEYOR-INSPECT-012 — Drone Inspection — upload LHS and RHS JPEG/RJPEG aerial photos

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-012 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `drone_inspection_image_upload` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting "Drone" inspection type (`InspectionType.drone`) configures the form for aerial conveyor inspections, requires LHS and RHS JPEG/RJPEG image uploads from phone storage, and creates the drone inspection event upon submission.

---

## ✅ Preconditions

- Drone flight photos (JPEG / Radiometric JPEG) available in device storage

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `AddEditConveyorInspectEvent`, select Inspection Type "Drone" | UI configures for Drone mode |
| 2 | Observe LHS / RHS helper text | Text indicates "Select files (Only JPEGs, RJPEGs)" |
| 3 | Tap Upload on LHS and pick drone aerial photos | LHS files are attached and count displays |
| 4 | Tap Upload on RHS and pick drone aerial photos | RHS files are attached and count displays |
| 5 | Select Site and Conveyor | Form is complete |
| 6 | Tap "Create" button | Drone inspection event is submitted; `uploadFiles` starts |

---

## 🏁 Expected Results

- Drone inspection creates with attached LHS and RHS aerial photo packages

---

## 🔍 Flutter Source Reference

```dart
// add_edit_conveyor_inspect_event.dart
if (state.conveyorInspect.inspectionType == InspectionType.drone.label) {
  // Drone inspection LHS/RHS file upload flow
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:drone_inspection_image_upload @regression @both
Scenario: Create drone conveyor inspection with aerial images
  Given the user is on the Add Conveyor Inspect screen
  When the user selects inspection type "Drone"
  And the user uploads LHS and RHS drone aerial photos
  And the user fills site and conveyor and taps Create
  Then the drone inspection should be created successfully
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-002 — Create thermal inspection event](./tc-conveyor-inspect-002-create-thermal-inspection-event.md)
- [Suite index](./index.md)
