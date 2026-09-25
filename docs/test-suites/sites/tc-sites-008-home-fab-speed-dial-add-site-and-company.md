# TC-SITES-008 — Home FAB speed-dial presents "Add Site" and "Add Company" actions

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-008 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `home_fab_add_site_and_company` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/site-add.page.ts`, `src/pages/company-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when the Sites card is the selected card on the Home screen and the device is online, tapping the FAB opens the speed-dial containing "Add Site" (for `BasicModule.customerSiteMap` / `Permission.add`) and "Add Company" (for `AdminModule.corporateManagement` / `Permission.add`), each navigating to the appropriate creation screen.

---

## ✅ Preconditions

- User is logged in with `BasicModule.customerSiteMap` + `AdminModule.corporateManagement` add permissions
- Device is online

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On the Home screen, ensure Sites card is selected | FAB button is visible |
| 2 | Tap the FAB button | Speed-dial menu expands |
| 3 | Observe the speed-dial options | "Add Site" (basket icon) and "Add Company" (corporate icon) are visible |
| 4 | Tap "Add Site" | Opens `SiteAddScreen` with `lockCompanyTypeToCustomerSite: true` |
| 5 | Return to Home and tap "Add Company" | Opens `CompanyAddScreen` |

---

## 🏁 Expected Results

- Speed-dial presents options corresponding to the user's add permissions
- Tapping "Add Site" routes to `SiteAddScreen` with company type pre-locked to Customer Site

---

## 🔍 Flutter Source Reference

```dart
// app.dart — _getFloatingButton()
if ((state.user?.canAccess(BasicModule.customerSiteMap, Permission.add, isRequiredPartialityCheck: true) ?? false) &&
    isOnline &&
    (selectedCardType == ListType.site))
  SpeedDialChild(
    label: Text(AppLocalizations.of(context)!.addSite),
    onPressed: () {
      Navigator.push(
        context,
        MaterialPageRoute<dynamic>(
          builder: (_) => const SiteAddScreen(lockCompanyTypeToCustomerSite: true),
          settings: const RouteSettings(name: RouteNameKeys.siteAddScreen),
        ),
      );
    },
  ),
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:home_fab_add_site_and_company @regression @both
Scenario: Home FAB speed dial Add Site and Add Company
  Given the user is logged in with site and company creation permissions
  When the user taps the home floating action button
  Then the speed dial should show "Add Site" and "Add Company"
  When the user selects "Add Site"
  Then the Add Site screen should be displayed
```

---

## 🔗 Related

- [TC-SITES-002 — Add Customer Site happy path](./tc-sites-002-add-customer-site-happy-path.md)
- [Suite index](./index.md)
