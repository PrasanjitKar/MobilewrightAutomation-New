# TC-CONVEYOR-INSPECT-019 — Edit Event — update inspection date, title, or comments

> Suite: [Conveyor Inspect](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-019 |
| **Suite** | conveyor-inspect |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `edit_conveyor_inspect_event` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping Edit on an existing inspection event opens `AddEditConveyorInspectEvent` pre-populated with existing metadata, allows modifying notes/date, and updates the inspection event on save.

---

## ✅ Preconditions

- Existing conveyor inspect event created by current user

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `ConveyorInspectDetailsScreen` or row swipe, tap "Edit" | `AddEditConveyorInspectEvent` opens in edit mode |
| 2 | Verify existing fields | Title, Site, Conveyor, Inspection Date, and Notes match current record |
| 3 | Modify inspection date or append notes | Values update in state |
| 4 | Tap "Save" button | `EditConveyorInspectEvent` dispatches to API |
| 5 | Verify details screen | Details screen reflects updated notes and timestamp |

---

## 🏁 Expected Results

- Inspection event updates successfully without corrupting attached finding data

---

## 🔍 Flutter Source Reference

```dart
// add_edit_conveyor_inspect_event.dart
isEdit ? 'Edit Conveyor Inspect' : 'Add Conveyor Inspect'
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:edit_conveyor_inspect_event @regression @both
Scenario: Edit conveyor inspect event notes and date
  Given an existing conveyor inspect event
  When the user edits the event notes and saves
  Then the updated notes should be displayed in the inspection details
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-002 — Create thermal event](./tc-conveyor-inspect-002-create-thermal-inspection-event.md)
- [Suite index](./index.md)
