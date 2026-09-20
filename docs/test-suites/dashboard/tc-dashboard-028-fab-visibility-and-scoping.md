# TC-DASHBOARD-028 — FAB (Add speed-dial) visibility and scoping by user type and selected card

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-028 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_fab_visibility` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the floating "Add" speed-dial button is completely hidden for guest/free users and whenever the currently selected Home card is Belt Scan, Minuteman, or Heavy Equipment; otherwise it renders via `_getFloatingButton`.

---

## ✅ Preconditions

- One authenticated (full) user session and one guest/free-user session
- User has `Permission.add` on at least one module for the positive case

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Log in as a guest/free user, view any tab | FAB is `null` (not rendered) |
| 2 | Log in as an authenticated user, select the Sites card on Home | FAB renders (assuming `Permission.add` on at least one module) |
| 3 | Select the Belt Scan card | FAB is `null` (hidden) — `state.selectedCard == ListType.beltScan` |
| 4 | Select the Minuteman card | FAB is `null` (hidden) — `state.selectedCard == ListType.minuteman` |
| 5 | Select the Heavy Equipment card | FAB is `null` (hidden) — `state.selectedCard == ListType.heavyEquipment` |
| 6 | Select any other card (Conveyors, Cover Wear, Inspections, Conveyor Inspect, Monitoring Device, Field Service) | FAB renders again, scoped per TC-DASHBOARD-029 |

---

## 🏁 Expected Results

- FAB is fully absent for guest/free users regardless of selected card
- FAB is fully absent when Belt Scan, Minuteman, or Heavy Equipment is the selected card, for all user types
- FAB reappears for all other card selections (subject to permission gating)

---

## 🔍 Flutter Source Reference

```dart
// app.dart — build(), floatingActionButton
floatingActionButton:
    isFreeUser ||
        state.selectedCard == ListType.beltScan ||
        state.selectedCard == ListType.minuteman ||
        state.selectedCard == ListType.heavyEquipment
    ? null
    : _getFloatingButton(
        state.selectedPage,
        state.inspectionConveyor,
        context,
        state.selectedCard ?? ListType.site,
      ),
```

**Semantic labels / locators:**
- FAB/SpeedDial locators are not shown in this excerpt — automation should inspect the SpeedDial widget tree or add semantic labels for the main FAB toggle button

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_fab_visibility @regression @both
Scenario: FAB is hidden when Belt Scan card is selected
  Given the user is logged in
  And the home screen finishes loading
  When the user taps the belt scan card
  Then the floating add button should not be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-029 — FAB speed-dial options per card](./tc-dashboard-029-fab-speed-dial-options-per-card.md)
- [TC-DASHBOARD-030 — FAB connectivity gating](./tc-dashboard-030-fab-connectivity-gating.md)
- [Suite index](./index.md)
