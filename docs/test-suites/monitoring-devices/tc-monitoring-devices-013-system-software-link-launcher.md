# TC-MONITORING-DEVICES-013 — Software Link — launch external system software URL

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-013 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_software_link` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-list.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the link button (`linkButton_$index`) on a device card launches the device's external diagnostic dashboard URL via browser when configured, and is disabled/grayed when empty.

---

## ✅ Preconditions

- Monitoring device with valid `systemSoftwareLink` (e.g. `https://diag.contiplus.net`) exists

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Locate a device card with a configured software link | Link icon displays in black |
| 2 | Tap the link button | Device browser opens with the configured URL |
| 3 | Locate a device card without a software link | Link icon is grayed out and tapping performs no action |

---

## 🏁 Expected Results

- Diagnostic URLs launch reliably from device cards

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_list_card.dart
IconButton(
  onPressed: (device.systemSoftwareLink ?? '').isEmpty ? () {} : () => _launchUrl(Uri.parse(link)),
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_software_link @regression @both
Scenario: Launch external monitoring system software link
  Given a device has a configured system software URL
  When the user taps the link button on the device card
  Then the external URL should be launched
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-019 — URL validation](./tc-monitoring-devices-019-system-software-url-validation.md)
- [Suite index](./index.md)
