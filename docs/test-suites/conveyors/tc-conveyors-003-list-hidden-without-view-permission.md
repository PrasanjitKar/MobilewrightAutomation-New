# TC-CONVEYORS-003 — Conveyors list is hidden for users without view permission

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-003 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_list_rbac_hidden` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that `ConveyorListScreen` renders no content for a user who lacks `BasicModule.conveyorsData` / `Permission.view`, regardless of how the screen is reached.

---

## ✅ Preconditions

- User account/role without `BasicModule.conveyorsData` view permission
- The "Conveyors" Home card itself is also hidden for this user (see `TC-DASHBOARD-002`)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in as a user without conveyors view permission | Home screen loads without a "Conveyors" card |
| 2 | Directly navigate to the Conveyors list route (e.g. via deep link/test hook) | `ConveyorListScreen.loadScreen()` returns an empty `Container()` — no list, no rows, no filters |

---

## 🏁 Expected Results

- No conveyor rows, offline banner, empty-state text, or count widget is rendered
- No `ConveyorListLoadEvent`/API calls are triggered by this screen

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_screen.dart
Widget loadScreen(BuildContext context) {
  final bool canView = context.read<UserInfoCubit>().state.user!.canAccess(
    BasicModule.conveyorsData,
    Permission.view,
  );
  if (!canView) {
    return Container();
  }
  ...
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_list_rbac_hidden @regression @both
Scenario: Conveyors list is hidden without view permission
  Given the user "td.Username" without conveyor view permission is logged in
  When the user navigates to the conveyors list
  Then no conveyor list content should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-002 — Card visibility is permission-based](../dashboard/tc-dashboard-002-card-visibility-permission-based.md)
- [Suite index](./index.md)
