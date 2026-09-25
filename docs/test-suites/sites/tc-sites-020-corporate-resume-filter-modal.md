# TC-SITES-020 — Corporate Résumé filter modal (sort, territory multi-select)

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-020 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `corporate_resume_filters` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/company-resume.page.ts`, `src/pages/site-filters.modal.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the filter button on `CompanyResumeScreen` in Corporate mode opens `SiteFiltersModal`, allowing the user to filter child sites/shops by Sort By (Last Modified, A-Z, Z-A) and Territory multi-select.

---

## ✅ Preconditions

- User is on `CompanyResumeScreen` for a corporate with child sites across multiple territories

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the filter icon (`filterButtonForSite`) | `SiteFiltersModal` opens in bottom sheet |
| 2 | Select sort option "A-Z" (`aToZ`) | Sort radio button updates |
| 3 | Tap "Territory" multi-select and choose a territory | Territory is selected |
| 4 | Observe live count preview | Modal displays calculated matching child sites count |
| 5 | Tap "Save" button | Filters are applied via `CompanyResumeFilterEvent`; child sub-list updates |
| 6 | Tap "Clear Filters" | Sort resets to Last Modified and territories clear |

---

## 🏁 Expected Results

- `SiteFiltersModal` accurately filters child sites by territory and sort order
- Discarding or saving updates the view as expected

---

## 🔍 Flutter Source Reference

```dart
// site_filters_modal.dart
void _applyFilters() {
  final CompanyTypeModel? companyTypeModel = companyDataState.getCompanyTypeModel(
    widget.company?.companyTypeId ?? '',
  );
  context.read<CompanyListBloc>().add(
    CompanyResumeFilterEvent(
      companyTypeModel?.type ?? CompanyType.none,
      CompanyResumeFilter(territoryIds: _territoryIds, sortBy: _sortBy),
    ),
  );
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:corporate_resume_filters @regression @both
Scenario: Filter child sites in corporate resume
  Given the user is on the corporate resume screen
  When the user taps the filter icon
  And the user selects territory "td.TerritoryName"
  And the user taps save filter
  Then the child sites sub list should only display sites in "td.TerritoryName"
```

---

## 🔗 Related

- [TC-SITES-019 — Tap corporate row opens corporate résumé](./tc-sites-019-tap-corporate-row-opens-corporate-resume.md)
- [Suite index](./index.md)
