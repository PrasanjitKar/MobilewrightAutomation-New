# TC-BELT-SCANS-011 — Pull to Refresh — reload belt scans list

> Suite: [Belt Scans](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-BELT-SCANS-011 |
| **Suite** | belt-scans |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `belt_scans_pull_to_refresh` |
| **Feature File** | `features/regression/belt_scans.feature` |
| **Page Objects** | `src/pages/belt-scans-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that pulling down on `BeltScanListScreen` triggers `RefreshIndicator`, dispatches `BeltScanListLoadEvent()`, fetches latest scan updates from the server, and updates the list seamlessly.

---

## ✅ Preconditions

- User is on `BeltScanListScreen` with active network connection

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `BeltScanListScreen`, swipe down from the top | `RefreshIndicator` spinner appears at the top |
| 2 | Wait for network reload | `BeltScanListLoadEvent()` executes; new/updated scans are fetched |
| 3 | Observe spinner dismiss | Spinner hides when refresh completes; list renders updated records |

---

## 🏁 Expected Results

- List reloads cleanly upon pull-to-refresh action

---

## 🔍 Flutter Source Reference

```dart
// belt_scan_list_screen.dart
RefreshIndicator(
  onRefresh: () async {
    beltScanListBloc.add(const BeltScanListLoadEvent());
  },
  child: ListView.builder(...),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:belt_scans_pull_to_refresh @regression @both
Scenario: Pull to refresh belt scans list
  Given the user is on the Belt Scans list screen
  When the user performs a pull-to-refresh gesture
  Then the refresh spinner should display and the belt scans list should reload
```

---

## 🔗 Related

- [TC-BELT-SCANS-012 — Manual sync](./tc-belt-scans-012-manual-sync-with-confirmation-dialog.md)
- [Suite index](./index.md)
