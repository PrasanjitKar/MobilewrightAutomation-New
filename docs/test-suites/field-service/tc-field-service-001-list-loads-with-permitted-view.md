# TC-FIELD-SERVICE-001 — List Load — field service list loads with permitted view

> Suite: [Field Service](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-001 |
| **Suite** | field-service |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `field_service_list_load` |
| **Feature File** | `features/smoke/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when a user with `InternalToolsModule.fieldService` view permissions navigates to Field Service, the list loads successfully showing all service forms, search icon, filter icon, manual sync button, and user profile avatar.

---

## ✅ Preconditions

- User logged in with `InternalToolsModule.fieldService` view permission

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to Field Service module | App bar displays "Field Service" with back, search, filter, sync, and profile icons |
| 2 | Observe body | Service forms render in a scrollable list with site, conveyor, date, and technician details |
| 3 | Observe footer | `LastUpdatedTimeAndTotalCountWidget` displays total form count and last updated timestamp |

---

## 🏁 Expected Results

- Field Service list loads completely with all UI components and action controls

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_screen.dart
AppLocalizations.of(context)!.fieldService
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:field_service_list_load @smoke @both
Scenario: Field service list loads with permitted view
  Given the user is logged in with field service view permissions
  When the user navigates to the Field Service screen
  Then the service forms list should load with total count and last updated time
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-002 — Form type selection modal](./tc-field-service-002-create-form-modal-type-selection.md)
- [Suite index](./index.md)
