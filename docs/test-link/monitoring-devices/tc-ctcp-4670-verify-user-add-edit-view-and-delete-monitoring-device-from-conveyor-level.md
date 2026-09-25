# CTCP-4670 — Verify user Add, Edit, view and delete Monitoring Device from conveyor Level

| Field | Value |
|---|---|
| **TC ID** | CTCP-4670 |
| **Suite** | Monitoring Devices |
| **Name** | Verify user Add, Edit, view and delete Monitoring Device from conveyor Level |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user Add, Edit, view and delete Monitoring Device from conveyor Level

**Preconditions:** USer is on conveyor details page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user add Device from conveyor Level | Device should be added with shop,site and cv prefilled |
| 2 | Verify shop site and cv is greyed out | Shop site and Cv is non-editable |
| 3 | Verify user click on create | Device should be created |
| 4 | Verify user edit the same device from CV level | Edit mode shop, site and cv is prefilled and non editable |
| 5 | Verify user Edit Device from conveyor Level | Device should be Edited(Change status from Running to prior to commissioning/not in operation) and count of flag should be incremented in conveyor level Card |
| 6 | Verify user View Device from conveyor Level | Device should be viewed and correct details should be displayed |
| 7 | Verify user Delete Device from conveyor Level | Device should be deleted and correct count should be updated in conveyor level MD card |
| 8 | Verify quick action are enabled and respective quick action functionality should work as expected | Quick action functionality should work as expected |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1] CTCP-14690:  Mobile: When device added from conveyor level, associated distributor, site [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
