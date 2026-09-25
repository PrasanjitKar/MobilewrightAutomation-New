# TC-BELT-SCANS-009 — Search Dismiss — search bar clear and close behavior

> Suite: [Belt Scans](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-009 |
| **Suite** | belt-scans |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_search_clear` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the close ("X") suffix icon in the search bar clears the search query, closes the search field, dispatches `BeltScanListSearchEvent(search: '')`, and restores the full list of belt scans.

---

## ✅ Preconditions

- Search bar is open with active text query

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Type a search query to filter scans | Filtered results display |
| 2 | Tap the suffix "X" icon inside the search input | Text field is cleared, search panel closes, and full list is restored |
| 3 | Verify list items | Full unfiltered scan records are displayed |

---

## 🏁 Expected Results

- Search query is reset cleanly and full list is restored

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
suffixIcon: IconButton(
  onPressed: () {
    setState(() {
      searching = false;
      _searchCtrl.text = '';
      onSearch();
    });
  },
  icon: const Icon(Icons.close),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_search_clear @regression @both
Scenario: Clear and close search bar on Belt Scans list
  Given an active search query is entered on Belt Scans list
  When the user taps the clear button on the search bar
  Then the search input should close and the full list should be restored
```

---

## 🔗 Related

- [TC-BELT-SCANS-008 — Search by site name](./tc-belt-scans-008-search-by-site-name.md)
- [Suite index](./index.md)
