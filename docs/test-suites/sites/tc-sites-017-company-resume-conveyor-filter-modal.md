# TC-SITES-017 — Company Résumé conveyor filter modal (sort, inspection status, cover wear condition)

> Suite: [Sites](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-SITES-017 |
| **Suite** | sites |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `company_resume_conveyor_filters` |
| **Feature File** | `features/regression/sites.feature` |
| **Page Objects** | `src/pages/company-resume.page.ts`, `src/pages/site-conveyors-filters.modal.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that tapping the filter button on `CompanyResumeScreen` in Site mode opens `SiteConveyorsFiltersModal`, allowing the user to filter conveyors by Sort By (Last Modified / A-Z / Z-A), Inspection Items Status (Complete / To be completed / NA), and Cover Wear Condition (Critical / Poor / Good / NA).

---

## ✅ Preconditions

- User is on `CompanyResumeScreen` for a site

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap the filter icon (`filterButtonForConveyor`) | `SiteConveyorsFiltersModal` opens in bottom sheet |
| 2 | Select sort option "A-Z" (`aToZ`) | Sort radio button updates |
| 3 | In "Inspection Items Status" multi-select, select "Complete" (`1`) | Option selected |
| 4 | In "Cover Wear Condition" multi-select, select "Critical" (`critical`) | Option selected |
| 5 | Verify live result count | Modal header shows live filtered count matching criteria |
| 6 | Tap "Save" button | Filters are applied; modal closes; red active-filter dot appears on filter icon |
| 7 | Re-open modal and tap "Clear Filters" | Sort resets to Last Modified and all multi-selects clear |

---

## 🏁 Expected Results

- Filters correctly scope conveyor sub-list to matching condition and status
- Active filter badge is displayed on the filter icon when filters are active

---

## 🔍 Flutter Source Reference

```dart
// site_conveyors_filters_modal.dart
void _applyFilters() {
  context.read<ConveyorListBloc>().add(
    ConveyorListFilterEvent(
      filter: ConveyorFilters(
        coverWearCondition: _coverwearCondition,
        sortBy: _sortBy,
        filterInspectionItems: _itemStatus,
        siteIds: [widget.site.companyId ?? ''],
      ),
    ),
  );
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:company_resume_conveyor_filters @regression @both
Scenario: Filter conveyors in site resume
  Given the user is on the company resume screen for a site
  When the user taps the filter icon
  And the user selects cover wear condition "Critical"
  And the user taps save filter
  Then the conveyor sub list should only display critical cover wear conveyors
  And a filter badge should be visible on the filter icon
```

---

## 🔗 Related

- [TC-SITES-015 — Tap site row opens Company Résumé](./tc-sites-015-tap-site-row-opens-company-resume.md)
- [Suite index](./index.md)
