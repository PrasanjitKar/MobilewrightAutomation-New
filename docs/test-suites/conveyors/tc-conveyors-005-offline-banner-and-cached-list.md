# TC-CONVEYORS-005 — Offline banner is shown and list loads from cache when offline

> Suite: [Conveyors](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-005 |
| **Suite** | conveyors |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_offline_banner` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when the device is offline, the Conveyors list shows the offline banner and serves conveyors from local cache instead of failing.

---

## ✅ Preconditions

- User has previously loaded the conveyors list while online (cache populated)
- Device network can be toggled off

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open the Conveyors list while online | List loads normally, no offline banner |
| 2 | Disable device connectivity | `ConnectivityHelper.isOnline` becomes `false` |
| 3 | Trigger a reload (pull-to-refresh or re-enter screen) | `ConveyorListState.status` becomes `ListStatus.offline` |
| 4 | Observe screen | `offlineTextForConveyor` banner shown with text "Working offline"; cached conveyors still rendered |

---

## 🏁 Expected Results

- Offline banner (`offlineTextForConveyor`) is visible with the exact text "Working offline"
- List still shows the previously cached conveyors (`ctp.conveyorManager.getFromCache()`), filtered by non-deleted items
- No crash or blank screen occurs

---

## 🔍 Flutter Source Reference

```dart
// conveyor_list_screen.dart
if (state.status.isOffline)
  SemanticsLabel(
    label: 'offlineTextForConveyor',
    child: Text(AppLocalizations.of(context)!.workingOffline), // "Working offline"
  ),

// conveyor_list_bloc.dart — _mapConveyorListLoadEventToState()
} catch (e) {
  emit(state.copyWith(
    status: ListStatus.offline,
    conveyors: cache,
    headerForImage: ...,
  ));
  add(ConveyorListFilterEvent(filter: state.filters));
  debugPrint('Error loading conveyors from Network. Error: $e');
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_offline_banner @regression @both
Scenario: Offline banner shown and cached list served when offline
  Given the user is on the conveyors list with cached data
  When the device goes offline
  And the user refreshes the conveyors list
  Then the offline banner "Working offline" should be displayed
  And the cached conveyor list should still be visible
```

---

## 🔗 Related

- [Suite index](./index.md)
