# TC-HEAVY-EQUIPMENT-006 — Free User — free user mode actions suppressed

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-006 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_free_user` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that for free users (`isFreeUser == true`), AppBar action icons (Search, Filter, Sync, Profile) are completely hidden on `HeavyEquipmentListScreen` and `HeavyEquipmentScreen`.

---

## ✅ Preconditions

- User logged in with a Free Tier account

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to Heavy Equipment as a free user | List loads in read-only mode |
| 2 | Check AppBar actions on `HeavyEquipmentListScreen` | Search, Filter, Sync, and Profile icons are not rendered (`actions: []`) |
| 3 | Tap an equipment item to open details | Details AppBar also renders without action icons |

---

## 🏁 Expected Results

- Free user tier cleanly suppresses action controls across list and details

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart & heavy_equipment_screen.dart
actions: widget.isFreeUser ?? false ? [] : [ ... ]
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_free_user @regression @both
Scenario: Suppress AppBar actions in heavy equipment for free users
  Given a free tier user is logged in
  When navigating to Heavy Equipment
  Then search, filter, sync, and profile icons should not be present in the AppBar
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-004 — Permission gating](./tc-heavy-equipment-004-permission-gating-view-download.md)
- [Suite index](./index.md)
