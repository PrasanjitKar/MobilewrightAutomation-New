# TC-HEAVY-EQUIPMENT-026 — Deep Link — deep link direct navigation

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-026 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_deep_link` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that opening a deep link URI for `BasicModule.heavyEquipmentData` targeting a specific `contentId` routes directly to `HeavyEquipmentScreen` for that equipment.

---

## ✅ Preconditions

- App receives deep link with valid heavy equipment ID

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Trigger deep link with target equipment ID | `DeepLinkBloc` emits `DeepLinkPendingState` |
| 2 | Observe navigation | App navigates directly to `HeavyEquipmentScreen` for that item |
| 3 | Tap Back | Closes details and returns to list |

---

## 🏁 Expected Results

- Deep links route straight to the specified heavy equipment details

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart
if (deepLinkState.module == BasicModule.heavyEquipmentData && deepLinkState.contentId != null) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_deep_link @regression @both
Scenario: Route to heavy equipment details via deep link
  When a deep link is received for a heavy equipment item
  Then the app should navigate directly to that equipment's details screen
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-002 — Details screen](./tc-heavy-equipment-002-details-screen-and-header-card.md)
- [Suite index](./index.md)
