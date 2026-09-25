# TC-INSPECTIONS-030 — Offline Save — saving while offline marks inspection "Upload Pending"

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-030 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_offline_save_pending` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-details.page.ts`, `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that creating or editing an inspection while offline saves the complete inspection and local photo paths into Hive, assigns a temporary `new_` prefix ID, and displays the "Upload Pending" status badge on `InspectionListScreen`.

---

## ✅ Preconditions

- Device is offline (Airplane Mode)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Put device in Airplane Mode | Device is offline |
| 2 | Create a new inspection and add findings with photos | Inspection is populated |
| 3 | Tap "Save" button (`saveButton`) | `ctp.inspectionManager.saveInspection()` stores record locally with `isPending = true` |
| 4 | Return to `InspectionListScreen` | Inspection appears in list |
| 5 | Verify row status badge (`status_$index`) | Displays "Upload Pending" with pastel red background |

---

## 🏁 Expected Results

- Full inspection data is preserved offline in Hive and tagged with pending upload status

---

## 🔍 Flutter Source Reference

```dart
// inspection_details_cubit.dart & inspection_row.dart
await ctp.inspectionManager.saveInspection(inspection);
// Status check:
if (isPending) return AppLocalizations.of(context)!.uploadPending;
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_offline_save_pending @regression @both
Scenario: Save inspection offline with pending status
  Given the device is offline
  When the user creates and saves a new inspection
  Then the inspection should appear in the list with status "Upload Pending"
```

---

## 🔗 Related

- [TC-INSPECTIONS-009 — Offline mode and cache](./tc-inspections-009-offline-banner-and-cached-inspection-list.md)
- [TC-INSPECTIONS-031 — Sync pending inspections on reconnect](./tc-inspections-031-sync-pending-inspections-on-reconnect.md)
- [Suite index](./index.md)
