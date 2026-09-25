# TC-HEAVY-EQUIPMENT-008 — Manual Sync — manual sync with confirmation dialog

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-008 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_manual_sync` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the sync icon in the AppBar prompts `syncConfirmation` alert dialog, and confirming triggers a hard refresh (`hardRefresh: true`).

---

## ✅ Preconditions

- On `HeavyEquipmentListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the sync icon in the AppBar | `AlertDialog` displays with confirmation text and OK/Cancel buttons |
| 2 | Tap "Cancel" | Dialog dismisses without sync |
| 3 | Tap sync icon again and tap "OK" | `HeavyEquipmentListLoadEvent(hardRefresh: true)` executes hard refresh |

---

## 🏁 Expected Results

- Manual sync is guarded by confirmation dialog and initiates full refresh

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart
AlertDialog(content: Text(AppLocalizations.of(context)!.syncConfirmation), ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_manual_sync @regression @both
Scenario: Trigger manual sync with confirmation in heavy equipment
  Given the user is on Heavy Equipment list
  When the user taps the sync button and confirms OK in the dialog
  Then a hard refresh should be dispatched to update the list
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-007 — Pull to refresh](./tc-heavy-equipment-007-pull-to-refresh.md)
- [Suite index](./index.md)
