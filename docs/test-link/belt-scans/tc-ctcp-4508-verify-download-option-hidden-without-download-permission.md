# CTCP-4508 — Verify User should not display the download option when Download permission is not given

| Field | Value |
|---|---|
| **TC ID** | CTCP-4508 |
| **Suite** | Belt Scan |
| **Name** | Verify User should not display the download option when Download permission is not given |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify User should not display the download option when Download permission is not given

**Preconditions:** User is not given Download permission for Belt Scan

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user is login to Mobile application as Distributor user | User should be on home page |
| 2 | Verify User is displayed with Belt Scan Card on home level | Belt Scan card on home level should be displayed. |
| 3 | Verify user view one of the belt scan record | Download option should not be displayed as the permission is not given |
| 4 | Verify user view one of the belt scan record from conveyor level | Download option should not be displayed as the permission is not given |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
