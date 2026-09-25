# TC-INSPECTIONS-027 — Load Last Inspection — import previous findings and condition history

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-027 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `load_last_inspection_history` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-details.page.ts`, `src/pages/history-load-dialog.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when the inspection template enables `isLoadLastInspection` and the conveyor has no current items, tapping "Load Last Inspection" opens `HistoryLoadDialog`, fetches the previous inspection findings, and allows importing them via `addHistoryItem()`.

---

## ✅ Preconditions

- A previous completed inspection exists for the selected conveyor
- Template has `isLoadLastInspection: true`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `InspectionDetailsScreen` -> "Inspection Items" step, select a conveyor with history | "Load Last Inspection" banner/button is visible |
| 2 | Tap "Load Last Inspection" | `HistoryLoadDialog` popup opens (`historyPopupTitle`) |
| 3 | Observe previous inspection summary table | Shows previous inspection date (`historyDate`), inspector, and findings count |
| 4 | Tap "Yes" button (`yesButton`) | `InspectionDetailsCubit.addHistoryItem()` clones previous items with fresh IDs |
| 5 | Observe item list | All items from the previous inspection are populated into the current inspection |

---

## 🏁 Expected Results

- Previous findings and condition baseline are imported seamlessly into the new inspection

---

## 🔍 Flutter Source Reference

```dart
// inspection_item_step.dart & history_load_dialog.dart
if (template.isLoadLastInspection ?? false)
  getHistoryWidget(inspectionState);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:load_last_inspection_history @regression @both
Scenario: Import findings from last inspection
  Given the conveyor has a previous completed inspection
  When the user taps Load Last Inspection
  And the user confirms the history load dialog
  Then the previous inspection findings should be populated in the current inspection
```

---

## 🔗 Related

- [TC-INSPECTIONS-002 — Add inspection event happy path](./tc-inspections-002-create-inspection-event-happy-path.md)
- [Suite index](./index.md)
