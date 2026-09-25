# TC-HEAVY-EQUIPMENT-014 — Tablet Row — row presentation on tablet viewport

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-014 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_tablet_row` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on tablet form factors, `HeavyEquipmentRow` arranges equipment metadata into wide horizontal table columns with a right chevron icon.

---

## ✅ Preconditions

- Tablet emulator or iPad device

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Launch Heavy Equipment list on a tablet | Screen loads with tablet table row layout |
| 2 | Verify table columns | Displays Thumbnail, Name, Category, Model, Year, Serial Number, Distributor Shop, and right chevron icon |

---

## 🏁 Expected Results

- Tablet viewport renders wide multi-column layout optimized for large screens

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_row.dart
if (!DeviceHelper.isPhone()) ...
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_tablet_row @regression @both
Scenario: Verify heavy equipment row presentation on tablet
  Given the user is on the Heavy Equipment list on a tablet device
  Then the list should render as wide multi-column table rows with chevron icons
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-013 — Phone row](./tc-heavy-equipment-013-row-presentation-phone-layout.md)
- [Suite index](./index.md)
