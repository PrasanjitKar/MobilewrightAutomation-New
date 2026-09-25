# CTCP-4411 — Verify the elements displayed on inspection list in case of single or multi conv

| Field | Value |
|---|---|
| **TC ID** | CTCP-4411 |
| **Suite** | Inspections → Default_Template |
| **Name** | Verify the elements displayed on inspection list in case of single or multi conv |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** ---- Warning ---- TestLink Warning test case name is too long (101 chars) > 100 => has been truncated Original name Verify the elements displayed on inspection list in case of single or multi conveyor inspection event ---- *** ---- Verify the elements displayed on inspection list

**Preconditions:** User is on inspection list page Corporate C1, Site S1, Conveyor CV1 already exist with Inspection event Insp1

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify the heading of the list page | Inspection should be displayed as heading |
| 2 | Look for the elements displayed on inspection list | For single conveyor or multi conveyor inspection following element should display : Inspection name, Site name, conveyor count , Date of inspection(Oct/10/2024), Inspection upload status : uploaded, Flag conditions with count, Inspection status : To be completed or Green tick in case all inspection item is in completed state |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
