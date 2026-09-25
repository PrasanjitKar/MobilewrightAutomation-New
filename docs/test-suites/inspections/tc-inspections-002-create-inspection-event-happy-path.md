# TC-INSPECTIONS-002 — Add Inspection — create new inspection event happy path

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-002 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `create_inspection_event_happy_path` |
| **Feature File** | `features/smoke/inspections.feature` |
| **Page Objects** | `src/pages/inspection-add.page.ts`, `src/pages/inspection-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that a user with `Permission.add` on `InspectionModule.inspectionModule` can initiate a new inspection from the Floating Action Button, complete the Event details step (site, date, auto-generated name, inspector), add an inspection finding item with condition and status, and save the inspection event.

---

## ✅ Preconditions

- User has `InspectionModule.inspectionModule` `Permission.add`
- Customer Sites and Conveyors exist in the account

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `InspectionListScreen` or Home, tap the `+` FAB (`floatingActionButtonAddInspection`) | `AddInspectionEventScreen` opens with header "Add Inspection" (`addInspectionEventAppbarTitle`) |
| 2 | Select a Site from the autocomplete dropdown | Site is linked; inspection name is auto-generated as `<Date> <SiteName>` |
| 3 | If site template requires conveyor level, select a Conveyor | Conveyor is selected |
| 4 | Confirm Inspection Date and Inspector Name | Defaults to today and current user |
| 5 | Tap "Next" button (`nextButton`) | `createInspectionEvent()` executes; transitions to `InspectionDetailsScreen` |
| 6 | Expand "Inspection Items" accordion and tap "Add Item" (`addItemButton`) | `InspectionItemDetails` modal opens |
| 7 | Select Condition (e.g. "Fault" `faultFlag`) and Status ("To be completed" `itemStatusRadioButton`) | Fields populated |
| 8 | Tap "Save" inside item modal | Item added to list |
| 9 | Tap "Save" button (`saveButton`) on `InspectionDetailsScreen` | `InspectionDetailsCubit.saveInspection()` runs; event is saved |
| 10 | Verify list view | Newly created inspection appears in `InspectionListScreen` |

---

## 🏁 Expected Results

- Inspection event is created with event metadata, findings, and saved successfully to backend/cache

---

## 🔍 Flutter Source Reference

```dart
// add_inspection_event_screen.dart & inspection_details_cubit.dart
context.read<InspectionDetailsCubit>().createInspectionEvent();
// inspection_details_screen.dart
context.read<InspectionDetailsCubit>().saveInspection();
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:create_inspection_event_happy_path @smoke @both
Scenario: Create a new inspection event
  Given the user has inspection add permission
  When the user taps the add inspection button
  And the user selects site "td.SiteName"
  And the user taps Next to enter inspection details
  And the user adds an inspection item with condition "Fault"
  And the user taps Save
  Then the new inspection should appear in the inspections list
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
