# CTCP-4518 — Verify Home and Conveyor level Belt Scan updated when user adds Belt Scan in corporate level from web

| Field | Value |
|---|---|
| **TC ID** | CTCP-4518 |
| **Suite** | Belt Scan |
| **Name** | Verify Home and Conveyor level Belt Scan updated when user adds Belt Scan in corporate level from web |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Home and Conveyor level Belt Scan updated when user adds Belt Scan in corporate level from web

**Preconditions:** User is logged into the mobile application

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user note down the count for Belt Scan from home and Conveyor level | Belt Scan card count is noted |
| 2 | Now add one Belt Scan from web corporate level | Belt Scan should be added |
| 3 | Verify user do pull to refresh the mobile application | Count should be incremented by 1 in mobile and web both home and conveyor level |
| 4 | Now delete one Belt Scan from web corporate level and Home level | Belt Scan should be deleted |
| 5 | Verify user do pull to refresh the mobile application | Count should be decremented by 1 in mobile and web both home and conveyor level |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
