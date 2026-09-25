# TC-CONVEYOR-INSPECT-021 — Idler Configuration — structure, idler set counts, and spacing table

> Suite: [Conveyor Inspect](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-021 |
| **Suite** | conveyor-inspect |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `idler_configuration_table` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that the "Idler Configuration" section on `ConveyorInspectDetailsScreen` displays the conveyor's mechanical structure specs: troughing angle, roll count per set, carry idler spacing, return idler spacing, and total idlers calculated.

---

## ✅ Preconditions

- Conveyor has configured idler technical specifications in Conti+ backend

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `ConveyorInspectDetailsScreen`, scroll down to "Idler Configuration" | Configuration container is visible |
| 2 | Verify Troughing Angle | Displays configured angle (e.g. `35°`) |
| 3 | Verify Idler Roll Count | Displays rolls per frame (e.g. `3 Rolls`) |
| 4 | Verify Spacing Specifications | Displays Carry Spacing (e.g. `1.2 m`) and Return Spacing (e.g. `3.0 m`) |
| 5 | Verify Calculated Total Idlers | Displays calculated total idler sets for conveyor length |

---

## 🏁 Expected Results

- Mechanical idler configuration specifications are rendered in clear tabular format

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_details_screen.dart
// Idler configuration section reading conveyor.idlerConfiguration specs
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:idler_configuration_table @regression @both
Scenario: Verify idler configuration table on details screen
  Given the user is on the Conveyor Inspect details screen
  Then the Idler Configuration section should display troughing angle, roll count, and spacing
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-003 — Details view](./tc-conveyor-inspect-003-details-gauge-and-findings-view.md)
- [Suite index](./index.md)
