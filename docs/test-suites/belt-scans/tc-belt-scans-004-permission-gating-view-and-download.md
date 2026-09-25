# TC-BELT-SCANS-004 — Permissions — view and download access control

> Suite: [Belt Scans](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-004 |
| **Suite** | belt-scans |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_permissions_gating` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts`, `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that users without `BasicModule.beltScan` view permission do not see the Belt Scans card on the dashboard or conveyor details, and navigating directly to `BeltScanListScreen` renders an empty container.

---

## ✅ Preconditions

- Test user accounts:
  1. User A with `BasicModule.beltScan` enabled
  2. User B with `BasicModule.beltScan` revoked

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in with User B (permission revoked) | Dashboard loads |
| 2 | Check Dashboard module cards | `beltScanCard` is not present in the card list |
| 3 | Navigate to a conveyor's information screen | `beltScanCard` is not rendered in conveyor cards |
| 4 | Attempt to mount `BeltScanListScreen` | `canViewBeltScan` evaluates to `false`; widget returns `Container()` |
| 5 | Log out and log in with User A (permission granted) | `beltScanCard` and `BeltScanListScreen` render normally |

---

## 🏁 Expected Results

- Access to the Belt Scans module is strictly gated by `BasicModule.beltScan` (`BELT-INSPECTION-DEVICES`)

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
final UserResponse? user = BlocProvider.of<UserInfoCubit>(context).state.user;
final bool canViewBeltScan = user?.canAccess(BasicModule.beltScan, Permission.view) ?? false;
if (!canViewBeltScan) {
  return Container();
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/logindata.csv @Key:belt_scans_permissions_gating @regression @both
Scenario: Verify Belt Scans module permission gating
  Given the user logs in without belt scan permissions
  Then the Belt Scans card should not be visible on the Dashboard
  And the Belt Scans card should not be visible on Conveyor details
```

---

## 🔗 Related

- [TC-BELT-SCANS-001 — List loads](./tc-belt-scans-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
