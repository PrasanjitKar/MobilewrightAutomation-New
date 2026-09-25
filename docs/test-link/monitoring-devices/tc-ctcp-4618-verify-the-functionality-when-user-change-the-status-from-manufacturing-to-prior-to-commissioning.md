# CTCP-4618 — Verify the functionality when user change the status from Manufacturing to Prior to Commissioning

| Field | Value |
|---|---|
| **TC ID** | CTCP-4618 |
| **Suite** | Monitoring Devices |
| **Name** | Verify the functionality when user change the status from Manufacturing to Prior to Commissioning |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the functionality when user change the status from Manufacturing to Prior to Commissioning

**Preconditions:** USer is on MD listing page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user select a device with status as manufacturing from device listing screen | Action button should display option to edit |
| 2 | Click on edit | User is allowed to open device in Edit button |
| 3 | Verify user change the status from manufacturing to Prior to commissiong | Prior to commissioning should be slected |
| 4 | Click on step2 or add location page | “Site” and “Conveyor” fields become mandatory when status changed from manufacturing to Prior to commissioning |
| 5 | Verify user change the status from manufacturing to Running | “Site” and “Conveyor” fields become mandatory when status changed from manufacturing to Running |
| 6 | Verify user change the status from manufacturing to Not in Operation | “Site” and “Conveyor” fields become mandatory when status changed from manufacturing to Not in Operation |
| 7 | Verify user Save the updated status by selecting the site, conveyor and location | Monitoring device is successfully updated and status should display as Not in operation, with selected site, conveyor and location in the listing screen |
| 8 | Verify after changing the status, user click on file manger folder | User is directed to file manger page, and device folder is added under Monitoring device folder |
| 9 | Verify user edit the above updated device and check the status drop down | Manufacturing status should not display in the drop down for user (master/CCM/Key User) |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
