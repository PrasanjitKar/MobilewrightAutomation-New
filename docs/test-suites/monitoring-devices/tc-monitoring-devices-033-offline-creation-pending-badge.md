# TC-MONITORING-DEVICES-033 — Offline Creation — offline creation and pending upload badge

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-033 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_offline_creation` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts`, `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that creating a monitoring device while offline saves it locally to Hive with `isPending: true` and displays the "Upload Pending" badge on the device card.

---

## ✅ Preconditions

- Device is in Airplane mode (offline)

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Put device into Airplane mode | Offline |
| 2 | Create a new monitoring device and tap Create | Saved to Hive cache |
| 3 | Observe list screen | New device card displays with "Upload Pending" badge and upload icon |

---

## 🏁 Expected Results

- Device saves offline safely with pending upload indication

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_card.dart
Text(isUploadPending ? AppLocalizations.of(context)!.uploadPending : ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_offline_creation @regression @both
Scenario: Create monitoring device while offline
  Given the device is in offline mode
  When the user creates a new monitoring device
  Then the device should save locally and show an "Upload Pending" badge
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-035 — Auto sync](./tc-monitoring-devices-035-auto-sync-on-reconnection.md)
- [Suite index](./index.md)
