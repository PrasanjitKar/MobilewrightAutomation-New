# TC-CONVEYOR-INSPECT-004 — Home Dashboard — Conveyor Inspect summary card and navigation

> Suite: [Conveyor Inspect](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-004 |
| **Suite** | conveyor-inspect |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `home_conveyor_inspect_card` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/home.page.ts`, `src/pages/conveyor-inspect-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when a user has `ConveyorInspectModule.conveyorInspectModule` view permission, the Home dashboard displays the "Conveyor Inspect" card with summary counts, and tapping it navigates to `ConveyorInspectListScreen`.

---

## ✅ Preconditions

- User is logged in with `CONVEYOR-INSPECT-MODULE` view permission

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Home screen, locate the Conveyor Inspect module card | Card is displayed with icon and summary counters |
| 2 | Tap the Conveyor Inspect card | `ConveyorInspectListScreen` opens with header "Conveyor Inspect" |
| 3 | Tap back arrow in app bar | Returns to Home dashboard |

---

## 🏁 Expected Results

- Home dashboard properly links to the Conveyor Inspect workflow

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart
if (_canViewModule(ConveyorInspectModule.conveyorInspectModule))
  // Conveyor Inspect Card widget
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:home_conveyor_inspect_card @regression @both
Scenario: Navigate to Conveyor Inspect from Home dashboard
  Given the user is on the Home dashboard with conveyor inspect permission
  When the user taps the Conveyor Inspect card
  Then the Conveyor Inspect list screen should be displayed
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
