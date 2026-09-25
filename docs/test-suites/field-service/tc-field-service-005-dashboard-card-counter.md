# TC-FIELD-SERVICE-005 — Dashboard Card Counter — card counter and recent list sync

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-005 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_dashboard_counter` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that the Field Service card counter on the Home dashboard accurately reflects the number of records returned in the list.

---

## ✅ Preconditions

- Multiple field service forms exist for the current user's organization

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Note the number on the Home Field Service module card | Number $N$ is noted |
| 2 | Tap the card to open `FieldServiceListScreen` | List loads |
| 3 | Check the total count in the bottom `LastUpdatedTimeAndTotalCountWidget` | Count matches $N$ |

---

## 🏁 Expected Results

- Dashboard card count is synchronized with list count

---

## 🔍 Flutter Source Reference

```dart
// summary_bloc.dart & home_screen.dart
state.summaryData.fieldServiceCount
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_dashboard_counter @regression @both
Scenario: Verify field service dashboard count matches list count
  Given the user is on the Dashboard
  When the user reads the Field Service count on the card
  And navigates to the Field Service list
  Then the total count in the list footer should match the dashboard card
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-003 — Navigation sources](./tc-field-service-003-navigation-entry-points.md)
- [Suite index](./index.md)
