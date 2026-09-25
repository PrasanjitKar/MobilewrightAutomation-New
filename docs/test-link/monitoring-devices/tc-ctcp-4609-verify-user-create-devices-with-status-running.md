# CTCP-4609 — Verify user create devices with status: Running

| Field | Value |
|---|---|
| **TC ID** | CTCP-4609 |
| **Suite** | Monitoring Devices |
| **Name** | Verify user create devices with status: Running |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user create devices with status: Running

**Preconditions:** USer is logged into mobile app and is on device listing screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user click on + icon on the device listing screen | Step1: Add device is displayed |
| 2 | Verify user enter only the below mandatory field and click on next<br>Device Name *<br>Device Type *<br>Status - Select status as running | Step2 Add location page is displayed |
| 3 | Versiy user select site and click on conveyor dropdown | Conveyor should be filtered based on the site selected |
| 4 | Verify user click on create button | Device should be created successfully |
| 5 | Verify Device count should be incremented | DEvice count<br>Main Count should be incremented by one<br>Green status (Running) should be incrmeneted by one |
| 6 | Verify user navigate to conveyor level Monitoring Devices and check the newly added device is displayed and count is correct | Newly added device should be displayed with correct count (card and status count) |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
