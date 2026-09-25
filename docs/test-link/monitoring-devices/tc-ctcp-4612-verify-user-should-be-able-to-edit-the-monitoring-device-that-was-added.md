# CTCP-4612 — Verify user should be able to edit the monitoring device that was added

| Field | Value |
|---|---|
| **TC ID** | CTCP-4612 |
| **Suite** | Monitoring Devices |
| **Name** | Verify user should be able to edit the monitoring device that was added |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user should be able to edit the monitoring device that was added

**Preconditions:** USer is on mobile device listing page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user select a new monitoring device that has all the fields entered | Monitoring device should be selected |
| 2 | Verify edit option is available under 3dots | Edit option should be displayed |
| 3 | Verify user select the edit option | Edit monitoring Device header is displayed |
| 4 | Verify user should be able to edit all the fields except the serial number<br>Note: Change the status  from running to not in operation | All the fields should be editable except the serial number |
| 5 | Verify user click on next | Add location page is dislpayed |
| 6 | Verify user update the site, conveyor,Time zone and location of the device | site, conveyor, Time zone and location should be edited |
| 7 | Verify all the drop down fields search field in dropdown is removed in edit mode<br>Drop dwon fields are<br>1. Device type<br>2. Remote Connection<br>3.Status<br>4. Associated distributor<br>5. Site<br>6. Conveyor | If dropdown is not scrollable, remove the search field from the drop dwon |
| 8 | Verify user is able to see save and cancel button | save and cancel button should be displayed |
| 9 | Verify user click on save | Data should be updated successfully |
| 10 | Verify user view the updated monitoring device | All the fields(if edited) should see updated data |
| 11 | Verify the main card count and status count | Main card  count remains the same<br>the status count of running - decremented by one<br>the status count of not in operation - incremented by one |

**Requirements:** CTCP-14290:  Monitoring Device Add and Edit [Version : 1] CTCP-15199:  [Monitoring device] Mobile: Adding new field TimeZone [Version : 1] CTCP-17015:  Remove Search in dropdown if list is not scrollable [Version : 1]

**Keywords:** Regression

---

*Exported from TestLink*
