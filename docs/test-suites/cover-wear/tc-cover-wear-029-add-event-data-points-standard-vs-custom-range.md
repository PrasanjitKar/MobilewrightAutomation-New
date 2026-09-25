# TC-COVER-WEAR-029: Data Points Selection (Standard 7 vs Custom Range)

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`updateNumberOfDataPoints`, `maxColumnsFor`)

---

## 🎯 Objective
Verify configuring measurement data points between Standard mode (fixed 7 points) and Custom mode (1 to 40 columns validated by belt width factor), ensuring proper validation error messages when exceeding allowed range.

---

## 📋 Preconditions
- User is on `CoverWearAddScreen`.

---

## 🧪 Test Steps
1. Locate the **Data Points** option in `CoverWearDetailsForm`.
2. Select **Standard** (`CoverWearEntity.dataPointsStandard`).
3. Verify `numberOfPoints` is locked to `7` and the number of columns text field is hidden.
4. Select **Custom** (`CoverWearEntity.dataPointsCustom`).
5. Verify an input field for "Number of Columns" appears.
6. Enter an invalid column count `0` or `50` (exceeding `maxColumnsFor(spec)`).
7. Verify that validation error `numberOfColumnsRangeError` is flagged and the Next/Save button is disabled.
8. Enter a valid column count (e.g. `15`).
9. Verify validation error clears and form is valid.

---

## 🔍 Expected Results
- Data points selection accurately controls measurement point density with strict boundary validation.

---

## 📱 Flutter Source Reference
- **Cubit Logic**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`updateNumberOfDataPoints`, `updateNumberOfColumns`, `maxColumnsFor`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_data_points @regression @both
Scenario Outline: Configure standard and custom data points for Cover Wear
  Given the user is on the Add Cover Wear screen
  When the user selects data points mode "<Mode>"
  And enters column count "<ColumnCount>"
  Then the validation status should be "<ExpectedValidity>"

  Examples:
    | Mode     | ColumnCount | ExpectedValidity |
    | Standard | 7           | Valid            |
    | Custom   | 15          | Valid            |
    | Custom   | 0           | Invalid          |
    | Custom   | 50          | Invalid          |
```
