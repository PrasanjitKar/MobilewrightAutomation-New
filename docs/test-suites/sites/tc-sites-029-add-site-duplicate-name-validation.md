# TC-SITES-029 — Add Site — duplicate site name check returns "Company already exist" error

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-029 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_site_duplicate_name` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that attempting to create a new site with a name identical to an existing site fails backend validation, causing `CompanyBloc` to emit `CompanyFailState('Company already exist')` and display an error snackbar.

---

## ✅ Preconditions

- A customer site already exists with name (e.g. "Existing Customer Site")

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `SiteAddScreen` in create mode | Screen opens |
| 2 | Enter the existing name "Existing Customer Site" in `_companyNameCtrl` | Name entered |
| 3 | Complete all other mandatory fields (Corporate, Territory, Address) | All mandatory fields populated |
| 4 | Tap "Create" button (`createButton`) | `CompanyCreateEvent` is dispatched |
| 5 | Observe response from `CompanyBloc` | `validateCompanyName` returns true (conflict); `CompanyFailState` emitted |
| 6 | Observe snackbar | Red snackbar shows "Company already exist" |
| 7 | User remains on `SiteAddScreen` | Form data remains intact for correction |

---

## 🏁 Expected Results

- Creation is rejected when duplicate company name is supplied
- User receives "Company already exist" error message

---

## 🔍 Flutter Source Reference

```dart
// company_bloc.dart — _mapCompanyCreateEventToState()
if (!ctp.companyManager.validateCompanyName(
  event.company.name,
  event.company.companyTypeId,
)) {
  // proceed to create
} else {
  emit(const CompanyFailState('Company already exist'));
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_site_duplicate_name @regression @both
Scenario: Reject duplicate site name during creation
  Given a site named "td.ExistingSiteName" already exists
  When the user attempts to create a new site with name "td.ExistingSiteName"
  And the user fills all other mandatory fields and taps create
  Then an error message "Company already exist" should be displayed
```

---

## 🔗 Related

- [TC-SITES-002 — Add Customer Site happy path](./tc-sites-002-add-customer-site-happy-path.md)
- [Suite index](./index.md)
