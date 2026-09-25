# TC-HEAVY-EQUIPMENT-002 — Details Screen — details screen and header metadata card

> Suite: [Heavy Equipment](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-002 |
| **Suite** | heavy-equipment |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `heavy_equipment_details_load` |
| **Feature File** | `features/smoke/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping an equipment row on the list opens `HeavyEquipmentScreen` displaying the header card with thumbnail, name, category, model, year, and distributor shop.

---

## ✅ Preconditions

- Heavy equipment records exist in the list

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `HeavyEquipmentListScreen`, tap an equipment row | Navigates to `HeavyEquipmentScreen` |
| 2 | Observe Header Card | Renders image/thumbnail, Name, Category, Model, Year of Manufacture, Serial Number, and Distributor Shop |
| 3 | Observe Documents Section | Loads list of associated file manuals below header card |

---

## 🏁 Expected Results

- Equipment details and related documents load seamlessly

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_screen.dart
Widget buildHeaderCard(HeavyEquipmentModel heavyEquipmentModel, String? header) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:heavy_equipment_details_load @smoke @both
Scenario: Open heavy equipment details and verify header metadata
  Given the user is on the Heavy Equipment list screen
  When the user taps on an equipment item
  Then the details screen should open displaying the header card and associated files
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-001 — List load](./tc-heavy-equipment-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
