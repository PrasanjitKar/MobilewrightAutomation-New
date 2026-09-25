# TC-FIELD-SERVICE-004 — Permission Gating — view, add, edit, delete, download permissions

> Suite: [Field Service](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-004 |
| **Suite** | field-service |
| **Priority** | Critical |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_permission_gating` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that access to Field Service, FAB (+), Edit, Delete, and PDF download controls is strictly gated by user role permissions for `InternalToolsModule.fieldService`.

---

## ✅ Preconditions

- Test accounts configured with varying permission sets

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in with account lacking `view` permission | Field Service card is omitted from Dashboard and Drawer |
| 2 | Log in with `view` only | List loads; FAB (+) is hidden; detail screen shows read-only mode with no edit button |
| 3 | Log in with `view` + `add` + `edit` | FAB (+) and Edit buttons are enabled |
| 4 | Log in with `delete` permission | Three-dot popup menu on details reveals Delete action |
| 5 | Verify PDF download with / without `download` permission | Download icon disabled or hidden without download permission |

---

## 🏁 Expected Results

- Permissions are strictly enforced across all UI entry points and actions

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_screen.dart
user?.canAccess(InternalToolsModule.fieldService, Permission.add)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_permission_gating @regression @both
Scenario: Validate permission gating for field service actions
  Given a user with view-only permissions for Field Service
  When the user views the Field Service list
  Then the add FAB button and edit controls should not be visible
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-001 — List load](./tc-field-service-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
