# TC-MONITORING-DEVICES-032 — Deep Link — deep link routing to device details

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-032 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_deep_link` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that receiving a deep link for `IOTModule.beltMonitoring` with a valid `contentId` routes directly to `MonitoringDeviceDetailsScreen` for that device.

---

## ✅ Preconditions

- App receives deep link URI targeting a specific device ID

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Trigger deep link with target device ID | `DeepLinkBloc` emits `DeepLinkPendingState` |
| 2 | Observe navigation | App navigates automatically to `MonitoringDeviceDetailsScreen` for that device |
| 3 | Tap Back | Closes details and returns to list |

---

## 🏁 Expected Results

- Deep link routes directly to target device details

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_screen.dart
if (deepLinkState.module == IOTModule.beltMonitoring && deepLinkState.contentId != null) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_deep_link @regression @both
Scenario: Route to monitoring device details via deep link
  When a deep link is received for a monitoring device
  Then the app should navigate directly to that device's details screen
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-001 — List loads](./tc-monitoring-devices-001-list-loads-with-permitted-view.md)
- [Suite index](./index.md)
