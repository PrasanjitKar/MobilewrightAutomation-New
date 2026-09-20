# TC-DASHBOARD-002 — Card visibility is permission-based (RBAC) — cards hidden for unauthorized modules

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-002 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_rbac` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that each dashboard card is rendered only when the signed-in user has `Permission.view` for its corresponding module, and is completely absent from the layout (not merely disabled) when the permission is missing.

---

## ✅ Preconditions

- Two test accounts are available: one with full module access, one with a restricted role that lacks view access to at least one module (e.g. Heavy Equipment or Minuteman)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in with the full-access account | All module cards render on the Home screen |
| 2 | Log out and log in with the restricted-access account | Home screen loads |
| 3 | Inspect the card grid/strip | The card for the module the user cannot view is **not present** (no placeholder, no disabled state) |
| 4 | Inspect the remaining cards | Cards for modules the restricted user *can* view still render normally with counts |

---

## 🏁 Expected Results

- Cards are conditionally included in the `_getHomeCards()` list based on `_canViewModule(module)` — an unauthorized card is fully absent from the widget tree, not just greyed out
- No error, blank space placeholder, or crash occurs when one or more cards are omitted
- Grid/strip layout re-flows correctly around the missing card

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards()
bool _canViewModule(String module) {
  return context.read<UserInfoCubit>().state.user?.canAccess(module, Permission.view) ?? false;
}

final bool canViewSite = _canViewModule(BasicModule.customerSiteMap);
final bool canViewConveyor = _canViewModule(BasicModule.conveyorsData);
final bool canViewInspection = _canViewModule(InspectionModule.inspectionModule);
final bool canViewCoverWear = _canViewModule(BasicModule.coverWear);
final bool canViewConveyorInspect = _canViewModule(ConveyorInspectModule.conveyorInspectModule);
final bool canViewHeavyEquipment = _canViewModule(BasicModule.heavyEquipmentData);
final bool canViewMinuteman = _canViewModule(BasicModule.minutemanConveyor) || _canViewModule(BasicModule.minutemanElevator);
final bool canViewMonitoringDevice = _canViewModule(IOTModule.beltMonitoring);
final bool canViewBeltScan = _canViewModule(BasicModule.beltScan);
final bool canViewFieldService = _canViewModule(InternalToolsModule.fieldService);

final List<Widget> cards = [
  if (canViewSite) BlocBuilder<CompanyListBloc, CompanyListState>(...),
  if (canViewConveyor) BlocBuilder<ConveyorListBloc, ConveyorListState>(...),
  // ...each subsequent card is likewise wrapped in an `if (canView<Module>)` guard
];
```

**Semantic labels / locators:**
- Each card's own label (`siteCard`, `conveyorCard`, etc.) should return "not found" for a restricted user

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_rbac @regression @both
Scenario: Restricted user does not see cards for modules without view permission
  Given the user "td.RestrictedUsername" is logged in
  When the home screen finishes loading
  Then the "heavyEquipmentCard" should not be displayed on the home screen
  And the "conveyorCard" should be displayed on the home screen
```

---

## 🔗 Related

- [TC-DASHBOARD-001 — Dashboard loads with permitted cards](./tc-dashboard-001-dashboard-loads-with-permitted-cards.md)
- [TC-DASHBOARD-028 — FAB hidden per permission/card scoping](./tc-dashboard-028-fab-visibility-permission-and-card-scoping.md)
- [Suite index](./index.md)
