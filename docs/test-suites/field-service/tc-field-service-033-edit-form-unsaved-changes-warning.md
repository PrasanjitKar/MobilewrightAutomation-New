# TC-FIELD-SERVICE-033 — Edit Form & Warning — edit form and unsaved changes warning modal

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-033 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_edit_warning` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that opening an existing field service form in edit mode allows updates, and tapping Back with modified fields triggers the `conveyorBeltLenWarningDialog` unsaved changes confirmation modal.

---

## ✅ Preconditions

- Existing field service form available

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open existing form and tap "Edit" | Screen enters edit mode |
| 2 | Modify a field (e.g., Ambient Temperature) | `hasUnsavedChanges` sets to true |
| 3 | Tap Back arrow | `showSimpleModal` pops up with warning: "Are you sure you want to exit without saving?" |
| 4 | Tap "No" | Modal closes; user remains on edit screen |
| 5 | Tap "Save" | Form saves updates to server/cache |

---

## 🏁 Expected Results

- Unsaved edits are safeguarded against accidental navigation

---

## 🔍 Flutter Source Reference

```dart
// field_service_details_screen.dart
if (fieldServiceDetailsCubit.hasUnsavedChanges) { showSimpleModal(..., body: AppLocalizations.of(context)!.conveyorBeltLenWarningDialog, ...); }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_edit_warning @regression @both
Scenario: Edit field service form and verify unsaved changes warning
  Given the user is editing an existing field service form
  When the user modifies data and attempts to exit
  Then an unsaved changes warning dialog should be displayed
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-034 — Delete form](./tc-field-service-034-delete-service-form.md)
- [Suite index](./index.md)
