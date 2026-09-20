# TC-DASHBOARD-030 — FAB "Add Corporate/Site/Conveyor" options are additionally gated by connectivity

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-030 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_fab_connectivity_gating` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that only 3 of the 8 FAB speed-dial "Add" options — Add Corporate, Add Site, and Add Conveyor — are additionally gated by `ConnectivityHelper.instance.isOnlineNotifier`; the remaining 5 (Cover Wear, Inspection, Conveyor Inspect, Monitoring Device, Field Service) have no connectivity gate in the source and remain available offline.

---

## ✅ Preconditions

- Test account has `Permission.add` on all 8 relevant modules to isolate the connectivity variable
- Ability to toggle device network connectivity (airplane mode or network throttling)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | With network online, select the Sites card and open the FAB | "Add Corporate", "Add Site", and "Add Conveyor" (from Sites scope) are all visible |
| 2 | Disable network connectivity (airplane mode), then re-open the FAB from the Sites card | "Add Corporate" and "Add Site" disappear (`isOnline == false`); "Add Conveyor" also disappears since it shares the same `isOnline` gate |
| 3 | While offline, select the Cover Wear card and open the FAB | "Add Cover Wear" remains visible (no connectivity gate) |
| 4 | While offline, select Inspections, Conveyor Inspect, Monitoring Device, and Field Service cards in turn | Each corresponding "Add" option remains visible regardless of connectivity |
| 5 | Re-enable connectivity and re-check the Sites card FAB | "Add Corporate", "Add Site", and "Add Conveyor" reappear |

---

## 🏁 Expected Results

- Add Corporate / Add Site / Add Conveyor require both permission AND `isOnline == true`
- The other 5 add options require only permission + correct card selection, with no connectivity dependency (confirmed intentional behavior per source, not a gap)

---

## 🔍 Flutter Source Reference

```dart
// app.dart — _getFloatingButton(), connectivity-gated options
return ValueListenableBuilder<bool>(
  valueListenable: ConnectivityHelper.instance.isOnlineNotifier,
  builder: (_, isOnline, __) {
    ...
    if ((state.user?.canAccess(AdminModule.corporateManagement, Permission.add) ?? false) &&
        isOnline &&
        (selectedCardType == ListType.site))
      SpeedDialChild(/* Add Corporate */),

    if ((state.user?.canAccess(BasicModule.customerSiteMap, Permission.add, isRequiredPartialityCheck: true) ?? false) &&
        isOnline &&
        (selectedCardType == ListType.site))
      SpeedDialChild(/* Add Site */),

    if ((state.user?.canAccess(BasicModule.conveyorsData, Permission.add) ?? false) &&
        isOnline &&
        (selectedCardType == ListType.conveyor || selectedCardType == ListType.site))
      SpeedDialChild(label: 'addConveyor', /* ... */),

    // NOTE: Cover Wear, Inspection, Conveyor Inspect, Monitoring Device, Field Service
    // options below have NO `isOnline` check in their conditions.
  },
);
```

**Semantic labels / locators:**
- `addConveyor` — one confirmed semantic label on the Add Conveyor speed-dial child; others should be verified/added in source for parity

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_connectivity_gating @regression @both
Scenario: Add Conveyor FAB option disappears offline but Add Cover Wear remains
  Given the user is logged in with add permission for conveyors and cover wear
  And the home screen finishes loading
  And the site card is selected
  When the device goes offline
  And the user opens the floating add button
  Then the "Add Conveyor" option should not be visible
  When the user selects the cover wear card
  And the user opens the floating add button
  Then the "Add Cover Wear" option should be visible
```

---

## 🔗 Related

- [TC-DASHBOARD-029 — FAB speed-dial options per card](./tc-dashboard-029-fab-speed-dial-options-per-card.md)
- [Suite index](./index.md)
