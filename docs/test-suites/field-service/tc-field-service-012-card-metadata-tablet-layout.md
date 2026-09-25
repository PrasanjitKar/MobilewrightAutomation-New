# TC-FIELD-SERVICE-012 — Tablet Card — card metadata rendering (tablet layout)

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-012 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_card_tablet` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on tablet form factors, `FieldServiceCard` renders in a multi-column row layout (`_buildTabView`) showing date, title, site, conveyor, name, status, and PDF action.

---

## ✅ Preconditions

- Tablet emulator or iPad device

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Launch app on tablet in landscape mode | Screen adapts to tablet layout |
| 2 | Open Field Service list | Records render as wide table rows |
| 3 | Verify columns | Date, Title, Site, Conveyor, Name, and Status columns align properly |

---

## 🏁 Expected Results

- Tablet layout arranges table data cleanly across wide screen

---

## 🔍 Flutter Source Reference

```dart
// field_service_card.dart
Widget _buildTabView(BuildContext context, ...) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_card_tablet @regression @both
Scenario: Verify field service table layout on tablet
  Given the user is on a tablet device in Field Service
  Then the list should render in multi-column row format
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-011 — Phone card](./tc-field-service-011-card-metadata-phone-layout.md)
- [Suite index](./index.md)
