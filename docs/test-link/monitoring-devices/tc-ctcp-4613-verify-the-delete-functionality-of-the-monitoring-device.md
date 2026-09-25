# CTCP-4613 — Verify the delete functionality of the monitoring device

| Field | Value |
|---|---|
| **TC ID** | CTCP-4613 |
| **Suite** | Monitoring Devices |
| **Name** | Verify the delete functionality of the monitoring device |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify the delete functionality of the monitoring device

**Preconditions:** USer is on device listing screen

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user is select a monitoring device | Monitoring device should be selected |
| 2 | Verify user click on 3dots | Delete option should be displayed |
| 3 | Verify user click on delete option | confirmation pop- up is displayed<br>"Are your sure, you want to delete the following monitoring device"<br>List of the device1<br>Yes and No option |
| 4 | Verify user click on yes | Device should be deleted successfully and count should be updated accordingly |
| 5 | Verify user select multiple device and delete | all selected devices should be deleted ssuccessfully and count should be updated accordingly |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
