# TC-INSPECTIONS-018 — Expandable Row — accordion expands to display horizontal inspection item slider

> Suite: [Inspections](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-018 |
| **Suite** | inspections |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_row_expand_accordion` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the expand accordion arrow (`expandItem_$index`) on an inspection row expands `InspectionRowItemPage`, revealing a horizontal `PageView` carousel of `InspectionItemCard` widgets displaying finding photos, condition, failure mode, and quick edit action.

---

## ✅ Preconditions

- Inspection containing one or more finding items exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `InspectionListScreen`, locate an inspection with items | Right arrow icon (`expandItem_$index`) is visible |
| 2 | Tap the expand arrow | Arrow rotates to down arrow; accordion expands below the row |
| 3 | Observe expanded content (`InspectionRowItemPage`) | Horizontal item cards render with `inspectionItem_$index` |
| 4 | Swipe horizontally across cards | PageView navigates between findings |
| 5 | Tap "Edit" on a card (if permitted) | Opens `InspectionItemDetails` in edit mode |
| 6 | Tap the down arrow to collapse | Accordion collapses and hides the preview carousel |

---

## 🏁 Expected Results

- In-place accordion expansion allows quick browsing and editing of inspection findings directly from the list

---

## 🔍 Flutter Source Reference

```dart
// inspection_row.dart
if (widget.isExpanded)
  InspectionRowItemPage(
    inspection: widget.inspection,
    isFreeUser: widget.isFreeUser,
    headerForImage: widget.headerForImage,
    onChange: (value) => widget.onExpand?.call(),
  )
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_row_expand_accordion @regression @both
Scenario: Expand inspection row to browse findings
  Given the user is on the Inspections screen
  When the user taps the expand arrow on an inspection with findings
  Then the horizontal item carousel should expand showing inspection finding cards
  When the user taps the collapse arrow
  Then the carousel should collapse
```

---

## 🔗 Related

- [TC-INSPECTIONS-015 — Inspection row metadata](./tc-inspections-015-inspection-row-metadata-and-condition-badges.md)
- [Suite index](./index.md)
