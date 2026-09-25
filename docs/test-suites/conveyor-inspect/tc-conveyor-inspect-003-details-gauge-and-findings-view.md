# TC-CONVEYOR-INSPECT-003 — Details Screen — inspection gauge, idler status, and findings map

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-003 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `conveyor_inspect_details_gauge_map` |
| **Feature File** | `features/smoke/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping an inspection row opens `ConveyorInspectDetailsScreen`, renders the `ConveyorInspectGauge` with defect severity percentages, displays the Idler Configuration breakdown, and renders the interactive GPS finding map.

---

## ✅ Preconditions

- User has `CONVEYOR-INSPECT-MODULE` `Permission.view`
- An inspection with processed idler findings and GPS markers exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `ConveyorInspectListScreen`, tap an inspection item | `ConveyorInspectDetailsScreen` opens |
| 2 | Observe `ConveyorStatus` header | Displays conveyor name, site, date, and edit action |
| 3 | Observe `ConveyorInspectGauge` | Circular defect gauge renders breakdown of LHS/RHS defects |
| 4 | Check Idler Configuration table | Displays counts for Good, Fault, Poor, and Critical idler rolls |
| 5 | Scroll to `ConveyorInspectFindingDetails` | Map renders conveyor GPS route with hot spot finding pins |
| 6 | Tap a map pin or finding card | Expands finding details including measured spot temperature and photos |

---

## 🏁 Expected Results

- Full diagnostic overview (circular gauge, idler roll health, GPS hot spots) renders smoothly

---

## 🔍 Flutter Source Reference

```dart
// conveyor_status.dart & conveyor_inspect_gauge.dart
ConveyorInspectGauge(
  errorDetails: conveyorInspect?.getErrorDetailsLhsRhs(),
  conveyorInspect: conveyorInspect,
  lastUpdate: DateFormat('d MMM yyyy').format(...),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:conveyor_inspect_details_gauge_map @smoke @both
Scenario: View conveyor inspect details gauge and findings
  Given the user is on the Conveyor Inspect list
  When the user taps on an inspection record
  Then the Details screen should display the circular defect gauge and idler configuration
  And the interactive map should render thermal hot spot findings along the conveyor path
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
