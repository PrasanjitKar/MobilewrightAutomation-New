# TC-CONVEYORS-015 — Filter by Critical (Yes/No)

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-015 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_filter_criticality` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-filters.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify filtering by the Critical dropdown (`criticalDropdown`) correctly shows only conveyors matching the selected criticality flag, and that selecting it clears Territory/Customer Corporate/Site selections.

---

## ✅ Preconditions

- User has view permission for conveyors
- At least one conveyor is flagged critical (`criticality == true`) and one is not

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filters, select Territory/Site values first | Values selected |
| 2 | Select "Yes" in the Critical dropdown, tap Apply | List shows only conveyors with `criticality == true`; Territory/Customer Corporate/Site selections are cleared |
| 3 | Reopen filters, select "No", tap Apply | List shows only non-critical conveyors |

---

## 🏁 Expected Results

- Filter maps `criticality: ['1']` → critical only, `['0']` → non-critical only
- Selecting criticality clears territory/customer-corporate/site per the modal's cascading-reset rule

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_bloc.dart — filter()
if (filters.criticality.isNotEmpty) {
  result = result.where((e) {
    final criticalityId = (!(e.criticality ?? false)) ? '0' : '1';
    return filters.criticality.contains(criticalityId);
  }).toList();
}
```

**Semantic label:** `criticalDropdown` — options `yes` (`id: '1'`), `no` (`id: '0'`)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_filter_criticality @regression @both
Scenario: Filter conveyors by critical flag
  Given the user opens the conveyors filter modal
  When the user selects "Yes" in the Critical filter and applies
  Then only critical conveyors should be displayed in the list
```

---

## 🔗 Related

- [TC-CONVEYORS-016 — Territory/Corporate/Site cascade](./tc-conveyors-016-filter-territory-corporate-site-cascade.md)
- [Suite index](./index.md)
