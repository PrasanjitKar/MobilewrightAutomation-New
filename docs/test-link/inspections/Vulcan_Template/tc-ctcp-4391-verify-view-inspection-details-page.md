# CTCP-4391 — Verify view inspection details page

| Field | Value |
|---|---|
| **TC ID** | CTCP-4391 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify view inspection details page |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify view inspection details page

**Preconditions:** User is on inspection list page Corporate C1, Site S1, Conveyor CV1 already exist with Inspection event Insp1, condition critical and status to be completed Corporate C2, Site S2, Conveyor CV2 already exist with Inspection event Insp2,  condition Good and status  completed Multi conveyor Inspection event Insp3 with item having conveyor CV1 with  condition critical and status to be completed  & CV2  condition fault and status to be completed

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for inspection event displayed in list | The event condition flag should display only items in To be completed state, Completed inspection item should not display<br>Status icon should display only To be completed inspection count |
| 2 | Expand the inspection event | On expanding Completed inspection should also display along with To be completed inspection |
| 3 | Look for item data card displayed while expanding the event | Following data display in the card :<br>Status - To be completed or completed status<br>Condition flag<br>Conveyor name<br>Images uploaded to item<br>Asset name<br>Details<br>Location icon : On click map should get load in card<br>Three dots : ON click user get option to delete and edit icon |
| 4 | Verify user is able to swipe left and right in case event is having multiple inspection item | For multi inspect on swiping the item other item can be displayed |
| 5 | Verify on swiping the attached image in item user can see other image | On swiping left and right user can see previous and ahead images respectively |
| 6 | Click on inspection event | User land to view details of inspection event |
| 7 | Look for logo screen | Logo should be displayed on this screen with edit button |
| 8 | Swipe right | On swipe right user should land to inspection info screen with following fields in disable form<br>Inspection name<br>Site name<br>Inspection date<br>Inspector name<br>Recommendation |
| 9 | Swipe right | User lands to summary screen with conveyor field dropdown |
| 10 | Select conveyor from dropdown | Based on selected conveyor Total inspection count, To be completed count, Completed count, condition flags with count. Summary info |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
