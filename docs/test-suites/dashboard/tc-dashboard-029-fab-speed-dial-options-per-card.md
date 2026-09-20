# TC-DASHBOARD-029 — FAB speed-dial exposes only permission- and selection-scoped "Add" options

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-029 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_fab_speed_dial_options` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify each of the FAB's `SpeedDialChild` options ("Add Corporate", "Add Site", "Add Conveyor", "Add Cover Wear", "Add Inspection", "Add Conveyor Inspect", "Add Monitoring Device", "Add Field Service") appears only when the user has `Permission.add` on the matching module **and** the currently selected card matches that option's expected selection scope (each option is available from its own card and, in most cases, also from the Sites card).

---

## ✅ Preconditions

- Test account has `Permission.add` on a known subset of modules (e.g., Conveyors + Inspections only) to validate both inclusion and exclusion

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | With `Permission.add` on Corporate Management, select the Sites card and open the FAB | "Add Corporate" option is visible (`selectedCardType == ListType.site`) |
| 2 | With the same permission, select the Sites card and open the FAB | "Add Site" option is also visible (also scoped to `ListType.site`) |
| 3 | With `Permission.add` on Conveyors, select either Sites **or** Conveyors card and open the FAB | "Add Conveyor" option is visible in both cases |
| 4 | With `Permission.add` on Cover Wear, select either Sites **or** Cover Wear card | "Add Cover Wear" option is visible |
| 5 | With `Permission.add` on Inspections, select either Sites **or** Inspections card | "Add Inspection" option is visible |
| 6 | With `Permission.add` on Conveyor Inspect, select either Sites **or** Conveyor Inspect card | "Add Conveyor Inspect" option is visible |
| 7 | With `Permission.add` on Belt Monitoring (IOT), select either Sites **or** Monitoring Device card | "Add Monitoring Device" option is visible |
| 8 | With `Permission.add` on Field Service, select either Sites **or** Field Service card | "Add Field Service" option is visible |
| 9 | Select a card with NO matching permission (e.g., no Cover Wear add permission, Cover Wear card selected) | "Add Cover Wear" option is absent from the speed-dial |
| 10 | Select a card outside any option's allowed scope (e.g., Belt Scan-adjacent state before it's hidden entirely per TC-DASHBOARD-028) | Only options whose scope includes the current selection are shown |

---

## 🏁 Expected Results

- Each `SpeedDialChild` is gated by both permission AND selection scope (logical AND)
- Sites card, where applicable, acts as a "universal" scope for most add options (Corporate, Site, Conveyor, Cover Wear, Inspection, Conveyor Inspect, Monitoring Device, Field Service)
- No option appears without its required permission, regardless of selection

---

## 🔍 Flutter Source Reference

```dart
// app.dart — _getFloatingButton(), representative scoping checks
if ((state.user?.canAccess(AdminModule.corporateManagement, Permission.add) ?? false) &&
    (selectedCardType == ListType.site))
  SpeedDialChild(/* Add Corporate */),

if ((state.user?.canAccess(BasicModule.conveyorsData, Permission.add) ?? false) &&
    (selectedCardType == ListType.conveyor || selectedCardType == ListType.site))
  SpeedDialChild(/* Add Conveyor */),

if ((state.user?.canAccess(BasicModule.coverWear, Permission.add) ?? false) &&
    (selectedCardType == ListType.site || selectedCardType == ListType.coverWear))
  SpeedDialChild(/* Add Cover Wear */),

if ((state.user?.canAccess(InspectionModule.inspectionModule, Permission.add) ?? false) &&
    (selectedCardType == ListType.site || selectedCardType == ListType.inspection))
  SpeedDialChild(/* Add Inspection */),

if ((state.user?.canAccess(ConveyorInspectModule.conveyorInspectModule, Permission.add) ?? false) &&
    (selectedCardType == ListType.site || selectedCardType == ListType.conveyorInspect))
  SpeedDialChild(/* Add Conveyor Inspect */),

if ((state.user?.canAccess(IOTModule.beltMonitoring, Permission.add) ?? false) &&
    (selectedCardType == ListType.site || selectedCardType == ListType.monitoringDevice))
  SpeedDialChild(/* Add Monitoring Device */),

if ((state.user?.canAccess(InternalToolsModule.fieldService, Permission.add) ?? false) &&
    (selectedCardType == ListType.site || selectedCardType == ListType.fieldService))
  SpeedDialChild(/* Add Field Service */),
```

**Semantic labels / locators:**
- Individual speed-dial children have no semantic labels visible in this excerpt — automation should inspect the full `_getFloatingButton` method for `SpeedDialChild.label`/`child` icon text to build reliable locators, or request labels be added

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_speed_dial_options @regression @both
Scenario: FAB only shows Add Conveyor when permitted from the Sites card
  Given the user is logged in with add permission for conveyors
  And the home screen finishes loading
  And the site card is selected
  When the user opens the floating add button
  Then the "Add Conveyor" option should be visible
```

---

## 🔗 Related

- [TC-DASHBOARD-028 — FAB visibility and scoping](./tc-dashboard-028-fab-visibility-and-scoping.md)
- [TC-DASHBOARD-030 — FAB connectivity gating](./tc-dashboard-030-fab-connectivity-gating.md)
- [Suite index](./index.md)
