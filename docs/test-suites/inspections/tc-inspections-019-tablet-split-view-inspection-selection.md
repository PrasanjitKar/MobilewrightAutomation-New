# TC-INSPECTIONS-019 — Tablet Layout — tablet split view with sticky list and detailed card highlights

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-019 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `tablet_split_view_inspection` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iPad / Android Tablet (`@both`) |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when running on a tablet device, `InspectionRow` renders the horizontal multi-column row (`tabletView`), adjusts column widths for date, site, conveyor count, inspector, and flag badges, and highlights the selected row with `ContiplusColors.continentalGray4`.

---

## ✅ Preconditions

- App is running on an iPad or Android Tablet emulator/device (`DeviceHelper.isPhone() == false`)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Inspections screen on tablet | `tabletView()` layout is rendered |
| 2 | Observe tabular column alignment | Name (129px), Date, Site (78px), Conveyor count, Inspector (90px), Flag Badges (258px), Status (100px), and right arrow are aligned horizontally |
| 3 | Tap an inspection row | Row background highlights with `ContiplusColors.continentalGray4` |
| 4 | Observe expanded findings layout | Carousel cards render with fixed tablet width (360px) and viewport fraction 0.45 |

---

## 🏁 Expected Results

- Responsive tablet UI utilizes screen estate efficiently with multi-column tabular layout

---

## 🔍 Flutter Source Reference

```dart
// inspection_row.dart
if (!isPhone) {
  return tabletView(isPhone, inspectionItems, isPending);
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:tablet_split_view_inspection @regression @both
Scenario: Tablet inspection list multi-column layout
  Given the application is running on a tablet device
  When the user views the Inspections screen
  Then the inspection rows should display in a multi-column tabular layout
  When the user taps an inspection row
  Then the row should be highlighted with the active selection color
```

---

## 🔗 Related

- [TC-INSPECTIONS-015 — Inspection row metadata](./tc-inspections-015-inspection-row-metadata-and-condition-badges.md)
- [Suite index](./index.md)
