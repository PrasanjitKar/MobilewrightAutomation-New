# TC-CONVEYOR-INSPECT-020 — Gauge Details — error counts, percentage distribution, and LHS vs RHS defect split

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-020 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_gauge_breakdown` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `ConveyorInspectGauge` calculates and presents the defect breakdown: total defect count in the center circle, left vs right distribution arcs, and severity level breakdown pills (Good, Fault, Poor, Critical).

---

## ✅ Preconditions

- Inspection event has multiple findings with differing severity on both LHS and RHS

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `ConveyorInspectDetailsScreen` for the test inspection | `ConveyorInspectGauge` widget renders |
| 2 | Check center count of gauge | Displays total number of defects (e.g. `14 Findings`) |
| 3 | Inspect LHS vs RHS split | Shows LHS defect count and RHS defect count beneath gauge |
| 4 | Tap on "Critical" severity pill | Filters finding cards below to only Critical findings |
| 5 | Tap "All" filter pill | Restores full finding card listing |

---

## 🏁 Expected Results

- Gauge accurately reflects mathematical defect distributions and acts as interactive filter

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_gauge.dart
CustomPaint(
  painter: GaugePainter(
    lhsCount: state.lhsFindings.length,
    rhsCount: state.rhsFindings.length,
    criticalCount: state.criticalCount,
  ),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_gauge_breakdown @regression @both
Scenario: Verify gauge breakdown and interactive filtering
  Given the user is on the Conveyor Inspect details screen
  Then the gauge should display total defect count and LHS/RHS split
  When the user taps the "Critical" filter pill
  Then only critical findings should be displayed in the list
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-003 — Details gauge and findings](./tc-conveyor-inspect-003-details-gauge-and-findings-view.md)
- [Suite index](./index.md)
