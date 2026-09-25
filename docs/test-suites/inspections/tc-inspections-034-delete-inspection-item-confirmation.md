# TC-INSPECTIONS-034 — Delete Item — delete individual inspection finding with confirmation modal

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-034 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `delete_inspection_item` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-view.page.ts`, `src/pages/delete-modal.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that in `InspectionViewScreen` -> "Items" tab, opening the popup menu on an `InspectionItemCard` and selecting "Delete" triggers `showDeleteConfirmationModal()`, and confirming deletes the finding and auto-saves the inspection.

---

## ✅ Preconditions

- Inspection contains 2 or more finding items
- User has `InspectionModule.inspectionModule` `Permission.edit`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `InspectionViewScreen`, switch to "Items" tab | Item cards list renders |
| 2 | Tap the card popup menu (`popupMenu_$index`) on a finding | Menu opens with "Edit" and "Delete" |
| 3 | Tap "Delete" (`deleteInspectionMenu_$index`) | `showDeleteConfirmationModal` dialog opens |
| 4 | Confirm deletion by tapping "Yes" (`yesButton`) | `deleteItem()` removes finding; `saveInspection()` executes |
| 5 | Verify items list | Deleted finding is removed from the list and total count decrements by 1 |

---

## 🏁 Expected Results

- Individual finding items can be safely removed with explicit user confirmation

---

## 🔍 Flutter Source Reference

```dart
// inspection_view_screen.dart
showDeleteConfirmationModal(
  context,
  AppLocalizations.of(context)!.confirmation,
  AppLocalizations.of(context)!.deleteInspectionItem,
  item.asset?.name ?? '',
  false,
  () {
    context.read<InspectionDetailsCubit>().deleteItem(item);
    context.read<InspectionDetailsCubit>().saveInspection();
  },
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:delete_inspection_item @regression @both
Scenario: Delete individual inspection finding
  Given the user is on the Items tab of inspection view
  When the user deletes a finding item and confirms the deletion modal
  Then the finding item should be removed from the inspection
```

---

## 🔗 Related

- [TC-INSPECTIONS-003 — Inspection view details](./tc-inspections-003-inspection-view-details-and-pdf-preview.md)
- [Suite index](./index.md)
