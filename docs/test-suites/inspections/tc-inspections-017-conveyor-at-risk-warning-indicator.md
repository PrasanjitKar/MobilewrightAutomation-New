# TC-INSPECTIONS-017 — Conveyor at Risk — warning icon displayed when inspection flags risk

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-017 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_at_risk_warning` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when an inspection has flagged one or more conveyors as "At Risk" (`inspection.conveyorAtRisk.isNotEmpty`), `InspectionRow` renders the red caution warning triangle icon (`conveyorAtRisk_$index`).

---

## ✅ Preconditions

- Inspection with `conveyorAtRisk` list populated exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate an inspection with a flagged risk on `InspectionListScreen` | Row renders |
| 2 | Observe flag badge area | `SemanticsLabel(label: 'conveyorAtRisk_$index')` displays red caution icon (`assets/svg/caution.svg`) |
| 3 | Locate another inspection with no risk flagged | Conveyor at risk caution icon is not displayed |

---

## 🏁 Expected Results

- High-priority risk warning icon clearly highlights hazardous conveyor systems

---

## 🔍 Flutter Source Reference

```dart
// inspection_row.dart
if (widget.inspection.conveyorAtRisk?.isNotEmpty ?? false)
  SemanticsLabel(
    label: 'conveyorAtRisk_${widget.index}',
    child: SvgPicture.asset(ContiPlusIcon.caution_24x24, colorFilter: ColorFilter.mode(ContiplusColors.continentalLightRed, BlendMode.srcIn)),
  )
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_at_risk_warning @regression @both
Scenario: Conveyor at risk warning indicator
  Given an inspection contains conveyors flagged at risk
  When the user views the Inspections list
  Then the caution warning icon should be displayed on the inspection row
```

---

## 🔗 Related

- [TC-INSPECTIONS-015 — Inspection row metadata](./tc-inspections-015-inspection-row-metadata-and-condition-badges.md)
- [Suite index](./index.md)
