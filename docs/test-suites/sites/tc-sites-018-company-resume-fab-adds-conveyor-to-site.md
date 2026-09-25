# TC-SITES-018 — Company Résumé FAB opens Add Conveyor with customer site pre-locked

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-018 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `company_resume_add_conveyor` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/company-resume.page.ts`, `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the FAB ("+" button) on `CompanyResumeScreen` in Site mode opens `ConveyorDetailsScreen` with `isCustomerSiteLocked: true` and `isFromCompanyResume: true`, pre-populating and locking the Customer Site dropdown to the current site.

---

## ✅ Preconditions

- User is logged in with `BasicModule.conveyorsData` / `Permission.add`
- User is on `CompanyResumeScreen` for a site

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `CompanyResumeScreen`, locate the yellow FAB button | FAB is visible for permitted user |
| 2 | Tap the FAB button | `ConveyorDetailsScreen` opens in create mode (route `conveyorDetailsScreen`) |
| 3 | Observe the "Details" step form | "Customer Site" field is pre-populated with the current site's name and locked/disabled |
| 4 | Fill in required Conveyor Name and save | Conveyor is saved to this site; screen pops back; conveyor sub-list reloads with the new conveyor |

---

## 🏁 Expected Results

- Customer Site is locked to current site context
- Successful creation updates the site's conveyor list

---

## 🔍 Flutter Source Reference

```dart
// company_resume_screen.dart — floatingActionButton()
final newConveyor = ConveyorModel();
newConveyor.customerId = _company.companyId;
Navigator.push(
  context,
  MaterialPageRoute<dynamic>(
    builder: (_) => ConveyorDetailsScreen(
      conveyor: newConveyor,
      isCustomerSiteLocked: true,
      isFromCompanyResume: true,
    ),
    settings: const RouteSettings(name: RouteNameKeys.conveyorDetailsScreen),
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:company_resume_add_conveyor @regression @both
Scenario: Add conveyor directly from site resume
  Given the user is on the company resume screen for a site
  When the user taps the add floating action button
  Then the conveyor details stepper should open with the customer site field locked
```

---

## 🔗 Related

- [TC-SITES-015 — Tap site row opens Company Résumé](./tc-sites-015-tap-site-row-opens-company-resume.md)
- [Suite index](./index.md)
