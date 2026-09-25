# TC-HEAVY-EQUIPMENT-011 — Search Clear — search clear and keyboard dismiss

> Suite: [Heavy Equipment](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-011 |
| **Suite** | heavy-equipment |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_search_clear` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the "close" (X) icon in the search bar clears the search text, dismisses the search bar, and restores the complete equipment list.

---

## ✅ Preconditions

- Search query is active with filtered results

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On active search bar, tap the "close" (X) suffix icon | Search text clears, search bar dismisses, and keyboard hides |
| 2 | Observe list | Full unfiltered equipment list is restored |

---

## 🏁 Expected Results

- Search state resets cleanly back to normal view

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart
setState(() { searching = false; _searchCtrl.text = ''; onSearch(); });
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_search_clear @regression @both
Scenario: Clear search and restore heavy equipment list
  Given an active search filter is applied in Heavy Equipment
  When the user taps the search close icon
  Then the search bar should dismiss and the full list be restored
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-010 — Search](./tc-heavy-equipment-010-search-by-equipment-name.md)
- [Suite index](./index.md)
