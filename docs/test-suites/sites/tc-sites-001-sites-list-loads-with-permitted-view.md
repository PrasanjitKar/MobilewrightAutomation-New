# TC-SITES-001 — Sites list loads with managed customer sites for permitted user

> Suite: [Sites](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-001 |
| **Suite** | sites |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `sites_list_loads` |
| **Feature File** | `features/smoke/sites.feature` |
| **Page Objects** | `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that a user with view permission for `BasicModule.customerSiteMap` can open the Sites list from the Home "Sites" card and sees their managed customer sites with the last-updated/count widget.

---

## ✅ Preconditions

- User is logged in with `BasicModule.customerSiteMap` / `Permission.view`
- At least one customer site exists for the account

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From Home screen, tap the "Sites" card (`siteCard`) | Sites list screen (or inline tablet list) is displayed |
| 2 | Observe the list | One `siteListItem_$index` row per customer site (`CompanyType.site`) is rendered |
| 3 | Observe the footer widget | `LastUpdatedTimeAndTotalCountWidget` shows the correct total count and a last-updated timestamp |
| 4 | Observe app state | No `noResultsFound` placeholder is shown |

---

## 🏁 Expected Results

- List renders with a row per site from `CompanyListState.customerSite`
- Total count matches the number of customer sites rendered
- No offline banner is shown when online

---

## 🔍 Flutter Source Reference

```dart
// site_list_screen.dart — loadScreen()
final bool canView = context.read<UserInfoCubit>().state.user!.canAccess(
  BasicModule.customerSiteMap,
  Permission.view,
);
if (!canView) {
  return Container();
}
return BlocBuilder<CompanyListBloc, CompanyListState>(
  builder: (context, state) {
    final List<CompanyModel> listItems = state.customerSite;
    ...
    LastUpdatedTimeAndTotalCountWidget(
      listLength: listItems.length,
      lastUpdatedTime: state.lastUpdatedTime,
      module: 'Site',
    ),
  },
);
```

**Semantic labels / locators:**
- `siteCard` — Home card for Sites
- `siteListItem_$index` — each site list row
- `siteName_$index` — site name text
- `companyType_$index` — company type label

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:sites_list_loads @smoke @both
Scenario: Sites list loads with managed customer sites
  Given the user is logged in
  When the user taps the sites card on the home screen
  Then the sites list should be displayed
  And the site count widget should match "td.ExpectedSiteCount"
```

---

## 🔗 Related

- [TC-SITES-002 — Add Customer Site happy path](./tc-sites-002-add-customer-site-happy-path.md)
- [Suite index](./index.md)
