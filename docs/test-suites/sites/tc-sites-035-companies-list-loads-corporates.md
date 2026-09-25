# TC-SITES-035 — Companies List — loads Customer and Distributor Corporates with search, filter, and FAB

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-035 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `companies_list_load_corporates` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/companies-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that `CompaniesScreen` loads Customer Corporates and Distributor Corporates using `state.customerOrDistributorCorporate`, displays corporate cards with associated site count pills, search bar, filter button, and add FAB when permitted.

---

## ✅ Preconditions

- User has `AdminModule.corporateManagement` (`CORPORATE-MANAGEMENT`) with `Permission.view`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to Companies screen via bottom nav "Corporates" tab or sidebar menu | `CompaniesScreen` loads; title displays "Companies" (`companyAppbarTitle`) |
| 2 | Observe Corporate list | `state.customerOrDistributorCorporate` items render via `corporateListItem_$index` |
| 3 | Check each corporate item | Displays name (`corporateName_$index`), country, and site count pill (`siteCount_$index`) |
| 4 | Type a query in search bar | `CompanyListSearchEvent` fires; filters list in real-time |
| 5 | Tap filter button (`filterIcon`) | `CompanyFiltersModal` opens |
| 6 | Check Floating Action Button (`floatingActionButtonAddCompany`) | FAB is visible if user has `Permission.add` |

---

## 🏁 Expected Results

- Companies screen lists all Customer and Distributor Corporates with correct metadata and actions

---

## 🔍 Flutter Source Reference

```dart
// companies_list_screen.dart
BlocBuilder<CompanyListBloc, CompanyListState>(
  builder: (context, state) {
    final companies = state.customerOrDistributorCorporate;
    return ListView.builder(
      itemCount: companies.length,
      itemBuilder: (context, index) {
        return CompanyRow(
          key: Key('corporateListItem_$index'),
          company: companies[index],
          siteCount: companies[index].siteCount,
          onTap: () => _openCompanyResume(companies[index]),
        );
      },
    );
  },
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:companies_list_load_corporates @regression @both
Scenario: Companies list loads corporates
  Given the user has corporate management view permission
  When the user navigates to the Companies screen
  Then the list of customer and distributor corporates should be displayed
  And each corporate item should display its name, country, and site count
```

---

## 🔗 Related

- [TC-SITES-007 — Bottom Nav Corporates tab navigation](./tc-sites-007-bottom-nav-corporates-tab-navigation.md)
- [TC-SITES-019 — Tap Corporate row opens Corporate Resume](./tc-sites-019-tap-corporate-row-opens-corporate-resume.md)
- [Suite index](./index.md)
