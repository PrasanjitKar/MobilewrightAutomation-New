# TC-BELT-SCANS-035 — Timer Refresh — background periodic auto-refresh

> Suite: [Belt Scans](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-035 |
| **Suite** | belt-scans |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_periodic_timer_refresh` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when `BeltScanListTimerEvent` fires periodically, `BeltScanListBloc` triggers a silent data reload only if the screen is not already loading, no search query is active (`state.search.isEmpty`), and no filters are applied (`!state.filters.hasFilters`).

---

## ✅ Preconditions

- App is active in background or timer interval elapses

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `BeltScanListScreen` with default unfiltered state | App is idle |
| 2 | Periodic timer fires `BeltScanListTimerEvent` | `_mapBeltScanListTimerEventToState` executes `BeltScanListLoadEvent()` silently |
| 3 | Apply a filter or type a search query | Active filter or search query is present |
| 4 | Periodic timer fires `BeltScanListTimerEvent` again | Timer event is ignored, preserving user's active filter and scroll position |

---

## 🏁 Expected Results

- Background timer refreshes data silently without disrupting user interaction

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_bloc.dart
Future<void> _mapBeltScanListTimerEventToState(BeltScanListTimerEvent event, emit) async {
  if (!state.status.isLoading && state.search.isEmpty && !state.filters.hasFilters) {
    add(const BeltScanListLoadEvent());
  }
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_periodic_timer_refresh @regression @both
Scenario: Periodic background timer refresh behavior
  Given the Belt Scans list is in an idle unfiltered state
  When the periodic timer event triggers
  Then a silent background refresh should execute without disrupting the view
```

---

## 🔗 Related

- [TC-BELT-SCANS-011 — Pull to refresh](./tc-belt-scans-011-pull-to-refresh-list.md)
- [Suite index](./index.md)
