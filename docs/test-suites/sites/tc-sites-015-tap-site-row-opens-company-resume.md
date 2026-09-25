# TC-SITES-015 — Tapping site row opens Company Résumé with site header card and conveyors sub-list

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-015 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `company_resume_site_view` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-list.page.ts`, `src/pages/company-resume.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping any site row in `SiteListScreen` sets the conveyor list filter to that site ID with A-Z sort, pushes `CompanyResumeScreen(isCorporate: false)`, and displays the site header card alongside the site's conveyor sub-list.

---

## ✅ Preconditions

- User has customer sites with tracked conveyors

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `SiteListScreen`, tap a site row | `ConveyorListBloc` applies filter `siteIds: [site.companyId]`; navigates to `CompanyResumeScreen` |
| 2 | Observe app bar | `appbarTitleForCompanyResumeScreen` shows "View {siteName} - Sites" |
| 3 | Observe header card | `siteHeaderInfo` renders avatar, site name, `siteCityAndCountry`, market/territory chips, and total conveyor count (`conveyorCount`) |
| 4 | Observe sub-list | Conveyor rows `conveyorListItemFromCompanyResumeScreen_$index` are displayed for all conveyors at this site |
| 5 | Tap the back button (`companyResumeScreenArrowBack`) | Returns to `SiteListScreen` and reloads site data |

---

## 🏁 Expected Results

- Company Résumé screen loads seamlessly in Site mode
- Conveyor sub-list accurately displays only conveyors assigned to this site

---

## 🔍 Flutter Source Reference

```dart
// site_list_screen.dart — buildList()
onTap: () {
  context.read<ConveyorListBloc>().add(
    ConveyorListFilterEvent(
      filter: ConveyorFilters(
        siteIds: [list.elementAt(index).companyId ?? ''],
        sortBy: FilterSortBasedOn.aToZ,
      ),
    ),
  );
  Navigator.push(
    context,
    MaterialPageRoute<dynamic>(
      builder: (_) => CompanyResumeScreen(
        company: list.elementAt(index),
        isCorporate: false,
        isFreeUser: widget.isFreeUser,
      ),
    ),
  );
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:company_resume_site_view @regression @both
Scenario: Tapping site opens company resume with conveyor sub list
  Given the user is on the sites list screen
  When the user taps on site "td.SiteName"
  Then the company resume screen should be displayed with title "View <SiteName> - Sites"
  And the header card should show conveyor count "td.ExpectedCount"
  And the conveyor sub list should be rendered
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [TC-SITES-016 — Company Résumé search](./tc-sites-016-company-resume-search-filters-conveyors.md)
- [Suite index](./index.md)
