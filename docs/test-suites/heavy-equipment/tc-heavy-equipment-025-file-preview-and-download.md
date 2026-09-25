# TC-HEAVY-EQUIPMENT-025 — File Preview — file preview and download authorization

> Suite: [Heavy Equipment](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-025 |
| **Suite** | heavy-equipment |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_file_preview` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-details.page.ts`, `src/pages/file-preview.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping an associated document row opens `FilePreviewScreen` passing authenticated Cognito tokens, enabling preview and permission-gated downloading.

---

## ✅ Preconditions

- Equipment record with readable PDF/manual file

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On details screen, tap an associated PDF file row | Authenticates session and opens `FilePreviewScreen` |
| 2 | Observe viewer | Document renders with page navigation controls |
| 3 | Tap download icon (with download permission) | File downloads to device storage |

---

## 🏁 Expected Results

- Document files preview smoothly and download cleanly

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_screen.dart
FilePreviewScreen(file: element, appBarTitle: AppLocalizations.of(context)!.heavyEquipment, canDownload: canDownloadHeavyEquipment, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_file_preview @regression @both
Scenario: Preview and download associated equipment document
  Given the user is on the Heavy Equipment details screen
  When the user taps on an attached document row
  Then the file preview screen should render the document with download access
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-023 — Associated files](./tc-heavy-equipment-023-details-associated-files-list.md)
- [Suite index](./index.md)
