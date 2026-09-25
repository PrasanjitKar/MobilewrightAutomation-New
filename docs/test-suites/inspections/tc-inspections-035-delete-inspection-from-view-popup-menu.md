# TC-INSPECTIONS-035 — Delete Inspection — delete full inspection via popup menu with modal

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-035 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `delete_full_inspection` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-view.page.ts`, `src/pages/delete-modal.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that a user with `InspectionModule.inspectionModule` `Permission.delete` can select "Delete" from the app bar popup menu (`inspectionPopupMenu`) on `InspectionViewScreen`, confirm `showDeleteConfirmationModal()`, and dispatch `InspectionListDeleteEvent()` to remove the inspection.

---

## ✅ Preconditions

- User has `InspectionModule.inspectionModule` `Permission.delete`
- An inspection record exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `InspectionViewScreen` for the target inspection | Screen loads |
| 2 | Tap the three-dot popup menu (`inspectionPopupMenu`) in app bar | Popup menu opens |
| 3 | Tap "Delete" (`deleteText`) | `showDeleteConfirmationModal` dialog opens displaying inspection name |
| 4 | Tap "Yes" (`yesButton`) to confirm | Dialog closes; `InspectionListDeleteEvent` is dispatched; screen pops back to `InspectionListScreen` |
| 5 | Verify `InspectionListScreen` | The deleted inspection is no longer present in the list |

---

## 🏁 Expected Results

- Inspection is deleted locally and marked/submitted for backend deletion

---

## 🔍 Flutter Source Reference

```dart
// inspection_view_screen.dart
showDeleteConfirmationModal(
  context,
  AppLocalizations.of(context)!.confirmation,
  AppLocalizations.of(context)!.deleteInspections,
  inspection.name ?? '',
  true,
  () {
    Navigator.of(context).pop();
    context.read<InspectionListBloc>().add(InspectionListDeleteEvent(inspection: inspection));
    Navigator.of(context).pop();
  },
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:delete_full_inspection @regression @both
Scenario: Delete inspection from details popup menu
  Given the user has inspection delete permission
  When the user is viewing inspection "td.InspectionToDelete"
  And the user selects Delete from the popup menu and confirms
  Then the user should be returned to the Inspections list
  And "td.InspectionToDelete" should no longer appear in the list
```

---

## 🔗 Related

- [TC-INSPECTIONS-003 — Inspection view details](./tc-inspections-003-inspection-view-details-and-pdf-preview.md)
- [Suite index](./index.md)
