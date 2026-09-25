# TC-SITES-005 — Sites list is hidden for users without view permission

> Suite: [Sites](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-005 |
| **Suite** | sites |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `sites_permission_denied` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/site-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify RBAC enforcement: when a user lacks `Permission.view` on `BasicModule.customerSiteMap`, the Sites card is hidden on the Home dashboard and `SiteListScreen` renders an empty `Container()`.

---

## ✅ Preconditions

- User is logged in with an account that does NOT have `BasicModule.customerSiteMap` view permission

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On the Home dashboard, check the cards grid | `siteCard` is NOT present |
| 2 | If navigating directly via route to `SiteListScreen` | `loadScreen` checks permission and returns an empty `Container()` |
| 3 | Observe the UI | No site data, no list rows, and no sync widget are exposed |

---

## 🏁 Expected Results

- Sites card is completely omitted from the Home grid
- `canAccess(BasicModule.customerSiteMap, Permission.view)` evaluates to `false`, preventing unauthorized data access

---

## 🔍 Flutter Source Reference

```dart
// site_list_screen.dart
final bool canView = context.read<UserInfoCubit>().state.user!.canAccess(
  BasicModule.customerSiteMap,
  Permission.view,
);
if (!canView) {
  return Container();
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:sites_permission_denied @regression @both
Scenario: Sites list is hidden for users without view permission
  Given the user is logged in with a restricted role
  Then the home screen should not display the sites card
```

---

## 🔗 Related

- [TC-SITES-001 — Sites list loads](./tc-sites-001-sites-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
