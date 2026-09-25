# TC-HEAVY-EQUIPMENT-028 — Error Handling — network error and cache invalidation handling

> Suite: [Heavy Equipment](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-HEAVY-EQUIPMENT-028 |
| **Suite** | heavy-equipment |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `heavy_equipment_error_handling` |
| **Feature File** | `features/regression/heavy_equipment.feature` |
| **Page Objects** | `src/pages/heavy-equipment-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when fetching equipment details encounters a failure or deleted record on the server, `HeavyEquipmentBloc` displays a snackbar error, removes invalid cache, and pops back to the list screen.

---

## ✅ Preconditions

- Equipment record that was deleted on backend

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Attempt to open details for a removed equipment ID | API returns 404 / error |
| 2 | Observe UI reaction | Red SnackBar displays `somethingWentWrong` ("Something went wrong") |
| 3 | Observe navigation | Screen automatically pops back to the list; cache invalidation clears record |

---

## 🏁 Expected Results

- Missing or deleted equipment errors are handled gracefully with cache invalidation

---

## 🔍 Flutter Source Reference

```dart
// heavy_equipment_screen.dart & heavy_equipment_bloc.dart
if (state.status.isFailed) { ScaffoldMessenger.of(context).showSnackBar(...); Navigator.pop(context, true); }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:heavy_equipment_error_handling @regression @both
Scenario: Handle error when opening unavailable equipment record
  Given an equipment record was removed from the backend
  When the user attempts to view its details
  Then an error snackbar should appear and the screen pop back to the list
```

---

## 🔗 Related

- [TC-HEAVY-EQUIPMENT-002 — Details screen](./tc-heavy-equipment-002-details-screen-and-header-card.md)
- [Suite index](./index.md)
