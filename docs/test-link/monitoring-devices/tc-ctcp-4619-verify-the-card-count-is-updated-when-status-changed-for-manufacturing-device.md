# CTCP-4619 — Verify the card count is updated when status changed for manufacturing device.

| Field | Value |
|---|---|
| **TC ID** | CTCP-4619 |
| **Suite** | Monitoring Devices |
| **Name** | Verify the card count is updated when status changed for manufacturing device. |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the card count is updated when status changed from manufacturing to Running, Not in Operation and Prior to Commissioning.

**Preconditions:** user is on MD listing screem

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user edit the device with status from manufacturing to running | Status should be saved as Running |
| 2 | Verify the count of running i.e Green flag | Green flag should increment by 1 |
| 3 | Verify user edit the device with status from manufacturing to Not in operation | Status should be saved as Not in operation |
| 4 | Verify the count of not in opertation i.e Red flag | Red Flag should increment by 1 |
| 5 | Verify user edit the device with status from manufacturing to Prior to Commissioning | Status should be saved as Prior to Commissioning |
| 6 | Verify the count of Prior to Commissioning i.e Orange flag | Orange flag should be incremented by 1 |
| 7 | Verify user delete the device with manufacturing status | Device should be deleted and count should be updated. |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
