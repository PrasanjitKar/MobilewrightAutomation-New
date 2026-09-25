# TC-BELT-SCANS-008 — Search — search belt scans by site name

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-008 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_search_by_site` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the Search icon displays the search text field, and entering a keyword filters scan records in real-time by matching against `site.name` (case-insensitive).

---

## ✅ Preconditions

- Multiple belt scan records across different sites exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `BeltScanListScreen`, tap Search icon | Search field slides into view with autofocus |
| 2 | Enter keyword (e.g. `Mining`) into search field | `BeltScanListSearchEvent` fires on each keystroke |
| 3 | Observe filtered list | Only scan rows whose `site.name` contains `Mining` are shown |
| 4 | Change search keyword to a non-matching string | List updates and displays "No Results Found" |

---

## 🏁 Expected Results

- Search filters the list instantaneously in memory based on site name matches

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_bloc.dart
List<BeltScanModel> search(List<BeltScanModel> list) {
  if (state.search.isEmpty) return list;
  return list.where((element) => (element.site?.name ?? '').toLowerCase().contains(state.search.toLowerCase())).toList();
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_search_by_site @regression @both
Scenario: Search belt scans by site name
  Given the user is on the Belt Scans list screen
  When the user taps the search icon and enters a site name keyword
  Then only belt scans belonging to matching sites should be displayed
```

---

## 🔗 Related

- [TC-BELT-SCANS-009 — Search clear and dismiss](./tc-belt-scans-009-search-clear-and-dismiss.md)
- [Suite index](./index.md)
