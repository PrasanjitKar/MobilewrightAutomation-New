# TC-INSPECTIONS-008 — Empty State — displays "No results found" when inspection list is empty

> Suite: [Inspections](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-008 |
| **Suite** | inspections |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_empty_state` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when no inspections match the current filters or the account has zero inspections, `InspectionListScreen` renders the empty state label "No results found" (`noResultsFound`).

---

## ✅ Preconditions

- Account with zero inspections or active search query matching no records

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to `InspectionListScreen` | Screen loads |
| 2 | Enter a non-matching search string (e.g. "XYZNonExistent999") | List items filter to empty |
| 3 | Observe center of screen | `SemanticsLabel(label: 'noResultsFound')` displays localized "No results found" text |
| 4 | Verify footer counter widget | `LastUpdatedTimeAndTotalCountWidget` is hidden when list is empty |

---

## 🏁 Expected Results

- Clean empty state text is rendered when zero inspection records exist

---

## 🔍 Flutter Source Reference

```dart
// inspection_list_screen.dart
if (listItems.isEmpty)
  Center(
    child: SemanticsLabel(
      label: 'noResultsFound',
      child: Text(AppLocalizations.of(context)!.noResultsFound, style: ContiplusStyle.regularFont14pxR),
    ),
  )
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_empty_state @regression @both
Scenario: Display empty state for non-matching search
  Given the user is on the Inspections screen
  When the user searches for "XYZNonExistent999"
  Then the message "No results found" should be displayed
```

---

## 🔗 Related

- [TC-INSPECTIONS-011 — Search filters inspections](./tc-inspections-011-search-filters-inspections-by-name.md)
- [Suite index](./index.md)
