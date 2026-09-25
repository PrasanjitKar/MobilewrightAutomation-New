# TC-FIELD-SERVICE-043: E2E Field Service Inspection Journey (Form Modal, Multi-Step Measurement, Sign-Off, Report)

> **Suite**: `field-service` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/field_service/` & `lib/src/blocs/field_service/`

---

## 🎯 Objective
Execute the full end-to-end Field Service technician inspection lifecycle:
1. Open Create Form modal via Dashboard FAB and select form type (Steel Cord & Fabric Conveyor Belt Details).
2. Complete all inspection sections: Customer Info, Conveyor Geometry, Belt Spec, Splice Evaluation, Pulley & Idler measurements, and Damage Observations.
3. Attach on-site photos and technician signature.
4. Obtain Customer Representative digital sign-off.
5. Save, sync, and generate authenticated Field Service PDF report.

---

## 📋 Preconditions
- User has `InternalToolsModule.fieldService` permissions (`view`, `add`, `edit`, `download`).

---

## 🧪 Test Steps
1. On Dashboard, tap SpeedDial FAB -> select **Add Field Service Form**.
2. In `CreateFormDialog`, select Customer Site, Conveyor, and Form Type = "Steel Cord & Fabric Conveyor Belt Details". Tap Proceed.
3. **Section 1 (General & Geometry)**: Verify site/conveyor auto-fills, enter Center-to-Center Distance (1200m), Lift (45m), Belt Speed (4.0 m/s).
4. **Section 2 (Belt & Splices)**: Enter Belt Carcass ST-3150, Top Cover 18mm, Bottom Cover 8mm, inspect Splice #1 (Step Length, Bias Angle, Rubber Fill) -> set Condition = "Acceptable".
5. **Section 3 (Observations & Photos)**: Capture 2 camera photos of edge wear, enter technician recommendations.
6. **Section 4 (Sign-Off)**: Draw technician signature, enter customer name "John Mine Manager", and capture customer digital signature.
7. Tap **Submit & Complete**.
8. Verify form appears in `FieldServiceListScreen` with "Completed" status.
9. Tap **Download Report** -> verify generated PDF includes all form data, signatures, photos, and engineering sign-off.

---

## 🔍 Expected Results
- Complete field technician digital inspection with signatures and report delivery functions end-to-end.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/field_service/field_service_details/steel_cord_conveyor_belt_details/steel_cord_conveyor_belt_details_screen.dart`
- `lib/src/ui/screens/field_service/field_service_list/field_service_list_screen.dart`
- `lib/src/blocs/field_service/`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/fieldservicedata.csv @Key:field_service_e2e @e2e @both
Scenario: End-to-End Field Service Technician Inspection and Customer Sign-Off
  Given the technician creates a Field Service inspection form for conveyor "CV-01"
  When the technician completes all measurement steps, attaches photos, and captures signatures
  And submits the form
  Then the Field Service form should be completed and synced
  And the authenticated inspection PDF report with signatures should be generated
```
