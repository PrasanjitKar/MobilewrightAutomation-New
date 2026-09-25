# TC-COVER-WEAR-027: Add Event Conveyor Specification Auto-Population

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`loadConveyorData`)

---

## 🎯 Objective
Verify that selecting a Conveyor in `CoverWearAddScreen` automatically extracts and populates all relevant technical specifications from the conveyor model (top/bottom nominal thicknesses, compounds, carcass, rating, belt width, belt length, and installation date).

---

## 📋 Preconditions
- Conveyor exists with complete belt technical parameters configured.

---

## 🧪 Test Steps
1. Navigate to `CoverWearAddScreen`.
2. Select Customer Site and then select the Conveyor.
3. Verify that `CoverWearCubit.loadConveyorData()` populates:
   - Belt Width and Belt Length.
   - Carcass and Belt Rating.
   - Top Cover Thickness Nominal and Top Cover Compound.
   - Bottom Cover Thickness Nominal and Bottom Cover Compound.
   - Top/Bottom Reinforcement Breakers.
   - Installation Date.
4. Verify that the values match the conveyor record and are formatted according to user measurement units (Metric / Imperial).

---

## 🔍 Expected Results
- Conveyor specification auto-population accelerates data entry and ensures technical data consistency.

---

## 📱 Flutter Source Reference
- **Cubit Logic**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`loadConveyorData`, `_beltSpecificationFromConveyor`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_spec_autopopulate @regression @both
Scenario: Auto-populate conveyor specifications on Add Cover Wear screen
  Given the user is on the Add Cover Wear screen
  When the user selects site "<SiteName>" and conveyor "<ConveyorName>"
  Then the belt width, length, carcass, and compound specifications should be auto-populated
  And the installation date should match the conveyor installation record
```
