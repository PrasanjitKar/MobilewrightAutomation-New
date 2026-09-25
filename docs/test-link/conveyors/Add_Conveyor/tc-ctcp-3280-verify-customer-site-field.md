# CTCP-3280 — Verify customer site field

| Field | Value |
|---|---|
| **TC ID** | CTCP-3280 |
| **Suite** | Conveyors → Add_Conveyor |
| **Name** | Verify customer site field |
| **Priority** | High |
| **Execution Type** | Automated |
| **Status** | 📋 Planned |

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Precondition | User is on Add conveyor page |
| 2 | Click on Customer site dropdown | It should display customer site based on: if distributor shop field is selected, display only sites linked to selected distributor shop; if not selected, display all sites |
| 3 | Select the site | User should able to select site from provided options |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
