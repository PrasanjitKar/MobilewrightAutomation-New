# TC-HEAVY-EQUIPMENT-024 — File Search — in-details document file search

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-024 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_file_search` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that searching within `HeavyEquipmentScreen` filters associated documents by keyword query.

---

## ✅ Preconditions

- Equipment record with multiple associated documents

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On details screen, tap search icon in AppBar | Search input field appears |
| 2 | Enter file keyword (e.g., "Manual") | `FileManagerListLoadEvent` fires with search term |
| 3 | Observe file list | Only documents with "Manual" in their title remain visible |

---

## 🏁 Expected Results

- Document search filters associated attachments in real time

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_screen.dart
void onSearch() { context.read<FileManagerListBloc>().add(FileManagerListLoadEvent(search: _searchCtrl.text, ...)); }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_file_search @regression @both
Scenario: Search associated documents on equipment details screen
  Given the user is on the Heavy Equipment details screen
  When the user opens search and enters a file keyword
  Then only matching document files should be displayed
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-023 — Associated files](./tc-heavy-equipment-023-details-associated-files-list.md)
- [Suite index](./index.md)
