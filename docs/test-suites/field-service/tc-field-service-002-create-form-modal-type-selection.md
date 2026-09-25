# TC-FIELD-SERVICE-002 — Create Modal — form type selection modal on FAB (+)

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-002 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `field_service_create_modal` |
| **Feature File** | `features/smoke/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the FAB (+) opens the "Create Service Form" dialog modal with Form Type dropdown, Next button disabled until selection, and routes to appropriate details stepper upon Next.

---

## ✅ Preconditions

- User has `InternalToolsModule.fieldService` add permission

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the yellow FAB (+) on `FieldServiceListScreen` | `showCreateFormModal` opens with title "Create Service Form" |
| 2 | Observe Next button | Next button is disabled (grayed out) |
| 3 | Select Form Type "Conveyor Belt Length Measurement" | Next button activates |
| 4 | Tap "Next" | Navigates to `FieldServiceDetailsScreen` (4-step stepper) |

---

## 🏁 Expected Results

- Create modal enforces form type selection and routes correctly

---

## 🔍 Flutter Source Reference

```dart
// create_form_dialog.dart
showCreateFormModal(context: context, onPositiveClick: (model) { ... });
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:field_service_create_modal @smoke @both
Scenario: Create service form modal selection
  Given the user is on the Field Service list screen
  When the user taps the add FAB button
  Then the create service form modal should appear with mandatory form type selection
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-014 — CBLM form initiation](./tc-field-service-014-cblm-form-initiation-and-stepper.md)
- [Suite index](./index.md)
