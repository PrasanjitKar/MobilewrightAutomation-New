# CTCP-4509 — Verify User is able to View Belt Scan list view

| Field | Value |
|---|---|
| **TC ID** | CTCP-4509 |
| **Suite** | Belt Scan |
| **Name** | Verify User is able to View Belt Scan list view |
| **Priority** | High |
| **Execution Type** | Manual |
| **Status** | 📋 Planned |

**Summary:** Verify User is able to View Belt Scan list view

**Preconditions:** User is able to login to Mobile application

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Verify user login to mobile application as Master user | Home page should be displayed |
| 2 | Verify user is able to see Belt Scan on home level | Belt Scan card should be displayed on home level |
| 3 | Verify user click on Belt Scan Card from Home level | All Belt Scan should be displayed with below high level details: Icon for Belt Scans, Site Name, Conveyor Name, Date of Scan (default sorting), Device Type, Notify CCM, Icon for PDF Report |
| 4 | Verify user click on back icon | User should navigate back to home page |
| 5 | Verify user view a conveyor which has Belt Scan | Belt Scan card should be displayed on conveyor level page |
| 6 | Verify user click on Belt Scan Card from Conveyor level | All Belt Scan should be displayed with below high level details: Icon for Belt Scans, Site Name, Conveyor Name, Date of Scan (default sorting), Device Type, Notify CCM, Icon for PDF Report |
| 7 | Verify user click on back icon | User should navigate back to conveyor details page |

**Requirements:** CTCP-13276, CTCP-13277: Belt Scan Home Level, Conveyor level, View and Download

**Keywords:** Regression

---

*Exported from TestLink*
