# TC-SITES-019 — Tapping corporate row opens Company Résumé with corporate header and child sites sub-list

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-019 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `corporate_resume_child_sites` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/companies-list.page.ts`, `src/pages/company-resume.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping a corporate row in `CompaniesScreen` opens `CompanyResumeScreen(isCorporate: true)`, rendering the corporate header card (`corporateHeaderInfo`) and the sub-list of child customer sites (for Customer Corporate) or distributor shops (for Distributor Corporate).

---

## ✅ Preconditions

- User has access to `AdminModule.corporateManagement` / `Permission.view`
- Customer Corporate entity exists with linked child sites

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `CompaniesScreen`, tap a Customer Corporate row | `CompanyResumeScreen` opens with `isCorporate: true` |
| 2 | Observe the app bar | App bar title shows "View {corporateName} - Corporates" |
| 3 | Observe header card | `corporateHeaderInfo` renders corporate avatar, name, address, markets chips, and `siteCount` |
| 4 | Observe sub-list | Child sites are rendered with row label `siteListItemFromCompanyResumeScreen_$index` |
| 5 | Tap a child site row | Pushes a nested `CompanyResumeScreen` in Site mode for that child site |

---

## 🏁 Expected Results

- Corporate résumé displays child sites per corporate ID (`state.sitesPerCorporate(corporateId)`)
- Tapping a child site navigates into the site-specific résumé

---

## 🔍 Flutter Source Reference

```dart
// company_resume_screen.dart
if (type == CompanyType.customerCorporate) {
  listItems = state.sitesPerCorporate(widget.company.companyId ?? '');
}
if (type == CompanyType.distributorCorporate) {
  listItems = state.distributorShopsPerDistributorCorporate(widget.company.companyId ?? '');
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:corporate_resume_child_sites @regression @both
Scenario: View child sites from corporate resume
  Given the user is on the companies list screen
  When the user taps corporate "td.CorporateName"
  Then the corporate resume screen should be displayed
  And the sub list should display all child sites for "td.CorporateName"
```

---

## 🔗 Related

- [TC-SITES-007 — Bottom nav corporates tab](./tc-sites-007-bottom-nav-corporates-tab-navigation.md)
- [TC-SITES-035 — Companies list loads corporates](./tc-sites-035-companies-list-loads-corporates.md)
- [Suite index](./index.md)
