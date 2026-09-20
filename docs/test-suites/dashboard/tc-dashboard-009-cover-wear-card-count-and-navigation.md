# TC-DASHBOARD-009 — Cover Wear card shows correct count and navigates correctly

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-009 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_coverwear_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Cover Wear card displays the correct total count and navigates to `CoverWearListPage` (phone) or swaps the inline list panel (tablet). Note: Cover Wear has no free/guest branching — it always pushes the same screen on phone.

---

## ✅ Preconditions

- User has view permission for `BasicModule.coverWear`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the `coverWearCard` on the Home screen | Card is visible with title "Cover Wear" |
| 2 | Read the count value | Count equals `CoverWearListState.totalCount` |
| 3 | Tap the card (phone) | `CoverWearListPage` is pushed via named route `RouteNameKeys.coverWearListScreen` (same behavior for guest and authenticated users) |
| 4 | Tap the card (tablet) | Inline list panel swaps to Cover Wear; card is highlighted |

---

## 🏁 Expected Results

- Displayed count matches `CoverWearListState.totalCount`
- Navigation to `CoverWearListPage` succeeds on phone regardless of user type
- Tablet selection state updates without leaving Home

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Cover Wear card
SemanticsLabel(
  label: 'coverWearCard',
  child: HomeCard(
    isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.coverWear,
    callback: () {
      if (DeviceHelper.isPhone()) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => const CoverWearListPage(),
            settings: const RouteSettings(name: RouteNameKeys.coverWearListScreen),
          ),
        ).then((refresh) {});
      } else {
        setState(() { selectedListType = ListType.coverWear; });
      }
    },
    title: AppLocalizations.of(context)!.coverWear, // "Cover Wear"
    counter: state.totalCount.toString(),
  ),
),
```

**Semantic labels / locators:**
- `coverWearCard` — outer card wrapper
- `Cover Wear` — inner title text
- `Cover Wear-count` — count text label (`exact: false` match required)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_coverwear_card @regression @both
Scenario: Cover Wear card shows correct count and navigates on tap
  Given the user is logged in
  And the home screen finishes loading
  Then the cover wear card count should match "td.ExpectedCoverWearCount"
  When the user taps the cover wear card
  Then the cover wear list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-008 — Conveyors card](./tc-dashboard-008-conveyors-card-count-and-navigation.md)
- [Suite index](./index.md)
