# TC-INSPECTIONS-024 — Add Item — select asset condition (Good/Fault/Poor/Critical) and status

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-024 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_inspection_item_condition_status` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-item-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that in `InspectionItemDetails`, selecting condition radio flags (Good `goodFlag`, Fault `faultFlag`, Poor `poorFlag`, Critical `criticalFlag`) updates `_item.condition` with appropriate color coding, and toggling `itemStatusRadioButton` marks status as "To be completed" or "Completed".

---

## ✅ Preconditions

- User is on `InspectionDetailsScreen` -> "Inspection Items" step

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap "Add Item" on an asset group (e.g. "Belt Carry Side") | `InspectionItemDetails` screen opens |
| 2 | Select "Critical" flag radio (`criticalFlag`) | Red theme highlights; `_item.condition = InspectionItemCondition.critical` |
| 3 | Enter defect description and recommendations | Notes populated |
| 4 | Select Status "To be completed" (`itemStatusRadioButton`) | Status is set to pending action |
| 5 | Tap "Save" button | Item saves to inspection items list with Critical badge |

---

## 🏁 Expected Results

- Condition rating and completion status are recorded accurately with appropriate color indicators

---

## 🔍 Flutter Source Reference

```dart
// inspection_item_details.dart
SemanticsLabel(label: 'goodFlag', child: ...),
SemanticsLabel(label: 'faultFlag', child: ...),
SemanticsLabel(label: 'poorFlag', child: ...),
SemanticsLabel(label: 'criticalFlag', child: ...),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_inspection_item_condition_status @regression @both
Scenario: Add inspection finding with critical condition
  Given the user is adding an inspection item
  When the user selects condition "Critical" and status "To be completed"
  And the user enters recommendations "Immediate belt patch required"
  And the user saves the item
  Then the item should be listed with a critical status badge
```

---

## 🔗 Related

- [TC-INSPECTIONS-002 — Create inspection event happy path](./tc-inspections-002-create-inspection-event-happy-path.md)
- [Suite index](./index.md)
