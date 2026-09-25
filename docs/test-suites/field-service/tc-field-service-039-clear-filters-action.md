# TC-FIELD-SERVICE-039 — Clear Filters — clear filters action and filter indicator dot

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-039 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_clear_filters` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when filters are active, a red dot appears on the app bar filter icon, and tapping "Clear Filters" in the modal resets all criteria and hides the dot.

---

## ✅ Preconditions

- Filters applied on `FieldServiceListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe filter icon in app bar when filters are applied | Red badge circle appears on filter icon |
| 2 | Open filter modal and tap "Clear Filters" in header | Selections reset to default (Last Modified, all unselected) |
| 3 | Tap "Save" | Full list restored; red badge disappears |

---

## 🏁 Expected Results

- Filter badge displays active filter state and clears properly

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_screen.dart & field_service_filter_modal.dart
if (state.filters.hasFilters) { return const CircleAvatar(backgroundColor: Colors.red, radius: 5); }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_clear_filters @regression @both
Scenario: Clear filters and verify indicator badge removal
  Given active filters are applied with a red dot badge
  When the user clears filters and saves
  Then all filters should reset and the red badge disappear
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-036 — Filter layout](./tc-field-service-036-filter-modal-layout-and-counter.md)
- [Suite index](./index.md)
