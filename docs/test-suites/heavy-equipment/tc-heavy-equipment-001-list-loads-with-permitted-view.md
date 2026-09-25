# TC-HEAVY-EQUIPMENT-001 — List Load — heavy equipment list loads with permitted view

> Suite: [Heavy Equipment](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-001 |
| **Suite** | heavy-equipment |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `heavy_equipment_list_load` |
| **Feature File** | `features/smoke/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when a user with `BasicModule.heavyEquipmentData` view permission opens Heavy Equipment, the list screen loads successfully with AppBar title, search, filter, sync icons, and equipment rows.

---

## ✅ Preconditions

- User logged in with `BasicModule.heavyEquipmentData` view permission

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to Heavy Equipment from Dashboard or Drawer | `HeavyEquipmentListScreen` opens |
| 2 | Observe AppBar | Displays "Heavy Equipment" title with back, search, filter, sync, and profile icons |
| 3 | Observe Body & Footer | Equipment rows render with thumbnail and metadata; footer displays total count and sync time |

---

## 🏁 Expected Results

- Heavy Equipment list loads cleanly with all functional action icons

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart
AppLocalizations.of(context)!.heavyEquipment
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:heavy_equipment_list_load @smoke @both
Scenario: Heavy equipment list loads with permitted view
  Given the user is logged in with heavy equipment view permissions
  When the user navigates to Heavy Equipment
  Then the equipment list should load with search, filter, and sync actions
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-002 — Details screen](./tc-heavy-equipment-002-details-screen-and-header-card.md)
- [Suite index](./index.md)
