# TC-HEAVY-EQUIPMENT-013 — Phone Row — row presentation on phone viewport

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-013 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_phone_row` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on phone viewports, `HeavyEquipmentRow` renders the thumbnail, Name (bold 16px), Category, Model, Year of Manufacture, Serial Number, and Distributor Shop.

---

## ✅ Preconditions

- Heavy equipment records exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Heavy Equipment list on a phone device | Records render in phone layout |
| 2 | Verify row content | Displays circular thumbnail, equipment name, category/model column, year/serial column, and distributor shop column |
| 3 | Tap the row | Navigates to `HeavyEquipmentScreen` details |

---

## 🏁 Expected Results

- Phone layout displays comprehensive equipment metadata in compact columns

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_row.dart
if (DeviceHelper.isPhone()) ...
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_phone_row @regression @both
Scenario: Verify heavy equipment row presentation on phone
  Given the user is on the Heavy Equipment list on a phone device
  Then each row should display thumbnail, name, category, model, year, serial, and distributor shop
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-014 — Tablet row](./tc-heavy-equipment-014-row-presentation-tablet-layout.md)
- [Suite index](./index.md)
