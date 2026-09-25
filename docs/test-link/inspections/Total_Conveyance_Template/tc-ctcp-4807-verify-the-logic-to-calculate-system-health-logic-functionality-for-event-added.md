# CTCP-4807 — Verify the logic to Calculate system health logic functionality for event added

| Field | Value |
|---|---|
| **TC ID** | CTCP-4807 |
| **Suite** | Inspections → Total_Conveyance_Template |
| **Name** | Verify the logic to Calculate system health logic functionality for event added |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** ---- Warning ---- TestLink Warning test case name is too long (111 chars) > 100 => has been truncated Original name Verify the logic to Calculate system health logic functionality for event added from mobile and checking in web ---- *** ---- Verify the logic to Calculate system health

**Preconditions:** Considering the data is added from mobile and checking in web Let suppose current system health displays 78% in health card with decrement of 2% in red color

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to inspection details page in view mode | User should able to navigate |
| 2 | Verify the logic to display system health % | 78% → Average of the following Scores:<br>Tail<br>Center<br>Head<br>Belt Condition |
| 3 | Verify the logic to display decrement 2% value | -2% → Difference in percent from previous Inspection Event until current Inspection Event |

**Requirements:** None

**Keywords:** None

---

*Exported from TestLink*
