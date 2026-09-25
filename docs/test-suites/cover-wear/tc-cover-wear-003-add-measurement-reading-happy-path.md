# TC-COVER-WEAR-003: Add Ultrasonic Measurement Reading

> **Suite**: `cover-wear` | **Priority**: `Critical` | **Type**: `Smoke` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_measurement_screen.dart` | **Cubit**: `CoverWearMeasurementCubit`

---

## 🎯 Objective
Verify adding a new ultrasonic thickness measurement reading to an existing Cover Wear event, including inspector name, measurement date, surface temperature, total tons conveyed, Shore durometer, photo attachment, and thickness values across all measurement points.

---

## 📋 Preconditions
- An active Cover Wear event exists.
- User is in `CoverWearEditScreen` or opens Add Measurement from `CoverWearViewScreen`.

---

## 🧪 Test Steps
1. On the Cover Wear event screen, locate the Measurements section and tap **Add Measurement**.
2. Verify navigation to `CoverWearAddMeasurementScreen` with title `AppLocalizations.of(context)!.addMeasurement`.
3. Verify Inspector Name defaults to the current logged-in user name.
4. Select Measurement Date via the date picker.
5. Enter Surface Temperature (e.g., `25.5` °C or `78` °F).
6. Enter Total Tons Conveyed Current (e.g., `500000` mt), ensuring value is >= previous reading tons (`_prevTonsController`).
7. Enter Shore Durometer reading (e.g., `65`).
8. Enter Observations / Comments notes.
9. Under the Data Points grid, enter thickness readings for all points (e.g. Points 1 to 7: `12.5, 11.8, 10.2, 9.8, 10.4, 11.5, 12.3`).
10. Tap the primary **Save** button in the bottom bar.
11. Verify that `CoverWearMeasurementCubit.saveMeasurement()` adds the reading to `specification.readings`, recalculates wear rate and remaining life, and returns to the event view screen.

---

## 🔍 Expected Results
- Measurement data is saved accurately with unit-converted values.
- New measurement row appears in the readings table and updates the trend chart.

---

## 📱 Flutter Source Reference
- **Screen**: `lib/src/features/coverwear/presentation/pages/cover_wear_add_measurement_screen.dart` (`CoverWearAddMeasurementScreen`)
- **Cubit**: `lib/src/features/coverwear/presentation/bloc/coverwear_measurement_form/cover_wear_measurement_cubit.dart`
- **Parent Cubit**: `lib/src/features/coverwear/presentation/bloc/coverwear_event_form/cover_wear_cubit.dart` (`saveMeasurement`)

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_add_measurement @smoke @both
Scenario: Add an ultrasonic measurement reading to a Cover Wear event
  Given the user is on the Add Measurement screen for a cover wear event
  When the user verifies inspector name and selects current date
  And enters surface temperature "25.0", total tons "500000", and durometer "65"
  And enters thickness values "12.5, 11.8, 10.2, 9.8, 10.4, 11.5, 12.3" for 7 data points
  And taps the Save button
  Then the measurement reading should be saved to the event
  And the wear rate and remaining life statistics should be updated
```
