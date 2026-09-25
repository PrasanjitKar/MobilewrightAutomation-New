# TC-MONITORING-DEVICES-026 — Filter Site — filter by site multi-select

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-026 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_filter_site` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that selecting one or more sites in the filter modal restricts displayed devices to those sites, resetting conveyor selections.

---

## ✅ Preconditions

- Monitoring devices exist across multiple customer sites

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open Filter modal and select a Site | Site is selected; conveyor selection resets |
| 2 | Tap "Save" | Filter applies |
| 3 | Observe list screen | Only devices belonging to the selected site are displayed |

---

## 🏁 Expected Results

- Site filtering isolates devices belonging to chosen customer sites

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_filter_modal.dart
void _setSite(List<String> siteIds) { ... }
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_filter_site @regression @both
Scenario: Filter monitoring devices by site
  Given the user opens the monitoring devices filter modal
  When the user selects a site and applies the filter
  Then only devices for the selected site should be displayed
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-027 — Filter by conveyor](./tc-monitoring-devices-027-filter-by-conveyor-multiselect.md)
- [Suite index](./index.md)
