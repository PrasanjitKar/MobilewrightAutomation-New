# Monitoring Devices — Test Suite

> Module: `IOTModule.beltMonitoring` (`BELT-MONITORING-DEVICE`)  
> Flutter Source: `lib/src/ui/screens/monitoring_device/` + `lib/src/blocs/monitoring_device/`  
> Last updated: 2026-09-21

---

## 📊 Suite KPI Summary

| Metric | Value |
|---|---|
| Total Test Cases | 37 |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 In Progress | 0 |
| 📋 Planned | 37 |
| 🔴 Blocked (infra) | 0 |
| 🟢 Smoke TCs | 3 |
| 🟡 Regression TCs | 33 |
| 🟣 E2E TCs | 1 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🏛️ Architecture & Flutter Implementation

The **Monitoring Devices** module manages hardware diagnostic units (MultiProtect, CordProtect, Minuteman, etc.) installed along conveyor systems. It supports viewing telemetry, GPS geolocation, software link launcher, adding/editing devices via a 2-step stepper form (`DeviceStep`, `LocationStep`), interactive Google Map placement, offline caching, and automatic synchronization.

### BLoC State Machine

- **`MonitoringDeviceListBloc`** (`lib/src/blocs/monitoring_device/list/monitoring_device_list_bloc.dart`)
  - `MonitoringDeviceListLoadEvent`: Hydrates local cache, resolves relations, fetches real-time updates.
  - `MonitoringDeviceFilterEvent`: Multi-criteria filtering by site, conveyor, device types, and sorting.
  - `MonitoringDeviceSearchEvent`: Search by device name, conveyor name, customer name, serial number.
  - `MonitoringDeviceSyncEvent`: Syncs offline pending creations, edits, and deletions via `ctp.monitoringDeviceManager`.
- **`MonitoringDeviceDetailsCubit`** (`lib/src/blocs/monitoring_device/details/monitor_device_details_cubit.dart`)
  - Manages creation, editing, validation (serial number uniqueness, software URL format), document attachments, and deletion.

---

## 🗂️ Test Case Master Registry

| ID | Title | Priority | Type | Tags | Platform | Status |
|---|---|:---:|:---:|---|:---:|:---:|
| [TC-MONITORING-DEVICES-001](./tc-monitoring-devices-001-list-loads-with-permitted-view.md) | Monitoring Devices List Loads Successfully | Critical | Smoke | `@smoke @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-002](./tc-monitoring-devices-002-add-monitoring-device-flow.md) | Add New Monitoring Device (2-Step Stepper) | Critical | Smoke | `@smoke @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-003](./tc-monitoring-devices-003-navigation-sources.md) | Navigation from Home Dashboard and Conveyor Info | High | Smoke | `@smoke @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-037](./tc-monitoring-devices-037-e2e-iot-device-provisioning-and-alarm-lifecycle.md) | E2E IoT Device Provisioning & Alarm Ingestion | Critical | E2E | `@e2e @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-004](./tc-monitoring-devices-004-permission-gating.md) | Permission Gating (`BELT-MONITORING-DEVICE`) | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-005](./tc-monitoring-devices-005-dashboard-card-counter.md) | Home Screen Dashboard Card & Live Counter | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-006](./tc-monitoring-devices-006-conveyor-info-card-and-auto-filter.md) | Conveyor Information Hub Card & Auto-Filter | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-007](./tc-monitoring-devices-007-free-user-restrictions.md) | Free User Mode Restrictions (FAB & Actions) | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-008](./tc-monitoring-devices-008-search-by-name-and-serial.md) | Search by Device Name, Conveyor, and Serial Number | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-009](./tc-monitoring-devices-009-search-clear-and-dismiss.md) | Search Bar Clear and Close Behavior | Low | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-010](./tc-monitoring-devices-010-empty-state-no-results.md) | Empty State Display When No Devices Found | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-011](./tc-monitoring-devices-011-card-presentation-metadata.md) | Device Card Presentation (Status, Conveyor, Saves) | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-012](./tc-monitoring-devices-012-status-pills-color-coding.md) | Device Status Color Coding (Running, Prior, Not in Op) | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-013](./tc-monitoring-devices-013-system-software-link-launcher.md) | External System Software URL Launcher | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-014](./tc-monitoring-devices-014-map-pin-navigation.md) | Device GPS Location Map Viewer Navigation | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-015](./tc-monitoring-devices-015-stepper-device-info-validation.md) | Step 1 Form Validation (Name, Type, Status) | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-016](./tc-monitoring-devices-016-stepper-location-validation.md) | Step 2 Location Validation (Site, Conveyor, TimeZone) | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-017](./tc-monitoring-devices-017-manufacturing-status-bypass.md) | Manufacturing Status (Status 4) Location Bypass | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-018](./tc-monitoring-devices-018-serial-number-uniqueness.md) | Serial Number Uniqueness Check | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-019](./tc-monitoring-devices-019-system-software-url-validation.md) | System Software URL Format Validation | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-020](./tc-monitoring-devices-020-installed-date-picker.md) | Installation Date Picker Integration | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-021](./tc-monitoring-devices-021-documents-attachment-flow.md) | Document & Certificate Files Attachment Flow | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-022](./tc-monitoring-devices-022-interactive-map-coordinate-picker.md) | Interactive Map Location Selection & Coordinates | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-023](./tc-monitoring-devices-023-edit-monitoring-device.md) | Edit Existing Monitoring Device Flow | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-024](./tc-monitoring-devices-024-delete-device-with-modal.md) | Delete Monitoring Device with Warning Modal | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-025](./tc-monitoring-devices-025-filter-modal-layout-and-counter.md) | Filter Modal Layout and Dynamic Result Counter | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-026](./tc-monitoring-devices-026-filter-by-site-multiselect.md) | Filter by Site Multi-Select | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-027](./tc-monitoring-devices-027-filter-by-conveyor-multiselect.md) | Filter by Conveyor Cascading Multi-Select | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-028](./tc-monitoring-devices-028-filter-by-device-type-multiselect.md) | Filter by Monitoring Device Type Multi-Select | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-029](./tc-monitoring-devices-029-sort-last-modified-and-alphabetical.md) | Sorting (Last Modified, A-Z, Z-A) | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-030](./tc-monitoring-devices-030-clear-filters-action.md) | Clear Filters Action Resets to System Default | Medium | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-031](./tc-monitoring-devices-031-pre-supplied-conveyor-mode.md) | Pre-Supplied Conveyor Mode Locked Filters | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-032](./tc-monitoring-devices-032-deep-link-navigation.md) | Deep Link Routing to Monitoring Device Details | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-033](./tc-monitoring-devices-033-offline-creation-pending-badge.md) | Offline Device Creation & Upload Pending Badge | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-034](./tc-monitoring-devices-034-upload-failure-and-retry.md) | Upload Failed Red Card & Direct Retry Action | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-035](./tc-monitoring-devices-035-auto-sync-on-reconnection.md) | Automatic Queue Synchronization on Network Restore | High | Regression | `@regression @both` | iOS + Android | 📋 Planned |
| [TC-MONITORING-DEVICES-036](./tc-monitoring-devices-036-tablet-split-layout.md) | Tablet Form Factor Adaptations | Low | Regression | `@regression @both` | iOS + Android | 📋 Planned |
