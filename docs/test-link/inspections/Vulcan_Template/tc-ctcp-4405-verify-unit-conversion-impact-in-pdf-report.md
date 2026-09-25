# CTCP-4405 — Verify unit conversion impact in pdf report

| Field | Value |
|---|---|
| **TC ID** | CTCP-4405 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify unit conversion impact in pdf report |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify unit conversion impact in pdf report

**Preconditions:** The added conveyor should have following field filled : Belt width, Belt carcass, Belt Rating, Top & Bottom cover thickness

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for unit select from header of the page | The unit selected should be metric |
| 2 | Now download the pdf report | User should able to download the report |
| 3 | Look for conveyor table details | The conveyor should display following unit and value in metric |
| 4 | Now change the unit from header to imperial | The unit selected should be imperial |
| 5 | Now download the pdf report | User should able to download the report |
| 6 | Look for conveyor table details | The conveyor should display following unit and value in imperial |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
