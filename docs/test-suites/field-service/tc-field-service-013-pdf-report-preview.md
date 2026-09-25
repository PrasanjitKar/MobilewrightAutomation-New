# TC-FIELD-SERVICE-013 — PDF Preview — PDF report preview via authenticated stream

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-013 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_pdf_preview` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-list.page.ts`, `src/pages/file-preview.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the PDF icon on a field service card with a valid `reportUrl` opens `FilePreviewScreen` passing authenticated Cognito tokens, enabling PDF viewing and download (if permitted).

---

## ✅ Preconditions

- Field service form exists with a generated `reportUrl`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a field service card with an active PDF icon | Icon is rendered in active color |
| 2 | Tap the PDF icon | App retrieves Cognito session and navigates to `FilePreviewScreen` |
| 3 | Observe preview screen | PDF document renders with page controls and download button |

---

## 🏁 Expected Results

- PDF renders smoothly in authenticated viewer

---

## 🔍 Flutter Source Reference

```dart
// field_service_card.dart
FilePreviewScreen(file: fileModel, moduleName: 'fieldservice', useDownloadUrl2: true, ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_pdf_preview @regression @both
Scenario: Preview field service PDF report
  Given a field service record with a generated PDF report
  When the user taps the PDF preview icon
  Then the file preview screen should render the report document
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-004 — Permission gating](./tc-field-service-004-permission-gating.md)
- [Suite index](./index.md)
