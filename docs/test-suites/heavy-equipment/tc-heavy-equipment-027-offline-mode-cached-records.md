# TC-HEAVY-EQUIPMENT-027 — Offline Mode — offline mode and cached record rendering

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-027 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_offline_mode` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when the device is offline, `HeavyEquipmentListBloc` loads previously cached equipment records from Hive and displays the "Working Offline" indicator.

---

## ✅ Preconditions

- Equipment records previously synced; device in Airplane mode

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enable Airplane mode on device | Offline state |
| 2 | Open Heavy Equipment module | `HeavyEquipmentListBloc` loads records from Hive cache |
| 3 | Observe UI | Equipment items render normally and "Working Offline" banner is displayed |

---

## 🏁 Expected Results

- Equipment data remains accessible offline via local cache

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart & heavy_equipment_list_bloc.dart
if (state.status.isOffline) Text(AppLocalizations.of(context)!.workingOffline)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_offline_mode @regression @both
Scenario: Access cached heavy equipment records in offline mode
  Given the device is offline with previously cached heavy equipment data
  When the user navigates to Heavy Equipment
  Then cached equipment records should be displayed with "Working Offline" text
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-001 — List load](./tc-heavy-equipment-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
