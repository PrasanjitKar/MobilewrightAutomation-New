# CTCP-4616 — Verify the functionality when Manufacturing Status is selected from the drop down

| Field | Value |
|---|---|
| **TC ID** | CTCP-4616 |
| **Suite** | Monitoring Devices |
| **Name** | Verify the functionality when Manufacturing Status is selected from the drop down |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

**Summary:** Verify the functionality when Manufacturing Status is selected from the drop down

**Preconditions:** User logged in as Master/CCM/KeyUser and is on monitoring device listing page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user click on the Add icon from MD listing screen as master/CCM/Key user | Add Device page should be displayed |
| 2 | Verify user enter the device name, device type and status (mandatory fields) | Device name, type and status should be entered and selected. |
| 3 | Verify status drop down should be mandatory | Status drop down should be mandatory i.e asterisk should be displayed |
| 4 | Verify user click on status drop down | Status drop down should have new status added<br>Manufacting (new Status)<br>Prior to Commissioning<br>Running<br>Not in Operation |
| 5 | Verify user select status as "Manufacturing" and click on step 2 "Add location" | “Site” and “Conveyor” fields are greyed out (not clickable). |
| 6 | Verify User click on Create in Step 2 without entering location | Monitoring device should be created |
| 7 | Verify the created device is displayed on the listing screen | Device is displayed on the listing screen with status as Manufacturing in Yellow under status column |
| 8 | Verify the Yellow flag is displayed on the Main card | Yellow flag with total Yellow count(manufacturing) should be displayed for master, CCM and Key user |
| 9 | Verify user click on folder icon for the device with Manufacturing status | User should not be redirected to file manger i.e Folder creation does not take place for status "Manufacturing" |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
