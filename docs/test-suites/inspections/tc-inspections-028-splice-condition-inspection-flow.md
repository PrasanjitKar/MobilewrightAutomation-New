# TC-INSPECTIONS-028 — Splice Inspection — record splice measurements, hardness, and photos

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-028 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `splice_condition_inspection` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/splice-condition-item.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when inspecting a Splice asset, `SpliceConditionItemScreen` opens, enabling entry of Splice Number, Installation Date, Durometer Shore A Hardness records, Step Condition measurements, Splice Map, and specific splice photos.

---

## ✅ Preconditions

- Conveyor has Splice assets configured in master data

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `InspectionItemStep`, tap "Add Item" under "Splices" section | `SpliceConditionItemScreen` opens |
| 2 | Select Splice Number from dropdown | Splice details prefill |
| 3 | Enter Shore A Hardness values across center and edges | Hardness records populated in `item.hardnessRecords` |
| 4 | Select Condition flag (e.g. "Poor" `poorFlag`) | Condition rating recorded |
| 5 | Upload Splice photos and pin location on `spliceConditionMap` | Photos and map pin linked |
| 6 | Tap "Save" | Splice finding is recorded in inspection items |

---

## 🏁 Expected Results

- Full splice-specific inspection protocol (measurements, hardness, splice photos) is captured

---

## 🔍 Flutter Source Reference

```dart
// splice_condition_item_screen.dart
SemanticsLabel(label: 'spliceConditionMap', child: ...),
SemanticsLabel(label: 'editInstallationDetails', child: ...),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:splice_condition_inspection @regression @both
Scenario: Record splice condition and hardness measurements
  Given the user is inspecting a conveyor splice
  When the user enters splice number "Splice #3" and shore hardness readings
  And the user marks condition "Poor" and attaches splice photos
  And the user saves the splice finding
  Then the splice condition record should be saved to the inspection
```

---

## 🔗 Related

- [TC-INSPECTIONS-024 — Add item condition](./tc-inspections-024-add-inspection-item-condition-and-status.md)
- [Suite index](./index.md)
