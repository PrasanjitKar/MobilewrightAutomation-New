# TC-COVER-WEAR-015: Row Gauge & Condition Threshold Indicators

> **Suite**: `cover-wear` | **Priority**: `Medium` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`Gauge`)

---

## 🎯 Objective
Verify that the remaining cover percentage gauge (`Gauge`) in `CoverWearRow` accurately displays `coverWear.percentage` with appropriate color-coding reflecting condition thresholds (Good, Warning, Poor, Critical).

---

## 📋 Preconditions
- Events exist with varying remaining cover percentages (e.g., 90%, 65%, 35%, 15%).

---

## 🧪 Test Steps
1. Navigate to the Cover Wear list screen.
2. Inspect the circular `Gauge` widget in the trailing area of each row.
3. Verify that `gaugeValue: coverWear.percentage` renders the percentage number in bold font.
4. Verify condition color bands:
   - Green / Good: High remaining thickness.
   - Yellow / Warning: Moderate wear.
   - Orange / Poor: Advanced wear approaching replacement limit.
   - Red / Critical: Critical wear past threshold.

---

## 🔍 Expected Results
- Gauge provides clear visual condition feedback for each conveyor cover.

---

## 📱 Flutter Source Reference
- **Widget**: `lib/src/features/coverwear/presentation/widgets/cover_wear_row.dart` (`Gauge(gaugeValue: coverWear.percentage, ...)`)
- **Gauge Component**: `lib/src/ui/widgets/gauge.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_row_gauge @regression @both
Scenario: Verify cover wear percentage gauge and color thresholds
  Given the user is on the Cover Wear list page
  When the user inspects an event with percentage "<Percentage>"
  Then the gauge should display "<Percentage>%"
  And the gauge indicator should reflect the condition severity color
```
