# TC-BELT-SCANS-010 — Empty State — display no results found message

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-010 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_empty_state` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when search criteria or applied filters match 0 belt scan records, the screen displays a centered "No Results Found" (`AppLocalizations.of(context)!.noResultsFound`) label and hides the bottom counter widget.

---

## ✅ Preconditions

- User is on `BeltScanListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Search and enter a non-existent string (e.g. `XYZ99999`) | Search executes |
| 2 | Observe body area | Centered text "No Results Found" is displayed |
| 3 | Check bottom counter widget | Bottom `LastUpdatedTimeAndTotalCountWidget` is omitted |
| 4 | Clear search | Normal list and bottom counter reappear |

---

## 🏁 Expected Results

- Empty state is displayed cleanly without UI distortions

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
if (listItems.isEmpty)
  Center(child: Text(AppLocalizations.of(context)!.noResultsFound))
else
  LastUpdatedTimeAndTotalCountWidget(...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_empty_state @regression @both
Scenario: Display empty state when no belt scans match query
  Given the user is on the Belt Scans list screen
  When the user searches for a non-existent query "XYZ99999"
  Then the "No Results Found" message should be centered on the screen
  And the bottom counter widget should be hidden
```

---

## 🔗 Related

- [TC-BELT-SCANS-008 — Search by site name](./tc-belt-scans-008-search-by-site-name.md)
- [Suite index](./index.md)
