# TC-CONVEYOR-INSPECT-031: E2E Drone/Thermal Inspection Lifecycle (Create Event, Hotspot Anomalies, PDF Report)

> **Suite**: `conveyor-inspect` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/conveyor_inspect/` & `lib/src/blocs/conveyor_inspect/`

---

## 🎯 Objective
Execute the full end-to-end Conveyor Inspect (Thermal / Aerial Drone) lifecycle:
1. Create a Conveyor Inspect event for a site and conveyor.
2. Record thermal hotspot findings with temperature differentials (Delta T), idler coordinates, and radiometric thermal photos.
3. Classify thermal severity (Critical, Poor, Warning, Normal).
4. Save event, verify status chips update on Dashboard, and generate the final inspection PDF report.

---

## 📋 Preconditions
- User has `ConveyorInspectModule.conveyorInspectModule` permissions.

---

## 🧪 Test Steps
1. Navigate to Conveyor Inspect -> tap **Add Conveyor Inspect Event**.
2. Select Customer Site and Conveyor, flight/inspection date, and thermal camera type.
3. Add Anomaly 1 (Carry Idler #42 Hotspot): Ambient 25°C, Hotspot 85°C (Delta T = 60°C), Severity = "Critical", attach thermal image.
4. Add Anomaly 2 (Return Idler #18): Ambient 25°C, Hotspot 55°C (Delta T = 30°C), Severity = "Fault".
5. Save and complete inspection event.
6. Verify event appears in `ConveyorInspectListScreen` with thermal severity counts.
7. Verify Dashboard "Conveyor Inspect" card updates its Critical/Fault status chips.
8. Tap **Preview Report** -> verify authenticated PDF report with thermal imagery renders.

---

## 🔍 Expected Results
- Complete thermal conveyor inspection lifecycle functions accurately from anomaly capture to PDF delivery.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/conveyor_inspect/add_edit_conveyor_inspect_event.dart`
- `lib/src/ui/screens/conveyor_inspect/conveyor_inspect_list_screen.dart`
- `lib/src/blocs/conveyor_inspect/`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/conveyorinspectdata.csv @Key:conveyor_inspect_e2e @e2e @both
Scenario: End-to-End Conveyor Inspect Thermal Lifecycle
  Given the user creates a Conveyor Inspect event for conveyor "Overland CV-02"
  When the user records thermal hotspot anomalies with Delta T and thermal images
  Then the Dashboard status chips should update with anomaly counts
  And the Conveyor Inspect PDF report should be generated with thermal scans
```
