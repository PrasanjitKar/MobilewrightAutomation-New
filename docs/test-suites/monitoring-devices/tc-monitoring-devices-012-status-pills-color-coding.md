# TC-MONITORING-DEVICES-012 — Status Coding — device status color coding

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-012 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_status_colors` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `MonitoringDeviceListCard` styles status labels with distinct colors: `Running` (status 0: Dark Green), `Not in Operation` (status 1: Red), `Prior to Commissioning` (status 2: Amber), and `Manufacturing` (status 4: Yellow).

---

## ✅ Preconditions

- Devices in various operating statuses exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a device with status 0 | Label displays "Running" in dark green |
| 2 | Locate a device with status 1 | Label displays "Not in Operation" in light red |
| 3 | Locate a device with status 2 | Label displays "Prior to Commissioning" in amber |
| 4 | Locate a device with status 4 | Label displays "Manufacturing" in yellow |

---

## 🏁 Expected Results

- Status color coding visually distinguishes device operational state

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_card.dart
device.status == 0 ? ContiplusColors.continentalDarkGreen : device.status == 1 ? ContiplusColors.continentalLightRed : ...
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_status_colors @regression @both
Scenario: Verify monitoring device status label color coding
  Given devices with varying operational statuses exist
  Then the status labels should display in their corresponding indicator colors
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-011 — Card presentation](./tc-monitoring-devices-011-card-presentation-metadata.md)
- [Suite index](./index.md)
