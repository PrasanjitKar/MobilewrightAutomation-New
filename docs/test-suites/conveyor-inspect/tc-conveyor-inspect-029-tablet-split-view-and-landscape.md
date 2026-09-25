# TC-CONVEYOR-INSPECT-029 — Responsive Layout — tablet split-view and landscape orientation

> Suite: [Conveyor Inspect](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-CONVEYOR-INSPECT-029 |
| **Suite** | conveyor-inspect |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `tablet_landscape_split_view` |
| **Feature File** | `features/regression/conveyor_inspect.feature` |
| **Page Objects** | `src/pages/conveyor-inspect-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on tablet form factors (iPad / Android Tablets) and in landscape device orientation, `ConveyorInspectDetailsScreen` adapts into a split-column layout (Gauge + Idler table on the left, Findings + Map on the right).

---

## ✅ Preconditions

- Tablet device or simulator (e.g. iPad Pro 11", Samsung Galaxy Tab S8)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open `ConveyorInspectDetailsScreen` on a tablet device | UI adapts to wide viewport layout (`isTablet(context)`) |
| 2 | Observe layout columns | Left column contains Gauge, Metadata, and Idler specs; Right column contains Finding Cards and Map |
| 3 | Rotate device to landscape orientation | Layout remains aligned without overflow errors or clipped text |
| 4 | Scroll through finding cards in right column | Right column scrolls independently while left column stays pinned |

---

## 🏁 Expected Results

- Responsive layout takes full advantage of larger screen real estate on tablets

---

## 🔍 Flutter Source Reference

```dart
// conveyor_inspect_details_screen.dart
if (isTablet(context) || isLandscape(context)) {
  return Row(
    children: [
      Expanded(flex: 2, child: LeftSpecsColumn()),
      Expanded(flex: 3, child: RightFindingsColumn()),
    ],
  );
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:tablet_landscape_split_view @regression @both
Scenario: Verify tablet split-column layout on details screen
  Given the user is using a tablet device
  When the user opens the Conveyor Inspect details screen
  Then the screen should display a split two-column layout without UI overflow
```

---

## 🔗 Related

- [TC-CONVEYOR-INSPECT-003 — Details view](./tc-conveyor-inspect-003-details-gauge-and-findings-view.md)
- [Suite index](./index.md)
