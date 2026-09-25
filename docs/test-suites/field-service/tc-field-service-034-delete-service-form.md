# TC-FIELD-SERVICE-034 — Delete Form — delete field service form with confirmation

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-034 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_delete_form` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts`, `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that a user with delete permissions can delete a field service form via the three-dot popup menu, confirming deletion in `showNewDeleteModal` displaying survey date, form name, site, and conveyor.

---

## ✅ Preconditions

- User has delete permission; existing form available

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open existing form in view mode | Three-dot more icon is visible in app bar |
| 2 | Tap three-dot icon and select "Delete" | `showNewDeleteModal` opens showing survey date, form type, site, and conveyor |
| 3 | Tap Confirm Delete | Form deleted via `deleteFieldService()`, screen closes, list removes card |

---

## 🏁 Expected Results

- Form is removed permanently upon confirmation

---

## 🔍 Flutter Source Reference

```dart
// field_service_details_screen.dart
showNewDeleteModal(context, ..., () async { await context.read<FieldServiceDetailsCubit>().deleteFieldService(); })
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_delete_form @regression @both
Scenario: Delete field service form with confirmation
  Given the user is viewing a field service form with delete permissions
  When the user selects Delete from the menu and confirms
  Then the form should be deleted and removed from the list
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-004 — Permission gating](./tc-field-service-004-permission-gating.md)
- [Suite index](./index.md)
