# TC-HEAVY-EQUIPMENT-029: E2E Heavy Equipment Asset Lifecycle (Create Machine, Log Component Wear, Operating Hours, PDF)

> **Suite**: `heavy-equipment` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/heavy_equipment/` & `lib/src/blocs/heavy_equipment/`

---

## 🎯 Objective
Execute the full end-to-end Heavy Equipment mobile machinery tracking lifecycle:
1. Register a heavy equipment asset (e.g. Surface Miner, Stacker-Reclaimer, Mobile Crusher).
2. Record initial operating hours, serial number, and assigned site.
3. Log periodic component wear readings (wear plates, tracks/undercarriage, discharge conveyor).
4. Update operating hours and maintenance log.
5. Generate and review the Heavy Equipment Asset health report.

---

## 📋 Preconditions
- User has `BasicModule.heavyEquipmentData` permissions (`view`, `add`, `edit`, `download`).

---

## 🧪 Test Steps
1. Navigate to Heavy Equipment -> tap **Add Heavy Equipment**.
2. Enter Machine Name "Stacker Reclaimer SR-01", Model "CAT 797F", Serial Number "HE-CAT-094", select Customer Site.
3. Enter Initial Operating Hours: 4,500 hrs, Commissioning Date: 2023-05-15. Save asset.
4. Verify asset appears in `HeavyEquipmentListScreen` and Dashboard count increments.
5. Open asset details -> tap **Log Component Inspection**:
   - Component: "Discharge Boom Belt", Thickness: 14.5 mm (Nominal 20 mm).
   - Component: "Undercarriage Track Pads", Wear: 35%.
   - Operating Hours update: 5,100 hrs.
   - Save inspection log.
6. Verify machine health card reflects updated component wear conditions and calculated wear rates.
7. Tap **Preview Report** -> verify asset status and history PDF generates successfully.

---

## 🔍 Expected Results
- Complete heavy equipment asset maintenance and tracking workflow operates smoothly.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/heavy_equipment/heavy_equipment_list_screen.dart`
- `lib/src/ui/screens/heavy_equipment/heavy_equipment_screen.dart`
- `lib/src/blocs/heavy_equipment/`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/heavyequipmentdata.csv @Key:heavy_equipment_e2e @e2e @both
Scenario: End-to-End Heavy Equipment Asset Lifecycle
  Given the user registers a new heavy equipment asset "Stacker Reclaimer SR-01"
  When the user logs periodic component wear readings and updates operating hours
  Then the machine health indicators should recompute
  And the Heavy Equipment Asset report should be viewable
```
