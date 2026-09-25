# TC-SITES-022 — Site Details displays company info, conveyor count, market/territory chips, and full address

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-022 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `site_details_fields_validation` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that `SiteDetailsScreen` renders all required site information in read-only form: Site Name (`siteNameAndShopName`), Number of Conveyors (`noOfConveyors`), Market and Territory chips (`ContiplusChip`), Type of Company, Associated Distributor, Territory Manager, and formatted full Address.

---

## ✅ Preconditions

- User is logged in with `BasicModule.customerSiteMap` / `Permission.view`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `CompanyResumeScreen`, tap the header card | `SiteDetailsScreen` opens |
| 2 | Verify Site Name | Displays `company.name` |
| 3 | Verify Number of Conveyors | Displays `company.conveyorsCount` under label `noOfConveyors` |
| 4 | Verify Markets & Territories | Renders chips for Market name and Territory name |
| 5 | Verify Company Information grid | "Type of Company" shows "Customer Site"; "Associated Distributor" shows linked distributor name; "Territory Manager" shows manager name |
| 6 | Verify Address | Full address (`street, city, state, country`) is rendered |

---

## 🏁 Expected Results

- All site data fields render correctly in disabled / read-only state
- Correct relationships are resolved via `CompanyDataCubit` and `MarketCubit`

---

## 🔍 Flutter Source Reference

```dart
// site_details_screen.dart
Widget _buildCompanyInfo() {
  return GridView(
    children: [
      _typeOfCompany(),
      if (companyTypeModel?.type != CompanyType.distributorShop) _associatedDistributor(),
      _teritorryManager(),
    ],
  );
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:site_details_fields_validation @regression @both
Scenario: Verify site details read only fields
  Given the user is on the site details screen for "td.SiteName"
  Then the site name field should display "td.SiteName"
  And the company type field should display "Customer Site"
  And the address field should display "td.FullAddress"
```

---

## 🔗 Related

- [TC-SITES-003 — Site details read only view](./tc-sites-003-site-details-read-only-and-map-view.md)
- [Suite index](./index.md)
