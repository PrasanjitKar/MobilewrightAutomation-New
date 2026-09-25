# TC-HEAVY-EQUIPMENT-007 — Pull to Refresh — pull to refresh list reload

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-007 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_pull_refresh` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that swiping down from the top of `HeavyEquipmentListScreen` triggers `RefreshIndicator`, dispatching `HeavyEquipmentListLoadEvent` to fetch latest server updates.

---

## ✅ Preconditions

- On `HeavyEquipmentListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Swipe down on the equipment list | Pull-to-refresh spinner triggers |
| 2 | Wait for request completion | Spinner dismisses and list updates |

---

## 🏁 Expected Results

- List reloads cleanly without errors

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart
RefreshIndicator(onRefresh: () async { heavyEquipmentListBloc.add(const HeavyEquipmentListLoadEvent()); })
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_pull_refresh @regression @both
Scenario: Pull to refresh heavy equipment list
  Given the user is on the Heavy Equipment list screen
  When the user swipes down to refresh the list
  Then the list should reload and update with server records
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-001 — List load](./tc-heavy-equipment-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
