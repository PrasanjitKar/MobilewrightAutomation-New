# TC-CONVEYORS-010 — Row cover-wear condition reflects critical/poor/good/N-A thresholds

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-010 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_row_cover_wear_thresholds` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the `coverWearConditionForConveyor_$index` label on each row reflects the correct condition text/colour based on the cover-wear percentage thresholds.

---

## ✅ Preconditions

- User has view permission for conveyors
- Test conveyors exist (or can be seeded) with cover-wear percentages in each threshold band: 0–10, 10–30, 30–100, and none (N/A)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Inspect a conveyor with cover-wear % in `(0, 10]` | Condition = `critical` |
| 2 | Inspect a conveyor with cover-wear % in `(10, 30]` | Condition = `poor` |
| 3 | Inspect a conveyor with cover-wear % in `(30, 100]` | Condition = `good` |
| 4 | Inspect a conveyor with no cover-wear percentage available | Condition = `N/A` |

---

## 🏁 Expected Results

- Percentage source priority: latest top Cover Wear entity for the conveyor (`_coverWearListBloc` state), falling back to the conveyor's own cached `coverWearInfo.percentage`
- Thresholds match exactly: `0 < p ≤ 10` critical, `10 < p ≤ 30` poor, `30 < p ≤ 100` good, else N/A

---

## 🔍 Flutter Source Reference

```dart
// conveyor_row.dart — cover wear condition text logic
// 0 < p < 10  -> critical
// 10 <= p < 30 -> poor
// 30 <= p < 100 -> good
// else -> N/A
```

**Semantic label:** `coverWearConditionForConveyor_$index`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_row_cover_wear_thresholds @regression @both
Scenario Outline: Cover wear condition reflects threshold band
  Given a conveyor with cover-wear percentage "<percentage>"
  Then the conveyor row cover-wear condition should show "<expectedCondition>"

  Examples:
    | percentage | expectedCondition |
    | 5          | critical           |
    | 20         | poor               |
    | 60         | good               |
    | null       | N/A                |
```

---

## 🔗 Related

- [TC-CONVEYORS-011 — Inspection tooltip breakdown](./tc-conveyors-011-row-inspection-tooltip-breakdown.md)
- [Suite index](./index.md)
