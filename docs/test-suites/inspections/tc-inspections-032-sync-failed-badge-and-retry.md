# TC-INSPECTIONS-032 — Sync Failure — failed upload marks row with "Sync Failed" badge

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-032 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_sync_failure_badge` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that if an error occurs during background photo sync or server payload submission (e.g. timeout or unsynced image), `inspection.failed = true` is set and the inspection row renders the red "Sync Failed" badge (`syncFailed_$index`).

---

## ✅ Preconditions

- Device has an offline inspection with an image upload failure

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Trigger sync on an inspection with invalid image file path or simulated upload error | `_syncPhotos` fails |
| 2 | Observe BLoC handling | `inspection.failed = true` is saved to local storage |
| 3 | Observe row on `InspectionListScreen` | `SemanticsLabel(label: 'syncFailed_$index')` renders with red background (`ContiplusColors.continentalLightRed`) displaying "Sync Failed" |
| 4 | Perform pull-to-refresh to retry sync | Sync re-attempts for the failed item |

---

## 🏁 Expected Results

- Failed uploads are visibly flagged with "Sync Failed" badge and can be retried

---

## 🔍 Flutter Source Reference

```dart
// inspection_row.dart
if (widget.inspection.failed ?? false)
  Container(
    decoration: BoxDecoration(color: ContiplusColors.continentalLightRed, borderRadius: BorderRadius.circular(20)),
    child: SemanticsLabel(label: 'syncFailed_${widget.index}', child: Text(AppLocalizations.of(context)!.syncFailed)),
  )
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_sync_failure_badge @regression @both
Scenario: Display sync failed badge on upload error
  Given an inspection encounters a photo sync failure
  When the user views the Inspections list
  Then the inspection row should display a "Sync Failed" badge
```

---

## 🔗 Related

- [TC-INSPECTIONS-031 — Sync pending inspections on reconnect](./tc-inspections-031-sync-pending-inspections-on-reconnect.md)
- [Suite index](./index.md)
