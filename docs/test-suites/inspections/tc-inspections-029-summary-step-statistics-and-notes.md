# TC-INSPECTIONS-029 — Summary Step — condition summary counters and inspector notes

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-029 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_summary_step_notes` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on `InspectionDetailsScreen`, the "Summary" step (`SummaryStep`) calculates and displays total items count, breakdown by condition and status, and allows the inspector to input free-text overall summary notes into `summaryTextField`.

---

## ✅ Preconditions

- Inspection with multiple findings is open in `InspectionDetailsScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Expand the "Summary" accordion step (`summaryTile`) | `SummaryStep` opens |
| 2 | Check condition statistic counters | Displays Total items (`total_$count`), To Be Completed (`toBeCompleted_$count`), Good, Fault, Poor, and Critical |
| 3 | Enter overall inspector summary notes into `summaryTextField` | `setInspectionSummary()` runs; `inspection.summary` is updated |
| 4 | Tap "Save" button | Inspection saves with summary notes |

---

## 🏁 Expected Results

- Summary step accurately aggregates defect statistics and saves executive notes

---

## 🔍 Flutter Source Reference

```dart
// summary_step.dart
SemanticsLabel(label: 'summaryTextField', child: ...),
SemanticsLabel(label: 'total_${totalCount(state)}', child: ...),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_summary_step_notes @regression @both
Scenario: Enter inspection executive summary notes
  Given the user is on the Summary step of inspection details
  Then the total findings and condition breakdown counters should be displayed
  When the user enters executive summary "Belt in acceptable condition except Splice 2"
  And the user saves the inspection
  Then the summary notes should be persisted
```

---

## 🔗 Related

- [TC-INSPECTIONS-002 — Add inspection event happy path](./tc-inspections-002-create-inspection-event-happy-path.md)
- [Suite index](./index.md)
