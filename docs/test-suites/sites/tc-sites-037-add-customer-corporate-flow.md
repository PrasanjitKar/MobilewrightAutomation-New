# TC-SITES-037 — Add Customer Corporate — happy path via CompanyAddScreen

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-037 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_customer_corporate_flow` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/company-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that a user with `AdminModule.corporateManagement` (`CORPORATE-MANAGEMENT`) `Permission.add` can create a new Customer Corporate via `CompanyAddScreen`, populating corporate name, address, market, and country.

---

## ✅ Preconditions

- User has `CORPORATE-MANAGEMENT` module with `Permission.add`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `CompaniesScreen`, tap `floatingActionButtonAddCompany` | `CompanyAddScreen` opens in create mode; title is "Add Corporate" (`addCorporateAppbarTitle`) |
| 2 | Select "Customer Corporate" from Type dropdown | Type set to `CompanyType.customerCorporate` |
| 3 | Enter unique Corporate Name into `companyNameInput` | Name is populated |
| 4 | Select Country and Market/Territory from dropdowns | Country and market are linked |
| 5 | Fill in street address, city, and zip code | Address fields populated |
| 6 | Tap "Create" button (`createCompanyButton`) | `CompanyCreateEvent` is dispatched; snackbar displays "Corporate Created" |
| 7 | Verify navigation | Screen pops back to `CompaniesScreen`; new corporate appears in list |

---

## 🏁 Expected Results

- Customer Corporate is successfully created and persisted to backend and local cache

---

## 🔍 Flutter Source Reference

```dart
// company_add_screen.dart
BlocProvider.of<CompanyBloc>(context).add(
  CompanyCreateEvent(
    company: company,
    imageFile: fileImage,
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_customer_corporate_flow @regression @both
Scenario: Create a new customer corporate
  Given the user is on the Add Corporate screen
  When the user selects company type "Customer Corporate"
  And the user enters corporate name "td.CorporateName"
  And the user fills country, territory, and address
  And the user taps the create button
  Then a success message "Corporate Created" should be displayed
  And the corporate should appear in the companies list
```

---

## 🔗 Related

- [TC-SITES-035 — Companies List loads corporates](./tc-sites-035-companies-list-loads-corporates.md)
- [Suite index](./index.md)
