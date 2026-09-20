# TC-CONVEYORS-012 — "At risk" indicator takes priority over completed/to-be-completed icons

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-012 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_row_at_risk_priority` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify a conveyor flagged as "at risk" by any inspection item shows the `conveyorAtRisk_$index` indicator regardless of its completed/to-be-completed inspection counts.

---

## ✅ Preconditions

- User has view permission for conveyors
- At least one conveyor id appears in an inspection item's `conveyorAtRisk` list, while also having `completed > 0 && toBeCompleted == 0`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the "at risk" conveyor's row | `conveyorAtRisk_$index` icon is shown |
| 2 | Verify the completed check icon (`completedCheck_$index`) | **Not** shown, even though `completed > 0 && toBeCompleted == 0` |
| 3 | Locate a conveyor **not** at risk, with `completed > 0 && toBeCompleted == 0` | `completedCheck_$index` icon shown instead |
| 4 | Locate a conveyor **not** at risk, with `toBeCompleted != 0` | Caution icon + badge shown |
| 5 | Locate a conveyor with no inspection status data | Dash placeholder icon shown |

---

## 🏁 Expected Results

- At-risk status always overrides completed/to-be-completed/dash logic
- Priority order: at risk → completed → to-be-completed (caution+badge) → dash

---

## 🔍 Flutter Source Reference

```dart
// conveyor_row.dart — status icon priority (from research)
// "at risk" if any inspection item has conveyorAtRisk containing this conveyor id
// if not at risk:
//   completed check if completed > 0 && toBeCompleted == 0
//   caution + badge if toBeCompleted != 0
//   dash if no status
```

**Semantic labels:** `conveyorAtRisk_$index` (tablet: `conveyorAtRiskTab_$index`), `completedCheck_$index` (tablet: `completedCheckTab_$index`), `inspectionToBeCompletedBadgeTab_$index`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_row_at_risk_priority @regression @both
Scenario: At-risk indicator overrides other inspection status icons
  Given a conveyor flagged as at-risk with completed inspections
  Then the conveyor row should show the at-risk indicator instead of the completed check icon
```

---

## 🔗 Related

- [TC-CONVEYORS-011 — Inspection tooltip breakdown](./tc-conveyors-011-row-inspection-tooltip-breakdown.md)
- [Suite index](./index.md)
