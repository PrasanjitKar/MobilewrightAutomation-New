# TC-SITES-009 — Empty state displays "No results found" when site list is empty

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-009 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `sites_empty_state` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a user has no customer sites assigned or a search filter returns 0 matches, `SiteListScreen` displays the empty state placeholder with label `noResultsFound` ("No results found").

---

## ✅ Preconditions

- User is logged in with an account that has 0 assigned customer sites, or applies a search string matching no sites

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to `SiteListScreen` | Screen loads with empty `listItems` (`customerSite.isEmpty`) |
| 2 | Observe the center area | Placeholder with semantics label `noResultsFound` is displayed |
| 3 | Verify text | Displays `AppLocalizations.noResultsFound` ("No results found") |
| 4 | Verify footer | `LastUpdatedTimeAndTotalCountWidget` is hidden when list is empty |

---

## 🏁 Expected Results

- Center placeholder `noResultsFound` is visible
- Footer count widget is suppressed when `listItems.isEmpty` is true

---

## 🔍 Flutter Source Reference

```dart
// site_list_screen.dart — loadScreen()
if (listItems.isEmpty)
  Center(
    child: SemanticsLabel(
      label: 'noResultsFound',
      child: Text(AppLocalizations.of(context)!.noResultsFound),
    ),
  )
else
  LastUpdatedTimeAndTotalCountWidget(
    listLength: listItems.length,
    lastUpdatedTime: state.lastUpdatedTime,
    module: 'Site',
  ),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:sites_empty_state @regression @both
Scenario: Sites list empty state
  Given the user is logged in with an empty site account
  When the user opens the sites list screen
  Then the message "No results found" should be displayed
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
