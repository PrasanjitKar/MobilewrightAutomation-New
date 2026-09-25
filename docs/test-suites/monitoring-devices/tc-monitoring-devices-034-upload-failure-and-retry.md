# TC-MONITORING-DEVICES-034 — Upload Failure — failed upload card and direct retry

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-034 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_upload_failure` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that when a device upload fails, the card is tinted with a light red background, displays an "Upload Failed" badge with a refresh button, and tapping refresh retries the upload.

---

## ✅ Preconditions

- Device upload failed due to network disruption

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Observe failed device card on list | Background is tinted red; "Upload Failed" badge and refresh icon appear |
| 2 | Tap the refresh button on the card | `MonitoringDeviceSyncEvent(device: device)` dispatches to re-attempt upload |
| 3 | Wait for successful sync | Red tint and failed badge disappear |

---

## 🏁 Expected Results

- Failed device uploads are clearly highlighted and recoverable via direct retry

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_card.dart
color: isUploadFailed ? ContiplusColors.continentalLightRed.withValues(alpha: 0.1) : ...
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_upload_failure @regression @both
Scenario: Retry failed monitoring device upload
  Given a device upload previously failed
  Then the device card should be tinted red with an "Upload Failed" badge
  When the user taps the refresh retry button
  Then the device upload should re-execute
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-033 — Offline creation](./tc-monitoring-devices-033-offline-creation-pending-badge.md)
- [Suite index](./index.md)
