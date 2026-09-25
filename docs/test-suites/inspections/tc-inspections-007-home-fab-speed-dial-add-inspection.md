# TC-INSPECTIONS-007 — Floating Action Button — Speed Dial adds inspection from Home/List

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-007 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `home_fab_add_inspection` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/home.page.ts`, `src/pages/inspection-add.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that the Floating Action Button on `InspectionListScreen` or Home Speed Dial renders the "Add Inspection" action when user has `Permission.add`, and tapping it opens `AddInspectionEventScreen`.

---

## ✅ Preconditions

- User has `InspectionModule.inspectionModule` `Permission.add`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | From `InspectionListScreen` or Home screen, observe Floating Action Button (`floatingActionButtonAddInspection`) | FAB is visible |
| 2 | Tap the FAB | `AddInspectionEventScreen` opens; title displays "Add Inspection" (`addInspectionEventAppbarTitle`) |
| 3 | Tap back arrow (`backButtonFromAddInpsection`) | Returns to previous screen without creating any record |

---

## 🏁 Expected Results

- FAB correctly launches `AddInspectionEventScreen`

---

## 🔍 Flutter Source Reference

```dart
// app.dart
if (state.user?.canAccess(InspectionModule.inspectionModule, Permission.add) ?? false)
  SpeedDialChild(
    child: SvgPicture.asset('assets/svg/inspection.svg'),
    label: AppLocalizations.of(context)!.addInspection,
    onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const AddInspectionEventScreen())),
  )
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:home_fab_add_inspection @regression @both
Scenario: Open add inspection from floating action button
  Given the user has inspection add permission
  When the user taps the add inspection floating action button
  Then the Add Inspection screen should be opened
```

---

## 🔗 Related

- [TC-INSPECTIONS-002 — Add inspection event happy path](./tc-inspections-002-create-inspection-event-happy-path.md)
- [Suite index](./index.md)
