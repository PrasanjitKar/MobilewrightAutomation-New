# TC-CONVEYORS-034 — Back navigation from Conveyor Information hub returns to Home/list correctly

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-034 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_information_hub_back_navigation` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-information.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the back arrow on the Conveyor Information hub clears the file-manager list state and correctly routes back to Home (default entry) or back to Company Résumé (when opened from there), without navigating incorrectly.

---

## ✅ Preconditions

- User has view permission for conveyors
- One test path opens the hub from the Conveyors list (default); another opens it from Company Résumé's site conveyors sub-list

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open a conveyor's Information hub from the Conveyors list | Hub loads normally |
| 2 | Tap the back arrow (`backArrowFromConveyorInfo`) | `FileManagerListLoadEvent(relatedType: 'conveyor', parentFolders: [], clearBlocData: true)` dispatched; then `AppLoadEvent(selectedPage: 1, conveyorsList: ...)` and `Navigator.popUntil((route) => route.isFirst)` — user lands back on Home with the Conveyors tab/card selected |
| 3 | Open the same conveyor's Information hub from Company Résumé's site conveyors sub-list | Hub loads normally |
| 4 | Tap the back arrow | File-manager list is cleared as above, but navigation is a simple `Navigator.pop()` back to Company Résumé (not `popUntil` to Home) |

---

## 🏁 Expected Results

- File manager list state is always cleared on exit from the hub, regardless of entry point
- Navigation destination correctly differs based on whether the hub was opened from Company Résumé or elsewhere

---

## 🔍 Flutter Source Reference

```dart
// conveyor_information_screen.dart — back navigation
// Clears file manager list:
//   FileManagerListLoadEvent(relatedType: 'conveyor', parentFolders: [], clearBlocData: true)
// If not from company resume:
//   AppLoadEvent(selectedPage: 1, conveyorsList: context.read<ConveyorListBloc>().state.conveyors)
//   Navigator.of(context).popUntil((route) => route.isFirst)
// Else just Navigator.of(context).pop()
```

**Semantic label:** `backArrowFromConveyorInfo`

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_information_hub_back_navigation @regression @both
Scenario: Back navigation from Information hub returns to Home
  Given the user opened the Conveyor Information hub from the conveyors list
  When the user taps the back arrow
  Then the user should return to the Home screen with the Conveyors tab selected
```

---

## 🔗 Related

- [TC-CONVEYORS-033 — Information hub permission-gated cards](./tc-conveyors-033-information-hub-permission-gated-cards.md)
- [Suite index](./index.md)
