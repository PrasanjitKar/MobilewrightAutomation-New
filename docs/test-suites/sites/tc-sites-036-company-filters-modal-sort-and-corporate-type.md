# TC-SITES-036 — Company Filters Modal — filter by Corporate Type, Country, and Sort

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-036 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `company_filters_modal` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/company-filters-modal.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that `CompanyFiltersModal` on `CompaniesScreen` allows filtering corporates by Corporate Type (Customer Corporate vs Distributor Corporate), Country, and Sort order (Ascending / Descending by name or site count), and dispatches `CompanyListFilterEvent`.

---

## ✅ Preconditions

- User is on `CompaniesScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap filter button (`filterIcon`) | `CompanyFiltersModal` bottom sheet opens |
| 2 | Select "Customer Corporate" checkbox under Type | Filter selection is toggled |
| 3 | Select Country from dropdown | Country filter is applied |
| 4 | Select Sort option (e.g., "Sort by Site Count Descending") | Sort criteria is selected |
| 5 | Tap "Apply" button (`applyFiltersButton`) | Modal closes; `CompanyListFilterEvent` is dispatched |
| 6 | Observe filtered Companies list | List contains only matching Customer Corporates sorted by site count |
| 7 | Reopen filter modal and tap "Reset" | All filters clear; list resets to full corporate dataset |

---

## 🏁 Expected Results

- Filtering criteria accurately restrict and order the corporate list

---

## 🔍 Flutter Source Reference

```dart
// company_filters_modal.dart
BlocProvider.of<CompanyListBloc>(context).add(
  CompanyListFilterEvent(
    sortType: selectedSort,
    companyTypes: selectedCompanyTypes,
    countries: selectedCountries,
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:company_filters_modal @regression @both
Scenario: Filter and sort corporates in company list
  Given the user is on the Companies screen
  When the user opens the company filters modal
  And the user filters by corporate type "Customer Corporate" and sorts descending
  And the user applies filters
  Then the list should display only customer corporates sorted accordingly
```

---

## 🔗 Related

- [TC-SITES-035 — Companies List loads corporates](./tc-sites-035-companies-list-loads-corporates.md)
- [Suite index](./index.md)
