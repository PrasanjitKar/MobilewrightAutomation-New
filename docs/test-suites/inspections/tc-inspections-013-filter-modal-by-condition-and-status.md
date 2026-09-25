# TC-INSPECTIONS-013 — Filter Modal — filter inspections by Item Condition and Item Status

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-013 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_filter_condition_status` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-filter-modal.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `InspectionFiltersModal` allows filtering inspections by Item Condition ("Good", "Fault", "Poor", "Critical") and Item Status ("To Be Completed", "Completed"), correctly matching finding states.

---

## ✅ Preconditions

- User is on `InspectionListScreen`
- Inspections exist with various item conditions and completion statuses

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `InspectionFiltersModal` | Filter sheet opens |
| 2 | Under "Item Condition", select "Critical" and "Poor" checkboxes | Condition filters selected |
| 3 | Under "Item Status", select "To Be Completed" | Status filter selected |
| 4 | Tap "Apply" | Modal closes; list updates |
| 5 | Verify displayed inspections | Only inspections containing at least one item with Critical/Poor condition and To Be Completed status are shown |
| 6 | Change status filter to "Completed" only | Displays inspections where all items are completed |

---

## 🏁 Expected Results

- Condition and status criteria accurately isolate actionable maintenance inspections

---

## 🔍 Flutter Source Reference

```dart
// inspection_list_bloc.dart
final bool allCompleted = element.items.every((item) => item.status == InspectionItemStatus.completed);
final bool hasTobeCompleted = element.items.any((item) => item.status == InspectionItemStatus.toBeCompleted);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_filter_condition_status @regression @both
Scenario: Filter inspections by condition and status
  Given the user is on the Inspections screen
  When the user opens the inspection filter modal
  And the user selects condition "Critical" and status "To Be Completed"
  And the user applies filters
  Then the list should only display inspections containing critical incomplete findings
```

---

## 🔗 Related

- [TC-INSPECTIONS-012 — Filter modal by corporate site](./tc-inspections-012-filter-modal-by-corporate-site-and-conveyor.md)
- [Suite index](./index.md)
