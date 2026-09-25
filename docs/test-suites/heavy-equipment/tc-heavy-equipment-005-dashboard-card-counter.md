# TC-HEAVY-EQUIPMENT-005 — Dashboard Counter — dashboard card counter and sync

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-005 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_dashboard_counter` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that the number displayed on the Heavy Equipment dashboard card accurately matches the total count in `HeavyEquipmentListScreen` footer widget.

---

## ✅ Preconditions

- Heavy equipment records exist for the user's tenant

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Note the count displayed on the Heavy Equipment dashboard card | Value $C$ is recorded |
| 2 | Open Heavy Equipment module | List loads |
| 3 | Check the total count displayed in the bottom footer widget | Footer total count matches $C$ |

---

## 🏁 Expected Results

- Count synchronization is maintained between Dashboard summary and list

---

## 🔍 Flutter Source Reference

```dart
// summary_bloc.dart & heavy_equipment_list_screen.dart
LastUpdatedTimeAndTotalCountWidget(listLength: listItems.length, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_dashboard_counter @regression @both
Scenario: Verify heavy equipment dashboard count matches list count
  Given the user notes the heavy equipment count on the dashboard card
  When the user navigates to the Heavy Equipment list
  Then the list count in the footer should match the dashboard card
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-003 — Navigation sources](./tc-heavy-equipment-003-navigation-sources.md)
- [Suite index](./index.md)
