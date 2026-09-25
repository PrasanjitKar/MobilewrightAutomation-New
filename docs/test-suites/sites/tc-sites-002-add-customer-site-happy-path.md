# TC-SITES-002 — Add Customer Site — create new site with mandatory fields (happy path)

> Suite: [Sites](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-002 |
| **Suite** | sites |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `add_site_happy_path` |
| **Feature File** | `features/smoke/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that a user with `BasicModule.customerSiteMap` + `Permission.add` can create a new Customer Site by filling in the mandatory fields (Company Type, Site Name, Customer Corporate, Territory, and Address).

---

## ✅ Preconditions

- User is logged in with `BasicModule.customerSiteMap` / `Permission.add`
- Network is online

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From Home, tap the FAB and select "Add Site" (or navigate to `SiteAddScreen`) | `SiteAddScreen` opens with title "Add Customer Site" (`addSiteAppbarTitle`) |
| 2 | Enter a unique Site Name in `_companyNameCtrl` | Name is populated |
| 3 | Select Customer Corporate from autocomplete dropdown | Customer Corporate is linked |
| 4 | Select Territory from autocomplete dropdown | Territory is selected; Territory Managers list is populated |
| 5 | Select a Territory Manager | Territory Manager is selected |
| 6 | In the Address search field (`addressAutocompleteTextField`), search and select a location | Address is resolved, latitude/longitude are set, and map marker is positioned |
| 7 | Tap "Create" button (`createButton`) | `CompanyCreateEvent` is dispatched; `CompanyCreateState` is emitted; snackbar "Company Created" is displayed |
| 8 | Return to Sites list | The newly created site appears in the list |

---

## 🏁 Expected Results

- `CompanyBloc` emits `CompanySavingState` followed by `CompanyCreateState`
- Snackbar shows `AppLocalizations.companyCreated` ("Company Created")
- Screen pops back with success and the new site is visible in cache and list

---

## 🔍 Flutter Source Reference

```dart
// site_add_screen.dart — _action()
company.companyTypeId = companyTypeValue;
company.name = _companyNameCtrl.text;
company.customerCorporateId = customerCorporate?.companyId;
company.territoryId = territory.territoryId;
...
_companyBloc.add(CompanyCreateEvent(company, fileImage));
```

**Semantic labels / locators:**
- `addSiteAppbarTitle` — screen title
- `addressAutocompleteTextField` — address Google Places search
- `createButton` — submit button
- `siteBackArrow` — back button

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_site_happy_path @smoke @both
Scenario: Create a new customer site with mandatory fields
  Given the user is logged in
  When the user opens the Add Site screen
  And the user enters site name "td.SiteName"
  And the user selects customer corporate "td.CustomerCorporate"
  And the user selects territory "td.Territory"
  And the user selects address "td.Address"
  And the user taps the create site button
  Then a success message "Company Created" should be displayed
  And the new site should be listed in the sites list
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [TC-SITES-028 — Mandatory fields validation](./tc-sites-028-add-site-mandatory-fields-validation.md)
- [Suite index](./index.md)
