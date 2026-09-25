# TC-FIELD-SERVICE-011 — Phone Card — card metadata rendering (phone layout)

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-011 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_card_phone` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on phone viewports, `FieldServiceCard` correctly renders Form Name, Site Name, Conveyor Name, Form Date, Technician Name, Upload Status, and PDF icon.

---

## ✅ Preconditions

- Field service forms exist on device

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Field Service list on phone | Cards render in stacked phone layout |
| 2 | Verify card components | Displays title, site, conveyor, date in format `d MMM yyyy`, and personnel name |
| 3 | Tap card body | Navigates to details stepper screen |

---

## 🏁 Expected Results

- Phone card renders all metadata clearly and responsively

---

## 🔍 Flutter Source Reference

```dart
// field_service_card.dart
Widget _buildPhoneView(BuildContext context, ...) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_card_phone @regression @both
Scenario: Verify field service card layout on phone
  Given the user is on the Field Service list on a phone device
  Then each card should display form title, site, conveyor, date, and technician
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-012 — Tablet card](./tc-field-service-012-card-metadata-tablet-layout.md)
- [Suite index](./index.md)
