# TC-MONITORING-DEVICES-036 — Tablet Layout — split layout adaptations

> Suite: [Monitoring Devices](./index.md) | Priority: Low | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-036 |
| **Suite** | monitoring-devices |
| **Priority** | Low |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_tablet_layout` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that on tablet form factors, action buttons appear in the stepper control area rather than the bottom navigation bar.

---

## ✅ Preconditions

- Tablet device or iPad simulator

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Monitoring Device details on a tablet | Screen loads with tablet layout |
| 2 | Observe action buttons | Action and cancel buttons render inside stepper row (`BottomNextPrevWidget`) |
| 3 | Verify bottom bar | Bottom navigation bar is omitted (`SizedBox()`) |

---

## 🏁 Expected Results

- Tablet layout places actions appropriately for large screens

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
bottomNavigationBar: DeviceHelper.isPhone() ? SafeArea(...) : const SafeArea(child: SizedBox())
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_tablet_layout @regression @both
Scenario: Verify tablet button placement on monitoring device details
  Given the user is on a tablet device in device details
  Then action buttons should be placed within the stepper area
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-002 — Add device](./tc-monitoring-devices-002-add-monitoring-device-flow.md)
- [Suite index](./index.md)
