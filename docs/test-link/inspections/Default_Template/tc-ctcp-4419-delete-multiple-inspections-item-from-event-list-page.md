# CTCP-4419 — Delete multiple inspections item from event list page

| Field | Value |
|---|---|
| **TC ID** | CTCP-4419 |
| **Suite** | Inspections → Default_Template |
| **Name** | Delete multiple inspections item from event list page |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Delete multiple inspections item from event list page

**Preconditions:** Considering Site S1 having conveyor Cv1, CV2 & Cv3 with above inspection event precondition

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to item list page of above inspection event | User should able to navigate to view page of item list page of above inspection |
| 2 | Navigate to edit mode of the event whose items need to delete | User should able to navigate to edit mode |
| 3 | Click on Add inspection item | Should open all the items added in event |
| 4 | Click on Delete button  of any item | Should display pop-up, Are you sure you want to delete inspection item - Asset name |
| 5 | Click on yes | The item should get deleted from event list with success message |
| 6 | Follow the same above steps to delete multiple inspection item | User can delete multiple items |
| 7 | Click on save and close in sign off | The inspection should get save |
| 8 | Look for deleted item in inspection event | Inspection should not display deleted item in event details |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
