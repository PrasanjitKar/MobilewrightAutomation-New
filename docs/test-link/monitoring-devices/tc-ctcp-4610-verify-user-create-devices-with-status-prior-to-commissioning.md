# CTCP-4610 — Verify user create devices with status: Prior to commissioning

| Field | Value |
|---|---|
| **TC ID** | CTCP-4610 |
| **Suite** | Monitoring Devices |
| **Name** | Verify user create devices with status: Prior to commissioning |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user create devices with status: Running

**Preconditions:** USer is logged into mobile app and is on device listing screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user click on + icon on the device listing screen | Step1: Add device is displayed |
| 2 | Verify user enter only the below mandatory field and click on next<br>Device Name *<br>Device Type *<br>Status - Select status as prior to commissioning | Step2 Add location page is displayed |
| 3 | Versiy user select conveyor from the drop down linked to a Distributor shop<br>Note: Conveyor should not have any location | Site and Associated distributor shop should be autofilled |
| 4 | Verify user select the lat and long poistion from the map | Monitoring device icon (Refer figma) should be on the map with site pin on the map |
| 5 | Verify user click on create button | Device should be created successfully |
| 6 | Verify Device count should be incremented | DEvice count<br>Main Count should be incremented by one<br>ORange status (Prior to commissioning) should be incrmeneted by one |
| 7 | Verify user navigate to conveyor level Monitoring Devices and check the newly added device is displayed and count is correct | Newly added device should be displayed with correct count (card and status count) |
| 8 | Verify user view the monitoring device | All entered fields should be displayed in view mode with monitoring device pin along with the site pin. |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1]

**Keywords:** None

---

*Exported from TestLink*
