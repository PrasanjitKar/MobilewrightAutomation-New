# TC-SITES-021 — Corporate Résumé FAB opens Add Site with parent corporate pre-populated

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-021 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `corporate_resume_add_child_site` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/company-resume.page.ts`, `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the FAB on `CompanyResumeScreen` in Corporate mode opens `SiteAddScreen` with the parent corporate ID pre-populated and locked (`initialCustomerCorporateId` or `initialDistributorCorporateId`).

---

## ✅ Preconditions

- User is on `CompanyResumeScreen` for a Customer Corporate or Distributor Corporate
- User has `BasicModule.customerSiteMap` / `Permission.add`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `CompanyResumeScreen` (Corporate mode), tap the FAB button | `SiteAddScreen` opens |
| 2 | Observe the corporate parent field | "Customer Corporate" (or "Distributor Corporate") is pre-filled with current corporate name and locked/disabled (`_isCustomerCorporateLocked`) |
| 3 | Enter remaining required fields (Site Name, Territory, Address) and tap "Create" | Site is created and linked under this corporate parent |
| 4 | Return to Corporate Résumé | The newly added site appears in the corporate's child sub-list |

---

## 🏁 Expected Results

- Parent corporate field is automatically pre-selected and locked against accidental editing
- Newly created site links to the parent corporate entity

---

## 🔍 Flutter Source Reference

```dart
// company_resume_screen.dart — floatingActionButton()
Navigator.push(
  context,
  MaterialPageRoute<dynamic>(
    builder: (_) => SiteAddScreen(
      initialCustomerCorporateId: type == CompanyType.customerCorporate ? _company.companyId : null,
      initialDistributorCorporateId: type == CompanyType.distributorCorporate ? _company.companyId : null,
      initialAssociatedDistributorShopId: type == CompanyType.distributorShop ? _company.companyId : null,
    ),
    settings: const RouteSettings(name: RouteNameKeys.siteAddScreen),
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:corporate_resume_add_child_site @regression @both
Scenario: Add child site directly from corporate resume
  Given the user is on the corporate resume screen for "td.CorporateName"
  When the user taps the add floating action button
  Then the Add Site screen should open with customer corporate pre-locked to "td.CorporateName"
```

---

## 🔗 Related

- [TC-SITES-019 — Tap corporate row opens corporate résumé](./tc-sites-019-tap-corporate-row-opens-corporate-resume.md)
- [Suite index](./index.md)
