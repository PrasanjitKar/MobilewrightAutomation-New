# CTCP-4762 — Verify Load open inspection item button  in case previous inspection item link to conveyor exist

| Field | Value |
|---|---|
| **TC ID** | CTCP-4762 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify Load open inspection item button  in case previous inspection item link to conveyor exist |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Load open inspection item button fucntionality in case previous inspection item link to conveyor exist

**Preconditions:** The conveyor should contain previous isnpection item linked

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | User is on Edit inspection event page | user should able to navigate |
| 2 | On add inspection item section select conveyor having old inspection item mapped to it | User should able to select the conveyor |
| 3 | Click on Load open inspection item button | Confirmation pop-up should display with message :<br>Are you sure you want to load Inspection Items from the previous Inspection Event with the status "to be completed" for this selection? Please review the latest sync timestamp before proceeding.<br>Inspection Name : Previous inspection open item event name<br>Inspection date : Previous inspection open item event date<br>Conveyor Name<br>Sync time when inspection list was loaded and synced<br>No and Yes Button (If user click on No then user will land to Edit  inspection event page only, If user click on Yes then previous inspection To be completed item should laod which is linked to current conveyor ) |
| 4 | Now click on yes button | Previous inspection item will load with there respective condition and staus |
| 5 | Click any of the previous inspection item and look for image attached | The previous item image should be dispalyed |
| 6 | Now make changes and add one more inspection item | User should able to make changes and save it |
| 7 | Now verify inspection event should get save and reflect as expected in PDF report | The changes are reflecting as expected. |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
