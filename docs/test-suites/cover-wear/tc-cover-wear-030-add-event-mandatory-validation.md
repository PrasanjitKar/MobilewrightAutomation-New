# TC-COVER-WEAR-030: Add Event Mandatory Field Validations

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`_validate`)

---

## 🎯 Objective
Verify all mandatory field validations on `CoverWearAddScreen`, including Site required, Conveyor required, Installation Date required, Cover Thickness required, Belt Width required, and Cover Compounds required before allowing save.

---

## 📋 Preconditions
- User is on `CoverWearAddScreen`.

---

## 🧪 Test Steps
1. On `CoverWearAddScreen`, leave Site and Conveyor unselected.
2. Verify Next/Save primary button is disabled (`hasValidationErrors == true`).
3. Select Site, Conveyor, and clear Installation Date.
4. Verify `installationDateRequired` error blocks save.
5. Clear Cover Thickness and verify `topCoverThicknessRequired` error blocks save.
6. If the selected conveyor lacks belt width or compound in master data, verify corresponding validation messages are flagged.
7. Fill all mandatory fields with valid values.
8. Verify Next/Save button becomes enabled.

---

## 🔍 Expected Results
- All validation rules prevent incomplete or corrupt event creation.

---

## 📱 Flutter Source Reference
- **Validation**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`_validate`)
- **Error Enum**: `CoverWearValidationErrorMessage`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_mandatory_validations @regression @both
Scenario: Validate mandatory fields on Add Cover Wear event
  Given the user is on the Add Cover Wear screen
  When required fields are missing
  Then the primary save button should be disabled
  When all mandatory fields are filled with valid values
  Then the save button should become enabled
```
