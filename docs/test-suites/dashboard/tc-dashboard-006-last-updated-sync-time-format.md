# TC-DASHBOARD-006 — Last-updated sync time is displayed in `dd MMM yyyy hh:mm a` format

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-006 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_last_updated` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Home screen shows the last synced timestamp in the expected format and that it is hidden until the app has an actual last-update value.

---

## ✅ Preconditions

- User is logged in
- This is not the very first app launch (i.e., `SummaryState.lastUpdate` has been previously set to a non-zero value)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Load the Home screen after the summary has finished loading at least once | `lastUpdatedTimeHomeScreen` element is visible |
| 2 | Read its displayed text | Matches format `dd MMM yyyy hh:mm a` (e.g. `20 Sep 2026 04:19 PM`), with two trailing spaces per the widget's string concatenation |
| 3 | Perform a manual sync (see TC-DASHBOARD-021) and wait for it to complete | The displayed timestamp updates to reflect the new sync time |
| 4 | (First-launch scenario, if reproducible) Inspect the Home screen before any successful sync | `lastUpdatedTimeHomeScreen` is **not** rendered, since `state.lastUpdate` is `null`/`0` |

---

## 🏁 Expected Results

- Timestamp format is exactly `dd MMM yyyy hh:mm a`
- Element is conditionally rendered only when `state.lastUpdate != null && state.lastUpdate != 0`
- Timestamp updates after a successful sync/refresh

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — build()
if (state.lastUpdate != null && state.lastUpdate != 0)
  SemanticsLabel(
    label: 'lastUpdatedTimeHomeScreen',
    child: LastUpdatedTimeAndTotalCountWidget(
      lastUpdatedTime: state.lastUpdate!,
      module: 'Home',
    ),
  ),

// last_updated_time_and_total_count_widget.dart
const dateFormat = 'dd MMM yyyy hh:mm a';
final dateTime = '${DateFormat(dateFormat).format(DateTime.fromMillisecondsSinceEpoch(lastUpdatedTime))}${'  '}';
...
if (lastUpdatedTime != 0) ...[
  SvgPicture.asset(ContiPlusIcon.sync_20x20),
  SemanticsLabel(label: 'lastUpdatedTime$module', child: Text(dateTime, ...)),
  // note: no total-count text is rendered for module == 'Home' since `listLength` is never passed
],
```

**Semantic labels / locators:**
- `lastUpdatedTimeHomeScreen` — wraps the entire widget instance on Home
- Internally, the widget's own label would be `lastUpdatedTimeHome` (from `module: 'Home'`), nested inside the outer wrapper

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/testdata.csv @Key:dashboard_last_updated @regression @both
Scenario: Last updated time is displayed in the correct format
  Given the user is logged in
  And the home screen finishes loading
  Then the last updated time should be displayed on the home screen
  And the last updated time should match the format "dd MMM yyyy hh:mm a"
```

---

## 🔗 Related

- [TC-DASHBOARD-021 — Sync icon confirmation dialog](./tc-dashboard-021-sync-icon-confirmation-dialog.md)
- [Suite index](./index.md)
