# TC-INSPECTIONS-012 — Filter Modal — filter inspections by Corporate, Site, and Conveyor

> Suite: [Inspections](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-INSPECTIONS-012 |
| **Suite** | inspections |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `inspection_filter_hierarchy` |
| **Feature File** | `features/regression/inspections.feature` |
| **Page Objects** | `src/pages/inspections-list.page.ts`, `src/pages/inspections-filter-modal.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that opening `InspectionFiltersModal` allows cascading multi-select filtering by Customer Corporate, Site, and Conveyor, and dispatches `InspectionListFilterEvent` to update the list.

---

## ✅ Preconditions

- User is on `InspectionListScreen`
- Multiple corporate, site, and conveyor relationships exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On `InspectionListScreen`, tap the filter action button (`filterIcon`) | `InspectionFiltersModal` bottom sheet opens |
| 2 | Select a Customer Corporate in the multi-select dropdown | Site multi-select dropdown dynamically filters to sites under chosen corporate |
| 3 | Select a Site in the site dropdown | Conveyor multi-select dropdown dynamically filters to conveyors under chosen site |
| 4 | Select a specific Conveyor | Filter criteria configured |
| 5 | Tap "Apply" button (`applyFiltersButton`) | Modal closes; `InspectionListFilterEvent` is dispatched |
| 6 | Observe list view | Displays only inspections associated with the selected corporate, site, and conveyor |
| 7 | Re-open filter modal and tap "Reset" (`clearFiltersButton`) | All selections clear; list resets to full dataset |

---

## 🏁 Expected Results

- Cascading multi-select filters properly constrain the inspection records

---

## 🔍 Flutter Source Reference

```dart
// inspections_filters_modal.dart
context.read<InspectionListBloc>().add(
  InspectionListFilterEvent(
    inspectionFilters: InspectionFilters(
      customerCorporateIds: _customerCorporateIds,
      siteIds: _siteIds,
      conveyorIds: _conveyorIds,
      itemCondition: _filterItemConditions,
      itemStatus: _filterItemStatus,
      sortBy: _sortBy,
    ),
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:inspection_filter_hierarchy @regression @both
Scenario: Filter inspections by corporate site and conveyor
  Given the user is on the Inspections screen
  When the user opens the inspection filter modal
  And the user selects corporate "td.CorporateName", site "td.SiteName", and conveyor "td.ConveyorName"
  And the user applies filters
  Then only matching inspections should be displayed in the list
```

---

## 🔗 Related

- [TC-INSPECTIONS-001 — Inspection List loads](./tc-inspections-001-inspection-list-loads-with-permitted-view.md)
- [TC-INSPECTIONS-013 — Filter modal by condition and status](./tc-inspections-013-filter-modal-by-condition-and-status.md)
- [Suite index](./index.md)
