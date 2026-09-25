# TC-CONVEYOR-INSPECT-011 — Row Presentation — displays conveyor, site, territory chip, and status

> Suite: [Conveyor Inspect](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-011 |
| **Suite** | conveyor-inspect |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_inspect_row_presentation` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `ConveyorInspectRow` formats and renders the conveyor name, site name, uppercase territory chip, formatted inspection date (`d MMM yyyy`), and upload status chip ("Uploaded" vs "Pending").

---

## ✅ Preconditions

- Conveyor inspect record exists with known territory and site associations

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate an inspection row on `ConveyorInspectListScreen` | `ConveyorInspectRow` is rendered |
| 2 | Verify conveyor name and site name | Text labels match conveyor and site entities |
| 3 | Verify territory badge (`ContiplusChip`) | Displays territory name in uppercase (e.g. `CHILE NORTH`) |
| 4 | Verify inspection date | Formatted as `d MMM yyyy` (e.g. "12 Jun 2026") |
| 5 | Verify status pill | Displays "Uploaded" or "Pending" |

---

## 🏁 Expected Results

- Row clearly presents all core inspection metadata and visual badges

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_row.dart
final String territoryName = state.territories.firstWhereOrNull((e) => e.territoryId == conveyorInspect.territoryId)?.name ?? '-';
ContiplusChip(label: territoryName.toUpperCase(), backgroundColor: ContiplusColors.continentalGray3)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_inspect_row_presentation @regression @both
Scenario: Verify conveyor inspect row presentation
  Given the user is on the Conveyor Inspect screen
  Then the row should display conveyor name, site name, territory chip, and date
  And the status badge should show the upload status
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-001 — List loads](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
