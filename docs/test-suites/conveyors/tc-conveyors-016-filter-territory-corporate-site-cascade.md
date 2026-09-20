# TC-CONVEYORS-016 — Filter Territory → Customer Corporate → Site cascading reset

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-016 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_filter_cascade_reset` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-filters.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify selecting a Territory clears Customer Corporate and Site; selecting Customer Corporate clears Site; and each level correctly filters the conveyor list via the associated company/site data.

---

## ✅ Preconditions

- User has view permission for conveyors
- Company/territory reference data (`MarketCubit`) is loaded
- Conveyors span at least 2 territories, 2 customer corporates, and 2 sites

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open filters; note Territory dropdown (`territoryDropdown`) is disabled until markets load | Once `MarketCubit.state.markets` is non-empty, dropdown becomes enabled |
| 2 | Select a Customer Corporate and a Site first | Values selected |
| 3 | Select a Territory | Customer Corporate and Site selections are cleared automatically |
| 4 | Re-select a Customer Corporate | Site selection is cleared automatically |
| 5 | Apply filters at each level | List filters to conveyors whose company detail matches the selected territory/corporate/site (via `CompanyDataCubit.getCompanyDetail`) |

---

## 🏁 Expected Results

- Territory selection clears Customer Corporate + Site (dependency cascade)
- Customer Corporate selection clears Site
- Filtering correctly resolves each conveyor's `customerId` to a `CompanyModel` to compare `territoryId`/`customerCorporateId`, or directly compares `customerId` for Site filtering

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_bloc.dart — filter()
if (filters.territoryIds.isNotEmpty) {
  result = result.where((element) {
    final CompanyModel? companyDetails = companyDataCubit.state.getCompanyDetail(companyId: element.customerId);
    return filters.territoryIds.contains(companyDetails?.territoryId);
  }).toList();
}
if (filters.customerCorporateIds.isNotEmpty) {
  result = result.where((element) {
    final CompanyModel? companyDetails = companyDataCubit.state.getCompanyDetail(companyId: element.customerId);
    return filters.customerCorporateIds.contains(companyDetails?.customerCorporateId);
  }).toList();
}
if (filters.siteIds.isNotEmpty) {
  result = result.where((element) => filters.siteIds.contains(element.customerId)).toList();
}
```

**Semantic labels:** `territoryDropdown`/`territoryDropdownForTab`, `customerCorporateDropdown`/`customerCorporateDropdownForTab`, `siteDropdown`/`siteDropdownForTab`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_filter_cascade_reset @regression @both
Scenario: Territory selection resets Customer Corporate and Site filters
  Given the user has selected a Customer Corporate and a Site in the conveyors filter modal
  When the user selects a Territory
  Then the Customer Corporate and Site selections should be cleared
```

---

## 🔗 Related

- [TC-CONVEYORS-015 — Filter by criticality](./tc-conveyors-015-filter-by-criticality.md)
- [Suite index](./index.md)
