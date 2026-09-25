# TC-INSPECTIONS-003 — Inspection View — view details across 3 tabs and preview PDF report

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-003 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `inspection_view_details_pdf` |
| **Feature File** | `features/smoke/inspections.feature` |
| **Page Objects** | `src/pages/inspection-view.page.ts`, `src/pages/file-preview.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping an inspection row opens `InspectionViewScreen` in read-only mode, allows switching between the 3 tabs ("Inspection Info", "Items", and "Summary"), and allows opening the generated PDF report in `FilePreviewScreen` from the popup menu.

---

## ✅ Preconditions

- User has `InspectionModule.inspectionModule` `Permission.view` and `BasicModule.generateReports` `Permission.view`
- An inspection with items and generated PDF report exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `InspectionListScreen`, tap an inspection item (`inspectionListItem_0`) | `InspectionViewScreen` opens with header displaying inspection name (`inspectionDetailsAppbarTitle`) |
| 2 | Verify "Inspection Info" tab (`inspectionInfoStep`) | Displays Site, Conveyor, Date, Inspector, and Site Map |
| 3 | Tap "Items" tab | Tab switches; displays list of `InspectionItemCard` widgets with asset details and condition badges |
| 4 | Tap "Summary" tab | Tab switches; displays condition summary charts and notes |
| 5 | Tap the three-dot popup menu in the app bar (`inspectionPopupMenu`) | Popup menu opens |
| 6 | Select "Preview PDF" (`previewPdfText`) | `FilePreviewScreen` opens and renders the inspection PDF document |

---

## 🏁 Expected Results

- Details across all 3 tabs display correctly in read-only mode
- PDF report preview opens cleanly in the PDF viewer

---

## 🔍 Flutter Source Reference

```dart
// inspection_view_screen.dart
TabBar(
  tabs: [
    Tab(text: AppLocalizations.of(context)!.inspectionInfo),
    Tab(text: AppLocalizations.of(context)!.items),
    Tab(text: AppLocalizations.of(context)!.summary),
  ],
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:inspection_view_details_pdf @smoke @both
Scenario: View inspection details and preview PDF
  Given the user is on the Inspections screen
  When the user taps on inspection "td.InspectionName"
  Then the Inspection Details screen should be displayed with 3 tabs
  When the user switches to the Items tab
  Then the inspection findings should be displayed
  When the user opens the popup menu and selects Preview PDF
  Then the File Preview screen should render the PDF report
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
