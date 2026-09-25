# TC-COVER-WEAR-036: Installation Reading Auto-Generation on Event Creation

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`_synthesizeInstallationReading`)

---

## 🎯 Objective
Verify that creating a new Cover Wear event automatically generates an initial baseline "Installation Reading" (Reading #1) using the installation date, 0 tons conveyed, and all data points initialized to the nominal cover thickness (100% remaining).

---

## 📋 Preconditions
- User is creating a new Cover Wear event.

---

## 🧪 Test Steps
1. Complete `CoverWearAddScreen` with nominal top cover thickness `12.0 mm` and installation date `2024-01-01`.
2. Tap Save.
3. Open the newly created Cover Wear event details (`CoverWearViewScreen`).
4. Navigate to the Measurements tab / list.
5. Verify that Reading #1 exists titled "Installation".
6. Verify Reading #1 properties:
   - Date: `2024-01-01` (matches conveyor installation date).
   - Tonnage: `0 t`.
   - Remaining Cover: `100%` (`12.0 mm`).
   - All data points (1..N): `12.0 mm`.
7. Verify that this baseline reading serves as the reference anchor (T=0) for degradation regression calculations.

---

## 🔍 Expected Results
- Baseline installation reading is automatically established to enable accurate wear analytics.

---

## 📱 Flutter Source Reference
- **Cubit Logic**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`_synthesizeInstallationReading`)
- **Entity**: `lib/src/features/coverwear/domain/entities/cover_wear_entity.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_baseline_reading @regression @both
Scenario: Auto-generate installation baseline reading on Cover Wear event creation
  Given the user creates a new Cover Wear event with nominal thickness 12 mm
  When the event is saved
  Then Reading #1 should be auto-created with 0 tons and 100% remaining thickness
```
