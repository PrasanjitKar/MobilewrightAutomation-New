# Conveyor Inspect Test Suite

> Suite: `conveyor-inspect` | Total TCs: **31** | 🟢 Smoke: **3** | 🟡 Regression: **27** | 🟣 E2E: **1** | Status: 📋 Planned

---

## 📋 Overview

The **Conveyor Inspect** module in Conti+ provides mobile and tablet capabilities for specialized conveyor thermal and drone camera inspection workflows. Key features include:

- **Thermal Camera Integration**: Direct hardware discovery, pairing, and live streaming with FLIR thermal cameras via `thermal_camera_plugin`.
- **Measurement & Temperature Analysis**: Auto/Manual temperature ranges, min/max spot temperature picking, color palettes (Iron, Rainbow, Gray, Lava), and emissivity adjustments.
- **Drone Inspection Support**: High-resolution LHS/RHS image uploads for aerial drone conveyor inspections.
- **Defect Gauge & Idler Diagnostics**: Interactive circular gauge visualizing LHS/RHS failure distributions, idler roll conditions, and operational risk metrics.
- **Map & GPS Tracking**: Fullscreen GPS inspection path mapping with thermal hot spot markers and finding detail overlays.
- **Offline & Sync Management**: Local image buffering, background sync queue, failure retry handling, and offline indicator states.

---

## 🏗️ Architecture & BLoC Flow

```
HomeScreen / ConveyorInformationScreen
       │
       ▼
ConveyorInspectListScreen  ◄──►  ConveyorInspectListBloc
 (Offline banner, Search, Filters, Gauge & Status pills)
       │
       ├─► AddEditConveyorInspectEvent  ◄──►  ConveyorFindingFileUploadCubit
       │    ├─ Inspection Type: Thermal Camera (4) / Drone (2)
       │    ├─ LHS / RHS Media Upload
       │    └─► ConveyorInspectThermalCameraListScreen  ◄──►  ConveyorInspectThermalCameraListBloc
       │         │ (Bluetooth / Wi-Fi FLIR Camera Discovery)
       │         ▼
       │        ConveyorInspectThermalCameraScreen  ◄──►  ConveyorInspectThermalCameraBloc
       │         │ (Live IR Stream, Color Palettes, Min/Max Temp)
       │         ▼
       │        ConveyorInspectThermalCameraImageListScreen  ◄──►  ConveyorInspectThermalCameraImageListBloc
       │           (Photo Browser, Multi-Image Selection)
       │
       └─► ConveyorInspectDetailsScreen  ◄──►  ConveyorFindingCubit
            ├─ ConveyorStatus (ConveyorInspectGauge, Idler Config, Hotspots)
            └─ ConveyorInspectFindingDetails (Interactive Map, Finding Cards)
```

### Key BLoC Events & States

| BLoC / Cubit | Event / Action | Resulting State / UI Effect |
|---|---|---|
| `ConveyorInspectListBloc` | `ConveyorInspectListLoadEvent(hardRefresh)` | Emits cached inspection models, then fetches latest from network |
| `ConveyorInspectListBloc` | `ConveyorInspectFilterEvent(filters)` | Filters list by Site, Conveyor, Sort order |
| `ConveyorInspectListBloc` | `ConveyorInspectSearchEvent(search)` | Filters inspections by conveyor/site name string |
| `ConveyorInspectListBloc` | `ConveyorInspectSyncEvent()` | Uploads pending offline findings and images |
| `ConveyorFindingFileUploadCubit`| `createConveyorInspect()` / `uploadFiles()` | Saves inspection metadata and uploads LHS/RHS images |
| `ConveyorInspectThermalCameraListBloc` | `StartDiscoveryEvent()`, `StopDiscoveryEvent()` | Discovers nearby FLIR thermal camera hardware |
| `ConveyorInspectThermalCameraBloc` | `LoadInitialDataEvent()`, `CaptureImageEvent()` | Streams live radiometric IR video and captures snapshots |
| `ConveyorInspectThermalCameraImageListBloc`| `LoadDataEvent()`, `FinalizeImagesEvent()` | Manages captured thermal gallery and finalizes selections |
| `ConveyorFindingCubit` | `getConveyorFindings(inspectionId)` | Loads hot spots, idler defects, and temperature findings |

---

## 🏷️ Key UI Components & Selectors

| Component | UI Feature / Selector | Description |
|---|---|---|
| **Conveyor Inspect List** | AppBar Title | `AppLocalizations.of(context)!.conveyorInspect` |
| | Search Button & Field | Search bar with real-time text query filtering |
| | Filter Button | Filter modal with site and conveyor multi-select |
| | Sync Action Button | Triggers manual background sync with confirmation dialog |
| | Row Status Chip | "Uploaded" (gray/green), "Pending" (pastel red), "Failed" (red) |
| | ConveyorInspectRow | Displays Conveyor name, Site, Territory chip, Date, and status |
| **Add / Edit Event** | Inspection Type Radio | Toggle between Drone (2) and Thermal Camera (4) |
| | LHS / RHS Upload Cards | Left-hand side / Right-hand side image picker trays |
| | Connect Camera Button | Launches FLIR hardware discovery |
| **Thermal Camera** | Camera Discovery List | Displays discovered FLIR camera devices with RSSI / IP |
| | FlirThermalView | Radiometric thermal stream canvas |
| | Color Palette Picker | Iron, Rainbow, Gray, Lava palette switcher |
| | Temperature Number Picker | Min/Max spot temperature dialog (0 - 120.9 °C) |
| **Details Screen** | ConveyorInspectGauge | Circular gauge showing LHS/RHS error distributions |
| | Idler Config Table | Breakdown of idler defect severity (Good, Fault, Poor, Critical) |
| | ConveyorInspectFullscreenMap | Interactive GPS route map with hot spot markers |

---

## 📊 KPI Summary

| Metric | Value |
|---|---|
| Total Test Cases | **31** |
| 🟢 Active — Automated | 0 (0%) |
| 🔵 Active — In Progress | 0 |
| 📋 Planned | 31 |
| 🔴 Blocked (infra) | 0 |
| 🟢 Smoke | 3 |
| 🟡 Regression | 27 |
| 🟣 E2E | 1 |
| Platforms | iOS + Android |
| Environments | STG / PRD |

---

## 🗂️ Test Case Registry

| ID | Title | Priority | Type | Tags | Status |
|---|---|:---:|:---:|---|:---:|
| [**TC-CONVEYOR-INSPECT-001**](./tc-conveyor-inspect-001-list-loads-with-permitted-view.md) | Conveyor Inspect List — loads records with permitted view | High | Smoke | `@smoke @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-002**](./tc-conveyor-inspect-002-create-thermal-inspection-event.md) | Add Inspection — create thermal camera inspection event happy path | High | Smoke | `@smoke @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-003**](./tc-conveyor-inspect-003-details-gauge-and-findings-view.md) | Details Screen — inspection gauge, idler status, and findings map | High | Smoke | `@smoke @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-031**](./tc-conveyor-inspect-031-e2e-drone-thermal-inspection-lifecycle.md) | E2E Thermal Lifecycle — create event, hotspot anomalies, and PDF report | Critical | E2E | `@e2e @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-004**](./tc-conveyor-inspect-004-home-conveyor-inspect-card-navigation.md) | Home Dashboard — Conveyor Inspect summary card and navigation | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-005**](./tc-conveyor-inspect-005-conveyor-info-screen-navigation.md) | Conveyor Info Screen — navigate to pre-filtered conveyor inspect list | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-006**](./tc-conveyor-inspect-006-permissions-module-access.md) | Permissions — module access gated by view, add, edit permissions | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-007**](./tc-conveyor-inspect-007-search-filters-by-conveyor-site.md) | Search — real-time query filters inspections by conveyor and site name | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-008**](./tc-conveyor-inspect-008-filter-modal-by-site-and-conveyor.md) | Filter Modal — filter list by Site, Conveyor, and Sort order | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-009**](./tc-conveyor-inspect-009-offline-banner-and-cached-records.md) | Offline Mode — displays "Working offline" and renders cached records | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-010**](./tc-conveyor-inspect-010-pull-to-refresh-and-sync-button.md) | Sync Action — pull to refresh and app bar sync trigger upload | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-011**](./tc-conveyor-inspect-011-row-metadata-and-status-indicators.md) | Row Presentation — displays conveyor, site, territory chip, and status | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-012**](./tc-conveyor-inspect-012-drone-inspection-image-upload.md) | Drone Inspection — upload LHS and RHS JPEG/RJPEG aerial photos | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-013**](./tc-conveyor-inspect-013-thermal-camera-discovery-flow.md) | Thermal Camera — discover and list nearby FLIR thermal cameras | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-014**](./tc-conveyor-inspect-014-thermal-camera-connection-timeout.md) | Thermal Camera — discovery timeout and connection failure handling | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-015**](./tc-conveyor-inspect-015-thermal-live-stream-and-color-palettes.md) | Thermal Live Stream — switch color palettes (Iron, Rainbow, Gray, Lava) | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-016**](./tc-conveyor-inspect-016-thermal-min-max-temperature-picker.md) | Thermal Analysis — manual min/max spot temperature number picker | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-017**](./tc-conveyor-inspect-017-thermal-snapshot-capture.md) | Thermal Capture — record radiometric thermal snapshot with GPS tag | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-018**](./tc-conveyor-inspect-018-thermal-photo-gallery-multi-select.md) | Thermal Gallery — browse and multi-select captured thermal images | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-019**](./tc-conveyor-inspect-019-edit-conveyor-inspect-event.md) | Edit Event — update inspector, date, and append additional photos | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-020**](./tc-conveyor-inspect-020-details-gauge-error-breakdown.md) | Details Screen — circular gauge renders LHS/RHS error breakdown | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-021**](./tc-conveyor-inspect-021-details-idler-configuration-table.md) | Details Screen — idler configuration table displays defect metrics | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-022**](./tc-conveyor-inspect-022-details-findings-expandable-cards.md) | Findings List — expandable finding cards show defect details | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-023**](./tc-conveyor-inspect-023-details-fullscreen-map-hotspots.md) | Fullscreen Map — interactive route map with hot spot pins and slider | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-024**](./tc-conveyor-inspect-024-thermal-fullscreen-image-viewer.md) | Image Viewer — fullscreen pinch-zoom viewer for high-res thermal shots | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-025**](./tc-conveyor-inspect-025-delete-conveyor-inspect-event.md) | Delete Event — delete inspection event with confirmation dialog | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-026**](./tc-conveyor-inspect-026-offline-event-creation-pending.md) | Offline Mode — creating inspection while offline marks status "Pending" | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-027**](./tc-conveyor-inspect-027-auto-sync-on-network-reconnection.md) | Sync Queue — reconnecting network triggers auto-upload of findings | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-028**](./tc-conveyor-inspect-028-upload-failure-red-row-and-retry.md) | Sync Failure — failed upload highlights row in red with retry action | High | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-029**](./tc-conveyor-inspect-029-tablet-split-view-and-landscape.md) | Tablet Layout — tablet landscape split view with gauge and idler grid | Medium | Regression | `@regression @both` | 📋 Planned |
| [**TC-CONVEYOR-INSPECT-030**](./tc-conveyor-inspect-030-validation-mandatory-fields.md) | Validation — enforces site, conveyor, and media file upload constraints | Medium | Regression | `@regression @both` | 📋 Planned |

---

## 🔗 Related Documentation

- [Test Suites Guide](../../test-suites-guide.md)
- [Master Test Suites Index](../index.md)
- [Inspections Test Suite](../inspections/index.md)
- [Conveyors Test Suite](../conveyors/index.md)
