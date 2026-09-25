# TC-COVER-WEAR-033: Measurement Temperature & Tonnage Unit Conversions

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/bloc/coverwear_measurement_form/cover_wear_measurement_cubit.dart`

---

## 🎯 Objective
Verify unit conversions and validations for Temperature (°C vs °F) and Total Tons Conveyed (Metric Ton vs Short Ton) in `CoverWearAddMeasurementScreen`.

---

## 📋 Preconditions
- User is on `CoverWearAddMeasurementScreen`.

---

## 🧪 Test Steps
1. Inspect the Temperature input field.
2. Verify temperature unit matches user preferences (°C or °F).
3. Enter `100` in °F and switch profile unit to °C.
4. Verify value converts accurately to `37.8` °C (`(F - 32) * 5 / 9`).
5. Inspect the Total Tons Conveyed input field.
6. Verify unit matches Metric Ton (`t`) or US Short Ton (`tn`).
7. Enter tonnage value lower than the previous reading's cumulative tonnage.
8. Verify validation warning `tonnageLessThanPreviousReadingWarning` is displayed.
9. Enter tonnage greater than or equal to previous reading.
10. Verify validation warning clears.

---

## 🔍 Expected Results
- Measurement units convert accurately and tonnage monotonicity rule is validated.

---

## 📱 Flutter Source Reference
- **Cubit Logic**: `lib/src/features/coverwear/presentation/bloc/coverwear_measurement_form/cover_wear_measurement_cubit.dart`
- **Unit Formatter**: `lib/src/features/coverwear/presentation/widgets/cover_wear_readings_table_tablet.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_measurement_units @regression @both
Scenario: Validate temperature conversion and tonnage monotonicity on measurement screen
  Given the user is on the Add Cover Wear Measurement screen
  When the user enters temperature and switches unit system
  Then the temperature value should convert accurately
  When the user enters tonnage less than the previous reading
  Then a validation warning should be displayed
```
