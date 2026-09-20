# TC-DASHBOARD-023 — Filter icon is hidden on Home and only shown on Conveyors/Companies/Inspections for non-guest users

> Suite: [Dashboard](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-023 |
| **Suite** | dashboard |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_filter_icon_visibility` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the app bar's `filterIcon` is hidden on the Home tab (page 0) and only rendered on the Conveyors (1), Companies (2), and Inspections (4) tabs, and only for non-guest/non-free users. Also verify the red filter-active dot appears when the corresponding list's `filters.hasFilters` is true.

---

## ✅ Preconditions

- User is logged in as a full (non-free) user for the positive cases
- A guest/free-user session for the negative case

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On the Home tab (page 0), inspect the app bar | `filterIcon` is not rendered (page 0 not in `allowedPages = [1, 2, 4]`) |
| 2 | Navigate to Conveyors (page 1) | `filterIcon` is visible |
| 3 | Apply a conveyor filter, then return to the Conveyors tab | A small red dot (`CircleAvatar`, radius 5) appears on the filter icon, reflecting `ConveyorListState.filters.hasFilters == true` |
| 4 | Navigate to Companies (page 2) and Inspections (page 4) | `filterIcon` is visible on both, with the red dot logic bound to `CompanyListState.filters.hasFilters` / `InspectionListState.filters.hasFilters` respectively |
| 5 | Navigate to Sites (page 6) or any other tab | `filterIcon` is not rendered (page 6 not in `allowedPages`) |
| 6 | Log in as a guest/free user and check any allowed page | `filterIcon` is not rendered (`isFreeUser` guard) |

---

## 🏁 Expected Results

- Filter icon visibility is restricted to exactly pages `[1, 2, 4]` for non-free users
- Red active-filter dot only appears when the corresponding list has active filters
- Filter icon is completely absent for guest/free users on any page

---

## 🔍 Flutter Source Reference

```dart
// conti_app_bar.dart — buildFiltersBtn()
Widget buildFiltersBtn({required int selectedPage, required bool isFreeUser}) {
  final allowedPages = <int>[1, 2, 4];
  if (allowedPages.contains(selectedPage) && !isFreeUser) {
    return SemanticsLabel(
      label: 'filterIcon',
      child: Stack(
        children: [
          GestureDetector(onTap: openFilter, child: SvgPicture.asset(ContiPlusIcon.mobileFilter_24x24)),
          Positioned(
            top: 15, right: 10,
            child: Builder(builder: (context) {
              switch (selectedPage) {
                case 1: return BlocBuilder<ConveyorListBloc, ConveyorListState>(
                  builder: (_, state) => state.filters.hasFilters
                      ? const CircleAvatar(backgroundColor: Colors.red, radius: 5)
                      : const SizedBox.shrink());
                case 2: return BlocBuilder<CompanyListBloc, CompanyListState>(/* same pattern */);
                case 4:
                default: return BlocBuilder<InspectionListBloc, InspectionListState>(/* same pattern */);
              }
            }),
          ),
        ],
      ),
    );
  }
  return const SizedBox.shrink();
}
```

**Semantic labels / locators:**
- `filterIcon` — outer wrapper (present only on pages 1/2/4 for non-free users)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_filter_icon_visibility @regression @both
Scenario: Filter icon is hidden on the home tab
  Given the user is logged in
  And the home screen finishes loading
  Then the filter icon should not be displayed
  When the user navigates to the conveyors tab
  Then the filter icon should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-024 — Search icon navigation](./tc-dashboard-024-search-icon-navigation.md)
- [Suite index](./index.md)
