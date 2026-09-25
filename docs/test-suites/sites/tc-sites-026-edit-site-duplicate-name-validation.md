# TC-SITES-026 — Edit Site — duplicate site name validation rejects duplicate name

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-026 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `edit_site_duplicate_name` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that editing a site name to match another existing site's name is caught by `ctp.companyManager.validateCompanyName`, resulting in `CompanyFailState('Company already exist')` and preventing duplicate company creation.

---

## ✅ Preconditions

- At least two distinct customer sites exist in the system (e.g. "Site Alpha" and "Site Beta")

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `SiteAddScreen` in edit mode for "Site Alpha" | Form opens |
| 2 | Change Site Name to "Site Beta" (exact name of another existing site) | Name field updated |
| 3 | Tap "Save" button (`saveButton`) | Validation runs in `CompanyBloc` |
| 4 | Observe response | `validateCompanyName` returns `true` (duplicate detected); `CompanyFailState` emitted |
| 5 | Observe snackbar | Red snackbar shows "Company already exist" |
| 6 | Observe screen state | User remains on `SiteAddScreen` without navigating away |

---

## 🏁 Expected Results

- Duplicate name is rejected
- Error snackbar is displayed and no changes are saved

---

## 🔍 Flutter Source Reference

```dart
// company_bloc.dart — _mapCompanyUpdateEventToState()
if (!ctp.companyManager.validateCompanyName(
  event.company.name,
  event.company.companyTypeId,
  company: event.company,
)) {
  // proceed
} else {
  emit(const CompanyFailState('Company already exist'));
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:edit_site_duplicate_name @regression @both
Scenario: Edit site duplicate name validation
  Given the user is on the edit site screen for "Site Alpha"
  When the user changes the site name to existing site "Site Beta"
  And the user taps save
  Then an error message "Company already exist" should be displayed
  And the user should remain on the edit site screen
```

---

## 🔗 Related

- [TC-SITES-025 — Edit site successfully](./tc-sites-025-edit-site-and-save-successfully.md)
- [Suite index](./index.md)
