# TC-DASHBOARD-020 — Pull-to-refresh triggers a summary refresh on Home

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-020 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_pull_to_refresh` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that pulling down on the Home screen triggers `RefreshIndicator.onRefresh`, dispatching `SummaryRefreshModulesEvent(refreshSource: PullToRefresh())`, and that the loading indicator appears while refreshing.

---

## ✅ Preconditions

- User is logged in and Home screen has finished its initial load

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Perform a pull-down (swipe down) gesture at the top of the Home screen | The Material `RefreshIndicator` spinner appears |
| 2 | Observe the summary state during refresh | `state.newStatus == SummaryStatus.loading` is true and a `LinearProgressIndicator` renders above the card grid/strip |
| 3 | Wait for refresh completion | Spinner and linear indicator disappear; card counts and last-updated timestamp reflect the latest data |

---

## 🏁 Expected Results

- `SummaryRefreshModulesEvent(refreshSource: PullToRefresh())` is dispatched exactly once per pull gesture
- Loading indicator is visible only while `SummaryStatus.loading`
- Card data refreshes without requiring app restart or manual sync

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — build()
return RefreshIndicator(
  onRefresh: () async {
    context.read<SummaryBloc>().add(
      const SummaryRefreshModulesEvent(refreshSource: PullToRefresh()),
    );
  },
  child: SafeArea(
    child: Column(
      children: [
        if (state.newStatus == SummaryStatus.loading) const LinearProgressIndicator(),
        ...
      ],
    ),
  ),
);
```

**Semantic labels / locators:**
- No dedicated semantic label for the `RefreshIndicator` — automation should use Playwright/MobileWright gesture APIs (drag/swipe) and assert on the `LinearProgressIndicator`'s transient visibility or on updated card counts/timestamp as the completion signal

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_pull_to_refresh @regression @both
Scenario: Pull-to-refresh updates the home screen summary
  Given the user is logged in
  And the home screen finishes loading
  When the user pulls down to refresh the home screen
  Then a loading indicator should appear briefly
  And the last updated time should reflect the new sync
```

---

## 🔗 Related

- [TC-DASHBOARD-006 — Last-updated sync time format](./tc-dashboard-006-last-updated-sync-time-format.md)
- [TC-DASHBOARD-021 — Sync icon confirmation dialog](./tc-dashboard-021-sync-icon-confirmation-dialog.md)
- [Suite index](./index.md)
