# CTCP-4510 — Verify user View Belt Scan

| Field | Value |
|---|---|
| **TC ID** | CTCP-4510 |
| **Suite** | Belt Scan |
| **Name** | Verify user View Belt Scan |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify user View Belt Scan

**Preconditions:** User adds below Belt Scan record from web

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user login to Mobile application as Master user | Belt Scan card should be displayed on home level |
| 2 | Verify user click on Belt Scan card | Belt Scan list page should be displayed |
| 3 | Verify user is able to see all the Belt Scan Record (mentioned in the pre-condition) in mobile application that was added through web from home level | User should be able to view all the Belt Scan (mentioned in the pre-condition) in mobile application that was added through web from home level |
| 4 | Verify user click on the Belt Scan | PDF preview of Belt Scan should be available with download option |
| 5 | Verify user is able to see all the Belt Scan (mentioned in the pre-condition) in mobile application that was added through web from conveyor level | User should be able to view all the Belt Scan (mentioned in the pre-condition) in mobile application that was added through web from conveyor level |
| 6 | Verify user click on the Belt Scan from conveyor level | PDF preview of Belt Scan should be available with download option |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
