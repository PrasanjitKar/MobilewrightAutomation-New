# TC-DASHBOARD-012 — Belt Scans card shows correct count and navigates correctly (with tablet scroll)

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-012 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_beltscan_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Belt Scans card displays the correct scan count and navigates correctly, and that tablet selection additionally auto-scrolls the screen and triggers a background refresh of the belt-scan list.

---

## ✅ Preconditions

- User has view permission for `BasicModule.beltScan`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the `beltScanCard` on the Home screen | Card is visible with title "Belt Scans" |
| 2 | Read the count value | Count equals `BeltScanListState.beltScans.length` |
| 3 | Tap the card (phone) | `BeltScanListScreen(isFreeUser: widget.isFreeUser)` is pushed via named route `RouteNameKeys.beltScanListScreen` |
| 4 | Tap the card (tablet) | `BeltScanListLoadEvent(onlyLoading: true)` dispatches if not already loading; the scroll controller animates to offset 400 over 500ms; inline list panel swaps to Belt Scans; card is highlighted |

---

## 🏁 Expected Results

- Displayed count matches `beltScans.length`
- Phone navigation pushes `BeltScanListScreen` with correct `isFreeUser` flag
- Tablet interaction auto-scrolls the horizontal card strip smoothly (500ms ease-in-out) to reveal the selected list panel

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Belt Scans card
SemanticsLabel(
  label: 'beltScanCard',
  child: HomeCard(
    isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.beltScan,
    callback: () {
      if (DeviceHelper.isPhone()) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => BeltScanListScreen(isFreeUser: widget.isFreeUser),
            settings: const RouteSettings(name: RouteNameKeys.beltScanListScreen),
          ),
        );
      } else {
        final beltScanListBloc = BlocProvider.of<BeltScanListBloc>(context);
        if (!beltScanListBloc.state.status.isLoading) {
          beltScanListBloc.add(const BeltScanListLoadEvent(onlyLoading: true));
        }
        setState(() {
          _scrollController.animateTo(400, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
          selectedListType = ListType.beltScan;
        });
      }
    },
    title: AppLocalizations.of(context)!.beltScans, // "Belt Scans"
    counter: state.beltScans.length.toString(),
  ),
),
```

**Semantic labels / locators:**
- `beltScanCard` — outer card wrapper
- `Belt Scans` — inner title text
- `Belt Scans-count` — count text label (`exact: false` match required)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_beltscan_card @regression @both
Scenario: Belt Scans card shows correct count and navigates on tap
  Given the user is logged in
  And the home screen finishes loading
  Then the belt scan card count should match "td.ExpectedBeltScanCount"
  When the user taps the belt scan card
  Then the belt scan list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-011 — Conveyor Inspect card](./tc-dashboard-011-conveyor-inspect-card-count-chips-and-navigation.md)
- [Suite index](./index.md)
