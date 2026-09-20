# TC-CONVEYORS-029 — Technical Data opens read-only for users without edit permission

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-029 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_technical_data_read_only` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify a user with view-only permission (no `Permission.edit`) for conveyors can open "Technical Data" from the Conveyor Information hub and see all fields, but cannot edit or save changes.

---

## ✅ Preconditions

- User has `BasicModule.conveyorsData` / `Permission.view` but **not** `Permission.edit`
- An existing conveyor is available to open

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open a conveyor's Information hub, tap "Technical Data" (`technicalDataCard`) | `ConveyorDetailsScreen(isReadOnly: true)` opens |
| 2 | Observe the bottom action button | Labelled `edit`, but disabled/hidden since `Permission.edit` is not granted (`userCanSeeButton = !isFreeUser && (isNewConveyor ? canAdd : canEdit)`) |
| 3 | Observe all fields across Details/Conveyor-Lite/Installed Belt steps | All fields are visible but not editable (read-only display) |
| 4 | Observe the delete icon | Not shown (`Permission.delete` also required) |

---

## 🏁 Expected Results

- All 3 steps' data is visible for review
- No edit/save/delete controls are available for a view-only user

---

## 🔍 Flutter Source Reference

```dart
// conveyor_details_screen.dart
final bool userCanSeeButton = !widget.isFreeUser && (isNewConveyor ? canAdd : canEdit);
// Delete action only visible when widget.isReadOnly && !widget.isFreeUser && canDelete
```

**Semantic label:** `technicalDataCard` (on `ConveyorInformationScreen`)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_technical_data_read_only @regression @both
Scenario: Technical Data opens read-only without edit permission
  Given the user has conveyor view permission but not edit permission
  When the user opens Technical Data for an existing conveyor
  Then all fields should be visible but not editable
  And no edit or delete controls should be available
```

---

## 🔗 Related

- [TC-CONVEYORS-030 — Edit existing conveyor](./tc-conveyors-030-edit-existing-conveyor-and-save.md)
- [Suite index](./index.md)
