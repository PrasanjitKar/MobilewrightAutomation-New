# TC-DASHBOARD-035: Bottom Nav — Corporates Tab Navigation

> **Suite**: `dashboard` | **Priority**: `High` | **Type**: `Regression` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `corporatesTab`)

---

## 🎯 Objective
Verify tapping the Corporates tab (`corporatesTab`) in the bottom navigation bar switches `selectedPage` to index 2 (or 6 for sites), triggers `CompanyListLoadEvent`, and renders `CompaniesScreen` (or `SiteListScreen`).

---

## 📋 Preconditions
- User is logged in with corporate/site access permissions.

---

## 🧪 Test Steps
1. On `HomeScreen`, locate the bottom navigation bar.
2. Tap the **Corporates** icon (`corporatesTab`).
3. Verify `AppBloc.add(AppLoadEvent(selectedPage: 2))` is dispatched.
4. Verify `CompanyListBloc.add(CompanyListLoadEvent(onlyLoading: true))` is triggered.
5. Verify Firebase analytics logs: `'Selected company icon from home screen for bottom nav'`.
6. Verify `CompaniesScreen` (or `SiteListScreen`) is rendered.
7. Verify the Corporates icon is highlighted as active (`state.selectedPage == 2 || state.selectedPage == 6`).

---

## 🔍 Expected Results
- Companies/Sites screen opens directly and tab active state is highlighted.

---

## 📱 Flutter Source Reference
- **Bottom Navigation**: `lib/src/ui/app.dart` (`_buildBottomAppBar`, `corporatesTab`)
- **Screen**: `lib/src/ui/screens/companies/companies_list_screen.dart`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_bottom_nav_corporates @regression @both
Scenario: Navigate to Corporates tab via bottom navigation bar
  Given the user is on the Home dashboard screen
  When the user taps the Corporates icon in the bottom navigation bar
  Then the Corporates list screen should be displayed
  And the Corporates icon should be highlighted as active
```
