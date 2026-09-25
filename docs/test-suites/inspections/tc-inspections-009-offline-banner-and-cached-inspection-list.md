# TC-INSPECTIONS-009 — Offline Mode — displays "Working offline" and serves cached records

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-009 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_offline_mode` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when the device loses network connectivity, `InspectionListScreen` renders the "Working offline" status banner (`offlineTextForInspection`), emits `ListStatus.offline`, and continues to display cached inspections from Hive.

---

## ✅ Preconditions

- Device has cached inspections in Hive
- Device is disconnected from Wi-Fi / Cellular (Airplane Mode)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enable Airplane Mode on device | Device is offline (`connectivityHelper.isOnline == false`) |
| 2 | Navigate to `InspectionListScreen` | Screen loads from local Hive cache |
| 3 | Observe top banner | `SemanticsLabel(label: 'offlineTextForInspection')` renders "Working offline" text |
| 4 | Verify list items | Previously cached inspection items remain fully browsable |
| 5 | Tap an inspection item | Opens `InspectionViewScreen` with locally cached findings |

---

## 🏁 Expected Results

- Offline banner is shown clearly
- Cached inspection records are available for offline reading and evaluation

---

## 🔍 Flutter Source Reference

```dart
// inspection_list_screen.dart
if (state.status.isOffline)
  SemanticsLabel(
    label: 'offlineTextForInspection',
    child: Text(
      AppLocalizations.of(context)!.workingOffline,
      style: ContiplusStyle.regularFont14pxR,
    ),
  ),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_offline_mode @regression @both
Scenario: Browse cached inspections offline
  Given the device is offline with cached inspection records
  When the user opens the Inspections screen
  Then the "Working offline" banner should be displayed
  And cached inspection items should remain visible and accessible
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [TC-INSPECTIONS-030 — Offline save pending badge](./tc-inspections-030-save-inspection-offline-pending-badge.md)
- [Suite index](./index.md)
