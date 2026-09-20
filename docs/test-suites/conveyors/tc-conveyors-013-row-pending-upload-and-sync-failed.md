# TC-CONVEYORS-013 — Pending-upload button triggers sync; sync-failed banner shown on failure

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-013 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_row_upload_and_sync_failed` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the pending-upload button on a row triggers a manual sync retry, and that a failed sync shows the sync-failed banner.

---

## ✅ Preconditions

- User has add/edit permission for conveyors
- A conveyor exists with `isPending == true` (created/edited offline, not yet synced)
- A separate conveyor exists with `isSyncFailed == true` for the negative path

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a row where `conveyor.isPending == true` | `uploadButtonConveyor_$index` button is visible |
| 2 | Tap the upload button | `ConveyorSyncInitiateEvent(conveyor: conveyor)` is dispatched |
| 3 | Wait for sync to complete successfully | Upload button disappears; row reflects synced state |
| 4 | Locate a row where `conveyor.isSyncFailed == true` | `syncFailedBanner_$index` is shown (visual-only, no tap action) |

---

## 🏁 Expected Results

- Upload button is shown only while pending, and disappears once synced
- Sync-failed banner is purely informational — it does not itself retry sync (retry is via the upload button, or automatic on next successful load)

---

## 🔍 Flutter Source Reference

```dart
// conveyor_row.dart — upload button
// Upload button shown when conveyor.isPending ?? false
// triggers: ConveyorSyncInitiateEvent(conveyor: conveyor)

// Sync failed banner shown when conveyor.isSyncFailed ?? false (visual only)
```

**Semantic labels:** `uploadButtonConveyor_$index`, `syncFailedBanner_$index`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_row_upload_and_sync_failed @regression @both
Scenario: Pending conveyor upload button retries sync
  Given a pending (unsynced) conveyor "td.ConveyorName" exists
  When the user taps the upload button on that conveyor's row
  Then the conveyor should be synced and the upload button should disappear
```

---

## 🔗 Related

- [TC-CONVEYORS-032 — Save offline pending sync](./tc-conveyors-032-save-offline-pending-sync.md)
- [Suite index](./index.md)
