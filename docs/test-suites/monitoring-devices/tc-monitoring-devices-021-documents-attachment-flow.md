# TC-MONITORING-DEVICES-021 — Documents — attachment and certificate files flow

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-021 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_documents` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that users can attach diagnostic manuals, spec sheets, and calibration certificates via `UserAndDocumentFilesWidget` on Step 1, and preview/download them on view mode.

---

## ✅ Preconditions

- User is editing or creating a monitoring device

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Scroll to "Documents" section on Step 1 | Document upload container is visible |
| 2 | Tap "Add Document" / file picker | Native document picker opens |
| 3 | Pick a PDF manual | Document is added to the attachment queue |
| 4 | Save device and re-open in view mode | Attached document is listed with PDF icon; tapping opens `FilePreviewScreen` |

---

## 🏁 Expected Results

- Diagnostic documents are attached, persisted, and previewable

---

## 🔍 Flutter Source Reference

```dart
// device_step.dart
UserAndDocumentFilesWidget(...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_documents @regression @both
Scenario: Attach and preview monitoring device document files
  Given the user is on Step 1 of device details
  When the user attaches a PDF document file and saves
  Then the attached file should be listed in the device documents section
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-002 — Add device](./tc-monitoring-devices-002-add-monitoring-device-flow.md)
- [Suite index](./index.md)
