# TC-BELT-SCANS-033 — Offline Mode — working banner and local cache hydration

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-033 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_offline_mode` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when the device is offline (`!connectivityHelper.isOnline`), `BeltScanListBloc` hydrates belt scan records from Hive cache, sets state to `ListStatus.offline`, and displays the "Working Offline" (`AppLocalizations.of(context)!.workingOffline`) text banner.

---

## ✅ Preconditions

- Device network connection is disabled (Airplane mode ON)
- Cached belt scan records exist in Hive storage

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enable Airplane mode on device | Device is offline |
| 2 | Navigate to `BeltScanListScreen` | Screen opens without crash |
| 3 | Observe screen status | Top text displays "Working Offline" |
| 4 | Inspect list content | Previously cached scan records are rendered with complete site and conveyor metadata |
| 5 | Search and filter cached records | In-memory search and filter function normally offline |

---

## 🏁 Expected Results

- App operates smoothly in offline mode using local cache and alerts the user

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart & belt_scan_list_bloc.dart
if (state.status.isOffline) Text(AppLocalizations.of(context)!.workingOffline)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_offline_mode @regression @both
Scenario: View cached belt scans in offline mode
  Given the device is in offline mode
  When the user navigates to the Belt Scans screen
  Then the "Working Offline" banner should be displayed
  And cached belt scan records should be visible
```

---

## 🔗 Related

- [TC-BELT-SCANS-001 — List loads](./tc-belt-scans-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
