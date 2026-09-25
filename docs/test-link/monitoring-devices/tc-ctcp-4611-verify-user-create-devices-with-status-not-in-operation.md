# CTCP-4611 — Verify user create devices with status: Not in Operation

| Field | Value |
|---|---|
| **TC ID** | CTCP-4611 |
| **Suite** | Monitoring Devices |
| **Name** | Verify user create devices with status: Not in Operation |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user create devices with status: Running

**Preconditions:** USer is logged into mobile app and is on device listing screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user click on + icon on the device listing screen | Step1: Add device is displayed |
| 2 | Verify user enter all the field and click on next<br>Status - Select status as Not in operation | Step2 Add location page is displayed |
| 3 | Versiy user select associate distributor shop | sites should be filtered based on the associated distrbutor shop |
| 4 | Verify user select the site | Conveyor should be filtered based on the site |
| 5 | Verify user select the conveyor having cordinates and select the lat, long position on the maps | Values should be sleected |
| 6 | Verify user click on create button | Device should be created successfully |
| 7 | Verify Device count should be incremented | DEvice count<br>Main Count should be incremented by one<br>Red status (Not in Operation) should be incrmeneted by one |
| 8 | Verify user navigate to conveyor level Monitoring Devices and check the newly added device is displayed and count is correct | Newly added device should be displayed with correct count (card and status count) |
| 9 | Verify user view the device and check all the fields are displaying correct value | Correct values sould be displayed on the view mode in step 1 and step2 |
| 10 | Verify user is able to view the monitoring device on the map with conveyor cordinates | Monitoring device should be displayed with device name and conveyor cordinates |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1]

**Keywords:** None

---

*Exported from TestLink*
