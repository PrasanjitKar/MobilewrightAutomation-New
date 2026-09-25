# TC-SITES-011 — Pull-to-refresh reloads site list and updates last sync timestamp

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-011 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `sites_pull_to_refresh` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that pulling down on the Sites list triggers `RefreshIndicator`, dispatching `CompanyListLoadEvent()` to re-fetch companies from the backend, update the local cache, and refresh the sync timestamp in the footer widget.

---

## ✅ Preconditions

- User is on `SiteListScreen` with an active network connection

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Note the current sync time in the footer widget | Timestamp is recorded |
| 2 | Perform a pull-down gesture on the list | `RefreshIndicator` spinner appears |
| 3 | Wait for data fetch to complete | `LinearProgressIndicator` completes; `CompanyListBloc` emits updated state |
| 4 | Observe the footer widget | Last sync timestamp is updated to the current time |

---

## 🏁 Expected Results

- Pull-to-refresh executes `CompanyListLoadEvent()`
- List rows refresh and footer sync time updates

---

## 🔍 Flutter Source Reference

```dart
// site_list_screen.dart — buildList()
return RefreshIndicator(
  onRefresh: () async {
    companyBloc.add(const CompanyListLoadEvent());
  },
  child: ListView.builder(...),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:sites_pull_to_refresh @regression @both
Scenario: Pull to refresh reloads site list
  Given the user is on the sites list screen
  When the user performs a pull to refresh gesture
  Then the sites list should refresh
  And the last updated timestamp should be updated
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
