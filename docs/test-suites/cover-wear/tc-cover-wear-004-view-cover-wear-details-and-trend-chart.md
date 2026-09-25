# TC-COVER-WEAR-004: View Cover Wear Event & Trend Regression Chart

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/cover_wear_view_screen.dart` & `lib/src/features/coverwear/presentation/widgets/cover_wear_measurements_section.dart`

---

## 🎯 Objective
Verify that `CoverWearViewScreen` displays the complete cover wear event specification, interactive belt cross-section diagram, overall remaining cover gauge, cross-sectional profile curve, linear regression degradation trend chart (`ContiEchart`), statistical wear analysis table, and historical measurement readings.

---

## 📋 Preconditions
- User has `Permission.view` on `BasicModule.coverWear`.
- A Cover Wear event exists with at least 2 historical measurement readings.

---

## 🧪 Test Steps
1. On `CoverWearListPage`, tap a Cover Wear row item.
2. Verify navigation to `CoverWearViewScreen` with title `AppLocalizations.of(context)!.viewCoverWearEvent`.
3. Verify the **Site & Conveyor Section**: Company name and Conveyor name are displayed.
4. Verify the **Belt Specifications Section**:
   - Nominal top & bottom thicknesses, compounds, carcass, belt width, length, and installation date.
   - Interactive `CoverWearBeltDiagram`.
5. Scroll down to the **Measurements Section**:
   - Verify remaining cover semi-circular `ContiGauge`.
   - Verify Cross-Section Profile graph.
   - Verify Degradation Trend chart (`ContiEchart`) showing linear regression line, critical wear threshold date, and poor condition date.
   - Verify statistical analysis table: Tons Conveyed, Number of Years, Wear Rate, Projected Future Tons, Projected Future Life, Estimated Total Life, Cost Per Ton, Cost Per Year.
   - Verify the historical Readings Table (`CoverWearMeasurementsTable`).

---

## 🔍 Expected Results
- All analytical charts, gauges, statistical projections, and historical records render accurately without UI distortion or lag.

---

## 📱 Flutter Source Reference
- **View Screen**: `lib/src/features/coverwear/presentation/pages/cover_wear_view_screen.dart` (`CoverWearViewScreen`)
- **Measurements Section**: `lib/src/features/coverwear/presentation/widgets/cover_wear_measurements_section.dart`
- **Charts**: `ContiEchart`, `ContiGauge`, `ContiTable`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_view_details @regression @both
Scenario: View Cover Wear event details and degradation trend chart
  Given the user is on the Cover Wear list screen
  When the user taps on cover wear event "<UltrasonicId>"
  Then the View Cover Wear screen should open
  And the belt specifications and belt diagram should be visible
  And the degradation trend regression chart should be displayed
  And the wear rate and projected remaining life statistics should be shown
```
