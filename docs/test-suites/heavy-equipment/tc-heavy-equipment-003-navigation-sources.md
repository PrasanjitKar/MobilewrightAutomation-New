# TC-HEAVY-EQUIPMENT-003 — Navigation Sources — navigation from dashboard and drawer

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-003 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_navigation_sources` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that users can navigate to Heavy Equipment from both the Home dashboard module card and the side navigation drawer.

---

## ✅ Preconditions

- User logged in with `BasicModule.heavyEquipmentData` access

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Home Dashboard, locate the "Heavy Equipment" card | Displays total equipment count |
| 2 | Tap the card | Navigates to `HeavyEquipmentListScreen` |
| 3 | Tap Back, open Navigation Drawer, and select "Heavy Equipment" | Navigates to `HeavyEquipmentListScreen` |

---

## 🏁 Expected Results

- Both navigation entry points direct correctly to the Heavy Equipment list

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart & app.dart
RouteNameKeys.heavyEquipmentListScreen
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_navigation_sources @regression @both
Scenario: Navigate to heavy equipment from dashboard and drawer
  Given the user is on the Dashboard
  When the user taps the Heavy Equipment module card
  Then the Heavy Equipment list screen should open
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-001 — List load](./tc-heavy-equipment-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
