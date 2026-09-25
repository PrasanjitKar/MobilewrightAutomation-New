# TC-MINUTEMAN-CALCULATION-035: E2E Engineering Minuteman Calculation Workflow (Parameters, Engine Compute, PDF Report)

> **Suite**: `minuteman-calculation` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/minuteman/` & `lib/src/blocs/minuteman/`

---

## 🎯 Objective
Execute the full end-to-end Minuteman engineering calculation workflow:
1. Select calculation mode (Conveyor / Elevator calculation).
2. Input engineering geometry, capacity throughput, material bulk density, idler spacing, and drive efficiency parameters.
3. Trigger the calculation engine and verify derived outputs (Calculated Belt Tension, Required Motor Power kW/HP, Minimum Breaking Strength, Idler Load Factor).
4. Save calculation under a project/conveyor asset.
5. Generate and download authenticated Minuteman engineering calculation PDF sheet.

---

## 📋 Preconditions
- User has `BasicModule.minutemanConveyor` or `BasicModule.minutemanElevator` permissions.

---

## 🧪 Test Steps
1. Navigate to Minuteman Calculation from Dashboard or Tools screen.
2. Select **Conveyor Calculation** -> choose conveyor or start standalone calculation.
3. Input Geometry: Length = 1500 m, Lift = +30 m, Belt Width = 1400 mm, Trough Angle = 35°.
4. Input Material: Name = "Iron Ore", Bulk Density = 2.4 t/m³, Surcharge Angle = 20°, Design Capacity = 3,500 t/h, Belt Speed = 4.2 m/s.
5. Input Drive: Single Pulley Drive with 210° wrap angle, ceramic lagging, Squirrel Cage motor.
6. Tap **Calculate**:
   - Verify Maximum Operating Tension (T1/T2).
   - Verify Motor Absorbed Power (e.g. 485 kW).
   - Verify Recommended Belt Rating (e.g. ST-2000).
7. Save calculation as "Overland Alpha Expansion Design".
8. Verify calculation record appears in `MinutemanListScreen`.
9. Tap **View PDF Report** -> verify branded engineering calculation datasheet renders with formulas, schematics, and sign-off block.

---

## 🔍 Expected Results
- Complete Minuteman calculation engineering pipeline operates accurately from parameter entry to PDF generation.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/minuteman/minuteman_list_screen.dart`
- `lib/src/blocs/minuteman/detail/minuteman_bloc.dart`
- `lib/src/ui/screens/filemanager/filemanager_preview_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/minutemandata.csv @Key:minuteman_e2e_calculation @e2e @both
Scenario: End-to-End Minuteman Engineering Calculation Workflow
  Given the engineer configures conveyor geometry, material, and drive parameters
  When the calculation engine executes
  Then belt tension, required motor power, and recommended belt rating should be computed
  And the engineering calculation datasheet PDF should be generated and viewable
```
