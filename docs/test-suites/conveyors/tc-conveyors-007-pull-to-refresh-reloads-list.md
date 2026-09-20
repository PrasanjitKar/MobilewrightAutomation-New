# TC-CONVEYORS-007 — Pull-to-refresh reloads the list and updates the last-updated/count widget

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-007 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_pull_to_refresh` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify swiping down on the Conveyors list dispatches a full reload and updates the last-updated time and total count once complete.

---

## ✅ Preconditions

- User has view permission for conveyors and is online
- Server-side conveyor data has changed since the last load (e.g. a new conveyor added via another session)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open the Conveyors list | Existing list and last-updated time shown |
| 2 | Pull down to refresh | `ConveyorListLoadEvent()` dispatched |
| 3 | Observe loading indicator | `LinearProgressIndicator` shown while `state.status.isLoading` |
| 4 | Wait for refresh to complete | List reflects latest server data; `lastUpdatedTime` and count in `listCountAndLastUpdatedTimeForConveyorList` update |

---

## 🏁 Expected Results

- Refresh reloads from network (not just cache) since `hardLoad` isn't required for a manual pull
- Count and last-updated timestamp are refreshed to match the new data
- No duplicate/stale rows remain after refresh

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_screen.dart — buildList()
return RefreshIndicator(
  notificationPredicate: isFreeUser ? (_) => false : (_) => true,
  onRefresh: () async {
    final ConveyorListBloc conveyorListBloc = BlocProvider.of<ConveyorListBloc>(context);
    conveyorListBloc.add(const ConveyorListLoadEvent());
  },
  child: ListView.builder(...),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_pull_to_refresh @regression @both
Scenario: Pull-to-refresh reloads the conveyors list
  Given the user is on the conveyors list
  When the user pulls down to refresh
  Then the conveyor list should reload
  And the last-updated time and count widget should reflect the refreshed data
```

---

## 🔗 Related

- [Suite index](./index.md)
