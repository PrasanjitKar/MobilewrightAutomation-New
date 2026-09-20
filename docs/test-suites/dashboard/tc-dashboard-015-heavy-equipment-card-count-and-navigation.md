# TC-DASHBOARD-015 — Heavy Equipment card shows correct count and navigates correctly

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-015 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_heavy_equipment_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Heavy Equipment card displays the correct count and navigates to `HeavyEquipmentListScreen`. This card also participates in the deep-link + access-denied flow (see TC-DASHBOARD-032).

---

## ✅ Preconditions

- User has view permission for `BasicModule.heavyEquipmentData`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the `heavyEquipmentCard` on the Home screen | Card is visible with title "Heavy Equipment" |
| 2 | Read the count value | Count equals `HeavyEquipmentListState.heavyEquipmentsFullList.length` |
| 3 | Tap the card (phone) | `HeavyEquipmentListScreen(isFreeUser: widget.isFreeUser)` is pushed via named route `RouteNameKeys.heavyEquipmentListScreen` |
| 4 | Tap the card (tablet) | Inline list panel swaps to Heavy Equipment; card is highlighted |

---

## 🏁 Expected Results

- Displayed count matches `heavyEquipmentsFullList.length`
- Correct navigation with `isFreeUser` flag passed through
- No FAB "Add" option is available while this card is selected (Heavy Equipment is one of the 3 card types that fully hides the FAB — see TC-DASHBOARD-028)

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Heavy Equipment card
SemanticsLabel(
  label: 'heavyEquipmentCard',
  child: HomeCard(
    isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.heavyEquipment,
    callback: () {
      if (DeviceHelper.isPhone()) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => HeavyEquipmentListScreen(isFreeUser: widget.isFreeUser),
            settings: const RouteSettings(name: RouteNameKeys.heavyEquipmentListScreen),
          ),
        );
      } else {
        setState(() { selectedListType = ListType.heavyEquipment; });
      }
    },
    title: AppLocalizations.of(context)!.heavyEquipment, // "Heavy Equipment"
    counter: state.heavyEquipmentsFullList.length.toString(),
  ),
),
```

**Semantic labels / locators:**
- `heavyEquipmentCard` — outer card wrapper
- `Heavy Equipment` — inner title text
- `Heavy Equipment-count` — count text label (`exact: false` match required)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_heavy_equipment_card @regression @both
Scenario: Heavy Equipment card shows correct count and navigates on tap
  Given the user is logged in
  And the home screen finishes loading
  Then the heavy equipment card count should match "td.ExpectedHeavyEquipmentCount"
  When the user taps the heavy equipment card
  Then the heavy equipment list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-028 — FAB visibility and scoping](./tc-dashboard-028-fab-visibility-and-scoping.md)
- [TC-DASHBOARD-032 — Deep link access-denied snackbar](./tc-dashboard-032-deep-link-access-denied-snackbar.md)
- [Suite index](./index.md)
