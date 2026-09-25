# TC-INSPECTIONS-039: E2E Full Inspection Workflow (Create Event, Multi-Component Evaluation, Media, Report)

> **Suite**: `inspections` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/inspections/` & `lib/src/blocs/inspection/`

---

## 🎯 Objective
Execute the full end-to-end inspection lifecycle:
1. Create a new Inspection Event for a customer site and conveyor.
2. Evaluate multiple conveyor components (Belt, Pulleys, Idlers, Structure, Drive).
3. Assign condition ratings (Good, Fault, Poor, Critical), attach photos and comments.
4. Complete and save the inspection event.
5. Verify status chips update on Dashboard and Conveyor Hub, and download/preview the inspection PDF report.

---

## 📋 Preconditions
- User has `InspectionModule.inspectionModule` permissions (`view`, `add`, `edit`, `download`).
- Tracked conveyor exists.

---

## 🧪 Test Steps
1. Navigate to Inspections -> tap **Add Inspection**.
2. Select Customer Site and Conveyor, select Inspector, Date, and tap Create Event.
3. Add Component 1 (Belt Top Cover): set Condition = "Poor", enter observation, attach camera photo.
4. Add Component 2 (Drive Pulley Lagging): set Condition = "Fault", enter observation.
5. Add Component 3 (Idler Rollers): set Condition = "Critical", flag "At Risk" switch.
6. Tap **Complete Inspection**.
7. Verify `InspectionListScreen` shows the event with color-coded condition badges.
8. Verify Dashboard "Inspections" card reflects updated Good/Fault/Poor/Critical chips.
9. Open the inspection event -> tap **View Report** -> verify authenticated PDF report stream renders.

---

## 🔍 Expected Results
- Comprehensive inspection lifecycle operates seamlessly from data collection to reporting.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/inspections/inspection_details/add_inspection_event_screen.dart`
- `lib/src/ui/screens/inspections/inspection_list_screen.dart`
- `lib/src/blocs/inspection/details/inspection_details_cubit.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/inspectiondata.csv @Key:inspection_e2e_workflow @e2e @both
Scenario: End-to-End Inspection Event Workflow (Create, Evaluate, Media, Report)
  Given the user creates an inspection event for conveyor "Overland CV-01"
  When the user evaluates multiple components with Good, Fault, Poor, and Critical ratings
  And attaches photos and completes the inspection
  Then the Dashboard status chips should reflect the new condition counts
  And the inspection PDF report should be generated and viewable
```
