# CTCP-4507 — Verify User should not display the "Belt Scan" Card when view permission is not given

| Field | Value |
|---|---|
| **TC ID** | CTCP-4507 |
| **Suite** | Belt Scan |
| **Name** | Verify User should not display the "Belt Scan" Card when view permission is not given |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify User should not display the "Belt Scan" Card when view permission is not given

**Preconditions:** User is not given View permission for Belt Scan

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user is login to Mobile application as Distributor user | Mobile Home page should be displayed |
| 2 | Verify User is not displayed with Belt Scan Card on home level | Belt Scan card on home level should not be displayed. |
| 3 | Verify user view a conveyor and check Belt Scan card is not displayed | Belt Scan card should not be displayed on conveyor level |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
