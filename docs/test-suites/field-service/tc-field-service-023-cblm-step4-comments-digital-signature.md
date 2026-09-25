# TC-FIELD-SERVICE-023 — CBLM Signature — CBLM step 4 comments and digital signature capture

> Suite: [Field Service](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-FIELD-SERVICE-023 |
| **Suite** | field-service |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `field_service_cblm_signature` |
| **Feature File** | `features/regression/field_service.feature` |
| **Page Objects** | `src/pages/field-service-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on Step 4, users can enter comments and sign on the interactive digital signature canvas, clear signature, or view existing signature in read-only mode.

---

## ✅ Preconditions

- On Step 4 of CBLM form

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter remarks in the Comments field | Comments saved |
| 2 | Draw a signature on the `SignatureWidget` canvas | Canvas captures drawing strokes |
| 3 | Tap "Clear Signature" | Canvas resets to blank |
| 4 | Draw signature again and tap Create/Save | Form saves with captured signature data |

---

## 🏁 Expected Results

- Digital signature and comments are saved and bound to the service record

---

## 🔍 Flutter Source Reference

```dart
// additional_details_step.dart
SignatureWidget(...) & _buildEditSignatureView(...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:field_service_cblm_signature @regression @both
Scenario: Capture digital signature in CBLM Step 4
  Given the user is on Step 4 Additional Details
  When the user enters comments and signs on the signature canvas
  Then the signature should be captured and preserved upon save
```

---

## 🔗 Related

- [TC-FIELD-SERVICE-022 — Photos](./tc-field-service-022-cblm-step4-photo-attachments.md)
- [Suite index](./index.md)
