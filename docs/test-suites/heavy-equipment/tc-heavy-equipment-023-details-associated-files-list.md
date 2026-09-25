# TC-HEAVY-EQUIPMENT-023 — Associated Files — associated document files list in details

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-023 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_associated_files` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `HeavyEquipmentScreen` loads associated manuals and documents through `FileManagerListBloc`, displaying file name, formatted date (`d MMM yyyy`), and file type.

---

## ✅ Preconditions

- Heavy equipment record with associated files in FileManager

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open equipment details screen | Header card and file list render |
| 2 | Observe file items below header card | Each `HeavyEquipmentFileRow` displays document name, updated date, and uppercase file type (e.g. `PDF`) |
| 3 | Observe results count label | Displays "N results found" or "No results found" |

---

## 🏁 Expected Results

- Associated equipment files render with complete document metadata

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_screen.dart & heavy_equipment_files_row.dart
FileManagerListLoadEvent(relatedType: FileManager.heavyEquipmentType, relatedID: equipmentId, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_associated_files @regression @both
Scenario: Display associated document files on equipment details
  Given the user opens details for an equipment item with attachments
  Then associated documents should be listed with file name, date, and type
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-024 — File search](./tc-heavy-equipment-024-details-file-search.md)
- [Suite index](./index.md)
