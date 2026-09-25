# TC-MONITORING-DEVICES-018 — Serial Number — validate uniqueness

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-018 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_serial_uniqueness` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that entering an already registered Serial Number triggers `validateSerialNumber`, blocks device creation, and displays a "Serial Number already exists" warning SnackBar.

---

## ✅ Preconditions

- Device with serial number `SN-EXISTING-001` is already registered

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 1, enter Serial Number `SN-EXISTING-001` | Field is set |
| 2 | Complete remaining fields and proceed to Create | `validateSerialNumber` check runs |
| 3 | Observe SnackBar | SnackBar displays "Serial Number already exists" (`serialNoExists`) |
| 4 | Change Serial Number to `SN-UNIQUE-999` and tap Create | Serial number check passes; device creates |

---

## 🏁 Expected Results

- Duplicate serial numbers are rejected

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
if (await context.read<MonitoringDeviceDetailsCubit>().validateSerialNumber(state.monitoringDeviceModel.serialNumber)) {
  showContiSnackBar(context, AppLocalizations.of(context)!.serialNoExists);
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_serial_uniqueness @regression @both
Scenario: Reject duplicate serial numbers during device creation
  Given a monitoring device exists with serial number "SN-EXISTING-001"
  When the user tries to create a new device with the same serial number
  Then the creation should be blocked with a duplicate serial number warning
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-002 — Add device](./tc-monitoring-devices-002-add-monitoring-device-flow.md)
- [Suite index](./index.md)
