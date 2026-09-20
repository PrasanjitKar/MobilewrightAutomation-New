# TC-CONVEYORS-030 — Edit an existing conveyor and save changes

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-030 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_edit_existing_conveyor` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify a user with `Permission.edit` can switch an existing conveyor's Technical Data view from read-only to editable, change field values, and save the update.

---

## ✅ Preconditions

- User has `BasicModule.conveyorsData` / `Permission.edit`
- An existing conveyor is available to open

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Technical Data for an existing conveyor | Opens read-only (`isReadOnly: true`), bottom action button labelled `edit` |
| 2 | Tap the `edit` bottom action button | Screen becomes editable; bottom action button now reads `save` |
| 3 | Change a field (e.g. conveyor name or a Conveyor-Lite value) | New value accepted |
| 4 | Tap `bottomActionButton` (now `save`) | `ConveyorValidateAndSaveToLocalEvent(conveyor, isFreeUser)` dispatched |
| 5 | Observe result | `ConveyorSavingLocalState` → "Conveyor Saved Locally"; screen pops back with updated data |
| 6 | Reopen the same conveyor | Updated field values are shown |

---

## 🏁 Expected Results

- Edit mode is only reachable via the `edit` button when `Permission.edit` is granted
- Save updates the existing conveyor (not a duplicate) and the list/Information hub reflect the change

---

## 🔍 Flutter Source Reference

```dart
// conveyor_details_screen.dart
// Bottom action button label: New conveyor -> 'create'; read-only existing -> 'edit'; edit mode -> 'save'
// Save flow: ConveyorValidateAndSaveToLocalEvent(conveyor: conveyor, isFreeUser: widget.isFreeUser)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_edit_existing_conveyor @regression @both
Scenario: Edit and save an existing conveyor
  Given the user has conveyor edit permission
  When the user opens Technical Data for "td.ConveyorName" and taps Edit
  And the user updates the conveyor name to "td.UpdatedConveyorName"
  And the user saves the changes
  Then the conveyor should be updated with the new name
```

---

## 🔗 Related

- [TC-CONVEYORS-029 — Read-only view](./tc-conveyors-029-technical-data-read-only-view.md)
- [Suite index](./index.md)
