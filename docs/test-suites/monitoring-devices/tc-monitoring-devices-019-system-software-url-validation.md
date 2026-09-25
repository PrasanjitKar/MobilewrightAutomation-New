# TC-MONITORING-DEVICES-019 — URL Validation — system software URL format

> Suite: [Monitoring Devices](./index.md) | Priority: Medium | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-019 |
| **Suite** | monitoring-devices |
| **Priority** | Medium |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_device_url_validation` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-device-details.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG |

---

## 🎯 Objective

Verify that `_isValidUrl()` validates the format of "Access to System Software" link input, rejecting malformed strings and displaying "Invalid URL format" SnackBar.

---

## ✅ Preconditions

- User is on Step 1 of `MonitoringDeviceDetailsScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Enter an invalid URL string (e.g. `invalid_link_format`) | Input is entered |
| 2 | Tap Continue / Create | URL regex validation fails |
| 3 | Observe SnackBar | Displays "Invalid URL format" (`invalidUrl`) |
| 4 | Correct URL to `https://monitor.contiplus.net` | Valid URL format |
| 5 | Tap Continue | Step advances without validation error |

---

## 🏁 Expected Results

- System software URLs must conform to valid URL patterns

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_details_screen.dart
bool _isValidUrl(String url) {
  const urlPattern = r'(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+';
  return RegExp(urlPattern).hasMatch(url);
}
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_device_url_validation @regression @both
Scenario: Validate system software URL format
  Given the user enters an invalid URL in the system software field
  When the user taps continue
  Then an "Invalid URL format" SnackBar should be displayed
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-013 — Software link launcher](./tc-monitoring-devices-013-system-software-link-launcher.md)
- [Suite index](./index.md)
