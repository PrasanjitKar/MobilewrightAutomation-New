# CTCP-4516 — Verify Conveyor level Belt Scan updated

| Field | Value |
|---|---|
| **TC ID** | CTCP-4516 |
| **Suite** | Belt Scan |
| **Name** | Verify Conveyor level Belt Scan updated |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Conveyor level Belt Scan updated

**Preconditions:** User is logged into the application

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user note down the Conveyor level Belt Scan count | Belt Scan card count is noted |
| 2 | Now add one Belt Scan Record from web conveyor level | Belt Scan should be added |
| 3 | Verify user do hard refresh the mobile application | Count should be incremented by 1 in mobile and web |
| 4 | Now delete two conveyor Belt Scan from web Conveyor level | Belt Scan should be deleted |
| 5 | Verify user do hard refresh the mobile application | Count should be decremented by 2 in mobile and web |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
