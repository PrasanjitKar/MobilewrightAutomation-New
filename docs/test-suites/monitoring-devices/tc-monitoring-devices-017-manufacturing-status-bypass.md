# TC-MONITORING-DEVICES-017 — Manufacturing Status — location requirement bypass

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-017 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_manufacturing_bypass` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that when a device is created with Status "Manufacturing" (`status == 4`), Step 2 does not enforce Site or Conveyor selection, allowing unassigned devices under production to be registered.

---

## ✅ Preconditions

- User is creating a device on Step 1

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Step 1, select Status "Manufacturing" | Status set to 4 |
| 2 | Complete Device Name and Device Type, tap Continue | Transitions to Step 2 |
| 3 | Leave Site and Conveyor blank on Step 2 | Fields remain empty |
| 4 | Tap Create button | Form passes `isInformationComplete` check and saves successfully |

---

## 🏁 Expected Results

- Manufacturing devices can be registered without site/conveyor assignments

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
(deviceModel.status == 4) || ((deviceModel.companyId != null) && (deviceModel.conveyorId != null) && ...)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_manufacturing_bypass @regression @both
Scenario: Create manufacturing device without site and conveyor assignment
  Given the user sets device status to "Manufacturing" in Step 1
  When the user advances to Step 2 and leaves site and conveyor unassigned
  Then the device should save successfully upon tapping create
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-016 — Step 2 validation](./tc-monitoring-devices-016-stepper-location-validation.md)
- [Suite index](./index.md)
