# TC-INSPECTIONS-011 — Search — real-time query filters inspections by name

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-011 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_search_filter` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that typing into the search field dispatches `InspectionListSearchEvent`, filtering the inspection list in real-time by inspection name (case-insensitive substring match).

---

## ✅ Preconditions

- Multiple inspection records with distinct names exist (e.g. "Q1 Mining Line A", "Factory B Check")

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `InspectionListScreen`, tap the search bar | Search text field gains focus |
| 2 | Type partial keyword (e.g. "Mining") | `InspectionListSearchEvent(search: 'Mining')` is dispatched |
| 3 | Observe list items | Only inspections containing "Mining" in `inspection.name` are displayed |
| 4 | Clear search field | Full inspection list is restored |

---

## 🏁 Expected Results

- Instant case-insensitive filtering based on user input

---

## 🔍 Flutter Source Reference

```dart
// inspection_list_bloc.dart
List<InspectionModel> search(List<InspectionModel> inspections, String search) {
  return inspections
      .where((element) => (element.name ?? '').toLowerCase().contains(search.toLowerCase()))
      .toList();
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_search_filter @regression @both
Scenario: Search inspections by name
  Given the user is on the Inspections screen
  When the user enters search query "Mining"
  Then only inspections matching "Mining" should be displayed in the list
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
