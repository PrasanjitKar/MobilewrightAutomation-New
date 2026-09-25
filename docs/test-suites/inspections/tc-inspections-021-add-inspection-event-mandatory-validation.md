# TC-INSPECTIONS-021 — Add Event — mandatory fields validation disables Next button

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-021 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_inspection_mandatory_validation` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `AddInspectionEventScreen` enforces completeness rules (`isInformationComplete()`), keeping the "Next" button (`nextButton`) disabled until Site, Date, Inspector Name, and Name are non-empty.

---

## ✅ Preconditions

- User opens `AddInspectionEventScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On initial load of `AddInspectionEventScreen`, check "Next" button (`nextButton`) | Button is disabled with gray text (`ContiplusColors.continentalGray2`) |
| 2 | Select Site | Next button remains disabled if Inspection Name is blank |
| 3 | Clear Inspector Name | Next button remains disabled |
| 4 | Fill Inspector Name and confirm valid Date, Site, and Name | Next button becomes active and clickable with black text |

---

## 🏁 Expected Results

- Form prevents progression until all mandatory event metadata are valid

---

## 🔍 Flutter Source Reference

```dart
// add_inspection_event_screen.dart
bool isInformationComplete(InspectionModel inspection) {
  return (inspection.name?.trim().isNotEmpty ?? false) &&
      (inspection.siteId?.isNotEmpty ?? false) &&
      inspection.inspectionDate != null &&
      (inspection.inspector?.name?.isNotEmpty ?? false) &&
      (!(inspection.siteLevelInspectionTemplate?.isEventConveyor ?? false) || inspection.conveyorId != null);
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_inspection_mandatory_validation @regression @both
Scenario: Mandatory fields validation on Add Inspection Event
  Given the user is on the Add Inspection Event screen
  Then the Next button should be disabled
  When the user fills site, inspection name, and inspector details
  Then the Next button should become enabled
```

---

## 🔗 Related

- [TC-INSPECTIONS-002 — Create inspection event happy path](./tc-inspections-002-create-inspection-event-happy-path.md)
- [Suite index](./index.md)
