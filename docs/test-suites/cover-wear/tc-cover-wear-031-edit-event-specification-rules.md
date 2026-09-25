# TC-COVER-WEAR-031: Edit Event Specification Rules & Readonly Constraints

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/cover_wear_edit_screen.dart` & `CoverWearCubit`

---

## 🎯 Objective
Verify rules for editing a Cover Wear event: ensure specification fields (such as data points count, belt width) can only be edited before multiple readings are recorded (`readings.length <= 1`), and become locked/read-only once multiple readings exist to preserve historical data consistency.

---

## 📋 Preconditions
- Event A has 1 reading (Installation Reading only).
- Event B has 2 or more inspection readings.

---

## 🧪 Test Steps
1. Open Event A in `CoverWearEditScreen`.
2. Verify that Number of Data Points and Belt Specification parameters remain editable.
3. Modify Top Cover Compound and tap Save.
4. Verify changes are persisted.
5. Open Event B in `CoverWearEditScreen`.
6. Verify that Number of Data Points and Measurement Grid Configuration are locked and read-only.
7. Verify an informational tooltip explains that measurement schema is locked once subsequent readings exist.
8. Verify non-structural metadata (e.g. general notes) can still be updated.

---

## 🔍 Expected Results
- Measurement configuration is protected against destructive schema modifications when historical readings exist.

---

## 📱 Flutter Source Reference
- **Edit Screen**: `lib/src/features/coverwear/presentation/pages/cover_wear_edit_screen.dart`
- **Cubit Logic**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_edit_rules @regression @both
Scenario: Edit Cover Wear event with single vs multiple readings
  Given a Cover Wear event with 1 reading
  When the user edits the event specification
  Then the data points and compound fields should be editable
  Given a Cover Wear event with multiple readings
  When the user opens the edit screen
  Then the data points structure should be locked as read-only
```
