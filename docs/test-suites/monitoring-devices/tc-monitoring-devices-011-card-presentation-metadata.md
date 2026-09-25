# TC-MONITORING-DEVICES-011 — Card Presentation — device metadata and metrics

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-011 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_card_presentation` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that `MonitoringDeviceListCard` renders device name, customer name, status label, conveyor name, install date (`d MMM yyyy`), territory chip, and conveyor saves count (`conveyorSaves : X`).

---

## ✅ Preconditions

- Monitoring devices with complete metadata exist

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a `MonitoringDeviceListCard` | Card renders with structured rows |
| 2 | Verify top line | Displays Device Name in bold |
| 3 | Verify second line | Displays Customer Name and Status label |
| 4 | Verify third line | Displays Conveyor Name and Install Date |
| 5 | Verify fourth line | Displays Territory chip and Conveyor Saves count |

---

## 🏁 Expected Results

- Device card clearly presents all essential operating metrics

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_card.dart
Text(device.name ?? '-', style: ContiplusStyle.boldFonts16pxBFont)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_card_presentation @regression @both
Scenario: Verify monitoring device card presentation
  Given the user is on the Monitoring Devices list
  Then each card should display name, customer, conveyor, install date, and conveyor saves
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-012 — Status color coding](./tc-monitoring-devices-012-status-pills-color-coding.md)
- [Suite index](./index.md)
