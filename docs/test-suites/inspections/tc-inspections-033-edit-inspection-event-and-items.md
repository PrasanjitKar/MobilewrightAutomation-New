# TC-INSPECTIONS-033 — Edit Inspection — modify event metadata, update findings, and save

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-033 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `edit_inspection_event_items` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-view.page.ts`, `src/pages/inspection-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that a user with `Permission.edit` can open `InspectionDetailsScreen` in edit mode from `InspectionViewScreen` via the "Edit" button (`editButton`), modify event information, update item conditions, and save changes via `saveInspection()`.

---

## ✅ Preconditions

- User has `InspectionModule.inspectionModule` `Permission.edit`
- An existing inspection record is open in `InspectionViewScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `InspectionViewScreen`, tap the "Edit" button (`editButton`) | `InspectionDetailsScreen` opens in edit mode; title is "Edit Inspection Event" (`editInspectionEventAppbarTitle`) |
| 2 | Expand "Inspection Event Details" step | Modify Inspection Name and Productivity |
| 3 | Expand "Inspection Items" step | Open an existing finding item |
| 4 | Change condition from "Fault" to "Poor" and add recommendations | Changes reflected in item |
| 5 | Tap "Save" button (`saveButton`) | Changes save locally/remotely; returns to `InspectionViewScreen` with updated values |

---

## 🏁 Expected Results

- Inspection event metadata and finding details can be modified and saved successfully

---

## 🔍 Flutter Source Reference

```dart
// inspection_view_screen.dart & inspection_details_screen.dart
CommonActionButton(
  title: AppLocalizations.of(context)!.edit,
  onPressed: () {
    context.read<InspectionDetailsCubit>().setHeader(header: widget.headerForImage);
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const InspectionDetailsScreen()));
  },
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:edit_inspection_event_items @regression @both
Scenario: Edit inspection metadata and findings
  Given the user is viewing an inspection with edit permission
  When the user taps the Edit button
  And the user updates the inspection name to "td.UpdatedName" and condition to "Poor"
  And the user saves changes
  Then the updated inspection name and condition should be displayed
```

---

## 🔗 Related

- [TC-INSPECTIONS-003 — Inspection view details](./tc-inspections-003-inspection-view-details-and-pdf-preview.md)
- [Suite index](./index.md)
