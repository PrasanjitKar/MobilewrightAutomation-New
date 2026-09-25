# CTCP-4385 — Verify single conveyor add inspection functionality

| Field | Value |
|---|---|
| **TC ID** | CTCP-4385 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify single conveyor add inspection functionality |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify single conveyor add inspection functionality

**Preconditions:** User is on inspection list page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on + button | User lands to add inspection Event page |
| 2 | Observe the heading displayed in top | Add inspection Event should be displayed as heading |
| 4 | Click on next icon or click on inspection info | Select site name |
| 5 | Look for inspection template | Vulcan template in disabled for should be displayed as template |
| 6 | Look for inspection date | Current date should be displayed as inspection date or user can select the date manually |
| 7 | Look for inspection name | As user select site name, inspection name will be automatically created as Current date + Site name |
| 8 | Look for Inspector name | Current logged in user adding the inspection data name should be displayed |
| 9 | Look for map | Map should display Site Conveyor name and head and tail position of the conveyor linked<br>IN case head and tail are not defined load site location |
| 10 | Look for mandatory fields | Site name, date, Inspection Name and Inspector name should be displayed as mandatory field |
| 11 | Click on next button or Add inspection item | Add inspection item should display with Add Dist. logo and Inspection info marked as tick with green color of line |
| 12 | Look for select conveyor dropdown | All linked conveyor only with above selected site should display in dropdown |
| 13 | Look for selection displayed | Following option should display in sections with expand button :<br>Tail Pulley<br>Belt<br>Other Pulley<br>Belt Alignment<br>Idlers<br>Drive Pulley |
| 14 | Add asset in tail pulley lagging condition | User should able to add asset |
| 15 | Look for section 1 tail pulley again | Post adding Lagging condition should display with Condition and Status and delete icon with highlighted color background |
| 16 | Click on save and close button or click on next button | User should land to sign off section |
| 17 | Look for details displayed in case user added all item | Next to Add inspection item post addition To tal conveyor added count, Condition flag & Status should dipsplay(IN case all completed, green color tick should display) |
| 18 | Enter the detail sin sign off section | User should able to add data |
| 19 | Look for Save and close and Draft button | Save & Close, Draft button should display |
| 20 | Click on Save and close button | If user click on save and close the event should get save and user should redirect to inspection list screen |
| 21 | Observe the status of the inspection event in list | The status of the added item in list should change from upload pending to uploaded |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
