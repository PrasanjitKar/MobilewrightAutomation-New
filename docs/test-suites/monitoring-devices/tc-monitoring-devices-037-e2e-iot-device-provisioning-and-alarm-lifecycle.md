# TC-MONITORING-DEVICES-037: E2E IoT Monitoring Device Provisioning, Alert Ingestion & Acknowledgment

> **Suite**: `monitoring-devices` | **Priority**: `Critical` | **Type**: `E2E` | **Platforms**: `@both` (Android, iOS)  
> **Source Spec**: `lib/src/ui/screens/monitoring_device/` & `lib/src/blocs/monitoring_device/`

---

## 🎯 Objective
Execute the full end-to-end IoT Belt Monitoring lifecycle:
1. Provision and register a new monitoring sensor device (Conti CordProtect / MultiProtect).
2. Pair device with customer site, conveyor, and configure alert thresholds (temperature, rip detection, loop integrity).
3. Verify device status in `MonitoringDeviceListScreen` and Dashboard counter.
4. Ingest real-time telemetry alert (e.g. Rip Sensor Trip / Cord Damage Alarm).
5. Open device details, review live sensor event telemetry, and acknowledge alarm event.

---

## 📋 Preconditions
- User has `IOTModule.beltMonitoring` permissions (`view`, `add`, `edit`).
- Tracked conveyor exists.

---

## 🧪 Test Steps
1. Navigate to Monitoring Devices -> tap **Add Monitoring Device**.
2. Select Device Model "Conti MultiProtect 2.0", enter Serial Number "MP-99482", select Customer Site and Conveyor.
3. Configure Thresholds: Rip Sensor Alarm = Immediate Stop, Splice Elongation Warning = 15%, Temp Alert = 75°C.
4. Save device -> verify success message.
5. Verify device appears in `MonitoringDeviceListScreen` with "Online / Active" status.
6. Verify Dashboard "Monitoring Devices" card updates total count.
7. Simulate/Ingest alert telemetry: Rip Loop Broken at 450m mark.
8. Verify device row status switches to Red Critical Alarm.
9. Open device details -> navigate to Alarms tab -> review incident timestamp & location -> tap **Acknowledge Alert**.
10. Verify alert status transitions to Acknowledged.

---

## 🔍 Expected Results
- Complete IoT device provisioning, monitoring, and alarm handling functions end-to-end.

---

## 📱 Flutter Source Reference
- `lib/src/ui/screens/monitoring_device/monitoring_device_details/monitoring_device_details_screen.dart`
- `lib/src/ui/screens/monitoring_device/monitoring_device_list/monitoring_device_list_screen.dart`
- `lib/src/blocs/monitoring_device/`

---

## 📝 Suggested Gherkin
```gherkin
@DataFile:resources/data/monitoringdevicedata.csv @Key:monitoring_device_e2e @e2e @both
Scenario: End-to-End IoT Monitoring Device Provisioning and Alarm Ingestion
  Given the user provisions a new Conti MultiProtect device for conveyor "CV-01"
  When a critical rip alarm event is ingested
  Then the device status should show a red critical alarm indicator
  When the user opens the incident details and acknowledges the alert
  Then the alert state should transition to acknowledged
```
