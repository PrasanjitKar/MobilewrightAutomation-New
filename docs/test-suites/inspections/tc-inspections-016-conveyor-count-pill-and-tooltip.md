# TC-INSPECTIONS-016 — Conveyor Count Pill — displays distinct conveyor count and shows popup tooltip

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-016 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_count_pill_tooltip` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `InspectionRow` calculates and displays the count of unique conveyors inspected inside a pill badge (`inspectioncount_$index`), and tapping the pill opens an overlay tooltip (`ToolTipContent`) listing the names of all inspected conveyors.

---

## ✅ Preconditions

- Inspection containing items across 2 or more distinct conveyors exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate multi-conveyor inspection row | Conveyor pill displays distinct count (e.g. `2`) with conveyor icon |
| 2 | Tap the conveyor count pill | Overlay tooltip (`ToolTipContent`) appears adjacent to the pill |
| 3 | Read tooltip contents | Lists all distinct conveyor names line by line (e.g. "Overland Belt A\nFeeder Belt B") |
| 4 | Tap anywhere outside tooltip | Overlay tooltip dismisses cleanly |

---

## 🏁 Expected Results

- Conveyor count accurately reflects distinct conveyor IDs
- Interactive tooltip dynamically renders names of all conveyors in the inspection

---

## 🔍 Flutter Source Reference

```dart
// inspection_row.dart
final int count = widget.inspection.items.map((element) => element.conveyorId).toSet().length;
// Tooltip trigger:
final List<String> conveyorNames = context.read<ConveyorDataCubit>().getConveyorNamesForToolTip(inspection);
_showTooltip(context, conveyorNames, key);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_count_pill_tooltip @regression @both
Scenario: Conveyor count pill and tooltip display
  Given the user is on the Inspections screen
  Then the conveyor count pill on inspection "td.InspectionName" should display "2"
  When the user taps the conveyor count pill
  Then a tooltip listing "td.ConveyorNames" should be displayed
  When the user taps outside the tooltip
  Then the tooltip should dismiss
```

---

## 🔗 Related

- [TC-INSPECTIONS-015 — Inspection row metadata](./tc-inspections-015-inspection-row-metadata-and-condition-badges.md)
- [Suite index](./index.md)
