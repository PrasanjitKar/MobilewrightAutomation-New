# CTCP-4406 — Verify for Vulcan inspection event for same conveyor duplicate inspection item w

| Field | Value |
|---|---|
| **TC ID** | CTCP-4406 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify for Vulcan inspection event for same conveyor duplicate inspection item w |
| **Priority** | Medium |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** ---- Warning ---- TestLink Warning test case name is too long (122 chars) > 100 => has been truncated Original name Verify for Vulcan inspection event for same conveyor duplicate inspection item with same details selection is not possible ---- *** ---- Verify Asset sequence for default inspection item template

**Preconditions:** User is on add inspection item of event details page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click on + button | Inspection item pop-up should open |
| 2 | Add item Tail pulley asset and details as lagging condition | User should able to add item |
| 3 | Now try to add another inspection item with same asset and details in same conveyor | Previous add item detail should display with edit symbol and user should not be able to add item with same details |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
