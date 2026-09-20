# TC-DASHBOARD-019 — Tablet inline list row tap navigates with pre-selection; conveyor tooltip icon shows inspection breakdown

> Suite: [Dashboard](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-019 |
| **Suite** | dashboard |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_tablet_inline_row_tap` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android (tablet form factor) |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that tapping a row inside the tablet inline list panel (e.g., `conveyorListItemFromHomeScreen_$index`) navigates to the corresponding module with the specific item pre-selected, and that tapping the tooltip icon on a conveyor row reveals its inspection-count breakdown (critical/poor/fault/good) via an overlay tooltip.

> **Automation note:** the tooltip overlay is a tap-triggered `TooltipOverlay` (not a native hover tooltip), so it is reachable on touch-only devices, but overlay positioning/dismissal timing may be flaky in automation — flagged Low priority.

---

## ✅ Preconditions

- Test runs on a tablet-classed device
- At least one conveyor with a non-null `inspectionCount` (critical/poor/fault/good values) exists in the test data
- At least one inspection item exists in the list

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Select the Conveyors card so the inline panel shows the conveyor list | `conveyorListItemFromHomeScreen_0` (and further indices) are visible |
| 2 | Tap a specific conveyor row (non-free user) | `AppLoadEvent(selectedPage: 1, conveyorsList: ..., selectedConveyor: <tapped conveyor>)` navigates to the Conveyors tab with that conveyor pre-selected |
| 3 | Tap a specific conveyor row (free/guest user) | `ConveyorListScreen(isFreeUser: true, selectedConveyor: <tapped conveyor>)` is pushed |
| 4 | Tap the tooltip icon on a conveyor row | `TooltipOverlay.showTooltip()` displays a 4-line breakdown: critical, poor, fault, good counts (each localized and lower-cased) with red/orange/yellow/green flag icons respectively |
| 5 | Select the Inspections card so the inline panel shows the inspection list, then tap `inspectionListItemFromHomeScreen_0` | Navigates to the Inspections module with `selectedInspection` pre-set (free user pushes `InspectionListScreen(isFreeUser:true, selectedInspection:...)`; authenticated user switches tab) |

---

## 🏁 Expected Results

- Row tap always carries the specific tapped item as a pre-selection parameter to the destination screen
- Tooltip content order and icon colors are exactly: critical (red), poor (orange), fault (yellow), good (green)
- Tooltip dismisses on outside tap / navigating away

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — conveyorList(), row + tooltip
SemanticsLabel(
  label: 'conveyorListItemFromHomeScreen_$index',
  child: ConveyorRow(
    keyIdentifierConveyorCount: key,
    conveyor: state.conveyors.elementAt(index),
    onTap: () {
      if (widget.isFreeUser ?? false) {
        Navigator.push(context, MaterialPageRoute(
          builder: (_) => ConveyorListScreen(isFreeUser: true, selectedConveyor: state.conveyors.elementAt(index)),
        ));
      } else {
        BlocProvider.of<AppBloc>(context).add(AppLoadEvent(
          selectedPage: 1,
          conveyorsList: state.conveyors,
          selectedConveyor: state.conveyors.elementAt(index),
        ));
      }
    },
    onTapToolTip: () {
      final model = state.conveyors.elementAt(index).inspectionCount;
      final content = [
        '${model!.critical} ${AppLocalizations.of(context)!.critical.toLowerCase()}',
        '${model.poor} ${AppLocalizations.of(context)!.poor.toLowerCase()}',
        '${model.fault} ${AppLocalizations.of(context)!.fault.toLowerCase()}',
        '${model.good} ${AppLocalizations.of(context)!.good.toLowerCase()}',
      ];
      final assets = [ContiPlusIcon.flagRed, ContiPlusIcon.flagOrange, ContiPlusIcon.flagYellow, ContiPlusIcon.flagGreen];
      _tooltipOverlay.showTooltip(context, content, assets, key);
    },
  ),
),
```

**Semantic labels / locators:**
- `conveyorListItemFromHomeScreen_$index`, `inspectionListItemFromHomeScreen_$index` (indices are 0-based per list position)
- Tooltip overlay has no dedicated semantic label in source — locate via the tooltip icon's `GlobalKey` region or overlay text content

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_tablet_inline_row_tap @regression @both
Scenario: Tablet inline conveyor row tooltip shows inspection breakdown
  Given the user is logged in on a tablet device
  And the home screen finishes loading
  And the conveyor card is selected
  When the user taps the tooltip icon on conveyor row 0
  Then the tooltip should display the critical, poor, fault, and good inspection counts
```

---

## 🔗 Related

- [TC-DASHBOARD-018 — Tablet card selection highlight](./tc-dashboard-018-tablet-card-selection-highlight-and-list-swap.md)
- [Suite index](./index.md)
