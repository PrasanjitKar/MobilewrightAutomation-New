# TC-DASHBOARD-022 — Sync loading indicator is suppressed while a sync is already in progress

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-022 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_sync_loading_indicator` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that tapping the sync icon while `SummaryState.status == SummaryStatus.loading` does not open a second confirmation dialog (guard clause `if (summaryState.status != SummaryStatus.loading)`), preventing overlapping/duplicate sync requests.

---

## ✅ Preconditions

- User is logged in
- A sync/refresh is currently in progress (e.g., triggered via pull-to-refresh or a prior sync confirmation)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Trigger a sync (pull-to-refresh or sync icon + OK) so `SummaryStatus.loading` is active | `LinearProgressIndicator` is visible on Home |
| 2 | While loading is in progress, tap `syncIcon` again | No confirmation dialog appears (guard clause short-circuits) |
| 3 | Wait for the sync to complete (`SummaryStatus` transitions to `success`/`offline`) | `LinearProgressIndicator` disappears; sync icon tap now opens the confirmation dialog normally |

---

## 🏁 Expected Results

- No duplicate/overlapping sync dialogs or requests can be triggered while a sync is already running
- Loading indicator accurately reflects `SummaryStatus.loading` state transitions

---

## 🔍 Flutter Source Reference

```dart
// conti_app_bar.dart — sync icon guard clause
onPressed: () {
  if (summaryState.status != SummaryStatus.loading) {
    showDialog<dynamic>(...);
  }
  // else: no-op, dialog suppressed while already syncing
},

// summary_state.dart — SummaryStatus enum
enum SummaryStatus { initial, loading, offline, success }
```

**Semantic labels / locators:**
- `syncIcon` — tap target
- No dedicated locator for the loading indicator; assert via `LinearProgressIndicator` widget presence/absence

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_sync_loading_indicator @regression @both
Scenario: Sync icon does nothing while a sync is already in progress
  Given the user is logged in
  And the home screen finishes loading
  And a sync is currently in progress
  When the user taps the sync icon
  Then no sync confirmation dialog should appear
```

---

## 🔗 Related

- [TC-DASHBOARD-021 — Sync icon confirmation dialog](./tc-dashboard-021-sync-icon-confirmation-dialog.md)
- [Suite index](./index.md)
