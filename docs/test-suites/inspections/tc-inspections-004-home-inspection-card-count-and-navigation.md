# TC-INSPECTIONS-004 — Home Dashboard — Inspection card displays summary counters and navigates

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-004 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `home_inspection_card_counters` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/home.page.ts`, `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that the Home dashboard displays the "Inspections" card with calculated summary counters (Total count, Fault, Poor, Critical, and To Be Completed), and tapping the card navigates to `InspectionListScreen`.

---

## ✅ Preconditions

- User is logged in with `InspectionModule.inspectionModule` `Permission.view`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Home screen, locate the "Inspections" summary card (`inspectionCard`) | Card is visible |
| 2 | Check summary counters on card | Displays Total inspections count, and condition breakdown (Fault, Poor, Critical, To Be Completed) calculated via `getInspectionSummaryFromList()` |
| 3 | Tap the "Inspections" summary card | `InspectionListScreen` opens |
| 4 | Verify list content | Displays full inspection list matching total count |

---

## 🏁 Expected Results

- Card counters match the underlying inspection dataset
- Navigation smoothly opens `InspectionListScreen`

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart
final ItemSummary inspectionSummary = state.getInspectionSummaryFromList(inspectionList);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:home_inspection_card_counters @regression @both
Scenario: Home inspection card counters and navigation
  Given the user is on the Home dashboard
  Then the Inspections card should display summary counters for total, fault, poor, and critical
  When the user taps the Inspections card
  Then the Inspections list screen should be displayed
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
