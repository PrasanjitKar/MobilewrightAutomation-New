# TC-MONITORING-DEVICES-003 — Navigation — open from Home Dashboard and Conveyor Info

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-003 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Smoke |
| **Suggested Tags** | `@smoke @both` |
| **Data Key** | `monitoring_devices_navigation_sources` |
| **Feature File** | `features/smoke/monitoring_devices.feature` |
| **Page Objects** | `src/pages/dashboard.page.ts`, `src/pages/conveyor-details.page.ts`, `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the Monitoring Device card from the Dashboard navigates to full device list, and tapping from Conveyor Information navigates with pre-filtered conveyor criteria.

---

## ✅ Preconditions

- User has access to Dashboard and Conveyor details

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | On Dashboard, tap Monitoring Device card | Navigates to full Monitoring Devices list |
| 2 | Return to Dashboard and navigate to Conveyor Information screen | Conveyor details load |
| 3 | Tap Monitoring Device card on Conveyor Information | Navigates to list pre-filtered to selected conveyor |

---

## 🏁 Expected Results

- Both entry points route correctly with expected filter parameters

---

## 🔍 Flutter Source Reference

```dart
// home_screen.dart & conveyor_information_screen.dart
SemanticsLabel(label: 'monitoringDeviceCard', child: HomeCard(...))
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/smokedata.csv @Key:monitoring_devices_navigation_sources @smoke @both
Scenario: Navigate to Monitoring Devices from Dashboard and Conveyor Details
  Given the user is on the Dashboard
  When the user taps the Monitoring Device card
  Then the Monitoring Devices list should be displayed
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-005 — Dashboard card](./tc-monitoring-devices-005-dashboard-card-counter.md)
- [Suite index](./index.md)
