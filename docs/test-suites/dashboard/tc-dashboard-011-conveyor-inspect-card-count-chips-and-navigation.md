# TC-DASHBOARD-011 — Conveyor Inspect card shows correct count, status chips, and navigates correctly

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-011 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_conveyor_inspect_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Conveyor Inspect card displays the correct total count plus good/fault/poor/critical status breakdown chips, and navigates correctly to `ConveyorInspectListScreen` (phone, both guest and authenticated share the same route) or swaps the inline list panel (tablet).

---

## ✅ Preconditions

- User has view permission for `ConveyorInspectModule.conveyorInspectModule`
- At least one conveyor inspection exists in each of the good/fault/poor/critical states

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the `conveyorInspectCard` on the Home screen | Card is visible with title "Conveyor Inspect" |
| 2 | Read the count value | Count equals `ItemSummary.count` computed via `state.getConveyorInspectSummaryFromList(conveyorInspectList)` |
| 3 | Read the status chips | Good/fault/poor/critical chip values match the computed `ItemSummary` |
| 4 | Tap the card (phone) | `ConveyorInspectListScreen(isFreeUser: widget.isFreeUser)` is pushed via named route `RouteNameKeys.conveyorInspectListScreen` |
| 5 | Tap the card (tablet) | Inline list panel swaps to Conveyor Inspect; card is highlighted |

---

## 🏁 Expected Results

- Total count and status chips match the computed `ItemSummary`
- `ConveyorInspectListScreen` receives the correct `isFreeUser` flag on phone navigation
- Tablet selection updates without navigating away from Home

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Conveyor Inspect card
final ItemSummary summary = state.getConveyorInspectSummaryFromList(state.conveyorInspectList);
SemanticsLabel(
  label: 'conveyorInspectCard',
  child: HomeCard(
    isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.conveyorInspect,
    callback: () {
      if (DeviceHelper.isPhone()) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => ConveyorInspectListScreen(isFreeUser: widget.isFreeUser),
            settings: const RouteSettings(name: RouteNameKeys.conveyorInspectListScreen),
          ),
        ).then((refresh) {});
      } else {
        setState(() { selectedListType = ListType.conveyorInspect; });
      }
    },
    title: AppLocalizations.of(context)!.conveyorInspect, // "Conveyor Inspect"
    counter: summary.count.toString(),
    good: summary.good.toString(),
    fault: summary.fault.toString(),
    poor: summary.poor.toString(),
    critical: summary.critical.toString(),
  ),
),
```

**Semantic labels / locators:**
- `conveyorInspectCard` — outer card wrapper
- `Conveyor Inspect` — inner title text
- `Conveyor Inspect-count` — total count text label (`exact: false` match required)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_conveyor_inspect_card @regression @both
Scenario: Conveyor Inspect card shows correct count and status chips
  Given the user is logged in
  And the home screen finishes loading
  Then the conveyor inspect card count should match "td.ExpectedConveyorInspectCount"
  When the user taps the conveyor inspect card
  Then the conveyor inspect list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-010 — Inspections card](./tc-dashboard-010-inspections-card-count-chips-and-navigation.md)
- [Suite index](./index.md)
