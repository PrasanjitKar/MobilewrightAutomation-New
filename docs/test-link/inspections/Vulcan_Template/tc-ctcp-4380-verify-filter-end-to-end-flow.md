# CTCP-4380 — Verify filter end to end flow

| Field | Value |
|---|---|
| **TC ID** | CTCP-4380 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify filter end to end flow |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify filter end to end flow

**Preconditions:** User is on inspection list page Corporate C1, Site S1, Conveyor CV1 already exist with Inspection event Insp1, condition critical and status to be completed Corporate C2, Site S2, Conveyor CV2 already exist with Inspection event Insp2,  condition Good and status  completed Multi conveyor Inspection event Insp3 with item having conveyor CV1 with  condition critical and status to be completed  & CV2  condition fault and status to be completed

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Select corporate C1 & C2 Both | User can select both the corporate |
| 2 | Observe the site displayed in site filter | Both S1 and S2 should display |
| 3 | Select both the site | User can select the data |
| 4 | Observe conveyor displayed | Both CV1 & CV2 should display |
| 5 | apply filter | Observe all three inspection event Insp1, 2 & 3 should display |
| 6 | Apply filter again and select condition as critical | Only inspection event 1 & 3 should display |
| 7 | Click on remove filter icon | on click all selected filter should get removed |
| 8 | Now click on status filter and select To be completed | Only inspection event 1 & 3 should display |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
