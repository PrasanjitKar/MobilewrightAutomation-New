# TC-CONVEYOR-INSPECT-001 — Conveyor Inspect List — loads records with permitted view

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-001 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `conveyor_inspect_list_load` |
| **Feature File** | `features/smoke/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that a user with `ConveyorInspectModule.conveyorInspectModule` (`CONVEYOR-INSPECT-MODULE`) `Permission.view` can open `ConveyorInspectListScreen`, view thermal/drone inspection records with conveyor name, site, territory chip, date, and status indicator, along with the total count footer widget.

---

## ✅ Preconditions

- User is authenticated with `CONVEYOR-INSPECT-MODULE` view permission
- Conveyor Inspect records exist in the account

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Launch Conti+ mobile app and navigate to Conveyor Inspect | `ConveyorInspectListScreen` loads; title is "Conveyor Inspect" |
| 2 | Observe list rows (`ConveyorInspectRow`) | Displays Conveyor name, Site name, Territory badge (`ContiplusChip`), Date, and Status |
| 3 | Observe status chips | Uploaded inspections show gray/green indicator; pending show red badge |
| 4 | Verify footer widget | `LastUpdatedTimeAndTotalCountWidget` renders total count and last sync timestamp |

---

## 🏁 Expected Results

- List renders all authorized thermal and drone inspection events accurately

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_list_screen.dart
final bool canView = context.read<UserInfoCubit>().state.user!.canAccess(
  ConveyorInspectModule.conveyorInspectModule,
  Permission.view,
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:conveyor_inspect_list_load @smoke @both
Scenario: Load Conveyor Inspect list
  Given the user is logged in with conveyor inspect view permission
  When the user navigates to the Conveyor Inspect screen
  Then the list of thermal and drone inspections should be displayed
  And each row should show conveyor name, site, territory, and status
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-002 — Create thermal inspection event](./tc-conveyor-inspect-002-create-thermal-inspection-event.md)
- [Suite index](./index.md)
