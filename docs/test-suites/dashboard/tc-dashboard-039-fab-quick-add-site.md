# TC-DASHBOARD-039: FAB Quick Add — Site Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_getFloatingButton`, `addSite`, `SiteAddScreen`)

---

## 🎯 Objective
Verify tapping the "Add Site" SpeedDial child option on the Dashboard FAB opens `SiteAddScreen` with `lockCompanyTypeToCustomerSite: true` when the user has site add permission and the device is online.

---

## 📋 Preconditions
- User is logged in with `BasicModule.customerSiteMap` (`Permission.add`).
- Selected card on dashboard is `ListType.site`.
- Device is online.

---

## 🧪 Test Steps
1. On `HomeScreen`, tap the primary yellow **Add (+)** floating action button.
2. Verify SpeedDial expands showing the **Add Site** option with the location pin icon.
3. Tap **Add Site**.
4. Verify Firebase analytics logs: `'Clicked fab from home screen for add site'`.
5. Verify navigation to `SiteAddScreen` with `lockCompanyTypeToCustomerSite: true`.
6. Verify Site creation form displays with Site Name, Location, Address, and Country fields.

---

## 🔍 Expected Results
- `SiteAddScreen` opens directly for adding a customer site.

---

## 📱 Flutter Source Reference
- **FAB Implementation**: `lib/src/ui/app.dart` (`_getFloatingButton`)
- **Screen**: `lib/src/ui/screens/companies/site_add_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_add_site @regression @both
Scenario: Open Add Site form via Dashboard FAB speed dial
  Given the user is on the Home dashboard with Site add permissions
  When the user opens the Add speed dial and selects "Add Site"
  Then the Add Site screen should be displayed
```
