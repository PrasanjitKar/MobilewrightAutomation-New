# TC-CONVEYORS-023 — Details step Critical switch toggles and shows tooltip

> Suite: [Conveyors](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYORS-023 |
| **Suite** | conveyors |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyors_details_critical_switch` |
| **Feature File** | `features/regression/conveyors.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify the Critical switch on the Details step can be toggled on/off, shows an informational tooltip, and that its saved value drives the "Critical" filter and `conveyorAtRisk`/criticality-dependent UI elsewhere in the app.

---

## ✅ Preconditions

- User has add/edit permission for conveyors; stepper open on Details step

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate the Critical switch | Off by default for a new conveyor |
| 2 | Tap the info icon next to the switch | `critical_tooltip` explanatory text is shown |
| 3 | Toggle the switch on and save | Conveyor's `criticality` field is persisted as `true` |
| 4 | Reopen the conveyor for edit | Critical switch reflects the saved `true` state |
| 5 | Filter the conveyors list by Critical = Yes | This conveyor appears in the filtered results (ties to TC-CONVEYORS-015) |

---

## 🏁 Expected Results

- Switch state is correctly persisted and reflected on reopen
- Tooltip text is shown on demand and does not block interaction

---

## 🔍 Flutter Source Reference

```dart
// details_step.dart
// AppLocalizations: critical, critical_tooltip
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/conveyorsdata.csv @Key:conveyors_details_critical_switch @regression @both
Scenario: Critical switch toggles and persists
  Given the user is creating or editing a conveyor
  When the user toggles the Critical switch on and saves
  Then the conveyor should be marked as critical
```

---

## 🔗 Related

- [TC-CONVEYORS-015 — Filter by criticality](./tc-conveyors-015-filter-by-criticality.md)
- [Suite index](./index.md)
