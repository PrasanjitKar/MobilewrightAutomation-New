# TC-MONITORING-DEVICES-025 — Filter Modal — modal layout and live counter

> Suite: [Monitoring Devices](./index.md) | Priority: High | Status: 📋 Planned

---

## 📋 Metadata

| Field | Value |
|-------|-------|
| **ID** | TC-MONITORING-DEVICES-025 |
| **Suite** | monitoring-devices |
| **Priority** | High |
| **Type** | Regression |
| **Suggested Tags** | `@regression @both` |
| **Data Key** | `monitoring_devices_filter_modal` |
| **Feature File** | `features/regression/monitoring_devices.feature` |
| **Page Objects** | `src/pages/monitoring-devices-filter.page.ts` |
| **Status** | 📋 Planned |
| **Platform** | iOS + Android |
| **Environments** | STG, PRD |

---

## 🎯 Objective

Verify that tapping the Filter icon opens `MonitoringDeviceFilterModal` with sorting radios, Site, Conveyor, and Device Type MultiSelects, and dynamic result counter.

---

## ✅ Preconditions

- User is on `MonitoringDeviceListScreen`

---

## 🔢 Test Steps

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Tap Filter icon on AppBar | Filter bottom sheet modal opens |
| 2 | Verify Sort radios | "Last Modified", "A-Z", "Z-A" radios display |
| 3 | Verify MultiSelect fields | Site, Conveyor, and Monitoring Device Type dropdowns display |
| 4 | Tap Cancel | Modal closes without modifying filters |

---

## 🏁 Expected Results

- Filter modal renders all filter controls cleanly

---

## 🔍 Flutter Source Reference

```dart
// monitoring_device_filter_modal.dart
FiltersTemplate(
  totalResultCount: showAllResults ? count : null,
  onSaveTap: () { _applyFilters(); Navigator.pop(context); },
)
```

---

## 📝 Suggested Gherkin

```gherkin
@DataFile:resources/data/sitedata.csv @Key:monitoring_devices_filter_modal @regression @both
Scenario: Open and inspect monitoring devices filter modal
  Given the user is on the Monitoring Devices list screen
  When the user taps the filter icon
  Then the filter modal should display sort options and multiselect filters
```

---

## 🔗 Related

- [TC-MONITORING-DEVICES-026 — Filter by site](./tc-monitoring-devices-026-filter-by-site-multiselect.md)
- [Suite index](./index.md)
