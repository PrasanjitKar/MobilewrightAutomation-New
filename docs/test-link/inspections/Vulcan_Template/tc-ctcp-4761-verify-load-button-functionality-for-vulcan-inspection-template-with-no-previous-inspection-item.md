# CTCP-4761 — Verify Load button functionality for vulcan inspection template with no previous inspection item

| Field | Value |
|---|---|
| **TC ID** | CTCP-4761 |
| **Suite** | Inspections → Vulcan_Template |
| **Name** | Verify Load button functionality for vulcan inspection template with no previous inspection item |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Load button functionality for vulcan inspection template with no previous inspection item

**Preconditions:** User should be on Add inspection event page and no previous inspection item mapped to the selected conveyor

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | User is on Add inspection event page with event level details filled | User should able to navigate |
| 2 | Now without selecting conveyor observe Inspection load button | Without selecting conveyor inspection load button should be displayed in disabled form |
| 3 | Now select the conveyor and observe Load open inspection item button | Post selecting the conveyor Load open inspection item button should be displayed in enabled form |
| 4 | Now click on load inspection item button | Since no open previous inspection item exist with the conveyor hence Information Pop-up will be displayed with message : No previous inspection item in To be completed status found with Back button |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
