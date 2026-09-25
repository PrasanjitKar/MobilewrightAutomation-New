# CTCP-4517 — Verify Home and Conveyor level Belt Scan updated when user adds Belt Scan in site level from web

| Field | Value |
|---|---|
| **TC ID** | CTCP-4517 |
| **Suite** | Belt Scan |
| **Name** | Verify Home and Conveyor level Belt Scan updated when user adds Belt Scan in site level from web |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Home and Conveyor level Belt Scan updated when user adds Belt Scan in site level from web

**Preconditions:** User is logged into the mobile application

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user note down the Belt Scan count at home and Conveyor level | Belt Scan card count is noted |
| 2 | Now add 2 Belt Scan from web site level | Belt Scan should be added |
| 3 | Verify user hard refresh the mobile application | Count should be incremented by 2 in mobile and web both home and conveyor level |
| 4 | Now delete one Belt Scan from web site level | Belt Scan should be deleted |
| 5 | Verify user hard refresh the mobile application | Count should be decremented by 1 in mobile and web both home and conveyor level |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
