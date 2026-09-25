# TC-INSPECTIONS-001 — Inspection List — loads inspection records with permitted view

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-001 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `inspection_list_load` |
| **Feature File** | `features/smoke/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that a user with `InspectionModule.inspectionModule` (`INSPECTION-MODULE`) `Permission.view` can open the Inspections list, view inspection records with their metadata (name, site, inspector, date, conveyor count pill, and condition badges), and observe the total count widget.

---

## ✅ Preconditions

- User is authenticated with an account having `InspectionModule.inspectionModule` view permission
- Inspection records exist in the account

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Launch Conti+ mobile app and log in | User lands on Home dashboard |
| 2 | Tap the "Inspections" tab in bottom navigation or tap the "Inspections" card on Home | `InspectionListScreen` loads; title displays "Inspections" (`inspectionListAppbarTitle`) |
| 3 | Observe the inspection list items | Each record displays via `inspectionListItem_$index` with name (`inspectionName_$index`), site (`siteName_$index`), inspector (`inspectorName_$index`), and date (`inspectionDate_$index`) |
| 4 | Verify condition badges | Good, Fault, Poor, Critical, and To Be Completed flag badges are rendered |
| 5 | Verify footer counter | `LastUpdatedTimeAndTotalCountWidget` renders with label `listCountAndLastUpdatedTimeForInspectionList` |

---

## 🏁 Expected Results

- Inspection list renders all accessible inspection records
- Metadata fields, condition badges, and total count display accurately

---

## 🔍 Flutter Source Reference

```dart
// inspection_list_screen.dart
final bool canView = context.read<UserInfoCubit>().state.user!.canAccess(
  InspectionModule.inspectionModule,
  Permission.view,
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:inspection_list_load @smoke @both
Scenario: View inspection list
  Given the user is logged in with inspection view permission
  When the user navigates to the Inspections screen
  Then the inspections list should be displayed with valid inspection items
  And each inspection item should show name, site, inspector, date, and condition flags
```

---

## 🔗 Related

- [TC-INSPECTIONS-002 — Create inspection event happy path](./tc-inspections-002-create-inspection-event-happy-path.md)
- [Suite index](./index.md)
