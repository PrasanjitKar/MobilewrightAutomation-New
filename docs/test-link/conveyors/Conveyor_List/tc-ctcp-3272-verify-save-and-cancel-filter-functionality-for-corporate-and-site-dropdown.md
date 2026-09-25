# CTCP-3272 — Verify save and cancel filter functionality for Corporate and site dropdown

| Field | Value |
|---|---|
| **TC ID** | CTCP-3272 |
| **Suite** | Conveyors → Conveyor_List |
| **Name** | Verify save and cancel filter functionality for Corporate and site dropdown |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | Filter is applied on conveyor list page |
| 2 | Click on filter displayed in header | Filter pop-up should open |
| 3 | Click on corporate dropdown | Should display the list of corporates with checkbox for selection |
| 4 | Select 10 corporates | User should able to select 10 corporates |
| 5 | Click on Site dropdown | It should show list of sites which belong to that corporate |
| 6 | Select 5 sites | User should able to select 5 sites |
| 7 | Click on apply button | All the options for the corporate and sites should get saved and dropdown should get closed |
| 8 | Click on corporate filter again | Should display the list of corporates with 10 corporates and 5 sites default selected |
| 9 | Click on cancel button | 10 corporate & 5 sites checkboxes should get deselected |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
