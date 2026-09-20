# TC-DASHBOARD-016 — Minuteman Calc. card shows correct count and navigates correctly

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-016 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_minuteman_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Minuteman Calc. card is visible when the user has either the conveyor or elevator Minuteman permission, displays the correct count, and navigates to `MinutemanListScreen`. This card is also one of the 3 card types that fully hides the FAB (see TC-DASHBOARD-028).

---

## ✅ Preconditions

- User has view permission for `BasicModule.minutemanConveyor` **or** `BasicModule.minutemanElevator` (either grants visibility — logical OR)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the `minutemanCalculationCard` on the Home screen | Card is visible with title "Minuteman Calc." (note: not "Minuteman") |
| 2 | Read the count value | Count equals `MinutemanListState`'s current list length |
| 3 | Tap the card (phone) | `MinutemanListScreen(isFreeUser: widget.isFreeUser)` is pushed via named route `RouteNameKeys.minutemanCalcListScreen` |
| 4 | Tap the card (tablet) | Inline list panel swaps to Minuteman; card is highlighted |
| 5 | With the card selected, inspect the FAB (authenticated, non-guest user) | FAB is fully hidden (`_getFloatingButton` returns `null` for `selectedCardType == ListType.minuteman`) |

---

## 🏁 Expected Results

- Card visibility is granted by either Minuteman permission (conveyor OR elevator)
- Title text reads exactly "Minuteman Calc." — verify no truncation/ellipsis on smaller screens
- Correct navigation with `isFreeUser` flag
- FAB is confirmed hidden while this card is selected

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Minuteman card
final bool canViewMinuteman =
    _canViewModule(BasicModule.minutemanConveyor) ||
    _canViewModule(BasicModule.minutemanElevator);
...
SemanticsLabel(
  label: 'minutemanCalculationCard',
  child: HomeCard(
    isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.minuteman,
    callback: () {
      if (DeviceHelper.isPhone()) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => MinutemanListScreen(isFreeUser: widget.isFreeUser),
            settings: const RouteSettings(name: RouteNameKeys.minutemanCalcListScreen),
          ),
        );
      } else {
        setState(() { selectedListType = ListType.minuteman; });
      }
    },
    title: AppLocalizations.of(context)!.minuteman, // "Minuteman Calc."
  ),
),
```

**Semantic labels / locators:**
- `minutemanCalculationCard` — outer card wrapper
- `Minuteman Calc.` — inner title text (exact i18n string, includes trailing period)
- `Minuteman Calc.-count` — count text label (`exact: false` match required)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_minuteman_card @regression @both
Scenario: Minuteman Calc. card shows correct count and navigates on tap
  Given the user is logged in
  And the home screen finishes loading
  Then the minuteman card should display title "Minuteman Calc."
  When the user taps the minuteman card
  Then the minuteman list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-028 — FAB visibility and scoping](./tc-dashboard-028-fab-visibility-and-scoping.md)
- [Suite index](./index.md)
