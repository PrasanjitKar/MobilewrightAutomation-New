# TC-COVER-WEAR-039: E2E Complete Cover Wear Degradation Lifecycle (Event, Baseline, Periodic Readings, Analytics, PDF)

> **Suite**: `cover-wear` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/features/coverwear/`

---

## 🎯 Objective
Execute the complete end-to-end Cover Wear degradation analysis workflow:
1. Create a Cover Wear event for a conveyor with belt specifications.
2. Auto-generate baseline Installation Reading #1 (100% remaining).
3. Record subsequent inspection Readings #2 and #3 with cumulative tonnage, surface temperature, and point thicknesses.
4. Verify dynamic calculation of wear rate (mm/million tons), cross-sectional wear graph, and remaining life projection.
5. Generate and download authenticated Cover Wear PDF report.

---

## 📋 Preconditions
- User has `BasicModule.coverWear` permissions (`view`, `add`, `edit`, `download`).
- Conveyor exists with technical belt specifications.

---

## 🧪 Test Steps
1. Navigate to Cover Wear -> tap **Add Cover Wear Event**.
2. Select Customer Site and Conveyor (auto-populating 12.0 mm nominal top cover thickness).
3. Select Standard data points (7 points) and save event.
4. Verify Reading #1 ("Installation", 0 tons, 12.0 mm across all 7 points) is auto-synthesized.
5. Tap **Add Measurement Reading** (Reading #2):
   - Enter Date (+6 months), Tonnage 500,000 t, Temp 28°C, and point values: [10.5, 10.0, 9.2, 9.0, 9.4, 10.1, 10.6].
   - Save reading.
6. Tap **Add Measurement Reading** (Reading #3):
   - Enter Date (+12 months), Tonnage 1,200,000 t, Temp 30°C, and point values: [9.0, 8.2, 7.1, 6.8, 7.3, 8.4, 8.9].
   - Attach photo and save reading.
7. Open `CoverWearViewScreen` Analytics tab:
   - Verify Wear Rate regression curve.
   - Verify remaining useful life prediction and projected replacement date.
   - Verify Overall Remaining Cover gauge reflects condition (e.g., 57% Good/Warning).
8. Tap **Download / Preview PDF Report** -> verify report renders with graphs, tables, and photo attachments.

---

## 🔍 Expected Results
- Complete Cover Wear inspection and predictive degradation lifecycle operates accurately from creation to PDF generation.

---

## 📱 Flutter Source Reference
- `lib/src/features/coverwear/presentation/pages/cover_wear_add_screen.dart`
- `lib/src/features/coverwear/presentation/pages/cover_wear_add_measurement_screen.dart`
- `lib/src/features/coverwear/presentation/pages/cover_wear_view_screen.dart`
- `lib/src/features/coverwear/presentation/pages/coverwear_detail_page.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/coverweardata.csv @Key:coverwear_e2e_lifecycle @e2e @both
Scenario: End-to-End Cover Wear Degradation Lifecycle
  Given the user creates a Cover Wear event with 12 mm nominal thickness
  And baseline installation reading is automatically established
  When the user records consecutive periodic wear measurements with tonnage
  Then the wear rate and remaining useful life predictions should be computed
  And the Cover Wear PDF report should be generated with wear charts
```
