# TC-DASHBOARD-010 — Inspections card shows correct count, status chips, and navigates correctly

> Suite: [Dashboard](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-DASHBOARD-010 |
| **Suite** | dashboard |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `dashboard_inspections_card` |
| **Feature File** | `features/regression/dashboard.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG / PRD |

---

## 🎯 Objective

Verify the Inspections card displays the correct total count plus good/fault/poor/critical status breakdown chips, and navigates correctly for guest and authenticated users.

---

## ✅ Preconditions

- User has view permission for `InspectionModule.inspectionModule`
- At least one inspection exists in each of the good/fault/poor/critical states for full chip coverage

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the `inspectionCard` on the Home screen | Card is visible with title "Inspections" |
| 2 | Read the count value | Count equals `ItemSummary.count` computed via `state.getInspectionSummaryFromList(inspectionsFullList)` |
| 3 | Read the status chips | Good/fault/poor/critical chip values match `ItemSummary.good/fault/poor/critical` respectively; each chip is visible only if its value is a non-empty parseable integer > 0 |
| 4 | Tap the card (phone, authenticated user) | `CompanyDataCubit.getCompanyList()` is triggered, then `AppLoadEvent(selectedPage: 4, inspectionsList: ...)` switches the bottom nav tab |
| 5 | Tap the card (phone, guest/free user) | `InspectionListScreen(isFreeUser: true)` is pushed |
| 6 | Tap the card (tablet) | Inline list panel swaps to Inspections list; card is highlighted |

---

## 🏁 Expected Results

- Total count and all 4 status chip values match the computed `ItemSummary`
- Chips with zero/empty values are not rendered (see TC-DASHBOARD-017)
- Correct navigation and company-data refresh trigger as described above

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart — _getHomeCards(), Inspections card
final ItemSummary inspectionSummary = state.getInspectionSummaryFromList(inspectionList);
SemanticsLabel(
  label: 'inspectionCard',
  child: HomeCard(
    isSelected: !DeviceHelper.isPhone() && selectedListType == ListType.inspection,
    callback: () {
      if (DeviceHelper.isPhone()) {
        if (widget.isFreeUser ?? false) {
          Navigator.push(context, MaterialPageRoute(builder: (_) => const InspectionListScreen(isFreeUser: true)));
        } else {
          BlocProvider.of<AppBloc>(context).add(
            AppLoadEvent(selectedPage: 4, inspectionsList: state.inspectionsFullList),
          );
        }
      } else {
        context.read<CompanyDataCubit>().getCompanyList();
        setState(() { selectedListType = ListType.inspection; });
      }
    },
    title: AppLocalizations.of(context)!.inspections, // "Inspections"
    counter: inspectionSummary.count.toString(),
    good: inspectionSummary.good.toString(),
    fault: inspectionSummary.fault.toString(),
    poor: inspectionSummary.poor.toString(),
    critical: inspectionSummary.critical.toString(),
  ),
),
```

**Semantic labels / locators:**
- `inspectionCard` — outer card wrapper
- `Inspections` — inner title text
- `Inspections-count` — total count text label (`exact: false` match required)
- Good/fault/poor/critical chip locators are defined in `home_card.dart` (per-status `Visibility` widgets)

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/dashboarddata.csv @Key:dashboard_inspections_card @regression @both
Scenario: Inspections card shows correct count and status chips
  Given the user is logged in
  And the home screen finishes loading
  Then the inspection card count should match "td.ExpectedInspectionCount"
  And the inspection card status chips should match the expected breakdown
  When the user taps the inspection card
  Then the inspection list screen should be displayed
```

---

## 🔗 Related

- [TC-DASHBOARD-017 — Status chips hidden when zero](./tc-dashboard-017-status-chips-hidden-when-zero.md)
- [Suite index](./index.md)
