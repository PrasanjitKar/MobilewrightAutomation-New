# TC-SITES-025 — Edit Site — modify site name, territory, address, and save successfully

> Suite: [Sites](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-025 |
| **Suite** | sites |
| **Priority** | Critical |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `edit_site_success` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts`, `src/pages/site-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that a permitted user can edit an existing site's name, territory, territory manager, and address, then tap "Save" (`saveButton`), dispatching `CompanyUpdateEvent` and receiving a "Company Updated" snackbar message.

---

## ✅ Preconditions

- User has `BasicModule.customerSiteMap` / `Permission.edit`
- An existing customer site is available

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `SiteAddScreen` in edit mode for an existing site | Form loads with current site details |
| 2 | Update the Site Name in `_companyNameCtrl` | New site name is set |
| 3 | Change the Territory selection | Territory and Territory Managers list update |
| 4 | Search and select a new address via Google Places | Address and coordinates update; map re-centers |
| 5 | Tap "Save" button (`saveButton`) | Dispatches `CompanyUpdateEvent`; `CompanyBloc` emits `CompanySavingState` then `CompanyUpdateState` |
| 6 | Observe notification | Snackbar shows "Company Updated" (`companyUpdated`) |
| 7 | Observe navigation | Screen pops back to `SiteDetailsScreen`, reflecting the updated details |

---

## 🏁 Expected Results

- Site record is successfully updated on backend and in local cache
- Success snackbar "Company Updated" is displayed

---

## 🔍 Flutter Source Reference

```dart
// site_add_screen.dart — _action()
_companyBloc.add(
  CompanyUpdateEvent(
    company: company,
    companyImage: fileImage,
    isFreeUser: false,
    isCorporate: false,
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:edit_site_success @regression @both
Scenario: Edit existing customer site
  Given the user is on the edit site screen for "td.SiteName"
  When the user updates site name to "td.NewSiteName"
  And the user updates territory to "td.NewTerritory"
  And the user taps save
  Then a success message "Company Updated" should be displayed
  And the updated site name "td.NewSiteName" should be reflected in site details
```

---

## 🔗 Related

- [TC-SITES-024 — Site details edit button](./tc-sites-024-site-details-edit-button-opens-edit-mode.md)
- [Suite index](./index.md)
