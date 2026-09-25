# TC-INSPECTIONS-015 — Inspection Row — verifies date, inspector, site, and condition flag badges

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-015 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_row_metadata_badges` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `InspectionRow` renders all metadata widgets including formatted inspection date, inspector full name, resolved site name, condition counter badges (Good, Fault, Poor, Critical), and status badge ("Uploaded" vs "Upload Pending").

---

## ✅ Preconditions

- Inspection with known metadata (e.g. Inspector "John Doe", Site "Quarry North", Date "15 May 2026") exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate specific inspection row on `InspectionListScreen` | Row renders with `inspectionListItem_$index` |
| 2 | Verify date display (`inspectionDate_$index`) | Formatted as `dd MMM yyyy` (e.g. "15 May 2026") |
| 3 | Verify Inspector name (`inspectorName_$index`) | Displays inspector full name |
| 4 | Verify Site name (`siteName_$index`) | Displays site name linked via `CompanyDataCubit` |
| 5 | Verify Condition Flag badges (`FlagBadge`) | Displays counter pills for Good (green), Fault (yellow), Poor (orange), Critical (red) |
| 6 | Verify upload status badge (`status_$index`) | Displays "Uploaded" with light green background or "Upload Pending" with pastel red background |

---

## 🏁 Expected Results

- All row metadata fields and condition badges render with correct styling and accurate data

---

## 🔍 Flutter Source Reference

```dart
// inspection_row.dart
SemanticsLabel(label: 'inspectionDate_${widget.index}', child: Text(format.format(widget.inspection.inspectionDate!))),
SemanticsLabel(label: 'inspectorName_${widget.index}', child: Text(widget.inspection.inspector?.name ?? '')),
SemanticsLabel(label: 'siteName_${widget.index}', child: Text(widget.inspection.localSite?.name ?? '-')),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_row_metadata_badges @regression @both
Scenario: Verify inspection row metadata and badges
  Given the user is on the Inspections screen
  Then the inspection row should display formatted date, inspector name, and site name
  And the condition flag badges should display the correct defect counts
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
