# CTCP-4359 — Verify the elements displayed in inspection card

| Field | Value |
|---|---|
| **TC ID** | CTCP-4359 |
| **Suite** | Inspections → Card_Logic |
| **Name** | Verify the elements displayed in inspection card |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Navigation to inspection list page

**Preconditions:** User have logged in to Conti + application and landed to home page

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Look for inspection card | Following elements to be displayed in inspection card :<br>-Main card count -Total number of inspection event<br>-To be completed count<br>-Yellow color flag -number of inspection items with condition "fault" and status "to be completed" -Orange color flag -number of inspection items with condition "poor" and status "to be completed" -Red color flag -number of inspection items with condition " critical" and status "to be completed"<br>Note : -Green color flag -  with condition "good" will not be displayed even with status "to be completed" |

**Requirements:** None

**Keywords:** Regression

---

*Exported from TestLink*
