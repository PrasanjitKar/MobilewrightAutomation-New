# TC-DASHBOARD-003 — Phone layout — 2-column card grid; tapping a card navigates to its list screen

> Suite: [Dashboard](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-003 |
| **Suite** | dashboard |
| **Priority** | Critical |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_phone_nav` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android (phone form factor) |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify that on a phone form factor the Home screen renders cards in a 2-column grid, and tapping any card navigates fully away from the Home screen to that module's dedicated list screen (as opposed to tablet's inline split view).

---

## ✅ Preconditions

- Running on a phone-sized device/emulator (`DeviceHelper.isPhone()` returns `true`)
- User is logged in with view permission for Conveyors

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe the Home screen card layout | Cards are arranged in a `GridView.count(crossAxisCount: 2)` — two per row |
| 2 | Tap the `conveyorCard` | For a logged-in (non-guest) user, the bottom nav switches to the Conveyors tab (`selectedPage: 1`) and the Conveyor list is shown; for a guest/free user, `ConveyorListScreen(isFreeUser: true)` is pushed on top of Home |
| 3 | Navigate back to Home | Home screen is displayed again with the card grid intact |

---

## 🏁 Expected Results

- 2-column grid layout confirmed on phone form factor
- Card tap performs full navigation (tab switch or screen push), not an inline list swap
- Returning to Home preserves the card grid and counts

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — build()
if (DeviceHelper.isPhone())
  Expanded(
    child: GridView.count(
      mainAxisSpacing: padding,
      crossAxisSpacing: padding,
      padding: screenPadding,
      crossAxisCount: 2,
      children: _getHomeCards(context, state),
    ),
  )

// _getHomeCards() — conveyorCard callback
callback: () {
  final conveyorListBloc = BlocProvider.of<ConveyorListBloc>(context);
  if (!conveyorListBloc.state.status.isLoading) {
    conveyorListBloc.add(const ConveyorListLoadEvent(onlyLoading: true));
  }
  if (DeviceHelper.isPhone()) {
    if (widget.isFreeUser ?? false) {
      Navigator.push(context, MaterialPageRoute(builder: (_) => const ConveyorListScreen(isFreeUser: true)));
    } else {
      BlocProvider.of<AppBloc>(context).add(
        AppLoadEvent(selectedPage: 1, conveyorsList: conveyorListState.conveyors),
      );
    }
  } else {
    setState(() { selectedListType = ListType.conveyor; });
  }
},
```

**Semantic labels / locators:**
- `conveyorCard` — Conveyors card
- `conveyorTab` — bottom nav Conveyors tab (activated after tap, for non-guest users)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/testdata.csv @Key:dashboard_phone_nav @regression @android
Scenario: Tapping a dashboard card on phone navigates to its list screen
  Given the user is logged in
  And the home screen finishes loading
  When the user taps the conveyor card
  Then the conveyor list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-004 — Tablet layout split view](./tc-dashboard-004-tablet-layout-split-view.md)
- [TC-DASHBOARD-008 — Conveyors card count and navigation](./tc-dashboard-008-conveyors-card-count-and-navigation.md)
- [Suite index](./index.md)
