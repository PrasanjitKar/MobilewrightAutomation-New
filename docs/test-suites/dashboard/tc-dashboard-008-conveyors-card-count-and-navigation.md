# TC-DASHBOARD-008 — Conveyors card shows correct count and navigates correctly

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-008 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_conveyors_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Conveyors card displays the correct tracked-conveyor count and navigates to the correct destination for both guest and authenticated users, triggering a background refresh of the conveyor list.

---

## ✅ Preconditions

- User has view permission for `BasicModule.conveyorsData`
- Known tracked-conveyor count is available for comparison

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the `conveyorCard` on the Home screen | Card is visible with title "Conveyors" |
| 2 | Read the count value | Count equals `conveyorListState.conveyorFullList.length` |
| 3 | Tap the card (phone, authenticated user) | `ConveyorListLoadEvent(onlyLoading: true)` is dispatched (if not already loading), then `AppLoadEvent(selectedPage: 1, conveyorsList: ...)` switches the bottom nav tab |
| 4 | Tap the card (phone, guest/free user) | `ConveyorListScreen(isFreeUser: true)` is pushed |
| 5 | Tap the card (tablet) | Inline list panel swaps to Conveyors list; card is highlighted |

---

## 🏁 Expected Results

- Displayed count matches `conveyorFullList.length`
- Correct navigation per device/user type as above
- No duplicate loading event fires if the conveyor list is already loading

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Conveyors card
SemanticsLabel(
  label: 'conveyorCard',
  child: HomeCard(
    isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.conveyor,
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
    title: AppLocalizations.of(context)!.trackedconveyors, // "Conveyors"
    counter: conveyorListState.conveyorFullList.length.toString(),
  ),
),
```

**Semantic labels / locators:**
- `conveyorCard` — outer card wrapper
- `Conveyors` — inner title text
- `Conveyors-count` — count text label (`exact: false` match required)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_conveyors_card @regression @both
Scenario: Conveyors card shows correct count and navigates on tap
  Given the user is logged in
  And the home screen finishes loading
  Then the conveyor card count should match "td.ExpectedConveyorCount"
  When the user taps the conveyor card
  Then the conveyor list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-007 — Sites card](./tc-dashboard-007-sites-card-count-and-navigation.md)
- [Suite index](./index.md)
