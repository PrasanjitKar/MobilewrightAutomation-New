# TC-CONVEYOR-INSPECT-006 — Permissions — module access gated by view, add, edit permissions

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-006 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_permissions` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-list.page.ts`, `src/pages/conveyor-inspect-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that access to the Conveyor Inspect list, FAB add button, and details edit button are strictly gated by `ConveyorInspectModule.conveyorInspectModule` permissions (`Permission.view`, `Permission.add`, `Permission.edit`).

---

## ✅ Preconditions

- Test users configured with varying permission subsets (View only, No Access, Add only)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in with a user lacking `Permission.view` | Home card and list screen return empty `Container()` |
| 2 | Log in with a user having `Permission.view` only | List screen opens; FAB `+` button is hidden |
| 3 | Open inspection details with view-only user | Details screen displays read-only content; "Edit" button is hidden |
| 4 | Log in with a user having `Permission.add` & `Permission.edit` | FAB `+` button and "Edit" action become visible and interactive |

---

## 🏁 Expected Results

- UI dynamically adapts according to user RBAC permissions

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_list_screen.dart
final bool canView = context.read<UserInfoCubit>().state.user!.canAccess(ConveyorInspectModule.conveyorInspectModule, Permission.view);
final bool canAdd = context.read<UserInfoCubit>().state.user?.canAccess(ConveyorInspectModule.conveyorInspectModule, Permission.add) ?? false;
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_permissions @regression @both
Scenario: Conveyor Inspect RBAC permissions enforcement
  Given the user is logged in with view-only permissions for Conveyor Inspect
  When the user opens the Conveyor Inspect list
  Then the inspection records should be visible
  But the Add inspection floating action button should not be present
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
