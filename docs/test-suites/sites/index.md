# Sites — Test Suite

> Module: `sites` | Flutter source: `lib/src/ui/screens/companies/` + `lib/src/blocs/company/`
> Feature files: `features/regression/sites.feature` *(to create)*

---

## 📋 Overview

The **Sites** (and Companies) suite covers the customer sites, distributor shops, customer corporates, and distributor corporates hierarchy in Conti+. The "Sites" card on the Dashboard/Home screen (`HomeCard` with label `siteCard`, documented in `TC-DASHBOARD-007`) and the bottom navigation "Corporates" tab (`corporatesTab`) lead into this module.

This suite documents the complete site lifecycle and downstream flows:

1. **`SiteListScreen`** (`site_list_screen.dart`) — Searchable list of managed customer sites, gated by `BasicModule.customerSiteMap` + `Permission.view`.
2. **`CompaniesScreen`** (`companies_list_screen.dart`) — Searchable list of customer and distributor corporates, gated by `AdminModule.corporateManagement` + `Permission.view`.
3. **`CompanyRow`** (`widgets/company_row.dart`) — List row component displaying company avatar/image, name, company type, market/territory chip, conveyor/child count pill, and sync-failed banner.
4. **`CompanyResumeScreen`** (`company_resume_screen.dart`) — Company Résumé hub screen opened on row tap. Shows header card with address and markets, search bar, filter button, FAB, and sub-list (conveyors for sites; child sites/shops for corporates).
5. **`SiteDetailsScreen`** (`site_details_screen.dart`) — Read-only details view for Sites and Distributor Shops, including company info, conveyor count, market/territory chips, full address, Google Map with site and conveyor markers, and Edit button.
6. **`CompanyDetailsScreen`** (`company_details_screen.dart`) — Read-only details view for Customer Corporates and Distributor Corporates, including corporate definition, inspection template, address, map, and Edit button.
7. **`SiteAddScreen`** (`site_add_screen.dart`) — Create and Edit form for Customer Sites and Distributor Shops. Handles image upload, type selection, corporate parent linking, territory & territory manager cascade, Google Places address autocomplete, and map marker positioning.
8. **`CompanyAddScreen`** (`company_add_screen.dart`) — Create and Edit form for Customer Corporates and Distributor Corporates.
9. **`SiteFiltersModal`** (`site_filters_modal.dart`) & **`SiteConveyorsFiltersModal`** (`site_conveyors_filters_modal.dart`) & **`CompanyFiltersModal`** (`company_filters_modal.dart`) — Filter modals for sort order, territory selection, inspection items status, cover wear condition, and corporate type.
10. **`CompanyBloc` / `CompanyListBloc` / `CompanyDataCubit`** (`lib/src/blocs/company/`) — BLoC state management backing validation, duplicate name checking, local offline caching, pending background sync, and filtering.

---

## 🏗️ Architecture & Screen Flow

```
Home ("Sites" card) / ContiAppBar ("Sites")
  └─▶ SiteListScreen (list + search + pull-to-refresh)
        └─▶ tap row ▶ CompanyResumeScreen (Site mode)
              ├─▶ tap Header Card ▶ SiteDetailsScreen (view details + interactive map)
              │     └─▶ tap "Edit" ▶ SiteAddScreen (edit mode)
              ├─▶ tap Conveyor Row ▶ ConveyorInformationScreen (per-conveyor hub)
              ├─▶ tap Filter Icon ▶ SiteConveyorsFiltersModal (sort, inspection status, cover wear)
              └─▶ tap FAB ("+") ▶ ConveyorDetailsScreen (pre-locked to this customer site)

Home (Bottom Nav "Corporates" tab / index 2)
  └─▶ CompaniesScreen (corporate list + filter + search)
        ├─▶ tap Filter Icon ▶ CompanyFiltersModal (sort, corporate type)
        └─▶ tap row ▶ CompanyResumeScreen (Corporate mode)
              ├─▶ tap Header Card ▶ CompanyDetailsScreen (view details + map)
              │     └─▶ tap "Edit" ▶ CompanyAddScreen (edit mode)
              ├─▶ tap Child Site Row ▶ CompanyResumeScreen (nested site hub)
              ├─▶ tap Filter Icon ▶ SiteFiltersModal (sort, territory multi-select)
              └─▶ tap FAB ("+") ▶ SiteAddScreen (parent corporate pre-populated)

Home ("Add" FAB when Sites card is selected)
  ├─▶ "Add Site" speed-dial ▶ SiteAddScreen (create mode, company type locked to Customer Site)
  └─▶ "Add Company" speed-dial ▶ CompanyAddScreen (create mode, Customer/Distributor Corporate)
```

---

## 🏷️ Key Semantic Labels & Locators

### Site List Screen (`site_list_screen.dart`)

| Element | Semantics Label | Behaviour |
|---|---|---|
| App bar title (guest/free user) | `siteListAppbarTitle` | "Sites" |
| Back arrow (guest/free user) | `backArrowFromSite` | `Navigator.pop()` |
| Offline banner | `offlineTextForSite` | Shown when `ListStatus.isOffline`; text = "Working offline" |
| Empty state | `noResultsFound` | "No results found" when list is empty |
| Count & Sync Time | `listCountAndLastUpdatedTimeForSiteList` | `LastUpdatedTimeAndTotalCountWidget(module: 'Site')` |
| List row container | `siteListItem_$index` | Wraps `CompanyRow` |
| Pull-to-refresh | *(RefreshIndicator)* | Dispatches `CompanyListLoadEvent()` |

### Company Row (`widgets/company_row.dart`)

| Element | Semantics Label | Notes |
|---|---|---|
| Site / Corporate name | `siteName_$index` / `corporateName_$index` | Bold title text |
| Company type | `companyType_$index` | e.g. "Customer Site", "Distributor Shop", "Customer Corporate" |
| Local file image | `siteFileImage_$index` / `corporateFileImage_$index` | Rendered from local cached image path |
| Network image | `siteImage_$index` / `corporateImage_$index` | `CachedNetworkImage` with auth header |
| Initial avatar placeholder | `siteAvatar_$index` / `corporateAvatar_$index` | Circle avatar with first letter of company name |
| Conveyor / Child count pill | `count-$index` | `CountPill` widget with count text + conveyor/corporate icon |
| Sync failed indicator | `syncFailed_$index` | Rotated banner with text "Sync Failed" when `isSyncFailed == true` |

### Company Résumé Screen (`company_resume_screen.dart`)

| Element | Semantics Label | Notes |
|---|---|---|
| App bar title | `appbarTitleForCompanyResumeScreen` | "View {name} - Sites" / Corporates |
| Back arrow | `companyResumeScreenArrowBack` | `Navigator.pop()` |
| Search icon | `searchButtonForSite` / `searchButtonForConveyor` | Toggles search input bar |
| Filter icon | `filterButtonForSite` / `filterButtonForConveyor` | Opens filter modal; shows red badge if active filter |
| Search input field | `searchSitesTextField` / `searchConveyorsTextField` | Inline text search with close icon |
| Header card | `siteHeaderInfo` / `corporateHeaderInfo` | Tappable card opening SiteDetailsScreen / CompanyDetailsScreen |
| Header card image | `siteImage` / `siteLocalImage` / `siteAvatar` | Large company avatar |
| Header card name | `siteName` / `corporateName` | Company name text |
| Header card address | `siteCityAndCountry` / `corporateCityAndCountry` | Formatted `city, country` |
| Header card count | `conveyorCount` / `siteCount` | Total conveyor or child site count |
| Sub-list conveyor row | `conveyorListItemFromCompanyResumeScreen_$index` | Conveyor row in site résumé |
| Sub-list site row | `siteListItemFromCompanyResumeScreen_$index` | Site row in corporate résumé |

### Site Details Screen (`site_details_screen.dart`)

| Element | Semantics Label | Notes |
|---|---|---|
| App bar title | `siteDetailsAppbarTitle` | "View Detail {name}" |
| Back arrow | `siteDetailsArrowBack` | `Navigator.pop()` |
| Conveyor / Site count | `noOfConveyors` | Number of conveyors / customer sites |
| Edit action button | `editButton` | Gated by `BasicModule.customerSiteMap` + `Permission.edit`; opens `SiteAddScreen` |
| Cancel action button | `cancelButton` | Navigates back |

### Site Add / Edit Screen (`site_add_screen.dart`)

| Element | Semantics Label | Notes |
|---|---|---|
| App bar title | `addSiteAppbarTitle` / `editSiteAppbarTitle` | "Add {type}" / "Edit {name}" |
| Back arrow | `siteBackArrow` | `Navigator.pop()` |
| Address autocomplete | `addressAutocompleteTextField` | Google Places autocomplete text field |
| Create action button | `createButton` | Dispatches `CompanyCreateEvent` |
| Save action button | `saveButton` | Dispatches `CompanyUpdateEvent` |
| Cancel action button | `cancelButton` | Discards changes and navigates back |

---

## 📊 KPI

| Metric | Value |
|--------|-------|
| Total Test Cases | 41 |
| 📋 Planned | 41 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |
| 🔴 Blocked (infra) | 0 |
| 🟢 Smoke TCs | 3 |
| 🟡 Regression TCs | 36 |
| 🟣 E2E TCs | 2 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗒️ Test Cases

### 🟢 Smoke

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-SITES-001](./tc-sites-001-sites-list-loads-with-permitted-view.md) | Sites list loads with managed customer sites for permitted user | Critical | 📋 Planned |
| [TC-SITES-002](./tc-sites-002-add-customer-site-happy-path.md) | Add Customer Site — create new site with mandatory fields (happy path) | Critical | 📋 Planned |
| [TC-SITES-003](./tc-sites-003-site-details-read-only-and-map-view.md) | View Site Details — displays company information and map with site markers | Critical | 📋 Planned |

### 🟣 End-to-End (E2E)

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-SITES-040](./tc-sites-040-e2e-corporate-and-site-hierarchy-lifecycle.md) | E2E Corporate & Site Hierarchy Lifecycle (Create Corporate, Add Site, GPS Coordinates, Delete) | Critical | 📋 Planned |
| [TC-SITES-041](./tc-sites-041-e2e-offline-customer-site-creation-and-sync.md) | E2E Offline Customer Site Creation & Synchronization | High | 📋 Planned |

### 🟡 Regression — Navigation, RBAC & Home/Dashboard Integration

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-SITES-004](./tc-sites-004-home-site-card-count-and-navigation.md) | Home dashboard Sites card displays total managed sites count and navigates to Sites list | High | 📋 Planned |
| [TC-SITES-005](./tc-sites-005-sites-list-hidden-without-view-permission.md) | Sites list is hidden for users without view permission | High | 📋 Planned |
| [TC-SITES-006](./tc-sites-006-tablet-split-view-site-card-selection.md) | Tablet layout — selecting Sites card renders inline split-view site list | Medium | 📋 Planned |
| [TC-SITES-007](./tc-sites-007-bottom-nav-corporates-tab-navigation.md) | Bottom navigation "Corporates" tab opens Companies list | Medium | 📋 Planned |
| [TC-SITES-008](./tc-sites-008-home-fab-speed-dial-add-site-and-company.md) | Home FAB speed-dial presents "Add Site" and "Add Company" actions | High | 📋 Planned |

### 🟡 Regression — Site List & Row Features

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-SITES-009](./tc-sites-009-empty-state-no-results-found.md) | Empty state displays "No results found" when site list is empty | Medium | 📋 Planned |
| [TC-SITES-010](./tc-sites-010-offline-banner-and-cached-site-list.md) | Offline banner is displayed and site list loads from local cache when offline | High | 📋 Planned |
| [TC-SITES-011](./tc-sites-011-pull-to-refresh-reloads-site-list.md) | Pull-to-refresh reloads site list and updates last sync timestamp | High | 📋 Planned |
| [TC-SITES-012](./tc-sites-012-search-filters-site-list-by-name.md) | Search input filters site list by site name | High | 📋 Planned |
| [TC-SITES-013](./tc-sites-013-site-row-displays-core-fields-and-count-pill.md) | Site row displays avatar, site name, company type, territory chip, and conveyor count pill | Medium | 📋 Planned |
| [TC-SITES-014](./tc-sites-014-site-row-displays-sync-failed-banner.md) | Site row displays rotated "Sync Failed" banner when background sync fails | High | 📋 Planned |

### 🟡 Regression — Company Résumé Hub (Site & Corporate Sub-lists)

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-SITES-015](./tc-sites-015-tap-site-row-opens-company-resume.md) | Tapping site row opens Company Résumé with site header card and conveyors sub-list | High | 📋 Planned |
| [TC-SITES-016](./tc-sites-016-company-resume-search-filters-conveyors.md) | Company Résumé search bar filters child conveyors by name | High | 📋 Planned |
| [TC-SITES-017](./tc-sites-017-company-resume-conveyor-filter-modal.md) | Company Résumé conveyor filter modal (sort, inspection status, cover wear condition) | Medium | 📋 Planned |
| [TC-SITES-018](./tc-sites-018-company-resume-fab-adds-conveyor-to-site.md) | Company Résumé FAB opens Add Conveyor with customer site pre-locked | High | 📋 Planned |
| [TC-SITES-019](./tc-sites-019-tap-corporate-row-opens-corporate-resume.md) | Tapping corporate row opens Company Résumé with corporate header and child sites sub-list | High | 📋 Planned |
| [TC-SITES-020](./tc-sites-020-corporate-resume-filter-modal.md) | Corporate Résumé filter modal (sort, territory multi-select) | Medium | 📋 Planned |
| [TC-SITES-021](./tc-sites-021-corporate-resume-fab-adds-site-to-corporate.md) | Corporate Résumé FAB opens Add Site with parent corporate pre-populated | High | 📋 Planned |

### 🟡 Regression — Site Details & Edit

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-SITES-022](./tc-sites-022-site-details-displays-company-info-and-address.md) | Site Details displays company info, conveyor count, market/territory chips, and full address | Medium | 📋 Planned |
| [TC-SITES-023](./tc-sites-023-site-details-map-renders-site-and-conveyors.md) | Site Details map renders site location marker and conveyor routes | Medium | 📋 Planned |
| [TC-SITES-024](./tc-sites-024-site-details-edit-button-opens-edit-mode.md) | Site Details "Edit" button opens Site Add/Edit screen in edit mode | High | 📋 Planned |
| [TC-SITES-025](./tc-sites-025-edit-site-and-save-successfully.md) | Edit Site — modify site name, territory, address, and save successfully | Critical | 📋 Planned |
| [TC-SITES-026](./tc-sites-026-edit-site-duplicate-name-validation.md) | Edit Site — duplicate site name validation rejects duplicate name | High | 📋 Planned |
| [TC-SITES-027](./tc-sites-027-edit-site-offline-saves-locally-for-sync.md) | Edit Site offline — saves changes locally and triggers background sync when online | High | 📋 Planned |

### 🟡 Regression — Add Site & Distributor Shop Form

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-SITES-028](./tc-sites-028-add-site-mandatory-fields-validation.md) | Add Site — mandatory fields validation triggers error snackbar | Critical | 📋 Planned |
| [TC-SITES-029](./tc-sites-029-add-site-duplicate-name-validation.md) | Add Site — duplicate site name check returns "Company already exist" error | High | 📋 Planned |
| [TC-SITES-030](./tc-sites-030-add-site-google-places-autocomplete.md) | Add Site — address search via Google Places autocomplete populates coordinates | High | 📋 Planned |
| [TC-SITES-031](./tc-sites-031-add-site-territory-selection-filters-managers.md) | Add Site — territory selection dynamically filters territory managers list | Medium | 📋 Planned |
| [TC-SITES-032](./tc-sites-032-add-distributor-shop-flow.md) | Add Distributor Shop — select distributor corporate and territory manager | High | 📋 Planned |
| [TC-SITES-033](./tc-sites-033-add-site-image-picker-upload.md) | Add Site — image picker uploads avatar photo via camera/gallery | Medium | 📋 Planned |
| [TC-SITES-034](./tc-sites-034-add-site-cancel-button-discards-changes.md) | Add Site — cancel button discards unsaved form inputs and pops back | Low | 📋 Planned |

### 🟡 Regression — Corporate Management (Company List, Add & Details)

| ID | Title | Priority | Status |
|----|-------|----------|--------|
| [TC-SITES-035](./tc-sites-035-companies-list-loads-corporates.md) | Companies list loads customer and distributor corporates for permitted admin | High | 📋 Planned |
| [TC-SITES-036](./tc-sites-036-company-filters-modal-sort-and-corporate-type.md) | Company filters modal filters by sort order and corporate type | Medium | 📋 Planned |
| [TC-SITES-037](./tc-sites-037-add-customer-corporate-flow.md) | Add Customer Corporate — specify corporate name, inspection template, and address | High | 📋 Planned |
| [TC-SITES-038](./tc-sites-038-add-distributor-corporate-flow.md) | Add Distributor Corporate — specify distributor corporate name and address | High | 📋 Planned |
| [TC-SITES-039](./tc-sites-039-corporate-details-read-only-view-and-edit.md) | Corporate Details — read-only view and edit flow for corporate entities | Medium | 📋 Planned |
