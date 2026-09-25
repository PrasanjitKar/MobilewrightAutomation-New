# CTCP-4760 — Verify single conveyor add inspection functionality1

| Field | Value |
|---|---|
| **TC ID** | CTCP-4760 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify single conveyor add inspection functionality1 |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify single conveyor add inspection functionality

**Preconditions:** User is on inspection list page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on + button | User lands to add inspection page |
| 2 | Observe the heading displayed in top | Add inspection Event should be displayed in top |
| 4 | Look for the fields displayed | Following fields in sequence should be displayed where * is for mandatory field :<br>Site Name<br>Inspection date<br>Inspection Name<br>Inspector Name<br>Inspection template - showing Vulcan as disable value<br>Next and Cancel button |
| 5 | Look for inspection template | Vulcan template in disabled for should be displayed as template |
| 6 | Look for inspection date | Current date should be displayed as inspection date or user can select the date manually |
| 7 | Look for inspection name | As user select site name, inspection name will be automatically created as Current date + Site name |
| 8 | Look for Inspector name | Current logged in user adding the inspection data name should be displayed |
| 9 | Look for map | Map should display Site Conveyor name and head and tail position of the conveyor linked<br>IN case head and tail are not defined load site location |
| 10 | Look for mandatory fields | Site name, date, Inspection Name and Inspector name should be displayed as mandatory field |
| 11 | Click on next button | As user click on next button inspection event will be created even though user dont add inspection inspection items in event |
| 12 | Look for the heading of the page | User will redirect to Edit inspection event page |
| 13 | Look for the fields displayed in edit inspection event page | Following fields should be displayed :<br>Inspection Event details section which opens when click on epand button<br>Inspection item section<br>Summary<br>Save and cancel button |
| 14 | Look for select conveyor dropdown | All linked conveyor only with above selected site should display in dropdown |
| 15 | Verify asset sequence | Asset sequence should be same as as displayed for vulcan inspection in confluence, link : https://confluence.auto.continental.cloud/display/projectCTCP/3.+Templates+-+Inspections |
| 18 | Click on create and cancel button on add Iterm page | On click create button item will be added and user redirect again to Edit inspection event page<br>If user click on cancel user redirect again to Edit inspection event page |
| 19 | Look for details displayed in case user added  item | Post adding the item, Added item will be highlighted with light yellow color with flag consition, Status icon(complted or To be complted tick icon) & Delete icon. |
| 20 | Click on Save and cancel button post adding items | If user click on Save button then item will be created and user will redirect to List page<br>If user click on Cancel button then waring pop-up should display as inspection item is not saved |
| 23 | Observe the status of the inspection event in list | The status of the added item in list should change from upload pending to uploaded |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
