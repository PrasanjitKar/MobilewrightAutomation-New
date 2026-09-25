# TC-SITES-032 — Add Distributor Shop — select distributor corporate and territory manager

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-032 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_distributor_shop_flow` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that selecting "Distributor Shop" in Company Type switches the form fields to "Distributor Shop Name" and "Distributor Corporate", hides "Associated Distributor Shop", and successfully creates a Distributor Shop linked to the selected Distributor Corporate.

---

## ✅ Preconditions

- User has `BasicModule.customerSiteMap` / `Permission.add`
- Distributor Corporate entities exist in the account

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `SiteAddScreen` in create mode | Screen opens |
| 2 | Select "Distributor Shop" from "Type of Company" dropdown | Form adapts: name label becomes "Distributor Shop Name"; corporate label becomes "Distributor Corporate"; Associated Distributor field is hidden |
| 3 | Enter unique Distributor Shop Name | Name entered |
| 4 | Select a Distributor Corporate from the options | Distributor Corporate is linked |
| 5 | Select Territory, Territory Manager, and Address | All required fields populated |
| 6 | Tap "Create" button (`createButton`) | `CompanyCreateEvent` is dispatched; snackbar "Company Created" is displayed |
| 7 | Verify created model | `company.distributorCorporateId` is set; `customerCorporateId` and `associatedDistributorId` are null |

---

## 🏁 Expected Results

- Form dynamically reconfigures for Distributor Shop creation
- Record is saved with proper `CompanyType.distributorShop` and `distributorCorporateId` linkages

---

## 🔍 Flutter Source Reference

```dart
// site_add_screen.dart — _action()
if (_companyTypeCtrl.text.toLowerCase() == CompanyType.distributorShop.value.toLowerCase()) {
  final CompanyModel? distributorCorporate = companyDataState.getCompanyDetail(
    companyId: distributorCorporateValue ?? '',
  );
  company.distributorCorporateId = distributorCorporate?.companyId;
  company.associatedDistributorId = null;
  company.customerCorporateId = null;
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_distributor_shop_flow @regression @both
Scenario: Create a distributor shop
  Given the user is on the Add Site screen
  When the user selects company type "Distributor Shop"
  And the user enters distributor shop name "td.ShopName"
  And the user selects distributor corporate "td.DistributorCorporate"
  And the user fills territory and address and taps create
  Then a success message "Company Created" should be displayed
```

---

## 🔗 Related

- [TC-SITES-002 — Add Customer Site happy path](./tc-sites-002-add-customer-site-happy-path.md)
- [Suite index](./index.md)
