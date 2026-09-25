# TC-SITES-039 — Corporate Details — read-only view, associated sites summary, and edit flow

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-039 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `corporate_details_view_and_edit` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/company-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that `CompanyDetailsScreen` renders Corporate entity details in read-only mode with associated site count and address, permits switching to edit mode if `Permission.edit` is granted, and saves corporate edits via `CompanyUpdateEvent`.

---

## ✅ Preconditions

- User has `CORPORATE-MANAGEMENT` module view and edit permissions

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `CompanyResumeScreen`, tap the corporate info card or "View Details" | `CompanyDetailsScreen` opens; title is "Corporate Details" (`corporateDetailsAppbarTitle`) |
| 2 | Verify read-only fields | Corporate Name, Type, Country, Address, and Linked Sites Count are displayed |
| 3 | Tap the "Edit" action button (`editCompanyButton`) | Form fields become editable or `CompanyAddScreen` opens in edit mode with prefilled data |
| 4 | Modify corporate address or contact details | Changes entered |
| 5 | Tap "Save" button (`saveCompanyButton`) | `CompanyUpdateEvent` is dispatched; snackbar displays "Corporate Updated" |
| 6 | Verify updated details | Screen re-renders showing updated corporate information |

---

## 🏁 Expected Results

- Read-only details display accurately
- Editing updates the corporate record and refreshes the view

---

## 🔍 Flutter Source Reference

```dart
// company_details_screen.dart & company_add_screen.dart
BlocProvider.of<CompanyBloc>(context).add(
  CompanyUpdateEvent(
    company: updatedCompany,
    imageFile: fileImage,
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:corporate_details_view_and_edit @regression @both
Scenario: View and edit corporate details
  Given the user is on the Corporate Details screen for "td.CorporateName"
  Then corporate name, country, and address should be displayed
  When the user taps the Edit button
  And the user updates the address to "td.NewAddress"
  And the user saves changes
  Then a success message "Corporate Updated" should be displayed
```

---

## 🔗 Related

- [TC-SITES-019 — Tap Corporate row opens Corporate Resume](./tc-sites-019-tap-corporate-row-opens-corporate-resume.md)
- [Suite index](./index.md)
