# TC-BELT-SCANS-013 — Sync Timestamp — last updated time and total count widget

> Suite: [Belt Scans](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-013 |
| **Suite** | belt-scans |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_sync_time_widget` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `LastUpdatedTimeAndTotalCountWidget` at the bottom of the list renders the total number of records currently loaded and formats the last sync time according to user locale.

---

## ✅ Preconditions

- Belt scan list loaded with records

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `BeltScanListScreen`, scroll to the bottom | `LastUpdatedTimeAndTotalCountWidget` is visible |
| 2 | Verify count label | Displays e.g. "Total Belt Scans: 12" matching `listItems.length` |
| 3 | Verify sync time | Displays e.g. "Last synced: Today at 10:45 AM" |
| 4 | Trigger manual sync | Sync timestamp updates to current time |

---

## 🏁 Expected Results

- Bottom widget accurately reports list count and synchronization metadata

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
LastUpdatedTimeAndTotalCountWidget(
  listLength: listItems.length,
  lastUpdatedTime: state.lastUpdatedTime,
  module: 'BeltScan',
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_sync_time_widget @regression @both
Scenario: Verify last updated time and total count widget
  Given the user is on the Belt Scans list screen
  Then the bottom widget should display total item count
  And the last synchronized timestamp should be displayed
```

---

## 🔗 Related

- [TC-BELT-SCANS-001 — List loads](./tc-belt-scans-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
