# Field Service Test Suite

> Suite: `field-service` | Module: `InternalToolsModule.fieldService` (`FIELD-SERVICES`)  
> Target: Conti+ Mobile (iOS & Android) | Framework: MobileWright + Playwright-BDD  
> Flutter Source: `lib/src/ui/screens/field_service/` & `lib/src/blocs/field_service/`

---

## 📊 Suite KPI Summary

| Metric | Value |
|--------|-------|
| Total Test Cases | **43** |
| 🟢 Active — Automated | **0 (0%)** |
| 🔵 In Progress | **0** |
| 📋 Planned | **43** |
| 🔴 Blocked (infra) | **0** |
| 🟢 Smoke TCs | **3** |
| 🟡 Regression TCs | **39** |
| 🟣 E2E TCs | **1** |
| Platforms | iOS + Android (`@both`) |
| Environments | STG, PRD |

---

## 🏗️ Architecture & Flutter Implementation Notes

### 1. Permissions & Access Control
- Gated by `InternalToolsModule.fieldService` (`'FIELD-SERVICES'`).
- Permissions: `view`, `add`, `edit`, `delete`, `download`.
- Free users (`isFreeUser == true`) have restricted access.

### 2. Form Types & Multi-Step Stepper Architecture
Field Service supports two primary dynamic form types selected from the Create Form Modal (`showCreateFormModal`):

1. **Conveyor Belt Length Measurement (`FSM_CBLM` / `conveyorBeltCode`)**:
   - Implemented in `FieldServiceDetailsScreen` (`lib/src/ui/screens/field_service/field_service_details/conveyor_belt_length_measurement/`).
   - 4-Step Stepper (`EnhanceStepper`):
     - **Step 1: General Details (`GeneralStep`)**: Mandatory Site and Conveyor selection, Survey Date (past/present date restriction), Test Personnel (read-only), Equipment Used (`fsmCblmEquipment`), Calibration (auto-populated), Ambient Temperature (°C decimal), Conveyor Belt Details diagram.
     - **Step 2: Measurement Cycles (`MeasurementCycleStep`)**: Up to 6 measurement cycles. Inputs: Belt Length (m), Speed (m/s), Quality Factor. Auto-calculated summary metrics: Average Length, Standard Deviation, Minimum Length, Maximum Length, Average Speed, Average Quality Factor.
     - **Step 3: Take-Up Positioning (`PositioningStep`)**: Take-up Type (`fsmCblmTakeupType`: Gravity, etc.), Belt Status during survey (`fsmCblmBeltStatus`), technical drawing reference image, dynamic length dimension inputs (Length A, Length B, Length D for Gravity take-up).
     - **Step 4: Additional Details (`AdditionalDetailsStep`)**: Photo attachment (camera/gallery, preview, delete), Comments field, Digital Signature canvas (capture, clear, view mode).

2. **Steel Cord & Fabric Conveyor Belt Splice QA Form (`FSM_SCBSQAF` / `steelCordCode`)**:
   - Implemented in `SteelCordAndFabricConveyorBeltDetailsScreen` (`lib/src/ui/screens/field_service/field_service_details/steel_cord_conveyor_belt_details/`).
   - 11-Step Stepper (`EnhanceStepper`):
     - **Step 1: General (`General`)**: Site (mandatory), Conveyor (mandatory), Date, Splice ID/Reference, Test Personnel.
     - **Step 2: Splice Details (`SpliceDetailsStep`)**: Splice Type, Leading/Trailing belt specs (construction, manufacturer, rating, width, covers, age/status - New/Used), Belt orientation (Carry cover up / Pulley cover up), Number of stages, Number of steps.
     - **Step 3: Pre-Splicing (`PreSplicing`)**: Pre-splicing inspection checklist questions (weather, environment, cleanliness, tools condition, safety checks), observations.
     - **Step 4: Splicing Materials (`SplicingMaterials`)**: Splicing kit details, cement/solution batch numbers & expiry dates, cover rubber, tie gum, noodle rubber, cord cleaning solvent, storage condition checks.
     - **Step 5: Data Record (`DataRecordStep`)**: Dimensional measurements, cord count, step lengths, bias angle, splice length, step match checks.
     - **Step 6: Thermocouple Positions (`ThermocuplePositions`)**: Platen layout diagrams, thermocouple sensor mapping (top/bottom platens, center, edges).
     - **Step 7: Readings (`Readings`)**: Time & Temperature reading logs during heat-up, dwell/curing, and cooling phases across all thermocouples.
     - **Step 8: Curing Details (`CuringDetails`)**: Vulcanizer model used (Almex Shaw, Other), Power source (Generator, Main's Power), Vulcanizer pressure, Cure start/finish time, Curing temperature target, Cooling method and duration.
     - **Step 9: Finished Splice (`FinishedSpliceScreen`)**: Visual inspection of finished splice, splice thickness measurements (center, left, right edges), width comparison, surface defects checklist (None, Low, Medium, High).
     - **Step 10: Hardness Testing (`HardnessTestingScreen`)**: Shore A Durometer hardness testing readings across multiple points (top cover, bottom cover, splice vs parent belt).
     - **Step 11: Sign Off (`SignOffScreen`)**: Customer representative name, technician name, supervisor sign-off, digital signatures, approval status, report notes.

### 3. List & Presentation
- Cards render form title, site name, conveyor name, date, test personnel, upload status pill ("Upload Pending" or "Upload Failed"), and PDF preview icon.
- Failed upload cards are highlighted with a light red tint (`ContinentalColors.uploadFailedRed`) and a direct refresh/retry button.
- PDF preview opens `FilePreviewScreen` with authenticated headers (`useDownloadUrl2: true`, `moduleName: 'fieldservice'`).

### 4. Offline Queue & Background Sync
- Offline creation, editing, and deletion supported via local Hive caching.
- Manual sync available with confirmation dialog (`syncConfirmation`).
- Automatic sync on network reconnect via `FieldServiceSyncEvent`.
- Polling mechanism (15s intervals up to 5 retries) for asynchronous server-side PDF generation.

---

## 🗂️ Test Case Registry

| ID | Title | Priority | Type | Smoke | Status |
|---|---|---|---|:---:|---|
| [**TC-FIELD-SERVICE-001**](./tc-field-service-001-list-loads-with-permitted-view.md) | List Loads with Permitted View | Critical | Smoke | 🟢 | 📋 Planned |
| [**TC-FIELD-SERVICE-002**](./tc-field-service-002-create-form-modal-type-selection.md) | Form Type Selection Modal on FAB (+) | High | Smoke | 🟢 | 📋 Planned |
| [**TC-FIELD-SERVICE-003**](./tc-field-service-003-navigation-entry-points.md) | Navigation Entry Points (Dashboard & Drawer) | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-004**](./tc-field-service-004-permission-gating.md) | Permission Gating (View, Add, Edit, Delete, Download) | Critical | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-005**](./tc-field-service-005-dashboard-card-counter.md) | Dashboard Card Counter & Recent List Sync | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-006**](./tc-field-service-006-free-user-restrictions.md) | Free User Access Restrictions | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-007**](./tc-field-service-007-pull-to-refresh-and-reload.md) | Pull to Refresh & List Reload | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-008**](./tc-field-service-008-search-by-form-site-conveyor-technician.md) | Search by Form, Site, Conveyor, and Technician | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-009**](./tc-field-service-009-search-clear-and-dismiss.md) | Search Clear and Dismiss Keyboard | Low | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-010**](./tc-field-service-010-empty-state-no-results.md) | Empty State Presentation on Zero Matches | Low | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-011**](./tc-field-service-011-card-metadata-phone-layout.md) | Card Metadata Rendering (Phone Layout) | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-012**](./tc-field-service-012-card-metadata-tablet-layout.md) | Card Metadata Rendering (Tablet Layout) | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-013**](./tc-field-service-013-pdf-report-preview.md) | PDF Report Preview via Authenticated Stream | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-014**](./tc-field-service-014-cblm-form-initiation-and-stepper.md) | CBLM Form Initiation & 4-Step Stepper Layout | Critical | Smoke | 🟢 | 📋 Planned |
| [**TC-FIELD-SERVICE-015**](./tc-field-service-015-cblm-step1-site-conveyor-mandatory.md) | CBLM Step 1: Site & Conveyor Mandatory Cascading | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-016**](./tc-field-service-016-cblm-step1-survey-date-picker.md) | CBLM Step 1: Survey Date Picker & Past Date Check | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-017**](./tc-field-service-017-cblm-step1-equipment-calibration.md) | CBLM Step 1: Equipment Used & Auto-Calibration | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-018**](./tc-field-service-018-cblm-step1-ambient-temperature-diagram.md) | CBLM Step 1: Ambient Temperature & Belt Diagram | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-019**](./tc-field-service-019-cblm-step2-measurement-cycles-calculation.md) | CBLM Step 2: 6 Measurement Cycles & Auto-Calculation | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-020**](./tc-field-service-020-cblm-step3-takeup-positioning-drawing.md) | CBLM Step 3: Take-Up Positioning & Technical Drawing | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-021**](./tc-field-service-021-cblm-step3-takeup-length-dimensions.md) | CBLM Step 3: Dynamic Length Dimensions (A, B, D) | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-022**](./tc-field-service-022-cblm-step4-photo-attachments.md) | CBLM Step 4: Photo Attachments (Add, View, Delete) | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-023**](./tc-field-service-023-cblm-step4-comments-digital-signature.md) | CBLM Step 4: Comments & Digital Signature Capture | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-024**](./tc-field-service-024-scbsqaf-form-initiation-stepper.md) | SCBSQAF Form Initiation & 11-Step Stepper Layout | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-025**](./tc-field-service-025-scbsqaf-step1-2-general-and-splice-details.md) | SCBSQAF Step 1 & 2: General & Splice Details | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-026**](./tc-field-service-026-scbsqaf-step3-pre-splicing-checklist.md) | SCBSQAF Step 3: Pre-Splicing Environmental Checklist | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-027**](./tc-field-service-027-scbsqaf-step4-splicing-materials-batches.md) | SCBSQAF Step 4: Splicing Materials & Batch Expiries | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-028**](./tc-field-service-028-scbsqaf-step5-6-data-record-thermocouple.md) | SCBSQAF Step 5 & 6: Data Record & Thermocouple Layout | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-029**](./tc-field-service-029-scbsqaf-step7-8-readings-curing-details.md) | SCBSQAF Step 7 & 8: Temperature Readings & Curing | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-030**](./tc-field-service-030-scbsqaf-step9-finished-splice-defects.md) | SCBSQAF Step 9: Finished Splice & Defect Checklist | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-031**](./tc-field-service-031-scbsqaf-step10-hardness-testing-shore-a.md) | SCBSQAF Step 10: Hardness Testing Shore A Readings | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-032**](./tc-field-service-032-scbsqaf-step11-sign-off-approval.md) | SCBSQAF Step 11: Sign-Off & Approver Signatures | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-033**](./tc-field-service-033-edit-form-unsaved-changes-warning.md) | Edit Form & Unsaved Changes Warning Modal | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-034**](./tc-field-service-034-delete-service-form.md) | Delete Field Service Form with Confirmation | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-035**](./tc-field-service-035-server-report-polling-auto-refresh.md) | Server Report Generation Polling & Auto-Refresh | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-036**](./tc-field-service-036-filter-modal-layout-and-counter.md) | Filter Modal Layout & Dynamic Record Counter | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-037**](./tc-field-service-037-filter-by-formtype-site-conveyor.md) | Filter by Form Type, Site, and Conveyor Multi-Select | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-038**](./tc-field-service-038-sort-last-modified-and-alphabetical.md) | Sort by Last Modified, A-Z, and Z-A | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-039**](./tc-field-service-039-clear-filters-action.md) | Clear Filters Action & Filter Indicator Dot | Medium | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-040**](./tc-field-service-040-offline-creation-pending-badge.md) | Offline Creation & "Upload Pending" Badge | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-041**](./tc-field-service-041-upload-failure-and-direct-retry.md) | Upload Failure Red Tint & Direct Retry Button | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-042**](./tc-field-service-042-manual-and-auto-sync-on-reconnection.md) | Manual Sync Confirmation & Auto-Sync on Reconnect | High | Regression | | 📋 Planned |
| [**TC-FIELD-SERVICE-043**](./tc-field-service-043-e2e-field-service-inspection-journey.md) | E2E Field Service Inspection Lifecycle Journey | Critical | E2E | 🟣 | 📋 Planned |
