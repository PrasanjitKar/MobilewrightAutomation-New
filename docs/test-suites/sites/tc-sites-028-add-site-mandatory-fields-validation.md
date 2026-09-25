# TC-SITES-028 — Add Site — mandatory fields validation triggers error snackbar

> Suite: [Sites](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-028 |
| **Suite** | sites |
| **Priority** | Critical |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_site_validation` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that submitting `SiteAddScreen` without filling required fields (Site Name, Customer Corporate, Territory, or Address Location) fails validation and shows a red snackbar with `AppLocalizations.mandatoryFields` ("Mandatory Fields are required").

---

## ✅ Preconditions

- User is on `SiteAddScreen` in create mode

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `SiteAddScreen`, leave all form fields empty | Form is empty |
| 2 | Tap "Create" button (`createButton`) | `_validate()` executes |
| 3 | Observe form and snackbar | Form fields show validation highlights; red snackbar appears |
| 4 | Verify snackbar text | Displays `AppLocalizations.mandatoryFields` ("Mandatory Fields are required") |
| 5 | Fill only Site Name and tap "Create" | Still fails due to missing Customer Corporate, Territory, and Address |

---

## 🏁 Expected Results

- Submission is blocked until all mandatory fields are supplied
- Error notification "Mandatory Fields are required" is displayed

---

## 🔍 Flutter Source Reference

```dart
// site_add_screen.dart — _validate()
bool _validate() {
  if (!_formKey.currentState!.validate() || company.location == null) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: Colors.red,
        content: Text(AppLocalizations.of(context)!.mandatoryFields),
      ),
    );
    return false;
  }
  ...
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_site_validation @regression @both
Scenario: Add site mandatory fields validation
  Given the user is on the Add Site screen
  When the user taps the create button without filling required fields
  Then a validation error "Mandatory Fields are required" should be displayed
```

---

## 🔗 Related

- [TC-SITES-002 — Add Customer Site happy path](./tc-sites-002-add-customer-site-happy-path.md)
- [Suite index](./index.md)
