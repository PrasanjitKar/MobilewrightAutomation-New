# TC-INSPECTIONS-006 — Navigation — Bottom navigation bar Inspections tab opens list

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-006 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `bottom_nav_inspections_tab` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/app-nav.page.ts`, `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the "Inspections" tab in the bottom navigation bar (`inspectionsTab`) switches active index and loads `InspectionListScreen`.

---

## ✅ Preconditions

- User has `InspectionModule.inspectionModule` `Permission.view`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Home screen, observe bottom navigation bar | "Inspections" tab with SVG icon `assets/svg/inspection.svg` is present (`inspectionsTab`) |
| 2 | Tap the "Inspections" tab | Bottom navigation tab switches active state |
| 3 | Observe main view | `InspectionListScreen` loads with header "Inspections" |
| 4 | Tap another tab (e.g. Home), then tap Inspections again | Returns to Inspections list with state preserved |

---

## 🏁 Expected Results

- Bottom navigation tab seamlessly switches to Inspections view

---

## 🔍 Flutter Source Reference

```dart
// app.dart
SemanticsLabel(
  label: 'inspectionsTab',
  child: BottomNavigationBarItem(
    icon: SvgPicture.asset('assets/svg/inspection.svg'),
    label: AppLocalizations.of(context)!.inspections,
  ),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:bottom_nav_inspections_tab @regression @both
Scenario: Navigate to inspections from bottom navigation
  Given the user is on the main application view
  When the user taps the Inspections tab in the bottom navigation bar
  Then the Inspections screen should be displayed
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
