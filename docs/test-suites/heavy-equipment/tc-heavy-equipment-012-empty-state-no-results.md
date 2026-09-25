# TC-HEAVY-EQUIPMENT-012 — Empty State — empty state on zero search results

> Suite: [Heavy Equipment](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-012 |
| **Suite** | heavy-equipment |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_empty_state` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when a search query yields no matching equipment, the "No results found" label is displayed in the center of the screen.

---

## ✅ Preconditions

- On `HeavyEquipmentListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open search and enter non-existent keyword `NONEXISTENT999` | Search executes |
| 2 | Observe list | Center displays `AppLocalizations.of(context)!.noResultsFound` ("No results found") |

---

## 🏁 Expected Results

- Zero search results gracefully present the standard empty state

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_list_screen.dart
if (listItems.isEmpty) Center(child: Text(AppLocalizations.of(context)!.noResultsFound))
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_empty_state @regression @both
Scenario: Verify empty state on zero search results in heavy equipment
  Given the user is on the Heavy Equipment list
  When the user enters a non-existent search term
  Then "No results found" message should be displayed
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-010 — Search](./tc-heavy-equipment-010-search-by-equipment-name.md)
- [Suite index](./index.md)
