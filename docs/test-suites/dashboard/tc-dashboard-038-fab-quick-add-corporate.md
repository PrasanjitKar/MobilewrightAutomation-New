# TC-DASHBOARD-038: FAB Quick Add — Corporate Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_getFloatingButton`, `addCompany`, `CompanyAddScreen`)

---

## 🎯 Objective
Verify tapping the "Add Corporate" SpeedDial child option on the Dashboard FAB opens `CompanyAddScreen` when the user has corporate add permission and the device is online.

---

## 📋 Preconditions
- User is logged in with `AdminModule.corporateManagement` (`Permission.add`).
- Selected card on dashboard is `ListType.site`.
- Device is online.

---

## 🧪 Test Steps
1. On `HomeScreen`, tap the primary yellow **Add (+)** floating action button (`homeFloatingActionButton`).
2. Verify SpeedDial expands showing the **Add Corporate** option with the corporate icon.
3. Tap **Add Corporate**.
4. Verify Firebase analytics logs: `'Clicked fab from home screen for add corporate'`.
5. Verify navigation to `CompanyAddScreen` (`RouteNameKeys.companyAddScreen`).
6. Verify Corporate creation form displays with Company Name, Code, and Address fields.

---

## 🔍 Expected Results
- `CompanyAddScreen` is pushed and ready for corporate creation.

---

## 📱 Flutter Source Reference
- **FAB Implementation**: `lib/src/ui/app.dart` (`_getFloatingButton`)
- **Screen**: `lib/src/ui/screens/companies/company_add_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_add_corporate @regression @both
Scenario: Open Add Corporate form via Dashboard FAB speed dial
  Given the user is on the Home dashboard with Corporate add permissions
  When the user opens the Add speed dial and selects "Add Corporate"
  Then the Add Corporate screen should be displayed
```
