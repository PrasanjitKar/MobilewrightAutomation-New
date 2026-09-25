# TC-MONITORING-DEVICES-006 — Conveyor Card — Conveyor Info hub card and auto-filter

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-006 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `conveyor_info_monitoring_card` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/conveyor-details.page.ts`, `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on `ConveyorInformationScreen`, the Monitoring Devices card displays the count of devices installed on that specific conveyor, and tapping it navigates with pre-supplied conveyor filter.

---

## ✅ Preconditions

- Conveyor with installed monitoring devices is opened

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Conveyor Information screen for conveyor `C1` | Hub screen loads |
| 2 | Locate `monitoringDeviceCard` | Badge displays count of devices installed on `C1` |
| 3 | Tap `monitoringDeviceCard` | `MonitoringDeviceFilterEvent` fires with `conveyorIds: [C1]`, `isConveyorIdsPreSupplied: true` |
| 4 | Observe list screen | Only devices belonging to conveyor `C1` are rendered |

---

## 🏁 Expected Results

- Contextual filtering narrows device list automatically to the parent conveyor

---

## 🔍 Flutter Source Reference

```dart
// conveyor_information_screen.dart
context.read<MonitoringDeviceListBloc>().add(
  MonitoringDeviceFilterEvent(
    filter: DeviceFilters(conveyorIds: [widget.conveyorId], isConveyorIdsPreSupplied: true),
  ),
);
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:conveyor_info_monitoring_card @regression @both
Scenario: Auto-filter Monitoring Devices from Conveyor Details
  Given the user is on the Conveyor Information screen
  When the user taps the Monitoring Devices card
  Then the Monitoring Devices list should show only devices for that conveyor
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-031 — Pre-supplied conveyor mode](./tc-monitoring-devices-031-pre-supplied-conveyor-mode.md)
- [Suite index](./index.md)
