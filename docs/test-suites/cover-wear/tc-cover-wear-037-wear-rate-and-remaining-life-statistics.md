# TC-COVER-WEAR-037: Wear Rate & Remaining Life Statistical Projections

> **Suite**: `cover-wear` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/presentation/pages/coverwear_detail_page.dart` & `CoverWearViewScreen`

---

## 🎯 Objective
Verify the statistical projections and wear analytics calculated across multiple readings: Average Wear Rate (mm/million tons or mm/year), Estimated Remaining Useful Life (days/tons), Projected Replacement Date, and Cost per Ton.

---

## 📋 Preconditions
- Cover Wear event has at least 2 readings with recorded tonnage and wear.

---

## 🧪 Test Steps
1. Navigate to `CoverWearViewScreen` for an event with multiple historical readings.
2. Scroll to the **Analytics & Life Projections** section.
3. Verify **Wear Rate** is calculated using linear regression (`slope = delta_thickness / delta_tons` or `delta_time`).
4. Verify **Projected Useful Life** computes remaining allowable wear divided by wear rate.
5. Verify **Projected Replacement Date** adds remaining life days to the latest reading date.
6. Verify **Cost Per Ton** calculates belt asset cost divided by total projected lifetime tonnage.
7. Verify that all values recompute dynamically when a new reading is recorded or an existing reading is updated.

---

## 🔍 Expected Results
- Predictive analytics provide accurate conveyor belt remaining life forecasts based on empirical wear data.

---

## 📱 Flutter Source Reference
- **Details Page / Analytics**: `lib/src/features/coverwear/presentation/pages/coverwear_detail_page.dart`
- **View Widgets**: `lib/src/features/coverwear/presentation/widgets/cover_wear_details_form.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_statistics @regression @both
Scenario: Calculate wear rate and projected life from multiple readings
  Given a Cover Wear event with multiple inspection readings
  When the user views the event analytics
  Then the wear rate, projected replacement date, and remaining life should be accurately displayed
```
