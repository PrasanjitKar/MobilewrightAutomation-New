# TC-INSPECTIONS-038 — Conveyor Details — navigate to pre-filtered inspection list for conveyor

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-038 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_details_to_inspections` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts`, `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on `ConveyorInformationScreen`, tapping the Inspections section badge passes `inspectionConveyorId`, sets `isConveyorIdsPreSupplied: true` in `InspectionFilters`, and opens `InspectionListScreen` pre-filtered to inspections containing that conveyor.

---

## ✅ Preconditions

- User is viewing `ConveyorInformationScreen` for a conveyor that has associated inspection records

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to `ConveyorInformationScreen` for "Overland Feeder Conveyor" | Conveyor details load |
| 2 | Locate "Inspections" card/row with inspection count badge | Displays count of inspections for this conveyor |
| 3 | Tap the Inspections row | `InspectionListScreen` opens with back arrow (`backArrowFromConveyor`) |
| 4 | Check active filter | `filters.conveyorIds` contains the conveyor ID and `isConveyorIdsPreSupplied == true` |
| 5 | Verify displayed inspections | Only inspections that evaluated "Overland Feeder Conveyor" are listed |
| 6 | Tap back arrow | Returns smoothly to `ConveyorInformationScreen` |

---

## 🏁 Expected Results

- Contextual navigation from conveyor information correctly pre-filters the inspection list

---

## 🔍 Flutter Source Reference

```dart
// conveyor_information_screen.dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (_) => InspectionListScreen(
      isFreeUser: true,
      inspectionConveyorId: conveyor.conveyorId,
    ),
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_details_to_inspections @regression @both
Scenario: Navigate to pre-filtered inspections from Conveyor Details
  Given the user is viewing Conveyor Details for "Overland Feeder Conveyor"
  When the user taps the Inspections section
  Then the Inspections screen should open pre-filtered to "Overland Feeder Conveyor"
  And only inspections containing that conveyor should be displayed
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
