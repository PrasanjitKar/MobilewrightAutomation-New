# TC-CONVEYORS-001 — Conveyors list loads with tracked conveyors for a permitted user

> Suite: [Conveyors](./index.md) | Priority: Critical | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-001 |
| **Suite** | conveyors |
| **Priority** | Critical |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `conveyors_list_loads` |
| **Feature File** | `features/smoke/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that a user with view permission for `BasicModule.conveyorsData` can open the Conveyors list from the Home "Conveyors" card and sees their tracked conveyors with the last-updated/count widget.

---

## ✅ Preconditions

- User is logged in with `BasicModule.conveyorsData` / `Permission.view`
- At least one tracked conveyor exists for the account

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From Home, tap the "Conveyors" card | Conveyors list screen (or inline tablet list) is displayed |
| 2 | Observe the list | One `conveyorListItem_$index` row per tracked conveyor is rendered |
| 3 | Observe the footer widget | `listCountAndLastUpdatedTimeForConveyorList` shows the correct total count and a last-updated timestamp |
| 4 | Observe app state | No `refreshingList` / `noResultsFound` placeholder is shown |

---

## 🏁 Expected Results

- List renders with a row per conveyor from `ConveyorListState.conveyors`
- Count widget matches the number of rows rendered
- No offline banner is shown when online

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_screen.dart — loadScreen()
final bool canView = context.read<UserInfoCubit>().state.user!.canAccess(
  BasicModule.conveyorsData,
  Permission.view,
);
if (!canView) {
  return Container();
}
return BlocBuilder<ConveyorListBloc, ConveyorListState>(
  builder: (context, state) {
    final List<ConveyorModel> listItems = state.conveyors;
    ...
    SemanticsLabel(
      label: 'listCountAndLastUpdatedTimeForConveyorList',
      child: LastUpdatedTimeAndTotalCountWidget(
        listLength: listItems.length,
        lastUpdatedTime: state.lastUpdatedTime,
        module: 'Conveyor',
      ),
    ),
  },
);
```

**Semantic labels / locators:**
- `conveyorListItem_$index` — each list row
- `listCountAndLastUpdatedTimeForConveyorList` — footer widget

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_list_loads @smoke @both
Scenario: Conveyors list loads with tracked conveyors
  Given the user is logged in
  When the user taps the conveyor card on the home screen
  Then the conveyors list should be displayed
  And the conveyor count widget should match "td.ExpectedConveyorCount"
```

---

## 🔗 Related

- [TC-CONVEYORS-002 — Add Conveyor happy path](./tc-conveyors-002-add-conveyor-happy-path.md)
- [Suite index](./index.md)
