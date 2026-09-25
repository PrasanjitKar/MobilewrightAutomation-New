# TC-INSPECTIONS-023 — Add Event — productivity and uptime percentage fields validation

> Suite: [Inspections](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-023 |
| **Suite** | inspections |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `add_inspection_productivity_uptime` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspection-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when the selected template enables Productivity (`isProductivity`) or Uptime (`isUptime`), numeric percentage input fields are displayed, accept only digits, format with a `%` suffix, and update `state.inspection.productivity` and `uptime`.

---

## ✅ Preconditions

- Site template has `isProductivity: true` and `isUptime: true`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `AddInspectionEventScreen`, observe Productivity and Uptime fields | Fields appear in grid with `%` suffix |
| 2 | Enter "85" into Productivity field | Accepts digits; `state.inspection.productivity` = 85 |
| 3 | Enter "98" into Uptime field | Accepts digits; `state.inspection.uptime` = 98 |
| 4 | Attempt to enter alphabetical/special characters | Input is restricted by `FilteringTextInputFormatter.digitsOnly` |

---

## 🏁 Expected Results

- Productivity and uptime accept valid numeric percentage entries

---

## 🔍 Flutter Source Reference

```dart
// inspection_info_step.dart
if (state.inspection.siteLevelInspectionTemplate?.isProductivity ?? false)
  InputField(
    label: AppLocalizations.of(context)!.productivity,
    textSuffixWidget: const Text('%'),
    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
    keyboardType: TextInputType.number,
  )
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:add_inspection_productivity_uptime @regression @both
Scenario: Enter productivity and uptime metrics
  Given the template enables productivity and uptime
  When the user enters productivity "85" and uptime "98"
  Then the metrics should be stored with percentage format
```

---

## 🔗 Related

- [TC-INSPECTIONS-020 — Site selection auto-naming](./tc-inspections-020-add-inspection-event-site-selection-auto-naming.md)
- [Suite index](./index.md)
