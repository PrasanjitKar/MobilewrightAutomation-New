# CTCP-4515 — Verify Home level Belt Scan updated

| Field | Value |
|---|---|
| **TC ID** | CTCP-4515 |
| **Suite** | Belt Scan |
| **Name** | Verify Home level Belt Scan updated |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify Home level Belt Scan updated

**Preconditions:** User is logged into the application

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user note down the Belt Scan count at home level | Belt Scan card count is noted |
| 2 | Now add 2 Belt Scan Record from Web | Belt Scan Record should be added |
| 3 | Verify user do pull to refresh the mobile application | Count should be incremented by 2 in mobile and web |
| 4 | Now delete two Belt Scan Record from web | Belt Scan Record should be deleted |
| 5 | Verify user do pull to refresh the mobile application | Count should be decremented by 2 in mobile and web |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
