# TC-SITES-012 — Search input filters site list by site name

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-012 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `sites_search_filter` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-list.page.ts`, `src/pages/search.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that entering text in the search bar dispatches `CompanyListSearchEvent(searchText: query)`, dynamically filtering the customer sites list to only rows whose name contains the search string.

---

## ✅ Preconditions

- User is logged in with multiple customer sites in the account

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From the app bar, tap the search icon (`searchIcon`) | `SearchPage` opens with `SearchTab.site` (placeholder: "Search") |
| 2 | Enter a search term (e.g. "Mining") in `searchBarField` | `onChanged` triggers search |
| 3 | Observe the filtered list | Only customer sites containing "Mining" in their name are displayed |
| 4 | Tap the search clear/back button (`searchBackButton`) | Search query is cleared; `CompanyListSearchEvent(searchText: '')` resets the list |

---

## 🏁 Expected Results

- Search performs case-insensitive substring matching on `company.name`
- Clearing search restores the full list of customer sites

---

## 🔍 Flutter Source Reference

```dart
// site_list_screen.dart
@override
void didUpdateWidget(covariant SiteListScreen oldWidget) {
  super.didUpdateWidget(oldWidget);
  context.read<CompanyListBloc>().add(CompanyListSearchEvent(searchText: widget.search ?? ''));
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:sites_search_filter @regression @both
Scenario: Search filters sites by name
  Given the user is on the sites list screen
  When the user searches for site "td.SearchTerm"
  Then only sites matching "td.SearchTerm" should be displayed
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
