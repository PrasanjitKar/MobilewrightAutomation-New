# TC-BELT-SCANS-012 — Sync Action — manual sync with confirmation dialog

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-012 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_manual_sync` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the Sync icon in the AppBar opens a sync confirmation dialog (`AlertDialog`), and confirming with "OK" dispatches `BeltScanListLoadEvent(hardRefresh: true)` to perform a hard data refresh from the server.

---

## ✅ Preconditions

- User is on `BeltScanListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the Sync icon in the AppBar | `AlertDialog` appears with text "Are you sure you want to sync?" (`syncConfirmation`) |
| 2 | Tap "Cancel" button | Dialog dismisses without initiating sync |
| 3 | Tap Sync icon again and tap "OK" button | Dialog dismisses; `BeltScanListLoadEvent(hardRefresh: true)` fires |
| 4 | Observe sync execution | Top `LinearProgressIndicator` shows loading progress; sync timestamp updates |

---

## 🏁 Expected Results

- Manual sync is confirmed via dialog and executes a hard data fetch from backend

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
AlertDialog(
  content: Text(AppLocalizations.of(context)!.syncConfirmation),
  actions: [
    TextButton(child: Text(AppLocalizations.of(context)!.ok), onPressed: () {
      beltScanListBloc.add(const BeltScanListLoadEvent(hardRefresh: true));
    }),
    TextButton(child: Text(AppLocalizations.of(context)!.cancel), onPressed: () => Navigator.pop(context)),
  ],
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_manual_sync @regression @both
Scenario: Trigger manual sync from AppBar with confirmation
  Given the user is on the Belt Scans list screen
  When the user taps the sync button in the AppBar
  Then a sync confirmation dialog should be displayed
  When the user confirms the sync dialog
  Then a hard refresh should be executed and sync timestamp should update
```

---

## 🔗 Related

- [TC-BELT-SCANS-013 — Last updated sync time widget](./tc-belt-scans-013-last-updated-sync-time-widget.md)
- [Suite index](./index.md)
