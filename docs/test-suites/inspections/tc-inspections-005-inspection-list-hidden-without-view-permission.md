# TC-INSPECTIONS-005 — Permissions — Inspection list hidden when view permission is revoked

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-005 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_permission_revoked` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/home.page.ts`, `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a user's role lacks `InspectionModule.inspectionModule` (`INSPECTION-MODULE`) `Permission.view`, the Inspections card is hidden on Home, the Inspections tab is hidden in bottom nav, and direct navigation returns an empty container.

---

## ✅ Preconditions

- User is authenticated with a restricted role where `INSPECTION-MODULE` `view` is disabled

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in with restricted user | Home dashboard loads |
| 2 | Check Home screen cards | "Inspections" summary card is not visible |
| 3 | Check bottom navigation bar | "Inspections" tab is not rendered |
| 4 | Attempt deep-link or direct route to `InspectionListScreen` | `loadScreen` checks `user.canAccess(...)` and returns empty `Container()` |

---

## 🏁 Expected Results

- Inspection UI elements and screens are inaccessible to unauthorized users

---

## 🔍 Flutter Source Reference

```dart
// inspection_list_screen.dart
final bool canView = context.read<UserInfoCubit>().state.user!.canAccess(
  InspectionModule.inspectionModule,
  Permission.view,
);
if (!canView) {
  return Container();
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_permission_revoked @regression @both
Scenario: Inspections module hidden when view permission revoked
  Given the user is logged in with restricted role without inspection permissions
  Then the Inspections card should not be visible on the Home screen
  And the Inspections tab should not be present in the bottom navigation bar
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
