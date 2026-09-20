# TC-CONVEYORS-011 — Row inspection-status tooltip shows critical/poor/fault/good breakdown

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-011 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_row_inspection_tooltip` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify tapping the inspection status gauge (`inspectionGauge_$index`) shows a tooltip breaking down critical/poor/fault/good inspection item counts with the correct colour-coded flag icons.

---

## ✅ Preconditions

- User has view permission for conveyors
- At least one conveyor has an `InspectionCountModel` with non-zero critical, poor, fault, and good values

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a conveyor row with inspection data | `inspectionGauge_$index` is visible |
| 2 | Tap the gauge/tooltip trigger | `onTapToolTip` fires, `TooltipOverlay.showTooltip` is invoked |
| 3 | Inspect the tooltip content | Shows 4 lines: `<critical> critical`, `<poor> poor`, `<fault> fault`, `<good> good` (values lowercase) |
| 4 | Inspect the tooltip icons | Red flag for critical, orange for poor, yellow for fault, green for good, in that order |

---

## 🏁 Expected Results

- Tooltip values exactly match `InspectionCountModel.critical/poor/fault/good`
- Icon-to-category mapping is `flagRed`→critical, `flagOrange`→poor, `flagYellow`→fault, `flagGreen`→good

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_screen.dart — buildList(), onTapToolTip
onTapToolTip: () {
  final InspectionCountModel? model = list.elementAt(index).inspectionCount;
  final content = <String>[
    '${model!.critical} ${AppLocalizations.of(context)!.critical.toLowerCase()}',
    '${model.poor} ${AppLocalizations.of(context)!.poor.toLowerCase()}',
    '${model.fault} ${AppLocalizations.of(context)!.fault.toLowerCase()}',
    '${model.good} ${AppLocalizations.of(context)!.good.toLowerCase()}',
  ];
  final List<String> assets = [
    ContiPlusIcon.flagRed, ContiPlusIcon.flagOrange, ContiPlusIcon.flagYellow, ContiPlusIcon.flagGreen,
  ];
  _tooltipOverlay.showTooltip(context, content, assets, key);
},
```

**Semantic label:** `inspectionGauge_$index` (tablet: `inspectionGaugeTab_$index`)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_row_inspection_tooltip @regression @both
Scenario: Inspection tooltip shows correct breakdown
  Given a conveyor row with inspection counts "td.Critical/td.Poor/td.Fault/td.Good"
  When the user taps the inspection gauge
  Then the tooltip should show critical, poor, fault, and good counts matching the data
```

---

## 🔗 Related

- [TC-CONVEYORS-012 — At-risk indicator priority](./tc-conveyors-012-row-at-risk-indicator-priority.md)
- [Suite index](./index.md)
