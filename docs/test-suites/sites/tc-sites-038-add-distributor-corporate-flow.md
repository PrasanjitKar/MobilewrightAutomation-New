# TC-SITES-038 — Add Distributor Corporate — happy path via CompanyAddScreen

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-038 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_distributor_corporate_flow` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/company-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that a user with `AdminModule.corporateManagement` (`CORPORATE-MANAGEMENT`) `Permission.add` can create a new Distributor Corporate entity via `CompanyAddScreen`.

---

## ✅ Preconditions

- User has `CORPORATE-MANAGEMENT` module with `Permission.add`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `CompaniesScreen`, tap `floatingActionButtonAddCompany` | `CompanyAddScreen` opens |
| 2 | Select "Distributor Corporate" from Type dropdown | Type set to `CompanyType.distributorCorporate` |
| 3 | Enter unique Distributor Corporate Name | Name is populated |
| 4 | Select Country and Market/Territory from dropdowns | Country and market are linked |
| 5 | Fill in street address, city, and postal code | Address fields populated |
| 6 | Tap "Create" button (`createCompanyButton`) | `CompanyCreateEvent` is dispatched; snackbar displays "Corporate Created" |
| 7 | Verify navigation | Returns to `CompaniesScreen`; new distributor corporate is listed |

---

## 🏁 Expected Results

- Distributor Corporate entity is created with correct `CompanyType.distributorCorporate` type and associations

---

## 🔍 Flutter Source Reference

```dart
// company_add_screen.dart
BlocProvider.of<CompanyBloc>(context).add(
  CompanyCreateEvent(
    company: company..companyType = CompanyType.distributorCorporate.value,
    imageFile: fileImage,
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_distributor_corporate_flow @regression @both
Scenario: Create a new distributor corporate
  Given the user is on the Add Corporate screen
  When the user selects company type "Distributor Corporate"
  And the user enters corporate name "td.DistributorCorporateName"
  And the user fills country, territory, and address
  And the user taps the create button
  Then a success message "Corporate Created" should be displayed
  And the distributor corporate should appear in the companies list
```

---

## 🔗 Related

- [TC-SITES-037 — Add Customer Corporate flow](./tc-sites-037-add-customer-corporate-flow.md)
- [Suite index](./index.md)
