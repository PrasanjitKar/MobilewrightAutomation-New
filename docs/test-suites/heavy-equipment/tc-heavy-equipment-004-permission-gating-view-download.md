# TC-HEAVY-EQUIPMENT-004 — Permission Gating — permission gating for view and download

> Suite: [Heavy Equipment](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-004 |
| **Suite** | heavy-equipment |
| **Priority** | Critical |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_permission_gating` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that access to Heavy Equipment is restricted without `view` permission, and file downloads in the details preview screen are gated by `download` permission.

---

## ✅ Preconditions

- Accounts with view-only and without view permissions

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in with account lacking `BasicModule.heavyEquipmentData` view permission | Heavy equipment card omitted from dashboard; direct navigation blocked |
| 2 | Log in with view permission but without `download` | List and details load; file preview opens without download button |
| 3 | Log in with both view and download permissions | File preview displays enabled download button |

---

## 🏁 Expected Results

- View and download capabilities are strictly enforced per user permissions

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart & heavy_equipment_screen.dart
user!.canAccess(BasicModule.heavyEquipmentData, Permission.view)
user?.canAccess(BasicModule.heavyEquipmentData, Permission.download)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_permission_gating @regression @both
Scenario: Validate permission gating for heavy equipment module
  Given a user without heavy equipment view permissions
  When the user accesses the app
  Then the Heavy Equipment module should not be accessible
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-001 — List load](./tc-heavy-equipment-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
