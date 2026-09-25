# TC-INSPECTIONS-010 — Pull to Refresh — triggers background sync and reloads list

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-010 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_pull_to_refresh` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that performing a swipe-down pull-to-refresh gesture on `InspectionListScreen` dispatches `InspectionListSyncAllEvent()`, shows the refresh spinner, syncs any pending records/photos, and fetches fresh inspection data from the backend.

---

## ✅ Preconditions

- User is on `InspectionListScreen` with active network connection

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `InspectionListScreen`, perform vertical swipe down gesture | `RefreshIndicator` spinner activates |
| 2 | Observe BLoC event trigger | `InspectionListBloc.add(InspectionListSyncAllEvent())` is dispatched |
| 3 | Wait for sync completion | Linear progress indicator / spinner disappears; list updates with latest inspection items and timestamp |

---

## 🏁 Expected Results

- Pull to refresh seamlessly triggers sync and refreshes inspection records

---

## 🔍 Flutter Source Reference

```dart
// inspection_list_screen.dart
RefreshIndicator(
  onRefresh: () async {
    final InspectionListBloc inspectionListBloc = BlocProvider.of<InspectionListBloc>(context);
    inspectionListBloc.add(const InspectionListSyncAllEvent());
  },
  child: ListView.builder(...),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_pull_to_refresh @regression @both
Scenario: Pull to refresh syncs inspection list
  Given the user is on the Inspections screen
  When the user performs a pull to refresh gesture
  Then the inspection sync should be executed
  And the list should refresh with updated inspection records
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
