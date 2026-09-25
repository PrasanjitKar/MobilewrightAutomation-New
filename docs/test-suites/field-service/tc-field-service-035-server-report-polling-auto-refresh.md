# TC-FIELD-SERVICE-035 — Report Polling — server report generation polling and auto-refresh

> Suite: [Field Service](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-035 |
| **Suite** | field-service |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_report_polling` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that upon creating or saving a form, `FieldServiceListBloc` polls the server periodically (every 15s up to 5 attempts) to check for generated PDF `reportUrl` and auto-refreshes the card icon.

---

## ✅ Preconditions

- Newly saved form without an immediate `reportUrl`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Save a newly completed field service form | Form returns to list |
| 2 | Observe polling behavior | `startPolling(id)` initiates background timer at 15s intervals |
| 3 | When backend completes PDF rendering | Polling detects generated report; PDF icon changes to active state |

---

## 🏁 Expected Results

- Asynchronous PDF report readiness is discovered automatically via polling

---

## 🔍 Flutter Source Reference

```dart
// field_service_list_bloc.dart
void startPolling(String id) { activeTimers[id] = Timer.periodic(const Duration(seconds: 15), ...); }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_report_polling @regression @both
Scenario: Auto-refresh PDF status via background polling
  Given a newly submitted field service form
  When background polling detects the generated PDF report
  Then the card PDF icon should transition to active state
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-013 — PDF preview](./tc-field-service-013-pdf-report-preview.md)
- [Suite index](./index.md)
