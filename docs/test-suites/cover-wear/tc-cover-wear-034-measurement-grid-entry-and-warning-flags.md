# TC-COVER-WEAR-034: Measurement Grid Entry & Warning Flags (Exceeding Nominal / Zero)

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_measurement_screen.dart` (`_buildGrid`)

---

## 🎯 Objective
Verify the measurement data point entry grid in `CoverWearAddMeasurementScreen`, ensuring decimal input formatting, navigation between point cells, and visual warning highlighting (orange/red background) when thickness exceeds original nominal or equals zero.

---

## 📋 Preconditions
- Measurement event configured with 7 data points and nominal thickness `10.0 mm`.

---

## 🧪 Test Steps
1. On `CoverWearAddMeasurementScreen`, navigate to the Data Points grid section.
2. Enter valid thickness values (e.g. `8.5`, `7.2`, `6.8`, `7.0`, `7.5`, `8.0`, `8.4`).
3. Verify cell values accept decimals and show normal white background.
4. In point #3, enter `12.5` (exceeding nominal `10.0 mm`).
5. Verify cell displays an amber/warning highlight indicator indicating thickness exceeds original nominal value.
6. In point #4, enter `0.0`.
7. Verify cell displays a red warning indicator indicating complete wear-through / carcass exposure.
8. Tap Save and verify a confirmation modal prompts to confirm abnormal values before saving.

---

## 🔍 Expected Results
- Grid data entry is responsive, and outlier/anomalous measurements are clearly highlighted for user verification.

---

## 📱 Flutter Source Reference
- **Grid Widget**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_measurement_screen.dart` (`_buildGrid`, `_validateDataPointCell`)
- **Cubit**: `CoverWearMeasurementCubit.updatePointValue`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_grid_entry @regression @both
Scenario: Enter measurement points and verify abnormal value warnings
  Given the user is on the Add Measurement screen with nominal thickness 10 mm
  When the user enters thickness "12.5" exceeding nominal
  Then the cell should display an amber warning highlight
  When the user enters thickness "0.0"
  Then the cell should display a red critical wear highlight
```
